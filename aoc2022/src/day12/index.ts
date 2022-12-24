import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput: string) => rawInput

type Vertex = {
  elevation: number
  distanceFromStart: number, //from start
  previous: Vertex|null,
  isEnd: boolean,
  i: number,
  j: number,
}

type Edge = {
  from: Vertex
  to: Vertex
}

const createVertex = (elevation: string, i: number, j: number): Vertex => {
  const isStart = elevation === 'S'
  const isEnd = elevation === 'E'
  if (isEnd) elevation = 'z'
  else if (isStart) elevation = 'a'
  return {
    elevation: elevation.charCodeAt(0) - 97,
    distanceFromStart: isStart ? 0 : Infinity,
    previous: null,
    isEnd,
    i: i,
    j: j
  }
}


const reachableByElevation = (from: Vertex, to: Vertex) =>
  to.elevation - from.elevation <= 1;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(line => line.split(''))
  const vertexes: Vertex[][] = input.map((line, i) => line.map((v, j) => createVertex(v, i, j)))

  const isInMap = ({i, j}: {i: number, j: number}) => {
    return i >= 0 && j >= 0 && i < vertexes.length && j < vertexes[0].length;
  }

  const edges: Edge[] = _.chain(vertexes)
    .flatMap((line, i) =>
      line.flatMap((v, j) =>[
        {i: i, j: j + 1},
        {i: i + 1, j: j},
        {i: i, j: j -1},
        {i: i - 1, j: j},
      ]
      .filter(isInMap)
      .map(({i, j}) => vertexes[i][j])
      .filter(v1 => reachableByElevation(v, v1))
      .map(v1 => ({from: v, to: v1}))
    )
  )
  // .uniqWith((e1: Edge, e2: Edge) => e1.from === e2.to && e1.to === e2.from)
  .value()

  let nodes = vertexes.flat();
  const end: Vertex = nodes.find(n => n.isEnd)!;

  const extractSmallest = (nodes: Vertex[]): Vertex => {
    const vertex: Vertex = _.minBy(nodes, "distanceFromStart")!;
    nodes.splice(nodes.indexOf(vertex), 1)
    return vertex;
  }

  const adjacentRemainingNodes = (node: Vertex, nodes: Vertex[], edges: Edge[]): Vertex[] => {
    return _.chain(edges)
      .flatMap(e => {
        if (e.from === node) return [e.to];
        // if (e.to === node) return [e.from];
        return []
      })
      .uniq()
      .filter(node => nodes.includes(node))
      .value();
  }

  while(nodes.length > 0) {
    const smallest: Vertex = extractSmallest(nodes);
    const adjacentNodes: Vertex[] = adjacentRemainingNodes(smallest, nodes, edges);
    if (smallest === end) return smallest.distanceFromStart;

    adjacentNodes.forEach(n => {
      const distance = 1 + smallest.distanceFromStart;
      if (distance < n.distanceFromStart) {
        n.distanceFromStart = distance;
        n.previous = smallest;
      }
    })
  }

  printSolution(end);

  return end.distanceFromStart;
}

const printSolution = (v: Vertex|null): void => {
  if (!v) return;
  printSolution(v.previous);
  console.log(v.i, v.j);
}


const createVertex2 = (elevation: string, i: number, j: number): Vertex => {
  const isStart = elevation === 'E'
  const isEnd = elevation === 'a' || elevation === 'S'
  if (isEnd) elevation = 'a'
  else if (isStart) elevation = 'z'
  return {
    elevation: 122 -  elevation.charCodeAt(0),
    distanceFromStart: isStart ? 0 : Infinity,
    previous: null,
    isEnd,
    i: i,
    j: j
  }
}


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(line => line.split(''))
  const vertexes: Vertex[][] = input.map((line, i) => line.map((v, j) => createVertex2(v, i, j)))

  const isInMap = ({i, j}: {i: number, j: number}) => {
    return i >= 0 && j >= 0 && i < vertexes.length && j < vertexes[0].length;
  }

  const edges: Edge[] = _.chain(vertexes)
    .flatMap((line, i) =>
      line.flatMap((v, j) =>[
        {i: i, j: j + 1},
        {i: i + 1, j: j},
        {i: i, j: j -1},
        {i: i - 1, j: j},
      ]
      .filter(isInMap)
      .map(({i, j}) => vertexes[i][j])
      .filter(v1 => reachableByElevation(v, v1))
      .map(v1 => ({from: v, to: v1}))
    )
  )
  // .uniqWith((e1: Edge, e2: Edge) => e1.from === e2.to && e1.to === e2.from)
  .value()

  let nodes = vertexes.flat();
  const extractSmallest = (nodes: Vertex[]): Vertex => {
    const vertex: Vertex = _.minBy(nodes, "distanceFromStart")!;
    nodes.splice(nodes.indexOf(vertex), 1)
    return vertex;
  }

  const adjacentRemainingNodes = (node: Vertex, nodes: Vertex[], edges: Edge[]): Vertex[] => {
    return _.chain(edges)
      .flatMap(e => {
        if (e.from === node) return [e.to];
        // if (e.to === node) return [e.from];
        return []
      })
      .uniq()
      .filter(node => nodes.includes(node))
      .value();
  }

  let end: Vertex|null = null;
  while(nodes.length > 0 && !end) {
    const smallest: Vertex = extractSmallest(nodes);
    const adjacentNodes: Vertex[] = adjacentRemainingNodes(smallest, nodes, edges);

    adjacentNodes.forEach(n => {
      const distance = 1 + smallest.distanceFromStart;
      if (distance < n.distanceFromStart) {
        n.distanceFromStart = distance;
        n.previous = smallest;
      }
    })
  }

  return _.chain(vertexes)
    .flatten()
    .filter(v => v.elevation === 25)
    .map(v => v.distanceFromStart)
    .min()
    .value();
}

run({
  part1: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
