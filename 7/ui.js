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
        } else if (p0.y === p1.y) {
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

const clearGrid = (parentEl) => {
    Array.from(parentEl.querySelectorAll('div.grid')).forEach(el => el.remove());
};

const validateInput = (ivWh, ivStart, ivGoal, ivNonsteppables) => {
    const [w, h] = ivWh.split(',').map(Number);
    const [sX, sY] = ivStart.split(',').map(Number);
    const [gX, gY] = ivGoal.split(',').map(Number);
    const nonsteppables = ivNonsteppables.length === 0 ? [] : ivNonsteppables.split(' ').map((xy) => { const [x, y] = xy.split(',').map(Number); return { x, y }; });
    console.log(w, h, sX, sY, gX, gY, nonsteppables);

    if (w <= 0 || h <= 0) {
        return {
            ok: false,
            message: `Grid size was invalid. ${x},${y}`,
        }
    }

    if (sX >= w || sY >= h) {
        return {
            ok: false,
            message: `Start is out of area. ${sX},${sY}`,
        }
    }

    if (gX >= w || gY >= h) {
        return {
            ok: false,
            message: `Goal is out of area. ${gX},${gY}`,
        }
    }

    if (sX === gX && sY === gY) {
        return {
            ok: false,
            message: `Start and goal is same. ${sX},${sY}`,
        }
    }

    for (const [i, { x, y }] of nonsteppables.entries()) {
        if (x >= w || y >= h) {
            return {
                ok: false,
                message: `Some of nonsteppables is out of area. [${i}] = ${x},${y}`,
            }
        }
    }

    for (const [i, { x, y }] of nonsteppables.entries()) {
        if (x === sX && y === sY) {
            return {
                ok: false,
                message: `Some of nonsteppables is same as the start [${i}] = ${x},${y}`,
            }
        }
    }

    for (const [i, { x, y }] of nonsteppables.entries()) {
        if (x === gX && y === gY) {
            return {
                ok: false,
                message: `Some of nonsteppables is same as the goal [${i}] = ${x},${y}`,
            }
        }
    }

    return {
        ok: true,
        w,
        h,
        start: { x: sX, y: sY },
        goal: { x: gX, y: gY },
        nonsteppables: nonsteppables,
    }
}

const renderUserInterface = (parentEl, gridEl) => {
    const buttonClearGrids = document.createElement('button');
    buttonClearGrids.innerText = 'Clear grids';
    buttonClearGrids.addEventListener('click', () => {
        clearGrid(document.body);
    });

    // Grid size
    const labelGridSize = document.createElement('label');
    labelGridSize.htmlFor = "input-gridsize";
    labelGridSize.innerText = 'gridsize:';

    const inputGridSize = document.createElement('input');
    inputGridSize.type = 'text';
    inputGridSize.pattern = "[1-9][0-9]*,[1-9][0-9]*"
    inputGridSize.id = "input-gridsize";
    inputGridSize.required = true;
    inputGridSize.placeholder = "W,H";

    // Start
    const labelStart = document.createElement('label');
    labelStart.htmlFor = "input-start";
    labelStart.innerText = 'start:';

    const inputStart = document.createElement('input');
    inputStart.type = 'text';
    inputStart.id = "input-start";
    inputStart.pattern = "(0|[1-9][0-9]*),(0|[1-9][0-9]*)"
    inputStart.required = true;
    inputStart.placeholder = "x,y";

    // Goal
    const labelGoal = document.createElement('label');
    labelGoal.htmlFor = "input-goal";
    labelGoal.innerText = 'goal:';

    const inputGoal = document.createElement('input');
    inputGoal.type = 'text';
    inputGoal.id = "input-goal";
    inputGoal.pattern = "(0|[1-9][0-9]*),(0|[1-9][0-9]*)";
    inputGoal.required = true;
    inputGoal.placeholder = "x,y";

    // Non-steppables
    const labelNonsteppables = document.createElement('label');
    labelNonsteppables.htmlFor = "input-nonsteppables";
    labelNonsteppables.innerText = 'nonsteppables:';

    const inputNonsteppables = document.createElement('input');
    inputNonsteppables.type = 'text';
    inputNonsteppables.id = "input-nonsteppables";
    inputNonsteppables.pattern = "(0|[1-9][0-9]*),(0|[1-9][0-9]*)( (0|[1-9][0-9]*),(0|[1-9][0-9]*))*";
    inputNonsteppables.required = false;
    inputNonsteppables.placeholder = "x1,y1 x2,y2 x3,y3, ...";

    const messageArea = document.createElement('div');

    const buttonValidateInput = document.createElement('button');
    buttonValidateInput.innerText = 'ValidateInput';

    const buttonFindPaths = document.createElement('button');
    buttonFindPaths.innerText = 'FindPaths';
    buttonFindPaths.disabled = true;

    // Sample game selection
    const labelSelectSampleGame = document.createElement('label');
    labelSelectSampleGame.htmlFor = "select-sample-game";
    labelSelectSampleGame.innerText = 'Sample game selection:';

    const selectSampleGame = document.createElement('select');
    selectSampleGame.id = "select-sample-game";
    selectSampleGame.addEventListener('change', (event) => {
        const selectedValue = JSON.parse(event.target.options[event.target.selectedIndex].value);
        if (selectedValue) {
            const { w, h, nonsteppables, start, goal } = selectedValue;
            inputGridSize.value = `${w},${h}`;
            inputStart.value = `${start.x},${start.y}`;
            inputGoal.value = `${goal.x},${goal.y}`;
            inputNonsteppables.value = nonsteppables.map(({ x, y }) => `${x},${y}`).join(" ");
        }
    });
    const defaultOption = document.createElement('option');
    defaultOption.innerText = "default";
    defaultOption.value = "null";
    selectSampleGame.add(defaultOption);

    buttonValidateInput.addEventListener('click', () => {
        if (inputGridSize.validity.valid &&
            inputStart.validity.valid &&
            inputGoal.validity.valid &&
            inputNonsteppables.validity.valid) {
            const gameInput = validateInput(inputGridSize.value, inputStart.value, inputGoal.value, inputNonsteppables.value);
            if (!gameInput.ok) {
                messageArea.innerText = `Status: Input is invalid.
                    ${gameInput.message}`;

                buttonFindPaths.disabled = true;

                return;
            } else {
                messageArea.innerText = `Status: Input is valid.
                    Grid size: ${gameInput.w} x ${gameInput.h}
                    Start: ${gameInput.start.x}, ${gameInput.start.y}
                    Goal: ${gameInput.goal.x}, ${gameInput.goal.y}
                    Nonsteppables: ${gameInput.nonsteppables.map(({ x, y }) => `(${x}, ${y})`).join(" ")}`;

                clearGrid(gridEl);
                renderGrid(gameInput.w, gameInput.h, gridEl, [gameInput.start, gameInput.goal], gameInput.nonsteppables, gameInput.start, gameInput.goal);

                const findPathHandler = () => {
                    clearGrid(document.body);
                    const result_paths = findPaths(gameInput.w, gameInput.h, gameInput.start, gameInput.goal, gameInput.nonsteppables);
                    for (const path of result_paths) {
                        renderGrid(gameInput.w, gameInput.h, gridEl, path, gameInput.nonsteppables, gameInput.start, gameInput.goal);
                    }
                    buttonFindPaths.removeEventListener('click', findPathHandler);
                    buttonFindPaths.disabled = true;
                }
                buttonFindPaths.addEventListener('click', findPathHandler);
                buttonFindPaths.disabled = false;
                return;
            }
        } else {
            messageArea.innerText = `Validation Status:
                Grid size : ${inputGridSize.validationMessage}
                Start : ${inputStart.validationMessage}
                Goal : ${inputGoal.validationMessage}
                Nonsteppables : ${inputNonsteppables.validationMessage}`;
            buttonFindPaths.disabled = true;

            return;
        }
    });

    parentEl.appendChild(buttonClearGrids);
    parentEl.appendChild(buttonValidateInput);
    parentEl.appendChild(buttonFindPaths);
    parentEl.appendChild(labelGridSize);
    parentEl.appendChild(inputGridSize);
    parentEl.appendChild(labelStart);
    parentEl.appendChild(inputStart);
    parentEl.appendChild(labelGoal);
    parentEl.appendChild(inputGoal);
    parentEl.appendChild(labelNonsteppables);
    parentEl.appendChild(inputNonsteppables);
    parentEl.appendChild(labelSelectSampleGame);
    parentEl.appendChild(selectSampleGame);
    parentEl.appendChild(messageArea);

    return {
        inputGridSize,
        inputStart,
        inputGoal,
        inputNonsteppables,
        selectSampleGame,
    };
};

const initializeUi = () => {
    const uiEl = document.createElement('div');
    const gridsContainerEl = document.createElement('div');
    gridsContainerEl.classList.add('grid-container');
    document.body.appendChild(uiEl);
    document.body.appendChild(gridsContainerEl);

    const inputs = renderUserInterface(uiEl, gridsContainerEl);

    return {
        ui: uiEl,
        gridsContainer: gridsContainerEl,
        registerSampleGameInput: (title, w, h, nonsteppables, start, goal) => {
            const optionSampleGame = document.createElement('option');
            optionSampleGame.innerText = title;
            optionSampleGame.value = JSON.stringify({
                title,
                w, h,
                nonsteppables,
                start,
                goal,
            });
            inputs.selectSampleGame.add(optionSampleGame);
        },
    };
}
