window.addEventListener('load', () => {
    const w = 7;
    const h = 7;
    const start = { x: 0, y: 0 };
    const goal = { x: 1, y: 2 };
    const nonsteppables = [
        { x: 1, y: 1 },
        { x: 1, y: 3 },
        { x: 1, y: 5 },
        { x: 3, y: 1 },
        { x: 3, y: 3 },
        { x: 3, y: 5 },
        { x: 5, y: 1 },
        { x: 5, y: 3 },
        { x: 5, y: 5 },
    ];
    const result_paths = findPaths(w, h, start, goal, nonsteppables);
    for (const path of result_paths) {
        renderGrid(w, h, document.body, path, nonsteppables, start, goal);
    }
});
