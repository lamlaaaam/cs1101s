// Q1

/*
// The insertion sort implementation given in Lecture L6.

function insert(x, xs) {
    return is_null(xs) ? list(x)
        : x <= head(xs) ? pair(x, xs)
            : pair(head(xs), insert(x, tail(xs)));
}
function insertion_sort(xs) {
    return (is_null(xs)) ? xs
        : insert(head(xs),
            insertion_sort(tail(xs)));
}
*/

function insert_mod(x, xs) {
    if (is_null(xs)) {
        return list(x);
    } else {
        const getHead = head(head(xs));
        const getTail = tail(head(xs));
        if (head(x) < getHead) {
            return pair(x, xs);
        } else if (head(x) === getHead && tail(x) > getTail) {
            return pair(x, xs);
        } else {
            return pair(head(xs), insert_mod(x, tail(xs)));
        }
    }
}

function insertion_sort_mod(L) {
    if (is_null(L)) {
        return null;
    } else {
        return insert_mod(head(L), insertion_sort_mod(tail(L)));
    }
}

// Test
const L = list(pair(3, 4), pair(6, 2), pair(5, 1), pair(3, 2),
               pair(5, 3), pair(4, 2), pair(3, 7), pair(6, 5),
               pair(5, 1), pair(6, 4));
const S = insertion_sort_mod(L);
S;

// Expected result: 
// list(pair(3, 7), pair(3, 4), pair(3, 2), pair(4, 2), 
//      pair(5, 3), pair(5, 1), pair(5, 1), pair(6, 5), 
//      pair(6, 4), pair(6, 2))

// Q2


function rotate_matrix(M) {
    const size = array_length(M);
    function reverse_array(arr) {
        const mid = math_floor(size / 2);
        for (let i = 0; i < mid; i = i + 1) {
            const temp = arr[i];
            arr[i] = arr[size - i - 1];
            arr[size - i - 1] = temp;
        }
    }
    function swap(r1, c1, r2, c2) {
        const temp = M[r1][c1];
        M[r1][c1] = M[r2][c2];
        M[r2][c2] = temp;
    }
    function flipDiag() {
        for (let i = 0; i < size; i = i + 1) {
            for (let k = i; k < size; k = k + 1) {
                swap(i, k, k, i);
            }
        }
    }
    function flipHor() {
        for (let i = 0; i < size; i = i + 1) {
            reverse_array(M[i]);
        }
    }
    flipDiag();
    flipHor();
    return M;
}

// Test
const M = [[ 1,  2,  3,  4],
           [ 5,  6,  7,  8],
           [ 9, 10, 11, 12],
           [13, 14, 15, 16]];
rotate_matrix(M);
M;

// Expected result:
 // [[13, 9, 5, 1], 
//  [14, 10, 6, 2], 
//  [15, 11, 7, 3], 
//  [16, 12, 8, 4]]
