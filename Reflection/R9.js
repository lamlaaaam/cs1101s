// Reflection 9

// Q1
function swap(A, i, k) {
    const temp = A[k];
    A[k] = A[i];
    A[i] = temp;
}

function insertion_sort(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        let j = i - 1;
        while (j >= 0) {
            if (A[j] > A[j + 1]) {
                swap(A, j, j + 1);
            } else {}
            j = j - 1;
        }
    }
}

function sorted_linear_search(A, v) {
    const len = array_length(A);
    let i = 0;
    while (i < len && A[i] !== v && A[i] < v) {
        i = i + 1;
    }
    return (A[i] === v);
}

function make_optimized_search(A) {
    insertion_sort(A);
    return x => sorted_linear_search(A, x);
}

const my_array = [3,41,20,1,5,16,4,0,14,6,17,8,4,0,2];
const my_search = make_optimized_search(my_array);
my_search(14); // returns true

// Q2 (a)
function fib(n) {
    const fibArray = [0, 1];
    let i = 2;
    while (i <= n) {
        fibArray[i] = fibArray[i - 2] + fibArray[i - 1];
        i = i + 1;
    }
    return n === 0
        ? 0
        : n === 1
            ? 1
            : fibArray[i - 1];
}

fib(5);

// (b)
function fib(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        let first = 0;
        let second = 1;
        for (let i = 1; i < n; i = i + 1) {
            second = first + second;
            first = second - first;
        }
        return second;
    }
}

fib(4);