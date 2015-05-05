var Context = (function ContextModule() {
  var canvas;
  function addToDom() {
    canvas = document.createElement("canvas")
    canvas.style.position = "absolute"
    canvas.style.left = "0px"
    canvas.style.top = "0px"
    canvas.style.height = "100%"
    canvas.style.width = "100%"
    canvas.style.overflow = "hidden"
    document.body.appendChild(canvas)
    document.body.style.overflow = "hidden" //Prevent bounce
    // document.body.style.height = "100%"
    // document.body.style.width = "100%"
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    return canvas
  }
  function resize(){
    console.log("resize");
    var nw = canvas.clientWidth |0
    var nh = canvas.clientHeight |0
    canvas.width = nw
    canvas.height = nh
    canvas.style.width = nw + 'px'
    canvas.style.height = nh + 'px'
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
});

var WebGl = (function WebGlModule() {
  var gl;
  var options;

  function init() {
    console.log("initializing instance")
    console.log(options||"no options provided... continuing with default")
    var obj = Object.create(Context())
    obj.setup()
    var canvas = obj.getCanvas();
    var gl = canvas.getContext("webgl") || 
             canvas.getContext("experimental-webgl")
    //ToDo: handle an error
    return gl
  }
  function loadShaders(){
    console.log("loading shaders...")
    if (!options){
      console.log("error loading shaders")
    }
    else{
      var FRAG_SRC = options.f_src
      var VERT_SRC = options.v_src

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
      gl.useProgram(shader)
    }
  }
  function draw(){
    console.log("draw called")
    var vertBuf = gl.createBuffer()
    var colorBuf = gl.createBuffer()
    var colorAL = gl.getAttribLocation(shader, "a_color")
    var posAL = gl.getAttribLocation(shader, "a_position")

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enableVertexAttribArray(posAL)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0,0.0,0.0]), gl.STREAM_DRAW)
    gl.vertexAttribPointer(posAL, 3, gl.FLOAT, false, 0, 0)

    gl.enableVertexAttribArray(colorAL)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.3451, 1.0, 0.5450]), gl.STATIC_DRAW)
    gl.vertexAttribPointer(colorAL, 3, gl.FLOAT, false, 0, 0)

    //Draw the points
    gl.drawArrays(gl.POINTS, 0, 1)
    gl.disableVertexAttribArray(vertBuf)
    gl.disableVertexAttribArray(colorBuf)
  }
  return{
    gl: gl,
    begin: function(opts){
      options = opts
      if (!gl){
        gl = init();
      }
      loadShaders();
    },
    draw: draw,
  }
});

module.exports = WebGl; 
