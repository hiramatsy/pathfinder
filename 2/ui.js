const renderGrid = (w, h, parentEl, path) => {
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

    for (const { x, y } of path) {
        gridCellElements[y][x].classList.replace('cell-unused', 'cell-used');
    }
};
