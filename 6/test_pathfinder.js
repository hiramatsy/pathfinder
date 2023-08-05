const findPaths = require('./pathfinder').findPaths;

const testCases = [
    {
        name: "test1",
        test: () => {
            const w = 3;
            const h = 3;
            const start = { x: 0, y: 0 };
            const goal = { x: 1, y: 2 };
            const nonsteppables = [];
            const result_paths = findPaths(w, h, start, goal, nonsteppables);
            console.log(result_paths);
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
            const result_paths = findPaths(w, h, start, goal, nonsteppables);
            console.log(result_paths);
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
            const result_paths = findPaths(w, h, start, goal, nonsteppables);
            console.log(result_paths);
        }
    },
]

for (const testCase of testCases) {
    console.log(`*** Test: ${testCase.name} BEGIN ***`);
    testCase.test();
    console.log(`*** Test: ${testCase.name} END ***`);
}
