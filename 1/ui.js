const renderGrid = (w, h, parentEl) => {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    for (let i = 0; i < h; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < w; j++) {
            const cell = document.createElement('span');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
    parentEl.appendChild(grid);
};
