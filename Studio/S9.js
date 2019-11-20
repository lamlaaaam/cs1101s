// Studio 9

// Q1
// 0

// Q2
function d_reverse(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const revTail = d_reverse(tail(xs));
        set_tail(tail(xs), xs);
        set_tail(xs, null);
        return revTail;
    }
}

const l = list(1,2,3,4,5);
d_reverse(l);
l; // Returns pair(1, null)

// Q3 in class

// Q4
// WRONG FUNCTION
function count_pairs(x) {
    if (!is_pair(x)) {
        return 0;
    } else {
        return 1 + count_pairs(head(x)) + count_pairs(tail(x));
    }
}
const a = list(1,2,3);
set_head(a, tail(a));
set_head(tail(a), tail(tail(a)));
count_pairs(a);

// CORRECT FUNCTION
function countPairs(x) {
    let trackList = null;
    function helper(x) {
        if (!is_pair(x) || !is_null(member(x, trackList))) {
            return 0;
        } else {
            trackList = pair(x, trackList);
            return 1 + helper(head(x)) + helper(tail(x));
        }
    }
    return helper(x);
}

const b = list(1,2,3);
set_head(b, tail(b));
set_head(tail(b), tail(tail(b)));
countPairs(b);

// Q5
// Env model