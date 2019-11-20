// Reflection 8
// Q1

function make_withdraw(balance, correctPW) {
    let lockCount = 0;
    function withdraw(amount, password) {
        if (lockCount > 2) {
            return "Account disabled";
        } else if (password !== correctPW) {
            lockCount = lockCount + 1;
            return "Wrong password; no withdraw";
        } else if (balance >= amount) {
            lockCount = 0;
            balance = balance - amount;
            return balance;
        } else {
            lockCount = 0;
            return "Insufficient funds";
        }
    }
    return withdraw;
}

const acc = make_withdraw(100, "hey");

