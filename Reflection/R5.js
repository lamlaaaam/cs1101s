// Reflection 5

// Q1
// T F T T T
// T F F T

// Q2
function square_list(xs) {
    return map(x => x * x, xs);
}
// square_list : (List of numbers) --> (List of numbers)

// Q3
function shallow_copy(xs) {
    return map(x => x, xs);
}
// returns a shallow_copy of a list of list of numbers

// Q4
function sum_tree(tree) {
    return is_null(tree)
        ? 0
        : is_list(head(tree))
            ? sum_tree(head(tree)) + sum_tree(tail(tree))
            : head(tree) + sum_tree(tail(tree));
}

function sumTree(tree) {
    function helper(currTree, sum) {
        return is_null(currTree)
            ? sum
            : !is_list(head(currTree))
                ? helper(tail(currTree), head(currTree) + sum)
                : helper(tail(currTree), sumTree(head(currTree)) + sum);
    }
    return helper(tree, 0);
}

const my_tree = list(1, list(2, list(3, 4), 5), list(6, 7));
sumTree(my_tree);





