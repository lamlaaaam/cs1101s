function mazeSolver(maze, startR, startC) {
    const size = array_length(maze);
    function loop(r, c) {
        if (r < 0 || r >= size || c < 0 || c >= size || maze[r][c] === 8) {
            return list(null);
        } else if (maze[r][c] === 1) {
            return list(pair(r, c));
        } else {
            const tryDown = loop(r + 1, c);
            const tryRight = loop(r, c + 1);
            return equal(head(tryDown), pair(r + 1, c)) ? pair(pair(r, c), tryDown)
                 : equal(head(tryRight), pair(r, c + 1)) ? pair(pair(r, c), tryRight)
                 : list(null);
        }
    }
    function printResult(result) {
        let prev = head(result);
        display("Starting at " + stringify(prev));
        for (let s = tail(result); !is_null(s); s = tail(s)) {
            const curr = head(s);
            if (head(curr) - head(prev) === 1) {
                display("Move Down");
            } else {
                display("Move Right");
            }
            prev = curr;
        }
        display("Reached!");
        return result;
    }
    const result = loop(startR, startC);
    return equal(result, list(null)) ? "No Solution" : printResult(result);
}

const maze = [[0, 0, 8, 8, 0],
              [0, 8, 0, 8, 8],
              [0, 0, 0, 8, 0],
              [0, 0, 0, 8, 0],
              [0, 8, 0, 0, 1]];
mazeSolver(maze, 0, 0);