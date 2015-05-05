(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var webglwrap = require("./webgl_render")
var VERT_SRC = ""
var FRAG_SRC = ""


function init (){
	console.log("init called")
	webglwrap.begin()
};

},{"./webgl_render":2}],2:[function(require,module,exports){
var Context = (function ContextModule() {
  var canvas;
  function addToDom() {
    canvas = document.createElement("canvas")
    canvas.style.position = "absolute"
    canvas.style.left = "0px"
    canvas.style.right = "0px"
    canvas.style.top = "0px"
    canvas.style.bottom = "0px"
    canvas.style.height = "100%"
    canvas.style.overflow = "hidden"
    document.body.appendChild(canvas)
    document.body.style.overflow = "hidden" //Prevent bounce
    document.body.style.height = "100%"
    return canvas
    console.log("addToDom");
  }
  function resize(){
    console.log("resize");
    var nw = canvas.clientWidth |0
    var nh = canvas.clientHeight |0
    canvas.width = nw
    canvas.height = nh
    canvas.style.width = _width + 'px'
    canvas.style.height = _height + 'px'
    shell.emit("gl-resize", nw, nh)
  }
  return{
    setup: function(){
      console.log("setup called");
      addToDom();
    },
    getCanvas: function(){
      if (!canvas){
        canvas = addToDom();
      }
      return canvas
    }
  }
})();

// var opts = {
//   greet: "hi",
//   leave: "bye"
// }

var WebGl = (function WebGlModule(options) {
  var instance;
  function init() {
    console.log("initializing instance")
    console.log(options||"no options provided... continuing with default")
    var obj = Object.create(Context)
    obj.setup();
    canvas = obj.getCanvas();
    var gl = canvas.getContext("webgl", contextOptions) || 
             canvas.getContext("experimental-webgl", contextOptions)
    //ToDo: handle an error
    return obj
  }
  function loadShaders(){
    console.log("loading shaders")
  }
  return{
    begin: function(){
      if (!instance){
        instance = init();
      }
      loadShaders();
      // return instance;
    }
  }
})();

// WebGl().begin()
// module.exports.canvasWrap = Context;
module.exports = WebGl; 


// var Singleton = (function () {
//     var instance;
 
//     function createInstance() {
//         var object = new Object("I am the instance");
//         console.log("createInstance!")
//         return object;
//     }
 
//     return {
//         // "instance": instance,
//         getInstance: function () {
//             console.log("getInstance called")
//             if (!instance) {
//                 instance = createInstance();
//             }
//             return instance;
//         }
//     };
// })();
// console.log (Singleton.instance)
// console.log(Singleton.getInstance())
// console.log (Singleton.instance)
// function run() {
 
//     var instance1 = Singleton.getInstance();
//     var instance2 = Singleton.getInstance();
 
//     console.log("Same instance? " + (instance1 === instance2));  
// }

// run()

// WebGl.init()
},{}]},{},[1]);
