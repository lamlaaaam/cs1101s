// Studio 10

// Q1 (Env model)

// Q2
// (a) O(n^2)
// (b)
function bubblesort_list(L) {
    let limitLen = length(L);
    function swap(pairX, pairY) {
        const temp = head(pairY);
        set_head(pairY, head(pairX));
        set_head(pairX, temp);
    }
    function helper(xs, k) {
        if (k < limitLen) {
            const first = head(xs);
            const second = head(tail(xs));
            if (first > second) {
                swap(xs, tail(xs));
                helper(tail(xs), k + 1);
            } else {
                helper(tail(xs), k + 1);
            }
        } else {
            limitLen = limitLen - 1;
        }
    }
    while (limitLen > 1) {
        helper(L, 1);
    }
    return L;
}

const test = list(4,2,1,5,3,2,6,2,1);
bubblesort_list(test);

// Q3
// (a)
function make_2D_zero_array(rows, cols) {
    let result = [];
    function make2D(counter) {
        let zeroRow = [];
        function makeZeroRow(counter) {
            if (counter < cols) {
                zeroRow[counter] = 0;
                return makeZeroRow(counter + 1);
            } else {
                return zeroRow;
            }
        }
        if (counter < rows) {
            result[counter] = makeZeroRow(0);
            return make2D(counter + 1);
        } else {
            return result;
        }
    }
    return make2D(0);
}

make_2D_zero_array(5, 5);

// (b)
function num_of_live_neighbours(game, n, r, c) {
    function checkLive(r, c) {
        function wrapIndex(index) {
            let actualRowCol = index + 1;
            if (actualRowCol > n) {
                return (actualRowCol % n) - 1; 
            } else if (actualRowCol < 1) {
                return n - ((1 - actualRowCol) % n);
            } else {
                return index;
            }
        }
        r = wrapIndex(r);
        c = wrapIndex(c);
        return game[r][c] === 1 ? 1 : 0;
    }
    let result = 0;
    for (let i = r - 1; i <= r + 1; i = i + 1) {
        for (let k = c - 1; k <= c + 1; k = k + 1) {
            if (!(i === r && k === c)) {
                result = result + checkLive(i, k);
            } else {}
        }
    }                  
    return result;
}

const test = [[0, 0, 1, 0, 1],
              [0, 0, 1, 1, 0],
              [1, 0, 0, 1, 0],
              [0, 1, 0, 1, 0],
              [1, 0, 1, 1, 1]];
num_of_live_neighbours(test, 5, 0, 3);

// (c)
function next_generation(game, n) {
    function nextState(r, c) {
        const currState = game[r][c];
        const liveNeighbours = num_of_live_neighbours(game, n, r, c);
        const ruleTable = [[0, 0, 0, 1, 0, 0, 0, 0, 0],
                           [0, 0, 1, 1, 0, 0, 0, 0, 0]];
        return ruleTable[currState][liveNeighbours];
    }
    const next = make_2D_zero_array(n, n);
    for (let i = 0; i < n; i = i + 1) {
        for (let k = 0; k < n; k = k + 1) {
            next[i][k] = nextState(i, k);
        }
    }
    return next;
}
// O(n^2)

// Q4
function first_denomination(kinds_of_coins) {
    return kinds_of_coins === 1 ? 5 :
        kinds_of_coins === 2 ? 10 :
        kinds_of_coins === 3 ? 20 :
        kinds_of_coins === 4 ? 50 :
        kinds_of_coins === 5 ? 100 : 0;
}

function cc(a, koc) {
    let mem = [];
    function memcc(a, koc) {
        if (a === 0) {
            return 1;
        } else if (a < 0 || koc === 0) {
            return 0;
        } else if (mem[a] !== undefined && mem[a][koc] !== undefined) {
            return mem[a][koc];
        } else {
            const result = memcc(a, koc - 1) + memcc(a - first_denomination(koc), koc);
            if (mem[a] === undefined) {mem[a] = [];} else {}
            mem[a][koc] = result;
            return result;
        }
    }
    return memcc(a, koc);
}

cc(1000, 5);

// Q5
// (a)
function max_flies_to_eat(tile_flies) {
    const noOfRows = array_length(tile_flies);
    const noOfCols = array_length(tile_flies[0]);
	function maxFliesFromPos(r, c) {
	    if (c < 0 || c >= noOfCols) {
	        return 0;
	    } else if (r === noOfRows - 1) {
	        return tile_flies[r][c];
	    } else {
	        const bottomLeft = tile_flies[r][c] + maxFliesFromPos(r + 1, c - 1);
	        const bottom = tile_flies[r][c] + maxFliesFromPos(r + 1, c);
	        const bottomRight = tile_flies[r][c] + maxFliesFromPos(r + 1, c + 1);
	        return bottomLeft >= bottom && bottomLeft >= bottomRight
	            ? bottomLeft
	            : bottom >= bottomRight
	                ? bottom
	                : bottomRight;
	    }
	}
	let biggest = 0;
	for (let i = 0; i < noOfCols; i = i + 1) {
	    const maxFlies = maxFliesFromPos(0, i);
	    biggest = maxFlies > biggest ? maxFlies : biggest;
	}
	return biggest;
}

const tile_flies = [[3, 1, 7, 4, 2],
                    [2, 1, 3, 1, 1],
                    [1, 2, 2, 1, 8],
                    [2, 2, 1, 5, 3],
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]];
max_flies_to_eat(tile_flies);
// O(3^r * c)

// (b)
function memo_max_flies_to_eat(tile_flies) {
    let mem = [];
    const noOfRows = array_length(tile_flies);
    const noOfCols = array_length(tile_flies[0]);
	function maxFliesFromPos(r, c) {
	    if (c < 0 || c >= noOfCols) {
	        return 0;
	    } else if (r === noOfRows - 1) {
	        return tile_flies[r][c];
	    } else if (mem[r] !== undefined && mem[r][c] !== undefined) {
	        return mem[r][c];
	    } else {
            const bottomLeft = tile_flies[r][c] + maxFliesFromPos(r + 1, c - 1);
            const bottom = tile_flies[r][c] + maxFliesFromPos(r + 1, c);
            const bottomRight = tile_flies[r][c] + maxFliesFromPos(r + 1, c + 1);
            const result = bottomLeft >= bottom && bottomLeft >= bottomRight
                ? bottomLeft
                : bottom >= bottomRight
                    ? bottom
                    : bottomRight;
	       if (mem[r] === undefined) {mem[r] = [];} else {}
	       mem[r][c] = result;
	       return result;
	    }
	}
	let biggest = 0;
	for (let i = 0; i < noOfCols; i = i + 1) {
	    const maxFlies = maxFliesFromPos(0, i);
	    biggest = maxFlies > biggest ? maxFlies : biggest;
	}
	return biggest;
}
// O(r*c)