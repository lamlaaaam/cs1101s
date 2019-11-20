// Studio 12

https://tinyurl.com/y2olvp3b

// Q1
function is_fun(x) {
    return is_compound_function(x) || is_primitive_function(x);
}

function make_composite_function(f1, f2) {
    return list("composite function", f1, f2);
}

function is_composite_function(stmt) {
    return is_tagged_list(stmt, "composite function");
}

function eval_composite_function(stmt, env) {
    const compositeFun = evaluate(operator(stmt), env);
    const args = list_of_values(operands(stmt), env);
    const f1 = list_ref(compositeFun, 1);
    const f2 = list_ref(compositeFun, 2);
    const runf2 = apply(f2, args);
    const runf1 = apply(f1, list(runf2));
    return runf1;
}

...
: is_application(stmt)
          ? is_composite_function(evaluate(operator(stmt), env))
            ? eval_composite_function(stmt, env)
...

const primitive_functions = list(
       list("display",       display         ),
       list("error",         error           ),
       list("+",             (x,y) => is_fun(x) && is_fun(y) ? make_composite_function(x,y) : x + y),
       list("-",             (x,y) => x - y  ),
       list("*",             (x,y) => x * y  ),
       list("/",             (x,y) => x / y  ),
       list("%",             (x,y) => x % y  ),
       list("===",           (x,y) => x === y),
       list("!==",           (x,y) => x !== y),
       list("<",             (x,y) => x <   y),
       list("<=",            (x,y) => x <=  y),
       list(">",             (x,y) => x >   y),
       list(">=",            (x,y) => x >=  y),
       list("!",              x    =>   !   x)
       );

// Q2
function set_name_value(name, val, env, mutable) {
    function scan(names, vals) {
        if (is_null(names)) {
            return error("internal error: name not found");
        } else if (name === head(names)) {
            set_head(head(vals), val);
            set_tail(head(vals), mutable);
        } else {
            scan(tail(names), tail(vals));
        }
    } 
    const frame = first_frame(env);
    return scan(frame_names(frame),
                frame_values(frame));
}

function eval_constant_declaration(stmt, env) {
    set_name_value(constant_declaration_name(stmt),
        evaluate(constant_declaration_value(stmt), env),
        env, false);
}

function eval_variable_declaration(stmt, env) {
    set_name_value(variable_declaration_name(stmt),
        evaluate(variable_declaration_value(stmt), env),
        env, true);
}  

// Q3
function read_eval_print_loop(history, mem, runs) {
    function braces(counter) {
        return counter === 0 ? "" : "}" + braces(counter - 1);
    }
    const prog = prompt("History:" + history + 
                        "\n\n" + "Enter next: ");
    if (prog === "") {
        display("session has ended");
    } else {
        const res = parse_and_eval(mem + "{" + prog + braces(runs));
        read_eval_print_loop(history + "\n" + 
                             prog + " ===> " +
	                         stringify(user_print(res)),
	                         mem + "{" + prog, runs + 1);
    }
}

read_eval_print_loop("", "", 1);
