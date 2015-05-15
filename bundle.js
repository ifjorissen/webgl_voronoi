(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Node = {
	init: function(pnode, val){
		// this.key = key
		this.parent = pnode
		this.val = val
		this.breakpts = null
		this.left = null
		this.right = null
	}
}


var BinarySearchTree = (function(){
	var root = Object.create(Node)
	var beachLineBuffer = []

	function init(val){
		root.init(null, val)
	}
	/*
	SearchVal: given a start node and a val, searches the appropriate subtree(s) and returns 
	the node associated with that value (if there is one) I BROKE THIS
	*/
	function searchVal(node, val){
		console.log("search")
		console.log(node)
		if (node == null){
			return null
		}
		else{
			if(val === node.val){
				return node
			}
			else{
				if(isLeaf(node)){
					console.log("this is a leaf tho")
				}
				if (val.focus.x <= node.breakpts[1][0]){
					console.log("not eq less")
					console.log("not eq less")
					console.log(node.breakpts)
					console.log(node.val[0].focus.x)
					return searchVal(node.left, val)
				}
				else{
					console.log("not eq more")
					console.log(node)
					console.log(val)
					return searchVal(node.right, val)
				}
			}
		}
	}
	/*
		Checks to see if a given node is a leaf
	*/
	function isLeaf(node){
		if ((node.left===null) && (node.right===null)){
			return true
		} 
		else{
			return false
		}
	}
	/*
		Inserts a value into the BST based off of the stored breakpoints in the internal nodes
	*/
	function insertV(pnode, node, val){
		if (node === null){
			var newnode = Object.create(Node)
			newnode.init(pnode, val)
			return newnode
		}
		else{
			/*
				replace this leaf with a 3 node subtree
			  if the site is to the left of the node's site, we need to check its right 
		    breakpoint with the nodes left breakpoint and update it (there's more to this)
		  */
			if(isLeaf(node)){
				if (node.parent !== null){
					var breakr = node.parent.val[1][1]
					var breakl = node.parent.val[1][0]
				}
				else{
					var breakr = 1.0
					var breakl = -1.0
				}
				//make a new node that has the breakpoints in them
				//add the two children
				var valbpts = val.intersect(node.val)
				var nodebpts = [valbpts[0], breakr]
				var breakpts = [valbpts, nodebpts]
				
				//the breakpoints for node's left and new beach's right
				// node.val.bright = tmp[0]
				// var nodebpt = [node.val.bleft, node.val.bright]
				var newnode = Object.create(Node)
				var sites = [val, node.val]
				newnode.init(node, sites)
				newnode.breakpts = breakpts
				node.right = newnode

				//insert the old
				node.right.left = insertV(node.right, node.right.left, val)
				node.right.right = insertV(node.right, node.right.right, node.val)

				//the arc we want to add should be on the right
				// else if (val.focus.x > node.val.focus.x){
				// node.val.intersect(val)
				node.left = insertV(node, node.left, node.val)


				//the breakpoints for the nodes right and the beach's left
				// console.log(node.val)
				var nvalbpts = [breakl, valbpts[0]]
				var nvalsites = [node.val, val]
				node.val = nvalsites
				node.breakpts = [nvalbpts, valbpts]
			}
			//we're not at a leaf yet, keep traversing
			else{
				// these should be equal
				var bptRArcLeft = node.breakpts[0][1] //the right breakpoint of the left arc
				var bptLArcRight = node.breakpts[1][0] //the left breakpoint of the right arc

				//the site we're trying to insert is left of the breakpoint
				if (val.focus.x <= bptLArcRight){
					// console.log("less " + node.val[0])
					// console.log(node)
					node.left = insertV(node, node.left, val)
				}

				//the site we're inserting is to the right of the breakpoint
				else{
					// console.log("more " + node.breakpts[0])
					// console.log(node)
					node.right = insertV(node, node.right, val)
				}
				// console.log(node)
			}
			return node
		}
	}
	function update(node){
		if(!isLeaf(node)){
			lArc = node.val[0]
			rArc = node.val[1]
			var nbpts = lArc.intersect(rArc)

			//update right breakpoint of left arc
			node.breakpts[0][1] = nbpts[0]

			//update left & right breakpoints of right arc
			node.breakpts[1][0] = nbpts[0]
			node.breakpts[1][1] = nbpts[1]
			update(node.left)
			update(node.right)
		}
		else{
			var arcBuf = []
			if(node.parent !== null){
				//if it's a left node draw this
				if(node.val == node.parent.val[0]){
					arcBuf = node.val.update(node.parent.breakpts[0][0], node.parent.breakpts[0][1])
				}
				//if its a right node draw this
				else{
					arcBuf = node.val.update(node.parent.breakpts[1][0], node.parent.breakpts[1][1])
				}
			}
			else{
				arcBuf = node.val.update(-1.0, 1.0)
			}
			beachLineBuffer.push(arcBuf)
			// console.log(buffer)
		}
	}
	function remove(val){
		
	}
	function outputTree(node){
		if (node.left !== null){
			outputTree(node.left)
		}
		if (node.right !== null){
			outputTree(node.right)
		}
	}
	function postOrder(node){
		if(node !== null){
			outputTree(node.left)
			outputTree(node.right) 
		}
	}
	return{
		init: function(val){
			console.log(init)
			init(val)
			console.log(root)
			this.root = root
		},
		searchVal: function(val){
			var res = search(this.root, val)
			return res
		},
		insert: function(val){
			if (this.root == null){
				init(val)
				this.root = root
			}
			else{
				insertV(null, this.root, val)
			}
		},
		toBuffer: function(){
			var cur = this.root
			while ((cur != null) && (cur.left !== null)){
				cur = cur.left
			}
			beachLineBuffer = []
			update(this.root)
			return beachLineBuffer
		}
	}
})();


//"Tests"
// var nodes = []
// var n1 = Object.create(Node)
// n1.init(1)
// var n2 = Object.create(Node)
// n2.init(2)
// var n3 = Object.create(Node)
// n3.init(3)
// var n4 = Object.create(Node)
// n4.init(4)
// var n5 = Object.create(Node)
// n5.init(5)


// var bst = Object.create(BinarySearchTree)
// bst.init('a', 10)
// bst.insert('b', 5)
// bst.insert('c', 12)
// bst.insert('d', 1)
// bst.insert('e', 8)
// console.log(bst)
// bst.postOrder(bst.root)
// var s = bst.search(7)
// console.log(s)
// console.log(bst.root)

module.exports = {
	"Node": Node,
	"BinarySearchTree": BinarySearchTree
}
},{}],2:[function(require,module,exports){

var webglwrap = require("./webgl_render")
var VERT_SRC = "precision highp float;\nprecision highp int;\n\nattribute vec3 a_position;\nattribute vec3 a_color;\n\n// uniform vec3 u_velocity;\nvarying vec3 fragColor;\n\nvoid main() {\n  // gl_Position = vec4(a_position+u_velocity), 1.0);\n  gl_Position = vec4(a_position, 1.0);\n  // gl_PointSize = 10.0;\n  fragColor = a_color;\n}\n"
var FRAG_SRC = "precision highp float;\nprecision highp int;\n\nvarying vec3 fragColor;\nvoid main() {\n  gl_FragColor = vec4(fragColor, 1.0);\n}"
var VERTPT_SRC = "precision highp float;\nprecision highp int;\n\nattribute vec3 a_position;\nattribute vec3 a_color;\n\n// uniform vec3 u_velocity;\nvarying vec3 fragColor;\n\nvoid main() {\n  gl_Position = vec4(a_position, 1.0);\n  gl_PointSize = 10.0;\n  fragColor = a_color;\n}\n"
var FRAGPT_SRC = "precision highp float;\nprecision highp int;\n\nvarying vec3 fragColor;\nvoid main() {\n\tfloat d2 = distance(gl_PointCoord.xy, vec2(.5,.5));\n  if (d2 >= .5){\n  \tdiscard;\n  }else{\n  \tgl_FragColor = vec4(fragColor, 1.0);\n  }\n  gl_FragColor = vec4(fragColor, 1.0);\n}"

var webgl = Object.create(webglwrap)
window.webgl = webgl


//cross-browser request animation frame solution
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(callback, element) {
           return window.setTimeout(callback, 1000);
         };
})();

window.onload = function init (){
	console.log("init called")
	options = {
		"v_src": VERT_SRC,
		"f_src": FRAG_SRC,
		"vpt_src": VERTPT_SRC,
		"fpt_src": FRAGPT_SRC,
		"container_id": "voronoi-wrapper",
		"canvas_id": "voronoi",
	}
	webgl.begin(options)
	var canvas = webgl.element.canvas
	var gl = webgl.gl

	canvas.addEventListener("click", function getXY(e){
		var x, y

		//Shim for firefox click handling
		if (e.x != undefined && e.y !=undefined){
      x = e.x 
      y = e.y
    }
    else {
      x = e.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop +
          document.documentElement.scrollTop;
    }

		x -= canvas.offsetLeft
		y -= canvas.offsetTop

		//scale the click coordinates
		x = (x - canvas.width / 2) / (canvas.width / 2);
		y = (canvas.height / 2 - y) / (canvas.height / 2);

		// console.log("clicked x: " + x + " y: " + y)
		webgl.addPoint(x,y)
	})

	var pause = false

	var gen_btn = document.getElementById("generate")
	gen_btn.addEventListener("click", function(){
		gen_btn.innerText = "Generating Diagram ...."
		pause_btn.innerText = "Pause"
		pause = false
		webgl.scan()
	})

	var reset_btn = document.getElementById("reset")
	reset_btn.addEventListener("click", function(){
		pause_btn.innerText = "Pause"
		gen_btn.innerText = "Generate Diagram"
		webgl.reset()
		webgl.tick()
	})

	var pause_btn = document.getElementById("pause")
	pause_btn.addEventListener("click", function(){
		pause_btn.innerText = "Paused"
		gen_btn.innerText = "Resume"
		pause = true
	})

	// webgl.tick()
	function update(){
		if (!pause){
			webgl.tick()
		}
		requestAnimationFrame(update)
	}
	update()
}

window.addEventListener("resize", function(){
    webgl.resize()
})
},{"./webgl_render":6}],3:[function(require,module,exports){
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
},{"./vector":4}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
    // breakpts.push(x1, x2)
    if((x1 >= h) && (x1 <= a)){
      // console.log("inner bkpt")
      breakpts.push(x2, x1)
    }
    else{
      breakpts.push(x1, x2)
    }
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
},{"./binary_search_tree":1,"./point":3,"./vector":4}],6:[function(require,module,exports){
var Voronoi = require("./voronoi")
var Point = require("./point")
var Vector = require("./vector")

//this & webgl should all be one objcet, probably.
var Context =  {
  addToDom: function(container_id, canvas_id) {
    this.canvas = document.createElement("canvas")
    this.container = document.getElementById(container_id)
    this.container.appendChild(this.canvas)

    this.canvas.setAttribute("id", canvas_id)
    this.canvas.height = this.container.clientHeight
    this.canvas.width = this.container.clientWidth
    return this
  },
  resize: function(){
    this.canvas.height = this.container.clientHeight
    this.canvas.width = this.container.clientWidth
  },
}

var WebGl = (function WebGlModule() {
  var scan = false
  var line_shader = null
  var point_shader = null

  var voronoi =  Object.create(Voronoi())
  var gl
  var element = Object.create(Context)
  function init() {
    console.log("initializing instance")
    element.addToDom(options.container_id, options.canvas_id)
    gl = element.canvas.getContext("webgl") || 
              element.canvas.getContext("experimental-webgl")
    return element
  }
  function getElement(){
    return element
  }   
  function resize() {
    element.resize()
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    draw()
  }
  function loadShaders(VERT_SRC, FRAG_SRC){
    console.log("loading shaders...")
    if (!options){
      console.log("error loading shaders")
      alert("no shaders provided!")
    }
    else{
      //Create fragment shader
      var frags = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(frags, FRAG_SRC)
      gl.compileShader(frags)
      console.log("loaded frag shader")

      //Create vertex shader
      var verts = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(verts, VERT_SRC)
      gl.compileShader(verts)
      console.log("loaded vert shader")

      //Link
      shader = gl.createProgram()
      gl.attachShader(shader, frags)
      gl.attachShader(shader, verts)
      gl.linkProgram(shader)

      return shader
    }
  }
  function startVoronoi(){
    scan = true
    draw()
  }
  function addPoint(x,y){
    if (!scan){
      voronoi.addSite(x, y, 0.0)
      draw()
    }
  }
  function tick(){
    if(scan){
      voronoi.update()
    }
    draw()
  }
  function drawBeachLine(){
    gl.useProgram(line_shader)
    var vertBuf = gl.createBuffer()
    var colorBuf = gl.createBuffer()
    var colorAL = gl.getAttribLocation(shader, "a_color")
    var posAL = gl.getAttribLocation(shader, "a_position")
    var beachBuffers = voronoi.beachlineToBuffer()

    beachBuffers.forEach(function (beachBuf){
      gl.enableVertexAttribArray(posAL)
      gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(beachBuf["lines"]), gl.STREAM_DRAW)
      gl.vertexAttribPointer(posAL, 3, gl.FLOAT, false, 0, 0)

      gl.enableVertexAttribArray(colorAL)
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(beachBuf["color"]), gl.STATIC_DRAW)
      gl.vertexAttribPointer(colorAL, 3, gl.FLOAT, false, 0, 0)
      gl.lineWidth(3)

      gl.drawArrays(gl.LINE_STRIP, 0, beachBuf["lines"].length/3)
      gl.disableVertexAttribArray(vertBuf)
      gl.disableVertexAttribArray(colorBuf)
    })
  }
  function drawSites(){
    gl.useProgram(point_shader)
    var vertBuf = gl.createBuffer()
    var colorBuf = gl.createBuffer()
    var colorAL = gl.getAttribLocation(shader, "a_color")
    var posAL = gl.getAttribLocation(shader, "a_position")

    gl.enableVertexAttribArray(posAL)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(voronoi.siteBuffer), gl.STATIC_DRAW)
    gl.vertexAttribPointer(posAL, 3, gl.FLOAT, false, 0, 0)

    gl.enableVertexAttribArray(colorAL)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(voronoi.colorBuffer), gl.STATIC_DRAW)
    gl.vertexAttribPointer(colorAL, 3, gl.FLOAT, false, 0, 0)

    //Draw the sites
    if (voronoi.siteBuffer.length > 0){
      gl.drawArrays(gl.POINTS, 0, voronoi.siteBuffer.length/3)
    }
    gl.disableVertexAttribArray(vertBuf)
    gl.disableVertexAttribArray(colorBuf)
  }
  function drawScanline(){
    gl.useProgram(line_shader)
    var vertBuf = gl.createBuffer()
    var colorBuf = gl.createBuffer()
    var colorAL = gl.getAttribLocation(shader, "a_color")
    var posAL = gl.getAttribLocation(shader, "a_position")
    var scanline = voronoi.scanlineToBuffer()["scanline"]
    var colors = voronoi.scanlineToBuffer()["colors"]

    gl.enableVertexAttribArray(posAL)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(scanline), gl.STREAM_DRAW)
    gl.vertexAttribPointer(posAL, 3, gl.FLOAT, false, 0, 0)

    gl.enableVertexAttribArray(colorAL)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
    gl.vertexAttribPointer(colorAL, 3, gl.FLOAT, false, 0, 0)
    gl.lineWidth(5)

    //Draw the scanline
    gl.drawArrays(gl.LINES, 0, 2)
    gl.disableVertexAttribArray(vertBuf)
    gl.disableVertexAttribArray(colorBuf)
  }
  function draw(){
    gl.clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    drawSites()
    if(scan){
      drawScanline()
      drawBeachLine()
    }
  }
  function reset(){
    //reset scan variable, remove all references to voronoi, and create a new one
    scan = false
    voronoi = null
    delete(voronoi)
    voronoi = Object.create(Voronoi())
    voronoi.begin()
  }

  return{
    begin: function(opts){
      if (!this.element){
        console.log("begin called")
        init()
        this.element = getElement()
      }
      point_shader = loadShaders(opts["vpt_src"], opts["fpt_src"])
      line_shader = loadShaders(opts["v_src"], opts["f_src"])
      voronoi.begin()
    },
    addPoint: addPoint,
    resize: resize,
    tick: tick,
    scan: startVoronoi,
    reset: reset,
  }
})();

module.exports = WebGl; 

},{"./point":3,"./vector":4,"./voronoi":5}]},{},[2]);
