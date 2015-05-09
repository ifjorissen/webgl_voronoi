// var Point = require("./point")
// var Vector = require("./vector")
var PQueue = require("./priority_queue")
var Node = require("./binary_search_tree")["Node"]
var BST = require("./binary_search_tree")["BinarySearchTree"]

//To Do:
// scan function
var Voronoi = {
  scanvector: null,
  scanline: [],
  sites: [],
  scolor: {},
  // parabolas: Object.create(BST),
  // pq = Object.create(PQueue),
  colors: [
      [0.0,0.0,0.0],
      [0.3451, 1.0, 0.5450],
      [1.0, 0.4313, 0.3411],
      [1.0, 0.8862, 0.3725],
      [1.0, 1.0, 0.0],
      [0.0, 1.0, 1.0],
      [1.0, 0.0, 1.0],
      [0.3804, 0.7647, 1.0]
    ],
  random_color: function(){
  	return this.colors[(Math.random()*this.colors.length)|0]
  },
  scanlineToBuf: function(){
    var sbuf = [];
    sbuf.push.apply(sbuf, this.scanline[0].toArray())
    sbuf.push.apply(sbuf, this.scanline[1].toArray())
    return sbuf
  },
  beachLineToBuffer: function(){

  },
  scanFinished: function(){
    if (this.scanline[0].y < (-1.0 - this.scanvector.dy)){
      console.log("scan finished")
      return true
    }
    else{
      return false
    }
  },
  update: function(){
    if (!this.scanFinished()){
      for (i = 0; i < this.scanline.length; i++){
        var tmp = this.scanline[i].plus(this.scanvector)
        this.scanline[i] = tmp
      }
    }
  },
  scan: function(){
  	/*
  	  Fortune's Algorithm
  	  sweep line moves from the top to the bottom of the diagram
      O(n*logn)
  	*/
  },
  sloppyScan: function(){
    /*
      The intersection of half planes
      O(n^2*logn)
    */
  }
}


module.exports = Voronoi