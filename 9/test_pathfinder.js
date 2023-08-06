const findPaths = require('./pathfinder').findPaths;
const DFS_RECURSIVE = require('./pathfinder').DFS_RECURSIVE;
const DFS_ITERATIVE = require('./pathfinder').DFS_ITERATIVE;

const testCases = [
    {
        name: "test1",
        test: () => {
            const w = 3;
            const h = 3;
            const start = { x: 0, y: 0 };
            const goal = { x: 1, y: 2 };
            const nonsteppables = [];
            const result_paths = findPaths(w, h, start, goal, nonsteppables, DFS_RECURSIVE);
            console.log(result_paths);
            console.log(result_paths.length);
        }
    },
    {
        name: "test2",
        test: () => {
            const w = 3;
            const h = 3;
            const start = { x: 0, y: 0 };
            const goal = { x: 1, y: 2 };
            const nonsteppables = [
                { x: 1, y: 1 },
            ];
            const result_paths = findPaths(w, h, start, goal, nonsteppables, DFS_RECURSIVE);
            console.log(result_paths);
            console.log(result_paths.length);
        }
    },
    {
        name: "test3",
        test: () => {
            const w = 3;
            const h = 3;
            const start = { x: 0, y: 0 };
            const goal = { x: 1, y: 2 };
            const nonsteppables = [
                { x: 1, y: 1 },
                { x: 1, y: 0 },
            ];
            const result_paths = findPaths(w, h, start, goal, nonsteppables, DFS_RECURSIVE);
            console.log(result_paths);
            console.log(result_paths.length);
        }
    },
    {
        name: "test4",
        test: () => {
            const w = 3;
            const h = 3;
            const start = { x: 0, y: 0 };
            const goal = { x: 1, y: 2 };
            const nonsteppables = [];
            const result_paths = findPaths(w, h, start, goal, nonsteppables, DFS_ITERATIVE);
            console.log(result_paths);
            console.log(result_paths.length);
        }
    },
]

for (const testCase of testCases) {
    console.log(`*** Test: ${testCase.name} BEGIN ***`);
    testCase.test();
    console.log(`*** Test: ${testCase.name} END ***`);
}
