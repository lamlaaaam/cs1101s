// Q1B

function similar(tn1, tn2) {
    if (is_null(tn1) && is_null(tn2)) {
        return true;
    } else if (is_null(tn1) || is_null(tn2)) {
        return false;
    } else {
        const tn1H = head(tn1);
        const tn2H = head(tn2);
        const tailSimilar = similar(tail(tn1), tail(tn2));
        if (is_number(tn1H) && is_number(tn2H)) {
            return math_abs(tn1H - tn2H) <= 1 && tailSimilar;
        } else if (is_number(tn1H) || is_number(tn2H)) {
            return false;
        } else {
            return similar(tn1H, tn2H) && tailSimilar;
        }
    }
}

// Q1C
function differences(tn1, tn2) {
    if (is_null(tn1)) {
        return 0;
    } else {
        const tn1H = head(tn1);
        const tn2H = head(tn2);
        if (is_number(tn1H)) {
            return (tn1H !== tn2H ? 1 : 0) + differences(tail(tn1), tail(tn2));
        } else {
            return differences(tn1H, tn2H) + differences(tail(tn1), tail(tn2));
        }
    }
}

// Q1D
function increment(tn) {
    return map_tree(x => x + 1, tn);
}

// Q3A
function array_with_zeroes(n) {
    const arr = [];
    for (let i = 0; i < n; i = i + 1) {
        arr[i] = 0;
    }
    return arr;
}

// Q3B
function make_histogram(arr, max) {
    const len = array_length(arr);
    const res = array_with_zeroes(max + 1);
    for (let i = 0; i < len; i = i + 1) {
        const num = arr[i];
        res[num] = res[num] + 1;
    }
    return res;
}

// Q3C
function enter_copies(arr, n, v, start) {
    for (let i = start; i < start + n; i = i + 1) {
        arr[i] = v;
    }
}

// Q3D
function generate_sorted(hist) {
    const len = array_length(hist);
    const sorted = [];
    for (let i = 0; i < len; i = i + 1) {
        const numToEnter = i;
        const reps = hist[i];
        enter_copies(sorted, reps, numToEnter, array_length(sorted));
    }
    return sorted;
}

// Q5A
function eval_function_definition(stmt, env) {
    const params = function_definition_parameters(stmt);
    function valid(params) {
        for (let s = params; !is_null(s); s = tail(s)) {
            for (let k = tail(s); !is_null(k); k = tail(k)) {
                if (head(s) === head(k)) {
                    return false;
                }
            }
        }
        return true;
    }
    if (valid(params)) {
        return make_compound_function(...)
    } else {
        display("parameters in function definition not unique");
    }
}
