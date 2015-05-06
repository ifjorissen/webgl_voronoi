var fs = require("fs")
var webglwrap = require("./webgl_render")
var VERT_SRC = fs.readFileSync(__dirname + '/shaders/vert_shader.glsl', 'utf8')
var FRAG_SRC = fs.readFileSync(__dirname + '/shaders/frag_shader.glsl', 'utf8')

var webgl = webglwrap()
console.log(webgl)

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

	// webgl.draw()
	canvas.addEventListener("click", function getXY(e){
		var x = e.x - canvas.offsetLeft
		x = (x - canvas.width / 2) / (canvas.width / 2);
		var y = e.y - canvas.offsetTop
		y = (canvas.height / 2 - y) / (canvas.height / 2);
		console.log("clicked x: " + x + " y: " + y)
		webgl.addPoint(x,y)
	})
}


window.addEventListener("resize", function(){
    webgl.resize()
})