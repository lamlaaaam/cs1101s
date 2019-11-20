// Studio Week 3

// Q1
// k1 = 1, k2 = 4, n0 = 1

// Q2
// True. For n >= 5, graph of 2n^2 always above 10nlogn.

// Q3
// True. For k = 6, graph of 6*2^n always above n^3 when n >= 0.

// Q4
// a) n^2, b) n, c) 3^n*n^2

// Q5
// Measure number of steps for input n. g1(n) = n
// Count deferred operations for input n. g2(n) = n

// Q6
function factorial_helper(n, product) {
    return n === 1
    ? product
    : factorial_helper(n - 1, product * (n - 1));
}

function factorial(n) {
    return n === 0
    ? 1
    : factorial_helper(n, n);
}

// t(n) = Θ(n), s(n) = Θ(1)

// Q7
// b**e recursively by b * b**e-1. Recursive. t(e) = Θ(n), s(e) = Θ(n)

// Q8
// Check if exponent is even, square base iteratively, otherwise, use Q7.
// Both, but recursive always takes place.
// t(e) = Θ(loge)