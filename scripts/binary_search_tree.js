var Node = {
	init: function(pnode, key, val){
		this.key = key
		this.parent = pnode
		this.val = val
		this.left = null
		this.right = null
	}
}


var BinarySearchTree = (function(){
	function init(key, val){
		var newnode = Object.create(Node)
		newnode.init(null, key, val) 
		return newnode
	}
	/*
	Searches for the node at an expected value
	*/
	function searchVal(node, val){
		console.log("search")
		if (node === null){
			return null
		}
		else{
			if(val === node.val){
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
	// function searchRange(node, val){
	// 	if(node.val === val){
	// 		return node
	// 	}
	// 	else{
	// 	}
	// }
	function isLeaf(node){
		if ((node.left===null) && (node.right===null)){
			return true
		} 
		else{
			return false
		}
	}
	function insert(pnode, node, key, val){
		if (node === null){
			console.log(pnode)
			var newnode = Object.create(Node)
			newnode.init(pnode, key, val)
			console.log(newnode)
			return newnode
		}
		else{

			if (val <= node.val){
				console.log("less " + node.val)
				// console.log(node)
				node.left = insert(node, node.left, key, val)
			}
			else{
				console.log("more " + node.val)
				// console.log(node)
				node.right = insert(node, node.right, key, val)
			}
			console.log(node)
			return node
		}
	}
	function remove(val){
		
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
		}
	}
	// function getLeaves(){

	// }
	return{
		init: function(key, val){
			this.root = init(key, val)
		},
		searchVal: function(val){
			var res = search(this.root, val)
			return res
		},
		insert: function(key, val){
			if (this.root == null){
				this.root = init(key, val)
			}
			else{
				insert(null, this.root, key, val)
			}
		},
		root: this.root,
		isLeaf: isLeaf
		// postOrder: function(){
		// 	console.log("postOrder")
		// 	postOrder(this.root)
		// },
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


// var bst = Object.create(BinarySearchTree)
// bst.init('a', 10)
// bst.insert('b', 5)
// bst.insert('c', 12)
// bst.insert('d', 1)
// bst.insert('e', 8)
// console.log(bst)
// bst.postOrder(bst.root)
// var s = bst.search(7)
// console.log(s)
// console.log(bst.root)

module.exports = {
	"Node": Node,
	"BinarySearchTree": BinarySearchTree
}