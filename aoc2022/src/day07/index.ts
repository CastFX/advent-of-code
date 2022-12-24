import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput: string) => rawInput

const cdRe = /\$ cd (\w+)/i
const cdBackRe = /\$ cd \.\./i
const lsRe = /\$ ls/i
const fileRe = /(\d+) (.*)/i
const dirRe = /(\w+) (.*)/i

class DirNode {
  public size: number|null;
  public name: string;
  public children: (DirNode|FileNode)[];
  public parent: DirNode|null;

  constructor(name: string, parent: DirNode|null = null, size: number|null = null, children: (DirNode|FileNode)[] = []) {
    this.name = name;
    this.parent = parent;
    this.size = size;
    this.children = children;
  }
}

class FileNode {
  size: number;

  constructor(size: number) {
    this.size = size;
  }
}

const computeSize = (root: DirNode|FileNode): number => {
  if (root instanceof FileNode) return root.size
  if (root.size) return root.size
  const size = _.sumBy(root.children, node => computeSize(node))
  root.size = size;
  return size;
}

const createDirTree = ({dirs, currentDir}: {dirs: DirNode[], currentDir: DirNode}, line: string): {dirs: DirNode[], currentDir: DirNode} => {
  if (line.match(cdRe)) {
    const [, dir] = line.match(cdRe)!
    const newDir = new DirNode(dir, currentDir);

    const existing = _.find(currentDir.children, f => f instanceof DirNode && f.name === dir);
    if (existing) return {dirs, currentDir: existing as DirNode};

    currentDir.children.push(newDir)
    return {dirs: [...dirs, newDir], currentDir: newDir}
  }

  if (line.match(cdBackRe)) return {dirs, currentDir: currentDir.parent!}


  if (line.match(fileRe)) {
    const [, size] = line.match(fileRe)!;
    const newFile = new FileNode(parseInt(size));
    currentDir.children.push(newFile)
    return {dirs, currentDir}
  }

  if (line.match(lsRe)) return {dirs, currentDir}; //ignore
  if (line.match(dirRe)) return {dirs, currentDir}; //ignore

  return {dirs, currentDir}
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')
  const root: DirNode = new DirNode('/');

  const {dirs} = input.reduce(createDirTree, {dirs: [] as DirNode[], currentDir: root})
  computeSize(root)
  return _.chain(dirs)
    .map(d => d.size!)
    .filter(s => s <= 100000)
    .sum()
    .value()
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')
  const root: DirNode = new DirNode('/');

  const {dirs} = input.reduce(createDirTree, {dirs: [] as DirNode[], currentDir: root})
  const size = computeSize(root)
  const unused = 70000000 - size;
  const sizeToDelete = 30000000 - unused;
  return _.chain(dirs)
    .sort((d1, d2) => d2.size! - d1.size!)
    .takeWhile(d => d.size! >= sizeToDelete)
    .last()
    .value()
    .size!
}

run({
  part1: {
    tests: [
      {
        input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
