const path = list(list(2, 4, 2, 3, 3, 1, 5, 3),
                  list(1, 1, 2, 2, 3, 1, 6, 1),
                  list(2, 3, 5, 1, 4, 3, 5, 3),
                  list(2, 4, 2, 3, 3, 1, 5, 2),
                  list(1, 4, 2, 3, 3, 3, 5, 4),
                  list(3, 4, 2, 4, 3, 2, 5, 1),
                  list(2, 6, 2, 3, 3, 1, 5, 1),
                  list(1, 1, 2, 3, 3, 1, 3, 3));


                  
function ways(path){
    const last = pair(length(path) - 1, length(head(path)) - 1);
    const getVal = coor => list_ref(list_ref(path, head(coor)), tail(coor));
    function helper(coor) {
        if (equal(coor, last)) {
            return 1;
        } else if (head(coor) < 0 || head(coor) > length(path) - 1 ||
                   tail(coor) < 0 || tail(coor) > length(head(path)) - 1) {
            return 0;               
        } else {
            const waysRight = helper(pair(head(coor), tail(coor) + getVal(coor)));
            const waysDown = helper(pair(head(coor) + getVal(coor), tail(coor)));
            return waysRight + waysDown;
        }
    }
    return helper(pair(0, 0));
}

ways(path);