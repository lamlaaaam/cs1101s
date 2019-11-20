// Longest distinct subarray

function largestDist(arr) {
    const len = array_length(arr);
    let seenBeforeAt = [];
    let biggest = 0;
    let consec = 0;
    for (let i = 0; i < len; i = i + 1) {
        const val = arr[i];
        consec = consec + 1;
        if (seenBeforeAt[val] === undefined) {
            seenBeforeAt[val] = i;
        } else {
            biggest = consec - 1 > biggest ? consec - 1 : biggest;
            consec = 0;
            i = seenBeforeAt[val];
            seenBeforeAt = [];
        }
    }
    biggest = consec > biggest ? consec : biggest;
    return biggest;
}

const test = [1,1,1,1,5,1,1];
largestDist(test);