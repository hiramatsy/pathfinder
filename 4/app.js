window.addEventListener('load', () => {
    const w = 3;
    const h = 3;
    const start = { x: 0, y: 0 };
    const goal = { x: 1, y: 2 };
    const nonsteppables = [];
    const result_paths = findPaths(w, h, start, goal, nonsteppables);
    for (const path of result_paths) {
        renderGrid(w, h, document.body, path);
    }
});
