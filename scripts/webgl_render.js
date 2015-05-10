var Voronoi = require("./voronoi")
var Point = require("./point")
var Vector = require("./vector")

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
  // var sites = []
  // var scolors = []
  var voronoi =  Object.create(Voronoi)
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
  function loadShaders(){
    console.log("loading shaders...")
    if (!options){
      console.log("error loading shaders")
      alert("no shaders provided!")
    }
    else{
      // var gl = this.gl
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
  function startVoronoi(){
    scan = true
    voronoi.scan()

    // voronoi.
    draw()
  }
  function addPoint(x,y){
    voronoi.addSite(x, y, 0.0)
    draw()
  }
  function tick(){
    console.log("tick")
    if(scan){
      voronoi.update()
    }
    draw()
  }
  function drawSites(){
    var vertBuf = gl.createBuffer()
    var colorBuf = gl.createBuffer()
    var colorAL = gl.getAttribLocation(shader, "a_color")
    var posAL = gl.getAttribLocation(shader, "a_position")
    console.log(voronoi.siteBuffer)

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
    gl.lineWidth(10)
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
    }
    console.log("draw called")
  }

  //to do: reset function
  return{
    begin: function(opts){
      if (!this.element){
        console.log("begin called")
        init()
        this.element = getElement()
      }
      loadShaders()
      voronoi.begin()
    },
    addPoint: addPoint,
    resize: resize,
    tick: tick,
    scan: startVoronoi,
  }
})();

module.exports = WebGl; 
