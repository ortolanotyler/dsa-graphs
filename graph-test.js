const { SimpleGraph, Vertex } = require("./graph");

describe("Graph Operations", function() {
  describe("Method: addNode", function() {
    test("adds a vertex to the graph", function() {
      let graph = new SimpleGraph();
      let vertexA = new Vertex("A");
      let vertexB = new Vertex("B");
      let vertexC = new Vertex("C");

      graph.addNode(vertexA);
      graph.addNode(vertexB);
      graph.addNode(vertexC);

      expect(graph.vertices.has(vertexA)).toBe(true);
      expect(graph.vertices.has(vertexB)).toBe(true);
      expect(graph.vertices.has(vertexC)).toBe(true);
    });
  });

  describe("Method: addMultipleNodes", function() {
    test("adds multiple vertices to the graph", function() {
      let graph = new SimpleGraph();
      let vertices = [new Vertex("A"), new Vertex("B"), new Vertex("C")];

      graph.addMultipleNodes(vertices);

      vertices.forEach(vertex => {
        expect(graph.vertices.has(vertex)).toBe(true);
      });
    });
  });

  describe("Method: connectNodes", function() {
    test("connects two nodes", function() {
      let graph = new SimpleGraph();
      let vertexA = new Vertex("A");
      let vertexB = new Vertex("B");

      graph.addMultipleNodes([vertexA, vertexB]);
      graph.connectNodes(vertexA, vertexB);

      expect(vertexA.neighbors.has(vertexB)).toBe(true);
      expect(vertexB.neighbors.has(vertexA)).toBe(true);
    });
  });

  describe("Method: disconnectNodes", function() {
    test("removes connection between two nodes", function() {
      let graph = new SimpleGraph();
      let vertexA = new Vertex("A");
      let vertexB = new Vertex("B");

      graph.addMultipleNodes([vertexA, vertexB]);
      graph.connectNodes(vertexA, vertexB);
      graph.disconnectNodes(vertexA, vertexB);

      expect(vertexA.neighbors.has(vertexB)).toBe(false);
      expect(vertexB.neighbors.has(vertexA)).toBe(false);
    });
  });

  describe("Method: deleteNode", function() {
    test("deletes a vertex and its connections", function() {
      let graph = new SimpleGraph();
      let vertexA = new Vertex("A");
      let vertexB = new Vertex("B");
      let vertexC = new Vertex("C");

      graph.addMultipleNodes([vertexA, vertexB, vertexC]);
      graph.connectNodes(vertexA, vertexB);
      graph.connectNodes(vertexB, vertexC);
      graph.deleteNode(vertexB);

      expect(graph.vertices.has(vertexB)).toBe(false);
      expect(vertexA.neighbors.has(vertexB)).toBe(false);
      expect(vertexC.neighbors.has(vertexB)).toBe(false);
    });
  });

  // Tests for DFS and BFS can be similarly structured.
});
