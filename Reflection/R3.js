// Reflection 3

// Q1
/*

f(y => y + z);
f(y => y + 1);
(y => y + 1)(z);
(y => y + 1)(3);
4;

*/

// Q2
function my_sum(n) {
    return n === 1
        ? 2
        : n * (n+1) + my_sum(n-1);
}

// Q3
// Recursive. t(n) = Θ(n). s(n) = Θ(n).

// Q4
function sum(term, a, next, b) {
    return (a > b) ? 0
                   : term(a) + sum(term, next(a), next, b);
}

function my_sum2(n) { 
    return sum(x => x * (x+1), 1, x => x + 1, n); 
}

// Q5
function sum_iter(term, a, next, b, sum) {
    return a > b
        ? sum
        : sum_iter(term, next(a), next, b, sum + term(a));
}

// Q6
// (a) x, f, g, y, h.

// (b) x => x + g(x) - x is local func para, g is para of f.
// y(f) - local para of h.
// h(f, y) - h is func h. f, y are para of func g.

// (c) 12

// (d) 7
