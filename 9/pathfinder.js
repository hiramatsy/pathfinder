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

const findPaths = (w, h, start, goal, nonsteppables) => {
    const result_paths = [];
    const gridStates = Array(h).fill().map(() => Array(w).fill(CELL_UNUSED));
    for (const { x, y } of nonsteppables) {
        gridStates[y][x] = CELL_NONSTEPPABLE;
    }
    gridStates[start.y][start.x] = CELL_USED;
    step_r(w, h, start, goal, gridStates, [start], result_paths);
    return result_paths;
}

if (!exports) {
    var exports = {};
}
exports.findPaths = findPaths;
