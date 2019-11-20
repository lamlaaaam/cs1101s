// Reflection 4

// Q1
// (a) 
// [1, 2]
// [1][2]    
 
// (b)
// [1, [3, [5, null]]]
// [1][ ]--->[3][ ]--->[5][\]  
  
// (c)
// [[[3, 2], [1, 0]], null]
// [ ][\]
//  |
//  v
// [ ][ ]---> [1][0]
//  |          
//  v
// [3][2]

// (d)
// [0, [1, [2, null]]]
// [0][ ]--->[1][ ]--->[2][\]

// Q2
list(1, 2, 3);
pair(1, pair(2, 3));
list(list(1, 2), list(3, 4), list(5, 6));

// Q3

const lst = list(7, 6, 5, 4, 3, 2, 1);
head(tail(tail(tail(lst))));

const lstb = list(list(7), list(6, 5, 4), list(3, 2), 1);
head(tail(tail(head(tail(lstb)))));

const lstc = list(7, list(6, list(5, list(4, list(3, list(2, list(1)))))));
head(head(tail(head(tail(head(tail(lstc)))))));

const lstd = list(7, list(list(list(6, 5, list(list(4)), 3), 2) ), 1);
head(head(head(tail(tail(head(head(head(tail(lstd)))))))));




  