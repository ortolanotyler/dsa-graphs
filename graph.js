class Vertex {
  constructor(data, neighbors = new Set()) {
    this.data = data;
    this.neighbors = neighbors;
  }
}

class SimpleGraph {
  constructor() {
    this.vertices = new Set();
  }

  addNode(node) {
    this.vertices.add(node);
  }

  addMultipleNodes(nodesArray) {
    nodesArray.forEach(node => this.addNode(node));
  }

  connectNodes(node1, node2) {
    node1.neighbors.add(node2);
    node2.neighbors.add(node1);
  }

  disconnectNodes(node1, node2) {
    node1.neighbors.delete(node2);
    node2.neighbors.delete(node1);
  }

  deleteNode(node) {
    this.vertices.forEach(vertex => vertex.neighbors.delete(node));
    this.vertices.delete(node);
  }

  dfsRecursive(startNode) {
    const visited = new Set();
    const traversal = [];

    function dfs(node) {
      if (!node) return;
      visited.add(node);
      traversal.push(node.data);
      node.neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) dfs(neighbor);
      });
    }

    dfs(startNode);
    return traversal;
  }

  dfsIterative(startNode) {
    const stack = [startNode];
    const visited = new Set();
    const traversal = [];
    let current;

    visited.add(startNode);

    while (stack.length) {
      current = stack.pop();
      traversal.push(current.data);

      current.neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      });
    }
    return traversal;
  }

  bfs(startNode) {
    const queue = [startNode];
    const visited = new Set();
    const traversal = [];
    let current;

    visited.add(startNode);

    while (queue.length) {
      current = queue.shift();
      traversal.push(current.data);

      current.neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return traversal;
  }

  findShortestPath(startNode, endNode) {
    if (startNode === endNode) return [startNode.data];

    let queue = [startNode];
    let visited = new Set();
    let previous = {};
    let path = [];

    while (queue.length) {
      let vertex = queue.shift();

      if (vertex === endNode) {
        let current = endNode;
        while (current !== startNode) {
          path.unshift(current.data);
          current = previous[current.data];
        }
        path.unshift(startNode.data);
        return path;
      }

      visited.add(vertex);
      vertex.neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          previous[neighbor.data] = vertex;
          queue.push(neighbor);
        }
      });
    }

    return [];
  }
}

module.exports = { SimpleGraph, Vertex };
