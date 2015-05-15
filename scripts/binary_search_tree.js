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
	var root = Object.create(Node)
	var beachLineBuffer = []

	function init(val){
		root.init(null, val)
	}
	/*
	SearchVal: given a start node and a val, searches the appropriate subtree(s) and returns 
	the node associated with that value (if there is one) I BROKE THIS
	*/
	function searchVal(node, val){
		console.log("search")
		console.log(node)
		if (node == null){
			return null
		}
		else{
			if(val === node.val){
				return node
			}
			else{
				if(isLeaf(node)){
					console.log("this is a leaf tho")
				}
				if (val.focus.x <= node.breakpts[1][0]){
					console.log("not eq less")
					console.log("not eq less")
					console.log(node.breakpts)
					console.log(node.val[0].focus.x)
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
	/*
		Checks to see if a given node is a leaf
	*/
	function isLeaf(node){
		if ((node.left===null) && (node.right===null)){
			return true
		} 
		else{
			return false
		}
	}
	/*
		Inserts a value into the BST based off of the stored breakpoints in the internal nodes
	*/
	function insertV(pnode, node, val){
		if (node === null){
			var newnode = Object.create(Node)
			newnode.init(pnode, val)
			return newnode
		}
		else{
			/*
				replace this leaf with a 3 node subtree
			  if the site is to the left of the node's site, we need to check its right 
		    breakpoint with the nodes left breakpoint and update it (there's more to this)
		  */
			if(isLeaf(node)){
				if (node.parent !== null){
					var breakr = node.parent.val[1][1]
					var breakl = node.parent.val[1][0]
				}
				else{
					var breakr = 1.0
					var breakl = -1.0
				}
				//make a new node that has the breakpoints in them
				//add the two children
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

				//the arc we want to add should be on the right
				// else if (val.focus.x > node.val.focus.x){
				// node.val.intersect(val)
				node.left = insertV(node, node.left, node.val)


				//the breakpoints for the nodes right and the beach's left
				// console.log(node.val)
				var nvalbpts = [breakl, valbpts[0]]
				var nvalsites = [node.val, val]
				node.val = nvalsites
				node.breakpts = [nvalbpts, valbpts]
			}
			//we're not at a leaf yet, keep traversing
			else{
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
	function update(node){
		if(!isLeaf(node)){
			lArc = node.val[0]
			rArc = node.val[1]
			var nbpts = lArc.intersect(rArc)

			//update right breakpoint of left arc
			node.breakpts[0][1] = nbpts[0]

			//update left & right breakpoints of right arc
			node.breakpts[1][0] = nbpts[0]
			node.breakpts[1][1] = nbpts[1]
			update(node.left)
			update(node.right)
		}
		else{
			var arcBuf = []
			if(node.parent !== null){
				//if it's a left node draw this
				if(node.val == node.parent.val[0]){
					arcBuf = node.val.update(node.parent.breakpts[0][0], node.parent.breakpts[0][1])
				}
				//if its a right node draw this
				else{
					arcBuf = node.val.update(node.parent.breakpts[1][0], node.parent.breakpts[1][1])
				}
			}
			else{
				arcBuf = node.val.update(-1.0, 1.0)
			}
			beachLineBuffer.push(arcBuf)
			// console.log(buffer)
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
			console.log(init)
			init(val)
			console.log(root)
			this.root = root
		},
		searchVal: function(val){
			var res = search(this.root, val)
			return res
		},
		insert: function(val){
			if (this.root == null){
				init(val)
				this.root = root
			}
			else{
				insertV(null, this.root, val)
			}
		},
		toBuffer: function(){
			var cur = this.root
			while ((cur != null) && (cur.left !== null)){
				cur = cur.left
			}
			beachLineBuffer = []
			update(this.root)
			return beachLineBuffer
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