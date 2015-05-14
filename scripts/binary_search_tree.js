var Node = {
	init: function(pnode, val){
		// this.key = key
		this.parent = pnode
		this.val = val
		this.breakpts = null
		this.left = null
		this.right = null
	}
}


var BinarySearchTree = (function(){
	function init(val){
		var newnode = Object.create(Node)
		newnode.init(null, val)
		return newnode
	}
	/*
	Searches for the node at an expected value
	*/
	function searchVal(node, val){
		console.log("search")
		console.log(node)
		if (node == null){
			return null
		}
		else{
			console.log("else search")
			console.log(node)
			console.log(val)
			if(val === node.val){
				return node
			}
			else{
				if (val.focus.x <= node.val.focus.x){
					console.log("not eq less")
					return searchVal(node.left, val)
				}
				else{
					console.log("not eq more")
					console.log(node)
					console.log(val)
					return searchVal(node.right, val)
				}
			}
		}
	}
	function isLeaf(node){
		if ((node.left===null) && (node.right===null)){
			return true
		} 
		else{
			return false
		}
	}
	function insertV(pnode, node, val){
		if (node === null){
			var newnode = Object.create(Node)
			newnode.init(pnode, val)
			return newnode
		}
		else{
			//replace this leaf with a 3 node subtree
			//if the site is to the left of the node's site, we need to check its right 
			//breakpoint with the nodes left breakpoint and update it (there's more to this)
			if(isLeaf(node)){
				if (node.parent !== null){
					var breakr = node.parent.val[1][1]
					var breakl = node.parent.val[1][0]
				}
				else{
					var breakr = 1.0
					var breakl = -1.0
				}
				// console.log("at a leaf!")
				//make a new node that has the breakpoints in them
				//add the two children
				// if (val.focus.x <= node.val.focus.x){
				var valbpts = val.intersect(node.val)
				var nodebpts = [valbpts[0], breakr]
				var breakpts = [valbpts, nodebpts]
				
				//the breakpoints for node's left and new beach's right
				// node.val.bright = tmp[0]
				// var nodebpt = [node.val.bleft, node.val.bright]
				var newnode = Object.create(Node)
				var sites = [val, node.val]
				newnode.init(node, sites)
				newnode.breakpts = breakpts
				node.right = newnode

				//insert the old
				node.right.left = insertV(node.right, node.right.left, val)
				node.right.right = insertV(node.right, node.right.right, node.val)
			// }
			//the arc we want to add should be on the right
			// else if (val.focus.x > node.val.focus.x){
				// node.val.intersect(val)
				node.left = insertV(node, node.left, node.val)
				// }
				// else{
				// 	console.log("what")
				// }

				//the breakpoints for the nodes right and the beach's left
				// console.log(node.val)
				var nvalbpts = [breakl, valbpts[0]]
				var nvalsites = [node.val, val]
				node.val = nvalsites
				node.breakpts = [nvalbpts, valbpts]
			}
			//we're not at a leaf yet, keep traversing
			else{
				// console.log("not at a leaf i suppose")
				//right breakpoint of the left arc at this inner node
				//left breakpoint of the right arc at this inner node
				// these should be equal
				var bptRArcLeft = node.breakpts[0][1] //the right breakpoint of the left arc
				var bptLArcRight = node.breakpts[1][0] //the left breakpoint of the right arc

				//the site we're trying to insert is left of the breakpoint
				if (val.focus.x <= bptLArcRight){
					// console.log("less " + node.val[0])
					// console.log(node)
					node.left = insertV(node, node.left, val)
				}

				//the site we're inserting is to the right of the breakpoint
				else{
					// console.log("more " + node.breakpts[0])
					// console.log(node)
					node.right = insertV(node, node.right, val)
				}
				// console.log(node)
			}
			return node
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
	// function getLeftSiblingLeaf(node){
	// 	if (node.parent !== null){
	// 		if(node.parent.left === node){
	// 			//we need to keep going up until we find a leaf
	// 			getLeftSibling(node.parent)
	// 		}
	// 		else{
	// 			var cur = node.parent.left
	// 		}
	// 	}
	// }
	function update(buffer, pnode, site){
		//traverse the binary tree, updating breakpoints and returning the buffer
		//if we're at a leaf, we want to check the intersection 
		if (pnode !== null){
			//this is a left child node
			console.log(pnode)
			if(pnode.val[0] === site){
				lArc = pnode.val[0]
				rArc = pnode.val[1]
				var nbpts = lArc.intersect(rArc)
				//update right breakpoint of left arc
				pnode.breakpts[0][1] = nbpts[0]

				//update left & right breakpoints of right arc
				pnode.breakpts[1][0] = nbpts[0]
				pnode.breakpts[1][1] = nbpts[1]

				console.log("pushing into buffer " + lArc.focus.x)
				var lArcBuf = lArc.update(pnode.breakpts[0][0], pnode.breakpts[0][1])
				buffer.push(lArcBuf)
				//update the right sibling
				update(buffer, pnode, pnode.val[1])
			}
			//this is a right child node, so we need to find its right sibling 
			else{
				console.log("going to update with parent node")
				console.log(buffer)
				console.log(pnode)
				if (!isLeaf(pnode.right)){
					// console.log(this.root)
					var rnodeLeaf = searchVal(pnode, pnode.val[1])
					console.log("not a leaf")
					console.log(rnodeLeaf)
					update(buffer, rnodeLeaf.parent, rnodeLeaf.val)
				}
				else{
					console.log("a leaf")
					update(buffer, pnode.parent, pnode.val[1])
				}
				// update(buffer, pnode, pnode.val[1])
				// var cur = pnode
				// while ((cur.parent !== null) && (cur.parent.val[0] !== node.val)){
				// 	cur = cur.parent
				// }
				// console.log(cur)
			}
		}
		else{
			if (site != null){
				console.log("inner site")
				console.log(site)
				var arcBuf = site.update(-1.0, 1.0)
				console.log("pushing into buffer " + site.focus.x)
				buffer.push(arcBuf)
			}
			console.log("no parent")
			console.log(buffer)
			return buffer
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
	}
	function postOrder(node){
		if(node !== null){
			outputTree(node.left)
			outputTree(node.right) 
		}
	}
	return{
		init: function(val){
			this.root = init(val)
		},
		searchVal: function(val){
			var res = search(this.root, val)
			return res
		},
		insert: function(val){
			if (this.root == null){
				this.root = init(val)
			}
			else{
				insertV(null, this.root, val)
			}
		},
		// root: this.root,
		toBuffer: function(){
			var cur = this.root
			var buf = []
			while ((cur != null) && (cur.left !== null)){
				cur = cur.left
			}
			buf = update([], cur.parent, cur.val)
			console.log("bufff")
			console.log(this.root)
			return buf
		},
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