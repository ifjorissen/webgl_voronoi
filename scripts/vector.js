var Vector = {
	init: function(_dx,_dy,_dz){
		this.dx = _dx || 0
		this.dy = _dy || 0
		this.dz = _dz || 0
	},
	add: function(v){
		var x = this.dx + v.dx
		var y = this.dy + v.dy
		var z = this.dz + v.dz

		var nv = Object.create(Vector)
		nv.init(x,y,z)
		return nv
	},
	minus: function(v){
		var x = this.dx - v.dx
		var y = this.dy - v.dy
		var z = this.dz - v.dz

		var nv = Object.create(Vector)
		nv.init(x,y,z)
		return nv
	},
	scale: function(scalar){
		var x = this.dx*scalar
		var y = this.dy*scalar
		var z = this.dz*scalar

		var nv = Object.create(Vector)
		nv.init(x,y,z)
		return nv
	},
	neg: function(){
		var nv = this.scale(-1.0)
		return nv
	},
	dot: function(v){
		var d = this.dx*v.dx + this.dy*v.dy + this.dz*v.dz
		return d
	},
	cross: function(v){
		var x = this.dy*other.dz-this.dz*other.dy
    var y = this.dz*other.dx-this.dx*other.dz
    var z = this.dx*other.dy-this.dy*other.dx

    var nv = Object.create(Vector)
		nv.init(x,y,z)
		return nv
	},
	norm2: function(){
		var d = this.dot(this)
		return d
	},
	norm: function(){
		var d = this.dot(this)
		return Math.sqrt(d)
	},
	unit: function(){
	  var n = this.norm()
	  if (n < .0000001){
	  		var nv = Object.create(Vector)
	      return nv.init(1.0, 0.0, 0.0)
	  }
	  else{
	      return this.scale(1.0/n)
	  }
	},
	rand_unit: function(){
		var phi = Math.random() * Math.PI * 2.0
		var theta = Math.acos(2.0 * Math.random() - 1.0)

		var nv = Object.create(Vector)
		nv.init(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta))
		return nv
	}
}

module.exports = Vector


//"Tests"
// var a = Object.create(Vector)
// a.init(1,2,3)

// var b = Object.create(Vector)
// b.init(4,5,6)

// var c = a.add(b)

// var d = Object.create(Vector)
// console.log(a)
// console.log(b)
// console.log(c)
// console.log(d)

// var d1 = a.dot(a)
// console.log(d1)
// var d2 = a.norm2()
// console.log(d2)
// var d3 = a.norm()
// console.log(d3)