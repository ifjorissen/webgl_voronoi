var Vector = require("./vector")

var Point = {
	init: function(_x,_y,_z){
		this.x = _x || 0
		this.y = _y || 0
		this.z = _z || 0
	},
	plus: function(v){
		var x = this.x + v.dx
		var y = this.y + v.dy
		var z = this.z + v.dz

		var np = Object.create(Point)
		np.init(x,y,z)
		return np
	},
	minus: function(v){
		var x = this.x - v.x
		var y = this.y - v.y
		var z = this.z - v.z

		var nv = Object.create(Vector)
		nv.init(x,y,z)
		return nv
	},
	dist2: function(p){
		var nv = this.minus(p)
    return nv.norm2()
  },
	dist: function(p){
		var nv = this.minus(p)
    return nv.norm()
	},
	toArray: function(){
		return [this.x, this.y, this.z]
	}
}

module.exports = Point
// "Tests"
// var pa = Object.create(Point)
// pa.init(1,2,3)

// var v = Object.create(Vector)
// v.init(7,8,9)

// var pb = Object.create(Point)
// pb.init(4,5,6)

// var pc = pa.minus(pb)
// var negc = pb.minus(pa)
// var va = pa.plus(v)

// console.log(pc)
// console.log(negc)
// console.log(va)