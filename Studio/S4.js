// Studio 4

// Q1
function pascal(row, pos) {
    return pos === 1 || pos === row
        ? 1
        : pascal(row - 1, pos - 1) + pascal(row - 1, pos);
}

// Q2
// pascal(5, 4);
// pascal(4, 3) + pascal(4, 4)
// pascal(3, 2) + pascal(3, 3) + 1
// pascal(2, 1) + pascal(2, 2) + 1 + 1
// 1 + 1 + 1 + 1
// Recursive

// Q3
// 27
// a) 33
// b) compose
// c) 1
// d) 2^(2^27)

function compose(f, g) {
    return x => f(g(x));
}

function thrice(f) {
    return compose(compose(f, f), f);
}

((thrice(thrice))(x => x*x))(2);