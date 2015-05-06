var Context =  {
  addToDom: function(container_id, canvas_id) {
    this.canvas = document.createElement("canvas")
    this.container = document.getElementById(container_id)
    this.container.appendChild(this.canvas)

    this.canvas.setAttribute("id", canvas_id)
    this.canvas.height = this.container.clientHeight
    this.canvas.width = this.container.clientWidth
    console.log(this)
    return this
  },
  resize: function(){
    this.canvas.height = this.container.clientHeight
    this.canvas.width = this.container.clientWidth
  },
}

// WebGL = Object.create(Context)

var WebGl = (function WebGlModule() {
  function init() {
    console.log("initializing instance")
    // console.log(options||"no options provided... continuing with default")
    this.element = Object.create(Context)
    this.element.addToDom(options.container_id, options.canvas_id)
    console.log(this.element)
    this.gl = element.canvas.getContext("webgl") || 
         element.canvas.getContext("experimental-webgl")
    //ToDo: handle an error
  }
  function getGL () {
    return this.gl
  }
  function getElement(){
    return this.element
  }  
  function resize() {
    element.resize()
    gl.viewport(0, 0, (element.canvas.width)|0, (element.canvas.height)|0)
    console.log("resize called")
    draw()
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
  function addPoint(x,y){
    if (!this.points){
      this.points = []
      this.colors = []
    }
    this.points.push(x)
    this.points.push(y)
    this.points.push(0.0)

    this.colors.push(Math.random())
    this.colors.push(Math.random())
    this.colors.push(Math.random())

    draw(this.points, this.colors)
  }
  function draw(points, colors){
    console.log("draw called")
    var vertBuf = gl.createBuffer()
    var colorBuf = gl.createBuffer()
    var colorAL = gl.getAttribLocation(shader, "a_color")
    var posAL = gl.getAttribLocation(shader, "a_position")

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enableVertexAttribArray(posAL)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STREAM_DRAW)
    gl.vertexAttribPointer(posAL, 3, gl.FLOAT, false, 0, 0)

    gl.enableVertexAttribArray(colorAL)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
    gl.vertexAttribPointer(colorAL, 3, gl.FLOAT, false, 0, 0)

    //Draw the points
    gl.drawArrays(gl.POINTS, 0, points.length/3)
    gl.disableVertexAttribArray(vertBuf)
    gl.disableVertexAttribArray(colorBuf)
  }
  return{
    begin: function(opts){
      if (!this.element){
        init();
        this.element = getElement()
        if (!this.gl){
          this.gl = getGL()
        }
      }
      loadShaders();
    },
    addPoint: addPoint,
    draw: draw,
    resize: resize,
  }
});

module.exports = WebGl; 
