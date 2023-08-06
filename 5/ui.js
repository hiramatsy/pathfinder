const renderGrid = (w, h, parentEl, path, nonsteppables, start, goal) => {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    const gridCellElements = [];
    for (let i = 0; i < h; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        const rowElements = [];
        for (let j = 0; j < w; j++) {
            const cell = document.createElement('span');
            cell.classList.add('cell', 'cell-unused');
            row.appendChild(cell);
            rowElements.push(cell);
        }
        grid.appendChild(row);
        gridCellElements.push(rowElements);
    }
    parentEl.appendChild(grid);

    for (const [i, { x, y }] of path.entries()) {
        gridCellElements[y][x].classList.replace('cell-unused', 'cell-used');
        gridCellElements[y][x].innerText = i;
    }

    for (let pidx = 0; pidx < path.length - 1; pidx++) {
        const p0 = path[pidx];
        const p1 = path[pidx + 1];
        if (p0.x === p1.x) {
            if (p1.y - p0.y === 1) { // [0, 1]
                gridCellElements[p0.y][p0.x].classList.add('cell-bottom-open');
                gridCellElements[p1.y][p1.x].classList.add('cell-top-open');
            } else if (p1.y - p0.y === -1) { // [0, -1]
                gridCellElements[p0.y][p0.x].classList.add('cell-top-open');
                gridCellElements[p1.y][p1.x].classList.add('cell-bottom-open');
            }
        } else { // p0.y === p1.y
            if (p1.x - p0.x === 1) { // [1, 0]
                gridCellElements[p0.y][p0.x].classList.add('cell-right-open');
                gridCellElements[p1.y][p1.x].classList.add('cell-left-open');
            } else if (p1.x - p0.x === -1) { // [-1, 0]
                gridCellElements[p0.y][p0.x].classList.add('cell-left-open');
                gridCellElements[p1.y][p1.x].classList.add('cell-right-open');
            }
        }
    }

    for (const { x, y } of nonsteppables) {
        gridCellElements[y][x].classList.replace('cell-unused', 'cell-nonsteppable');
    }

    gridCellElements[start.y][start.x].classList.add('cell-start');
    gridCellElements[goal.y][goal.x].classList.add('cell-goal');
};
