function is_leap_year(year) {
    if (year % 4 === 0 && year % 100 !== 0) {
        return true;
    } else if (year % 100 === 0 && year % 400 === 0) {
        return true;
    } else { return false; }
}

function days_since_Jan01(year, month, day) {
    const isLeapYear = is_leap_year(year);
    const daysInMonth = m => m === 2 ? 28
                           : m <= 7 && m % 2 === 0 ? 30
                           : m > 7 && m % 2 !== 0 ? 30
                           : 31;
    let monthDiff = 0;
    for (let m = 1; m < month; m = m + 1) {
        monthDiff = monthDiff + daysInMonth(m);
    }
    const dayDiff = day - 1;
    return display(monthDiff + dayDiff + (isLeapYear && month > 2 ? 1 : 0));
}

function days_since_2000Jan01(year) {
    let total = 0;
    const earlier = math_min(2000, year);
    const later = math_max(2000, year);
    for (let y = earlier; y < later; y = y + 1) {
        total = total + days_since_Jan01(y, 12, 31) + 1;
    }
    return earlier === 2000 ? total : -total;
}

function day_of_week(year, month, day) {
    const daysPassed = days_since_2000Jan01(year) +
                       days_since_Jan01(year, month, day);
    const monthList = ['Saturday','Sunday','Monday','Tuesday',
                        'Wednesday', 'Thursday', 'Friday'];
    const weeks = daysPassed % 7;
    return monthList[weeks < 0 ? 7 + weeks : weeks];
}

function make_empty_chart(rows, cols) {
    const arr = [];
    for (let i = 0; i < rows; i = i + 1) {
        arr[i] = [];
        for (let k = 0; k < cols; k = k + 1) {
            arr[i][k] = '.';
        }
    }
    return arr;
}

function draw_bar_chart(bar_data) {
    const dataLen = array_length(bar_data);
    let longestB = -Infinity;
    let longestT = -Infinity;
    for (let i = 0; i < dataLen; i = i + 1) {
        const label = head(bar_data[i]);
        const bar = tail(bar_data[i]);
        longestB = math_max(longestB, bar);
        longestT = math_max(longestT, array_length(label));
    }
    const cols = (dataLen + 1) * 3 + dataLen;
    const rows = longestB + longestT + 1;
    
    const chart = make_empty_chart(rows, cols);
    for (let i = 0; i < cols; i = i + 1) {
        chart[longestB][i] = '=';
    }
    let dataI = 0;
    for (let c = 3; c < cols; c = c + 4) {
        const label = head(bar_data[dataI]);
        const labelL = array_length(head(bar_data[dataI]));
        const bar = tail(bar_data[dataI]);
        for (let r = longestB - bar; r < longestB; r = r + 1) {
            chart[r][c] = '#';
        }
        let labelI = 0;
        for (let r = longestB + 1; r <= longestB + labelL; r = r + 1) {
            chart[r][c] = label[labelI];
            labelI = labelI + 1;
        }
        dataI = dataI + 1;
    }
    return chart;
}

function show_chart(chart) {
    const r = array_length(chart);
    const c = array_length(chart[0]);
    let res = "";
    for (let i = 0; i < r; i = i + 1) {
        for (let k = 0; k < c; k = k + 1) {
            const ch = chart[i][k];
            res = res + ch;
        }
    }
    return res;
}

const bar_data = [pair(["Y", "O", "U"], 3),
                  pair(["M", "E"], 0),
                  pair(["T", "O", "M"], 4),
                  pair(["J", "A", "N", "E"], 2)];
const bar_chart = draw_bar_chart(bar_data);
show_chart(bar_chart);

function list_matrix_to_array_matrix(LM) {
    const res = [];
    for (let s = LM; !is_null(s); s = tail(s)) {
        res[array_length(res)] = [];
        for (let m = head(s); !is_null(m); m = tail(m)) {
            const num = head(m);
            const arr = res[array_length(res) - 1];
            arr[array_length(arr)] = num;
        }
    }
    return res;
}

const LM1 = list(list(3,4,5));
const LM2 = list(list(3), list(4), list(5));
const LM3 = list(list(1,0,2,1,4),
                 list(1,2,0,0,0),
                 list(0,1,1,2,0),
                 list(2,1,0,1,1),
                 list(0,4,2,3,0),
                 list(3,1,0,1,1),
                 list(0,1,0,2,0));
                 
function make_sum_area_table(M) {
    const S = [];
    const rows = array_length(M);
    const cols = array_length(M[0]);
    for (let r = 0; r < rows; r = r + 1) {
        S[r] = [];
        for (let c = 0; c < cols; c = c + 1) {
            const num = M[r][c];
            const left = c - 1 < 0 ? 0 : S[r][c - 1];
            const up = r - 1 < 0 ? 0 : S[r - 1][c];
            const overlap = c - 1 < 0 || r - 1 < 0 ? 0 : S[r - 1][c - 1];
            S[r][c] = num + left + up - overlap;
        }
    }
    return S;
}

const M = [[1, 2, 3, 4],
           [2, 3, 4, 5],
           [3, 4, 5, 6]];
make_sum_area_table(M);

function fast_submatrix_sum(sat, min_row, min_col, max_row, max_col) {
    const bigArea = sat[max_row][max_col];
    const leftArea = min_col - 1 < 0 ? 0 : sat[max_row][min_col - 1];
    const upArea = min_row - 1 < 0 ? 0 : sat[min_row - 1][max_col];
    const overlap = min_row - 1 < 0 || min_col - 1 < 0 ? 0 : sat[min_row - 1][min_col - 1];
    return bigArea - leftArea - upArea + overlap;
}