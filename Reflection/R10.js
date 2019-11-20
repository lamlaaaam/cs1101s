// Reflection 10

// Q1
// 0, 1 2 3, 1 2 3 4 5

// Q2
function list_to_inf_stream(xs) {
    function helper(currStream) {
        return pair(head(currStream), () => is_null(stream_tail(currStream))
                                            ? list_to_inf_stream(xs)
                                            : helper(stream_tail(currStream)));
    }
    return is_null(xs) ? null : helper(list_to_stream(xs));
}

// Q3
function partial_sums(s) {
    if (is_null(s)) {
        return null;
    } else {
        return pair(head(s), () => stream_map(x => x + head(s), partial_sums(stream_tail(s))));
    }
}