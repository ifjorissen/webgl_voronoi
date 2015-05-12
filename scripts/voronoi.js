var Point = require("./point")
var Vector = require("./vector")
// var PQueue = require("./priority_queue")
var Node = require("./binary_search_tree")["Node"]
var BST = require("./binary_search_tree")["BinarySearchTree"]

var Beach = {
  init: function(site, scanline){
    this.breakl = -1.0
    this.breakr = 1.0
    this.directrix = scanline
    this.focus = site
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
    // var y = ((x-a)*(x-a) + b*b - c*c)/(2*(b-c))
    // var y = (a*a - 2*a*x + b*b - c*c + x*x)/(2*b - 2*c)
    return y
  },

  update: function(){
    // console.log("beach update " + this.focus.x)
    var arcBuf = []
    var cBuf = []
    var c = this.focus.c
    this.arcpts = []
    for(i = -1.0; i<=1.0; i+=.01){
      var y = this.arceqn(i)
      // console.log("x: " + i + " y: " + y)
      this.arcpts.push(y)
      cBuf.push(c[0], c[1], c[2])
      arcBuf.push(i, y, 0.0)
    }
    return {
      "lines": arcBuf,
      "color": cBuf
    }
  },
  toBuffer: function(){
    // console.log("beach tobuf " + this.focus.x)
    return this.update()
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
//To Do:
// scan function
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
    var bbuf = []
    console.log(beaches)

    beaches.forEach(function(beach){
      console.log("beach toBuf " + beach.focus.x)
      var res = beach.toBuffer()
      bbuf.push(res)
      console.log(bbuf)
    })
    return bbuf
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
    beachLine.insert(beach, beach.focus.x)
    beaches.push(beach)
  }

  function update(){
    if (!scanFinished()){
      //update the scanline
      scanline.update()
      //update every site's distance
      sites.forEach(function(site){
        console.log("update sites func " + site.x)
        site.update(scanline)
      })

      //sort the priority queue according to (max) distance to scanline
      // this way we can call pq.pop()
      pq.sort(function(a,b){
        return b.dist2scan - a.dist2scan
      })

      if ((pq.length > 0) && (pq[pq.length-1].dist2scan <= Math.abs(scanline.dy/2))){
        console.log("site event")
        processEvent()
      }

      beaches.forEach(function(beach){
        console.log("update beach " + beach.focus.x)
        beach.update()
      })
    }
  }

  function scan(){
  	/*
  	  Fortune's Algorithm
  	  sweep line moves from the top to the bottom of the diagram
      O(n*logn)
  	*/
    // console.log("scan called")
  }
  return{
    siteBuffer: siteBuffer,
    colorBuffer: colorBuffer,
    addSite: addSite,
    scanlineToBuffer: scanlineToBuffer,
    beachlineToBuffer: beachlineToBuffer,
    update: update,
    scan: scan,
    begin: function(){
      createScanLine()
    },
    toGLBuf: function(){
      scanlineToBuffer()
      eventToBuffer()
      beachLineToBuffer()
    }
  }
})()


module.exports = Voronoi