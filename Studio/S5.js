// Q1

[[1, [2, [[3, null], null]]], [[4, [5, null]], [[6, 7], null]]]

[1, [2, [3, [[4, null], null]]]]

[1, [2, [3, [[4, [5, null]], null]]]]

// Q2

// Tail contains data, head points to next list.

// Q3

const lsta = list(7, list(6, 5, 4), 3, list(2, 1));
head(tail(head(tail(tail(tail(lsta))))));

const lstb = list(list(7), list(6, 5, 4), list(3, 2), 1);
head(tail(tail(tail(lstb))));

const lstc = list(7, list(6), list(5, list(4)), list(3, list(2, list(1))));
head(head(tail(head(tail(head(tail(tail(tail(lstc)))))))));

const lstd = list(7, list(list(6, 5), list(4), 3, 2), list(list(1)));
head(head(head(tail(tail(lstd)))));

// Q

function every_second(xs) {
    return length(xs) <= 1
        ? null
        : pair(list_ref(xs, 1), every_second(tail(tail(xs))));
}

const lst = list(1, 4, 3, 2, 6);
every_second(lst);

//Q5
// Recursive
function sums(startList) {
    function every_second_sum(xs, startRank) {
        return length(xs) === 0 || startRank >= length(xs)
            ? 0
            : length(xs) === 1 
                ? head(xs)
                : list_ref(xs, startRank) + 
                  every_second_sum(tail(tail(xs)), startRank);
    }
    return list(every_second_sum(startList, 0), every_second_sum(startList, 1));
}

const lst = list(1, 4, 3, 2, 6);
sums(lst);

// Iterative
function sums(xs) {
    function helper(rank, sumEven, sumOdd) {
        return rank === length(xs)
            ? list(sumEven, sumOdd)
            : rank % 2 === 0
                ? helper(rank + 1, sumEven + list_ref(xs, rank), sumOdd)
                : helper(rank + 1, sumEven, sumOdd + list_ref(xs, rank));
        
    }
    return helper(0, 0, 0);
}

sums(list(1,2,3,4,5,6));


// *******************************************

function app(xs, listToAdd) {
    return length(xs) === 0
        ? listToAdd
        : pair(head(xs), app(tail(xs), listToAdd));
}

function reverse(xs) {
    return length(xs) === 0
        ? null
        : append(reverse(tail(xs)), list(head(xs)));
}

function rev(xs) {
    function helper(oldList, currList) {
        return length(oldList) === 0
            ? currList
            : helper(tail(oldList), pair(head(oldList), currList));
    }
    return helper(xs, null);
}

function split(xs, rank) {
    function helper(headxs, tailxs) {
        return rank === length(headxs)
            ? pair(headxs, tailxs)
            : helper(app(headxs, list(head(tailxs))), 
                     tail(tailxs));
    }
    return helper(null, xs);
}

function insert(xs, rank, element) {
    const splitList = split(xs, rank);
    return app(head(splitList), 
               pair(element, tail(splitList)));
}

insert(list(1,2,3,4,5), 2, 'HELLO');

