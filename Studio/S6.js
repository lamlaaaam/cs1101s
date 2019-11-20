// Studio 6

// Q1
function my_map(f, xs) {
    return accumulate((x, y) => pair(f(x), y), null, xs);
}
my_map(x=>x+1, list(1,2,3,4,5));

// Q2
function remove_duplicates(lst) {
    return is_null(lst)
        ? null
        : pair(head(lst), remove_duplicates(filter(x => !equal(x, head(lst)), tail(lst))));
}
remove_duplicates(list(1,2,'A',3,'A',4,2,1,4,6,7));


// Q3 in class
function remove_duplicates(lst) {
    return accumulate((x,y) => member(x, y) === null ? pair(x, y) : y, null, lst);
}

// Q4
function makeup_amount(x, coins) {
    if (x === 0) {
        return list(null);
    } else if (x < 0 || is_null(coins)) {
        return null;
    } else {
        const combi_A = makeup_amount(x, tail(coins));
        const combi_B = makeup_amount(x - head(coins), tail(coins));
        const combi_C = map(combi => pair(head(coins), combi), combi_B);
        return append(combi_A, combi_C);
    }
}

makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50));

// Q5
function accumulate_n(op, init, seqs) {
    return is_null(head(seqs))
        ? null
        : pair(accumulate((x, y) => op(head(x), y), init, seqs),
               accumulate_n(op, init, map(x => tail(x), seqs)));
}

const test = list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9), list(10, 11, 12));
accumulate_n((x,y) => x+y, 0, test);

// Q6 in class
function accumulate_tree(op, initial, seq) {
    return accumulate((x, y) => is_list(x) ? op(accumulate_tree(op, initial, x), y) : op(x, y),
                      initial,
                      seq);
}

const test = list(1, 2, list(3, 4), list(5, list(6, 7)));
accumulate_tree((x,y) => x+y, 0, test);


// Challenge A
function subsets(xs) {
    if (is_null(xs)) {
        return list(list());
    } else {
        const subsetA = subsets(tail(xs));
        const subsetB = map(x => pair(head(xs), x), subsetA);
        return append(subsetA, subsetB);
    }
}

subsets(list(2,1));

// Challenge B
function permutations(xs) {
    if (is_null(xs)) {
        return list(list());    
    } else {
        const tailPerms = permutations(tail(xs));
        const insertBack = (perm, x, obj) => append(reverse(member(x, reverse(perm))), 
                                                       pair(obj, tail(member(x, perm)))); 
        const addHeadToCombi = perm => pair(pair(head(xs), perm), map(x => insertBack(perm, x, head(xs)), perm));                                               
        return accumulate(append, null, map(x => addHeadToCombi(x), tailPerms));
    }
}

permutations(list(1,2,3));
