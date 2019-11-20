// Studio 11
// Q1
stream(1, 2, 4, 8, 16, ..) // 2^index
stream(1, 1, 2, 6, 24, 120, ..) // current index * previous value

// Q2
// (a)
stream([1,2], [1,3], [1,4], [1,5], [2,3], ..., [4,5])

// (b)
// Create a stream by pairing the head of the stream with each of the elements in
// the tail of the stream. Keep doing this, each time removing the head of the
// stream. Stop when the stream reaches null. Append all these streams.

// (c)
// Infinite recursion. Keeps doing stream_tail but never reaches null.

// (d)
// Recursive call is paused until needed.

// (e)
stream([1,2], [1,3], [1,4], [1,5], ..., [1, 183798], ...)

function stream_append_pickle(xs, ys) {
    return is_null(xs)
        ? ys()
        : pair(head(xs),
              () => stream_append_pickle(stream_tail(xs), ys));
}

function stream_pairs2(s) {
    function pairBefore(index) {
        const currValue = stream_ref(s, index);
        let result = null;
        for (let i = index - 1; i >= 0; i = i - 1) {
            const paired = pair(stream_ref(s, i), currValue);
            result = pair(paired, result);
        }
        return list_to_stream(result);
    }
    function createStream(counter) {
        return stream_append_pickle(pairBefore(counter), () => createStream(counter + 1));
    }
    return createStream(1);
}

const h = stream_pairs2(integers_from(1));
eval_stream(h, 10);

// Q3
// alt_ones
const alt_ones1 = pair(1, () => pair(-1, () => alt_ones1));
eval_stream(alt_ones1, 10);

const alt_onesGen = k => pair(k, () => alt_onesGen(-k));
const alt_ones2 = alt_onesGen(1);
eval_stream(alt_ones2, 10);

// zeros
function add_streams(s1, s2) {
    return is_null(s1)
        ? s2
        : is_null(s2)
            ? s1
            : pair(head(s1) + head(s2),
                   () => add_streams(stream_tail(s1),
                                     stream_tail(s2)));
}

function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}

const add_series = add_streams;

const scale_series = scale_stream;
    
function negate_series(s) {
    return scale_series(-1, s);
}

function subtract_series(s1, s2) {
    return add_series(s1, negate_series(s2));
}

const alt_ones = pair(1, () => pair(-1, () => alt_ones));

const zeros1 = scale_series(0, alt_ones);
eval_stream(zeros1, 10);

const zeros2 = add_streams(alt_ones, stream_tail(alt_ones));
eval_stream(zeros2, 10);

const zeros3 = subtract_series(alt_ones, alt_ones);
eval_stream(zeros3, 10);

// S1, S2
const non_neg_integers = integers_from(0);
function fun_to_series(fun) {
    return stream_map(fun, non_neg_integers);
}

const s1 = fun_to_series(x => 1);
const s2 = fun_to_series(x => x + 1);

// Q4
function mul_series(s1, s2) {
    return pair(head(s1) * head(s2), () => add_series(scale_series(head(s2), stream_tail(s1)), 
    									   mul_series(s1, stream_tail(s2))));
}

const y = mul_series(s1, s1);
eval_stream(y, 10);

const z = mul_series(s2, s2);
eval_stream(z, 11);