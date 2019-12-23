// Q1A1

function last_member(x, xs) {
    function find_last_member(ys, current_last) {
        let next = member(x, ys);
        if (is_null(next)) {
            return current_last;
        } else {
            return find_last_member(remove(x, ys), next);
        }
    }
    return find_last_member(xs, null);
}

// Q1B
function is_subset(S, T) {
    if (is_null(S)) {
        return true;
    } else if (is_null(T)) {
        return false;
    } else if (head(S) < head(T)) {
        return false;
    } else if (head(S) === head(T)) {
        return is_subset(tail(S), tail(T));
    } else {
        return is_subset(S, tail(T));
    }
}

// Q1D
function mutable_append(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else (is_null(ys)) {
        return xs;
    } else {
        set_tail(xs, mutable_append(tail(xs), ys));
        return xs;
    }
}

// Q1E
function transform_tree(t) {
    if (is_null(t)) {
        return null;
    } else {
        const h = head(t);
        const transRest = transform_tree(tail(t));
        return append(transRest, list(is_number(h) ? h : transform_tree(h)));
    }
}

// Q1F
function shorten_stream(s, k) {
    if (is_null(s)) {
        return null;
    } else if (k === 0) {
        return null;
    } else {
        return pair(head(s), () => shorten_stream(stream_tail(s), k - 1));
    }
}

// Q2B
function is_linked(x, y) {
    return !is_null(member(y, tail(x)));
}

// Q2C
function is_proper(x) {
    const linkedN = tail(x);
    return accumulate((a,b) => is_linked(a, x) && b, true, linkedN);
}

// Q2D
function is_connected(x, y) {
    let visited = null;
    function search(from, to) {
        if (from === to) {
            return true;
        } else if (!is_null(member(from, visited))) {
            return false;
        } else {
            visited = pair(from, visited);
            const linkedN = tail(from);
            for (let n = linkedN; !is_null(n); n = tail(n)) {
                const node = head(n);
                if (search(node, to)) {
                    return true;
                } else {}
            }
            return false;
        }
    }
    return search(x, y);
}

// Q3A
function sum_cps(x, y, z, ret) {
    return ret(plus_cps(plus_cps(x, y, k => k), z, m => m));
}


