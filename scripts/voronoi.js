var Point = require("./point")
var Vector = require("./vector")
// var PQueue = require("./priority_queue")
var Node = require("./binary_search_tree")["Node"]
var BST = require("./binary_search_tree")["BinarySearchTree"]

var Site = {
  init: function(point, color){
    this.p = point
    this.c = color
    this.x = point.x
  },
  dist_to_scanline: function(scanl){
    this.dist2scan = Math.abs(this.p.y - scanl.y)
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
  }
}
//To Do:
// scan function
var Voronoi = (function(){
  var siteBuffer = []
  var colorBuffer = []
  var colors = [
      [0.0,0.0,0.0],
      [0.3451, 1.0, 0.5450],
      [1.0, 0.4313, 0.3411],
      [1.0, 0.8862, 0.3725],
      [1.0, 1.0, 0.0],
      [0.0, 1.0, 1.0],
      [1.0, 0.0, 1.0],
      [0.3804, 0.7647, 1.0]
  ]
  scanline = Object.create(Scanline)
  sites = []
  edges = []
  beachLine = Object.create(BST)
  pq = []

  function random_color(){
    return colors[(Math.random()*colors.length)|0]
  }

  function addSite(x,y,z){
    var p = Object.create(Point)
    p.init(x, y, z)

    var c = random_color()

    siteBuffer.push(x, y, z)
    colorBuffer.push(c[0], c[1], c[2])
    console.log(siteBuffer)
    console.log(colorBuffer)

    var site = Object.create(Site)
    site.init(p, c)
    site.dist_to_scanline(scanline)

    sites.push(site)
    pq.push(site)
    console.log(sites)
  }

  function createScanLine(){
    var c = random_color()
    //create the two endpoints for the scanline
    var e1 = Object.create(Point)
    e1.init(-1.0,1.0,0.0)

    var e2 = Object.create(Point)
    e2.init(1.0,1.0,0.0)

    //create the movement (down) scan vector
    var vec = Object.create(Vector)
    vec.init(0.0, -.1, 0.0)
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

  // function sitesToBuffer(){
  //   for (i = 0; i < sites.length; i++){
  //     siteBuffer.push.apply(site.p.toArray())
  //     colorBuffer.push.apply(site.c)
  //   }
  // }
  function eventToBuffer(){

  }
  function beachLineToBuffer(){

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

  function update(){
    if (!scanFinished()){
      //update the scanline
      scanline.update()

      //update every site's distance
      for (i = 0; i<sites.length; i++){
        sites[i].update(scanline)
      }

      //sort the priority queue according to (min) distance to scanline
      pq.sort(function(a,b){
        console.log(a)
        return a.dist2scan - b.dist2scan
      })
      console.log(pq)
    }
  }

  function scan(){
  	/*
  	  Fortune's Algorithm
  	  sweep line moves from the top to the bottom of the diagram
      O(n*logn)
  	*/
    console.log("scan called")
  }
  return{
    siteBuffer: siteBuffer,
    colorBuffer: colorBuffer,
    addSite: addSite,
    scanlineToBuffer: scanlineToBuffer,
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