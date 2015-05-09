var Node = {
	init: function(val){
		// this.key = key
		this.val = val
		this.left = null
		this.right = null
	}
}


var BinarySearchTree = (function(){
	function init(val){
		var newnode = Object.create(Node)
		newnode.init(val) 
		this.root = newnode
	}
	function search(node, val){
		console.log("search")
		if (node === null){
			return null
		}
		else{
			if(val === node.val){
				console.log("!")
				return node
			}
			else{
				if (val <= node.val){
					return search(node.left, val)
				}
				else{
					return search(node.right, val)
				}
			}
		}
	}
	function insert(node, val){
		console.log("insert " + val)
		if (node === null){
			var newnode = Object.create(Node)
			newnode.init(val)
			return newnode
		}
		else{
			if (val <= node.val){
				node.left = insert(node.left, val)
			}
			else{
				node.right = insert(node.right, val)
			}
			return node
		}
	}
	function outputTree(node){
		if (node.left !== null){
			outputTree(node.left)
		}
		if (node.right !== null){
			outputTree(node.right)
		}
		console.log(" " + node.val + " ")
	}
	function postOrder(node){
		if(node !== null){
			outputTree(node.left)
			outputTree(node.right)
			console.log(node.val); 
		}
	}
	return{
		init: init,
		search: function(val){
			var res = search(this.root, val)
			return res
		},
		insert: function(val){
			console.log("yuh")
			console.log(this.root)
			insert(this.root, val)
		},
		root: this.root,
		postOrder: function(){
			console.log("postOrder")
			console.log(this.root)
			postOrder(this.root)
		}
	}
})();


//"Tests"
// var nodes = []
// var n1 = Object.create(Node)
// n1.init(1)
// var n2 = Object.create(Node)
// n2.init(2)
// var n3 = Object.create(Node)
// n3.init(3)
// var n4 = Object.create(Node)
// n4.init(4)
// var n5 = Object.create(Node)
// n5.init(5)


var bst = Object.create(BinarySearchTree)
bst.init(10)
bst.insert(5)
bst.insert(12)
bst.insert(1)
bst.insert(8)
bst.postOrder(bst.root)
var s = bst.search(7)
console.log(s)
console.log(bst.root)

module.exports = {
	"Node": Node,
	"BinarySearchTree": BinarySearchTree
}