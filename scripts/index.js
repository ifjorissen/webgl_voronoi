var fs = require("fs")
var webglwrap = require("./webgl_render")
var VERT_SRC = fs.readFileSync(__dirname + '/shaders/vert_shader.glsl', 'utf8')
var FRAG_SRC = fs.readFileSync(__dirname + '/shaders/frag_shader.glsl', 'utf8')
var VERTPT_SRC = fs.readFileSync(__dirname + '/shaders/vertpt_shader.glsl', 'utf8')
var FRAGPT_SRC = fs.readFileSync(__dirname + '/shaders/fragpt_shader.glsl', 'utf8')

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