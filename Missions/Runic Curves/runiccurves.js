// Same note as last question

// from Question 1

function pixels_to_rune(pixels) {
    function rowToRunes(row) {
        let rowRunes = pixels[row][0] ? square : blank;
        for (let i = 1; i < len; i = i + 1) {
            rowRunes = beside_frac(i/(i + 1), 
                                    rowRunes, 
                                    pixels[row][i]
                                        ? square
                                        : blank);
        }
        return rowRunes;
    }
    const len = array_length(pixels);
    let finalRunes = rowToRunes(0);
    for (let i = 1; i < len; i = i + 1) {
        finalRunes = stack_frac(i/(i + 1), finalRunes, rowToRunes(i));
    }
    return finalRunes;
}

// our Curves library

function make_point(x, y) {
  return [x, y];
}

function x_of(pt) {
  return pt[0];
}

function y_of(pt) {
  return pt[1];
}

function unit_circle(t) {
  return make_point(math_sin(2 * math_PI * t), 
                    math_cos(2 * math_PI * t));
}

// resolution is the number of runes to
// place in each row and column
const RESOLUTION = 200;

function initialize_pixels(size) {
    const result = [];
    for (let i = 0; i < size; i = i + 1) {
        result[i] = [];
        for (let j = 0; j < size; j = j + 1) {
            result[i][j] = false;
        }
    }
    return result;
}

function s_generator(pt) {
    return t => make_point(x_of(pt) + math_cos(3 * math_PI * t),
                           y_of(pt) + math_pow(-1, math_round(t)) * 
                                               math_sin(3 * math_PI * t) - 
                                               math_round(t) * 2 + 1);
}

function draw_points_squeezed_to_window(n) {
    function drawer(curve) {
        const pixels = initialize_pixels(RESOLUTION);
        function pointToPixel(x, y) {
            const pixelX = math_round(x * (RESOLUTION - 1));
            const pixelY = math_round((1 - y) * (RESOLUTION - 1));
            pixels[pixelY][pixelX] = true;
        }
        
        const firstPoint = curve(0);
        let xMin = x_of(firstPoint);
        let xMax = x_of(firstPoint);
        let yMin = y_of(firstPoint);
        let yMax = y_of(firstPoint);
        
        for (let i = 1; i <= n; i = i + 1) {
            const x = x_of(curve(i/n));
            const y = y_of(curve(i/n));
            xMin = x < xMin ? x : xMin;
            xMax = x > xMax ? x : xMax;
            yMin = y < yMin ? y : yMin;
            yMax = y > yMax ? y : yMax;
        }
        
        const xPush = -xMin;
        const yPush = -yMin;
        let scale = 1;
        let xTrans = 0;
        let yTrans = 0;
        
        if ((xMax + xPush) > (yMax + yPush)) {
            scale = 1 / (xMax + xPush);
            yTrans = 0.5 * (1 - scale * (yMax + yPush));
        } else {
            scale = 1 / (yMax + yPush);
            xTrans = 0.5 * (1 - scale * (xMax + xPush));
        }
        for (let i = 0; i <= n; i = i + 1) {
            const x = xTrans + scale * (xPush + x_of(curve(i/n)));
            const y = yTrans + scale * (yPush + y_of(curve(i/n)));
            pointToPixel(x, y);
        }
        return show(pixels_to_rune(pixels));
    }
    return drawer;
}

const s = s_generator(make_point(0.5, 0.5));
draw_points_squeezed_to_window(1000)(s);
// should produce the given image