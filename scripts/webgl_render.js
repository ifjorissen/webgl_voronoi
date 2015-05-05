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

var WebGl = (function WebGlModule(options) {
  var ctx;
  function init() {
    console.log("initializing instance")
    console.log(options||"no options provided... continuing with default")
    var obj = Object.create(Context)
    obj.setup();
    canvas = obj.getCanvas();
    var gl = canvas.getContext("webgl") || 
             canvas.getContext("experimental-webgl")
    //ToDo: handle an error
    return obj
  }
  function loadShaders(){
    console.log(ctx)
    console.log("loading shaders")
  }
  return{
    begin: function(){
      if (!ctx){
        ctx = init();
      }
      loadShaders();
    }
  }
})();

module.exports = WebGl; 
