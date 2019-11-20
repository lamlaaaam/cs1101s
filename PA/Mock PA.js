// Q1A

function make_diagonal(n, direction) {
    let result = null;
    const next = direction === "down"
        ? -1
        : 1;
    for (let i = direction === "down" ? n : 1; i <= n && i > 0; i = i + next) {
        const frac = pair(i, n - i + 1);
        result = pair(frac, result);
    }
    return result;
}

//

// Q1B

function diagonalize(n) {
    let result = make_diagonal(1, "down");
    for (let i = 2; i <= n; i = i + 1) {
        const direction = i % 2 === 0 ? "up" : "down";
        result = append(result, make_diagonal(i, direction));
    }
    return result;
}

// Q1C

function diagonalize_stream() {
    function helper(n, s, direction) {
        return pair(head(s),
            () => is_null(stream_tail(s))
                ? helper(n + 1, 
                		 list_to_stream(make_diagonal(n + 1, direction === "up" ? "down" : "up")), 
                		 direction === "up" ? "down" : "up")
                : helper(n, stream_tail(s), direction));
    }
    return helper(1, list_to_stream(make_diagonal(1, "down")), "down");
}

// Q2A

function make_point(x, y) {
    return pair(x, y);
}

function x_of(pt) {
    return head(pt);
}

function y_of(pt) {
	return tail(pt);
}

function extremes(xs) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minPT = null;
    let maxPT = null;
    for (let s = xs; !is_null(s); s = tail(s)) {
        const pt = x_of(s);
        const x = head(pt);
        if (x < minX) {
            minX = x;
            minPT = pt;
        } else {}
        if (x > maxX) {
            maxX = x;
            maxPT = pt;
        } else {}
    }
    return pair(minPT, maxPT);
}



function quickhull(points) {
    function partDistinct(V1, V2, points) {
        const part = partition(V1, V2, points);
        const S1 = remove(V2, remove(V1, head(part)));
        const S2 = tail(part);
        return pair(S1, S2);
    }
    function recur(V1, V2, points) {
        if (is_null(points)) {
            return null;
        } else {
            const V3 = furthest(V1, V2, points);
            const S1 = head(partDistinct(V1, V3, points));
            const S2 = head(partDistinct(V3, V2, points));
            return append(pair(V3, recur(V1, V3, S1)), recur(V3, V2, S2));
        }
    }
    // Pre-processing
    const exPoints = extremes(points);
    const V1 = head(exPoints);
    const V2 = tail(exPoints);
    const part = partDistinct(V1, V2, points);
    const S1 = head(part);
    const S2 = tail(part);
    // Recursive
    return append(append(list(V1, V2), recur(V1, V2, S1)), recur(V2, V1, S2));
}

