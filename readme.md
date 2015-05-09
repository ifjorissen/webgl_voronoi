##Voronoi WebGL

###What this is:
A webgl visualization of a voronoi diagram as it is generated by Fortune's algorithm.

###Code Structure:
The structure of this code is loosely based off of two books on Javascript from the series You Don't Know Javascript. The primiary influence comes from the book This & Object Prototypes, which eschews object (or class/inheritance-based design patterns) in favor of a pattern referred to as Objects Linked to Other Objects (OLOO). OLOO emphasizes behavior delegation and illustrates how a sort of object heirarchy can be created without using "pseudo"-classes or object prototypes. MORE ON THIS

In this project specifically, the main file is index.js. The brunt of the webgl work (buffers, context-getting) is done in webgl_render.js.  The webgl singleton has an object called voronoi which 


To run:
`npm install`
`node beefy.js`

point your browser to localhost:9966

