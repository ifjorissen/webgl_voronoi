var fs = require("fs")
var webglwrap = require("./webgl_render")
var VERT_SRC = fs.readFileSync(__dirname + '/shaders/vert_shader.glsl', 'utf8')
var FRAG_SRC = fs.readFileSync(__dirname + '/shaders/frag_shader.glsl', 'utf8')

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
           return window.setTimeout(callback, 1000/10);
         };
})();

window.onload = function init (){
	console.log("init called")
	options = {
		v_src: VERT_SRC,
		f_src: FRAG_SRC,
		container_id: "voronoi-wrapper",
		canvas_id: "voronoi",
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

	var gen_btn = document.getElementById("generate")
	gen_btn.addEventListener("click", function(){
		console.log("start diagram generation")
		gen_btn.innerText = "Generating Diagram ...."
		webgl.scan()
	})

	var reset_btn = document.getElementById("reset")
	reset_btn.addEventListener("click", function(){
		console.log("should reset")
	})

	webgl.tick()
	// function update(){
	// 	console.log("update")
	// 	webgl.tick()
	// 	requestAnimationFrame(update)
	// }
	// update()
}

window.addEventListener("resize", function(){
    webgl.resize()
})