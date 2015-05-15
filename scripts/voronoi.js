var Point = require("./point")
var Vector = require("./vector")
// var PQueue = require("./priority_queue")
var Node = require("./binary_search_tree")["Node"]
var BST = require("./binary_search_tree")["BinarySearchTree"]

var Beach = {
  init: function(site, scanline){
    this.directrix = scanline
    this.focus = site
  },

  intersect: function(beach){
    var a = this.focus.x
    var b = this.focus.y
    var c = this.directrix.y
    var h = beach.focus.x
    var j = beach.focus.y

    var breakpts = []
    //set the two equations equal and solving for x gives you this monster (thx, wolfram alpha)
    var x1 = ((-1) * (Math.sqrt((-b*c+b*j+c*c - c*j)*(a*a - 2*a*h + b*b - 2*b*j + h*h + j*j))) + a*c-a*j + b*h - c*h)/(b-j)
    var x2 = ((Math.sqrt((-b*c+b*j+c*c - c*j)*(a*a - 2*a*h + b*b - 2*b*j + h*h + j*j))) + a*c-a*j + b*h - c*h)/(b-j)

    if(isNaN(x1)){
      x1 = -1.0
    }
    if(isNaN(x2)){
      x2 = 1.0
    }
    breakpts.push(x1, x2)
    // if((x1 >= h) && (x1 <= a)){
    //   // console.log("inner bkpt")
    //   breakpts.push(x1, x2)
    // }
    // else{
    //   breakpts.push(x2, x1)
    // }
    return breakpts
  }, 

  arceqn: function(x){
    var a = this.focus.x
    var b = this.focus.y
    var c = this.directrix.y
    var verty = b - (this.focus.dist2scan / 2)
    /*
    Std vertex form for a parabola: y = a(x-h)^2 + k for a parabola with a vertex (h,k)
    */
    var y = (1/(2*(b-c))) * ((x-a)*(x-a)) + (1/2)*(b+c)

    return y
  },

  update: function(bl, br){
    var arcBuf = []
    var cBuf = []
    var c = this.focus.c

    if (this.focus.y >= this.directrix.y){
      for(i = bl; i<br; i+=.01){
        var y = this.arceqn(i)
        cBuf.push(c[0], c[1], c[2])
        arcBuf.push(i, y, 0.0)
      }
    }
    return {
      "lines": arcBuf,
      "color": cBuf
    }
  },
  toBuffer: function(bl, br){
    return this.update(bl, br)
  }
}

var Site = {
  init: function(point, color){
    this.p = point
    this.c = color
    this.x = point.x
    this.y = point.y
  },
  dist_to_scanline: function(scanl){
    this.dist2scan = Math.abs(this.y - scanl.y)
  },
  update: function(scanl) {
    this.dist_to_scanline(scanl)
  }
}

var Scanline = {
  init: function(e1, e2, vec, color){
    this.y = e1.y
    this.dy = vec.dy
    this.e1 = e1
    this.e2 = e2
    this.vec = vec
    this.c = color
  },
  update: function(){
    this.e1 = this.e1.plus(this.vec)
    this.e2 = this.e2.plus(this.vec)
    this.y = this.e1.y
  }
}
var Voronoi = (function(){
  var siteBuffer = []
  var colorBuffer = []
  var colors = [
      [0.3451, 1.0, 0.5450],
      [1.0, 0.4313, 0.3411],
      [1.0, 0.8862, 0.3725],
      [1.0, 1.0, 0.0],
      [0.0, 1.0, 1.0],
      [1.0, 0.0, 1.0],
      [0.3804, 0.7647, 1.0]
  ]
  // to do: add a boundary var instead of -1.0, 1.0, etc
  scanline = Object.create(Scanline)
  sites = []
  edges = []
  beachLine = Object.create(BST)
  pq = []
  beaches = []
 
  function random_color(){
    return colors[(Math.random()*colors.length)|0]
  }

  function addSite(x,y,z){
    var p = Object.create(Point)
    p.init(x, y, z)

    var c = random_color()

    siteBuffer.push(x, y, z)
    colorBuffer.push(c[0], c[1], c[2])

    var site = Object.create(Site)
    site.init(p, c)
    site.dist_to_scanline(scanline)

    sites.push(site)
    pq.push(site)
  }

  function createScanLine(){
    var c = [1.0, 1.0, 1.0]
    //create the two endpoints for the scanline
    var e1 = Object.create(Point)
    e1.init(-1.0,1.0,0.0)

    var e2 = Object.create(Point)
    e2.init(1.0,1.0,0.0)

    //create the movement (down) scan vector
    var vec = Object.create(Vector)
    vec.init(0.0, -.0025, 0.0)
    scanline.init(e1, e2, vec, c)
  }

  function scanlineToBuffer(){
    var sbuf = [];
    sbuf.push.apply(sbuf, scanline.e1.toArray())
    sbuf.push.apply(sbuf, scanline.e2.toArray())

    var cbuf = [];
    cbuf.push.apply(cbuf, scanline.c)
    cbuf.push.apply(cbuf, scanline.c)
    return {
      "scanline": sbuf,
      "colors": cbuf
    }
  }

  function beachlineToBuffer(){
    var buf = []
    if (beachLine.root != null){
      buf = beachLine.toBuffer()
    }
    return buf
  }
  function scanFinished(){
    if (scanline.y < (-1.0 - scanline.dy)){
      console.log("scan finished")
      return true
    }
    else{
      return false
    }
  }
  function processEvent(){
    console.log("processEvent")
    var site = pq.pop()
    var beach = Object.create(Beach)
    beach.init(site, scanline)
    beachLine.insert(beach)
    beaches.push(beach)
    // console.log(beachLine)
  }

  function update(){
    if (!scanFinished()){
      //update the scanline
      scanline.update()

      //update every site's distance
      sites.forEach(function(site){
        site.update(scanline)
      })

      //sort the priority queue according to (max) distance to scanline
      // this way we can call pq.pop()
      pq.sort(function(a,b){
        return b.dist2scan - a.dist2scan
      })

      //process a site event if the scanline has hit a site
      if ((pq.length > 0) && (pq[pq.length-1].dist2scan <= Math.abs(scanline.dy/2))){
        console.log("site event")
        processEvent()
      }
    }
  }
  return{
    siteBuffer: siteBuffer,
    colorBuffer: colorBuffer,
    addSite: addSite,
    scanlineToBuffer: scanlineToBuffer,
    beachlineToBuffer: beachlineToBuffer,
    update: update,
    begin: function(){
      createScanLine()
    }
    // toGLBuf: function(){
    //   scanlineToBuffer()
    //   eventToBuffer()
    //   beachLineToBuffer()
    // }
  }
})


module.exports = Voronoi