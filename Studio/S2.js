// S2: Source Academy Burger Joint

// P1

function biggie_size(combo) {
    return combo + 4;
}

biggie_size(4);

// P2

function unbiggie_size(combo) {
    return combo - 4;
}

unbiggie_size(7);

// P3

function is_biggie_size(combo) {
    return combo >= 5;
}

is_biggie_size(2);

// P4

function combo_price(combo) {
    return is_biggie_size(combo) ? unbiggie_size(combo)*1.17 + 0.5 : combo * 1.17;
}

combo_price(8);

// P5

function empty_order() {
    return 0;
}

empty_order();

// P6

function add_to_order(order,combo) {
    return order*10 + combo;
}

add_to_order(13421,6);

// P7

function last_combo(order) {
    return order % 10;
}

last_combo(12345);

// P8

function other_combos(order) {
    return (order - last_combo(order)) / 10;
}

other_combos(326772);