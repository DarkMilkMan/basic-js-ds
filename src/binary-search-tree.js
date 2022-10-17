const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data){
    this.data = data;
    this.left = null;
    this.right = null;
  }
}


class BinarySearchTree {
  constructor(){
    this.rooot = null;
  }
  
  root() {
    return this.rooot;
  }  

  add(data) {
    const newNode = new Node(data);
    if (!this.rooot){
      this.rooot = newNode;
      return;
    }
    let currentNode = this.rooot;
    while (currentNode){
      if (newNode.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  
  preorder(node, callback){
      if(!node){
          return;
      }
      if(callback){
        callback(node);
      }
      this.preorder(node.left, callback);
      this.preorder(node.right, callback);
  }

  inorder(node, callback){
    if(!node){
      return;
    }    
    this.preorder(node.left, callback);
    if(callback){
      callback(node);
    }
    this.preorder(node.right, callback);
  }

  postorder(node, callback){
    if(!node){
      return;
    }
    this.preorder(node.left, callback);
    this.preorder(node.right, callback);
    if(callback){
      callback(node);
    }
  }

  traverseDFS(callback, method){
      if (method = 'preorder'){
          return this.preorder(this.rooot, callback);
      }

      if (method = 'inorder'){
          return this.inorder(this.rooot, callback);
      }
      
      return this.postorder(this.rooot, callback);
  }

  has(data) {
    let arr = [];
    let result = false;
    this.traverseDFS((node) => {
        arr.push(node.data)
        
    }, 'preorder')
    arr.forEach(elem => {
      
        if(elem == data){
            result = true;
        }            
    });
    return result;
  }

  find(data) {
    const findNode = new Node(data);
    let currentNode = this.rooot;
    while (currentNode){
      if (findNode.data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (findNode.data > currentNode.data) {
        currentNode = currentNode.right;
      } else if (findNode.data == currentNode.data){
        return currentNode;
      }
    }
    return null;
  }

  remove(data) {
    this.traverseDFS((node) => {
        if (node.data == data ) {
          node.data = null
        }    
    }, 'preorder')
  }

  min() {
    let arr = [];
    let min = 0;
    this.traverseDFS((node) => {
      if(node.data !== null){
        arr.push(node.data); 
      }      
    }, 'preorder')
    min = Math.min(...arr)
    return min;
  }

  max() {
    let arr = [];
    let max = 0;
    this.traverseDFS((node) => {
      arr.push(node.data); 
    }, 'preorder')
    max = Math.max(...arr)
    return max;
  }

}

const tree = new BinarySearchTree();
tree.add(9);
tree.add(14);
tree.add(54);
tree.add(2);
tree.add(6);
tree.add(8);
tree.add(31);
tree.add(1);
tree.remove(6);
tree.remove(2);

tree.min();


module.exports = {
  BinarySearchTree
};