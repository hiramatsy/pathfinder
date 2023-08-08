const CELL_UNUSED = 0;
const CELL_USED = 1;
const CELL_NONSTEPPABLE = 2;

const step_r = (w, h, currentpos, goal, gridStatus, path, result_paths) => {
    for (const [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
        const nx = currentpos.x + dx;
        const ny = currentpos.y + dy;

        if (nx < 0 || nx >= w || ny < 0 || ny >= h) {
            // out of area
            continue;
        }

        if (gridStatus[ny][nx] !== CELL_UNUSED) {
            // already trod
            continue;
        }

        if (nx === goal.x && ny === goal.y) {
            // reach the goal
            const okpath = path.slice();
            okpath.push(goal);
            result_paths.push(okpath);
            continue;
        }

        const nextCurrentPos = { x: nx, y: ny };
        path.push(nextCurrentPos)
        gridStatus[ny][nx] = CELL_USED;
        step_r(w, h, nextCurrentPos, goal, gridStatus, path, result_paths);
        path.pop();
        gridStatus[ny][nx] = CELL_UNUSED;
    }
}

function* findUsingDfsGenerator(w, h, start, goal, gridStatus, path) {
    const dirs = [];
    const diffs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const currPos = structuredClone(start);
    let currentDir = 0;

    const popState = () => {
        const popped = path.pop();
        gridStatus[popped.y][popped.x] = CELL_UNUSED;
        currPos.x = path[path.length - 1].x;
        currPos.y = path[path.length - 1].y;
        return dirs.pop();
    }

    const nextDir = () => {
        if (currentDir < diffs.length - 1) {
            currentDir++;
            return true;
        } else {
            for (;;) {
                if (dirs.length === 0) {
                    return false;
                }
                const lastDir = popState();
                if (lastDir < diffs.length - 1) {
                    currentDir = lastDir + 1;
                    return true;
                }
            }
        }
    }

    for (;;) {
        const [dx, dy] = diffs[currentDir];
        const nx = currPos.x + dx;
        const ny = currPos.y + dy;

        if (nx < 0 || nx >= w || ny < 0 || ny >= h) {
            // out of area
            if (!nextDir()) {
                return;
            }
            continue;
        }

        if (gridStatus[ny][nx] !== CELL_UNUSED) {
            // already trod
            if (!nextDir()) {
                return;
            }
            continue;
        }

        if (nx === goal.x && ny === goal.y) {
            // reach the goal
            const okpath = path.slice();
            okpath.push(goal);
            yield okpath;
            if (!nextDir()) {
                return;
            }
            continue;
        }

        currPos.x = nx;
        currPos.y = ny;
        path.push(structuredClone(currPos));

        dirs.push(currentDir);
        currentDir = 0;

        gridStatus[ny][nx] = CELL_USED;
    }
}

const step_itr = (w, h, start, goal, gridStatus, path, result_paths) => {
    const gen = findUsingDfsGenerator(w, h, start, goal, gridStatus, path);
    for (;;) {
        const { value, done } = gen.next();
        if (done) {
            return;
        }
        result_paths.push(value);
    }
};

function* findUsingBfsGenerator(w, h, start, goal, gridStatus, path) {
    const diffs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const ctxQueue = [[start, gridStatus, path]];

    for (; ;) {
        if (ctxQueue.length === 0) {
            return;
        }
        const [cPos, cGrid, cPath] = ctxQueue.shift();
        for (const [dx, dy] of diffs) {
            const nx = cPos.x + dx;
            const ny = cPos.y + dy;

            if (nx < 0 || nx >= w || ny < 0 || ny >= h) {
                // out of area
                continue;
            }

            if (cGrid[ny][nx] !== CELL_UNUSED) {
                // already trod
                continue;
            }

            if (nx === goal.x && ny === goal.y) {
                // reach the goal
                const okpath = cPath.slice();
                okpath.push(goal);
                yield okpath;
                continue;
            }

            const nPos = { x: nx, y: ny };
            const nGrid = structuredClone(cGrid);
            nGrid[ny][nx] = CELL_USED;
            const nPath = cPath.slice();
            nPath.push(nPos);
            ctxQueue.push([nPos, nGrid, nPath]);
        }
    }
}

const findUsingBFS = (w, h, start, goal, gridStatus, path, result_paths) => {
    const gen = findUsingBfsGenerator(w, h, start, goal, gridStatus, path);
    for (;;) {
        const { value, done } = gen.next();
        if (done) {
            return;
        }
        result_paths.push(value);
    }
};

const DFS_RECURSIVE = 0;
const DFS_ITERATIVE = 1;
const BFS = 2;

const findPaths = (w, h, start, goal, nonsteppables, traverseStyle=DFS_RECURSIVE) => {
    const result_paths = [];
    const gridStates = Array(h).fill().map(() => Array(w).fill(CELL_UNUSED));
    for (const { x, y } of nonsteppables) {
        gridStates[y][x] = CELL_NONSTEPPABLE;
    }
    gridStates[start.y][start.x] = CELL_USED;
    switch (traverseStyle) {
        case DFS_RECURSIVE:
            step_r(w, h, start, goal, gridStates, [start], result_paths);
            break;
        case DFS_ITERATIVE:
            step_itr(w, h, start, goal, gridStates, [start], result_paths);
            break;
        case BFS:
            findUsingBFS(w, h, start, goal, gridStates, [start], result_paths);
            break;
        default:
            step_r(w, h, start, goal, gridStates, [start], result_paths);
            break;
    }

    return result_paths;
}

if (!exports) {
    var exports = {};
}
exports.DFS_RECURSIVE = DFS_RECURSIVE;
exports.DFS_ITERATIVE = DFS_ITERATIVE;
exports.BFS = DFS_ITERATIVE;
exports.findPaths = findPaths;
