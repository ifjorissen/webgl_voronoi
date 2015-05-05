var fs = require("fs")
var webglwrap = require("./webgl_render")
var VERT_SRC = fs.readFileSync(__dirname + '/shaders/vert_shader.glsl', 'utf8')
var FRAG_SRC = fs.readFileSync(__dirname + '/shaders/frag_shader.glsl', 'utf8')


window.onload = function init (){
	console.log("init called")
	console.log(webglwrap)
	webglwrap.begin()
};
