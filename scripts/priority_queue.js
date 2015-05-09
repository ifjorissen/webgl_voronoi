/*
  Sites from the voronoi get added to a prioroty queue based on the y-coordinate
*/

var Node = {
	init: function(val){
		// this.key = key
		this.val = val
		this.left = null
		this.right = null
	}
}

var PriorityQueue = (function(){
	function init(val){
		this.head = val
	},
	function swap(){

	}
	function add(node, pnode, val){
		if (node.left === null){
			var newnode = Object.create(Node)
			newnode.init(val)
			node.left = newnode
		}
		else if(node.right === null){
			var newnode = Object.create(Node)
			newnode.init(val)
			node.right = newnode
		}
		else{
			if(pnode !== null && pnode.right !== null){

			}

		}
	},
	function remove(node){
		if (node.right !== null){
			node.right.left = node.left
		}
	}
	function pop(){
		var max = remove(this.head)
		return max
	}
	function isEmpty(){

	}
	return{
		isEmpty: isEmpty,
		push: function(){
			add()
			swap()
		},
		pop: pop,
		init: init
	}

})()