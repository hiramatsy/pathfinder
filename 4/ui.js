const renderGrid = (w, h, parentEl, path, nonsteppables) => {
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

    for (const { x, y } of nonsteppables) {
        gridCellElements[y][x].classList.replace('cell-unused', 'cell-nonsteppable');
    }
};
