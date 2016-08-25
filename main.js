/**
 * Created by lenovo on 2016/8/20.
 */

//    ###################part1

var Quo = function (string) {
    this.status = string;
};

//    Quo.prototype.get_status = function () {
//        return this.status;
//    };

//    Quo.status = 'confused';
//
//    console.log(Quo.get_status());
//    var myQuo = new Quo('confused');
//
//    console.log(myQuo.get_status());

//    ###################part2

Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};

//    Object.prototype.method = function (name, func) {
//        this.prototype[name] = func;
//        return this;
//    };

Quo.method('get_status', function () {
    return this.status;
});

var myQuo = new Quo('confused');

console.log(myQuo.get_status());


//####################提取整数部分

Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});

document.writeln((-10 / 3).integer());

//##################移除字符串首尾空白

String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});

document.writeln('"' + "        neat        ".trim() + '"');

//###############getElementsByAttribute

var walk_the_DOM = function walk (node, func) {
    func(node);
    node = node.firstChild;

    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};

var getElementsByAttribute = function (att, value) {
    var results = [];

    walk_the_DOM(document.body, function (node) {

        // 节点是元素节点nodeType返回1，节点是属性节点nodeType返回2
        var actual = node.nodeType === 1 && node.getAttribute(att);

        if (typeof actual === 'string' &&
            (actual === value || typeof value !== 'string')) {

            results.push(node);

        }
    });

    return results;
};

// ################javascript不支持块级作用域

var scopeNotSupport = function () {
    for (var i = 0; i < 5; i++) {}

    console.log('i定义了没有？ ' + (i ? true : false));
}();

// ####################颜色从黄色渐变

var fade = function (node) {

    var level = 1;
    var step = function () {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;

        if (level < 15) {

            level += 1;
            setTimeout(step, 100);

        }
    };

    setTimeout(step, 100);

};

fade(document.body);

// ########################伪类

var pseudoclassical = function () {
    // 构造Mammal构造器，并扩充它的原型

    var Mammal = function (name) {
        this.name = name;
    };

    Mammal.method('get_name', function () {
        return this.name;
    });

    Mammal.method('says', function () {
        return this.saying || '';
    });

// 定义一个inherits方法来实现继承

    Function.method('inherits', function (Parent) {
        this.prototype = new Parent();
        return this;
    });

// 构造Cat对象

    var Cat = function (name) {
        this.name = name;
        this.saying = 'meow';
    }
        .inherits(Mammal) // 继承Mammal
        .method('purr', function (n) {
            var i, s = '';
            for (i = 0; i < n; i += 1) {
                if (s) {
                    s += '-';
                }
                s += 'r';
            }
            return s;
        })
        .method('get_name', function () {
            return this.says() + ' ' + this.name + ' ' + this.says();
        });
}();

// ################原型

var aboutPrototype = function () {
    var myMammal = {
        name: 'Herb the Mammal',
        get_name: function() {
            return this.name;
        },
        says: function () {
            return this.saying || '';
        }
    };

    var myCat = Object.create(myMammal);

// ###############判断一个对象是否为数组

// 在JavaScript中，数组实际上就是个对象

// 不信你瞧

    var arr = [
        'zero',
        'one',
        'two',
        'three'
    ];

    console.log('数组的类型是：' + typeof arr);

// 没错，显示object，object! 我靠，我哪知道它是数组还是对象。

// 现在我们有两种办法来判断

// 1、

    var is_array_1 = function (value) {
        return value &&
            typeof value === 'object' &&
            value.constructor === Array;
    };

    console.log('is_array_1 方法：' + is_array_1(arr));

// 这种方法在识别从不同的窗口（window）或帧（frame）里构造的数组时会失败。

// 2、

    var is_array_2 = function (value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    };

    console.log('is_array_2 方法：' + is_array_2(arr));

// #####################数组方法

    Array.method('reduce', function (f, value) {
        var i;
        for (i = 0; i < this.length; i += 1) {
            value = f(this[i], value);
        }
        return value;
    });

    var data = [4, 8, 15];

    var add = function (a, b) {
        return a + b;
    };

    data.total = function () {
        return this.reduce(add, 0);
    };

    total = data.total();

    data['new'] = 5;

    console.log('此时数组data的长度为：' + data.length + '，长度未受新增方法和新增\'new\'索引的影响的影响');

// 这说明了数组的长度只受属性名为整数（不论是字符串还是整数）的新增元素的影响。

    document.write('<br />');
}();

// ####################正则表达式例子

var regExpExample = function () {
    var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

    var url = "http://www.ora.com:80/goodparts?q#fragment";

    var result = parse_url.exec(url);

    var names = ['url', 'scheme', 'slash', 'host', 'port',
        'path', 'query', 'hash'];

    var blanks = '        ';

    document.write('<pre>');

    for (i = 0; i < names.length; i += 1) {
        document.writeln(names[i],':' +
            blanks.substring(names[i].length), result[i]);
    }

    document.writeln('屌你公龟的', 'JavaScript居然还能用逗号连接字符串？！！！');
    document.writeln('屌你公龟的' + 'JavaScript居然还能用逗号连接字符串？！！！');

    document.writeln(result[0]);

    document.write('</pre>');
}();

// ###############方法——数组

var functionOfArray = function () {
    var a = ['a', 'b', 'c'];
    var b = ['x', 'y', 'z'];
    var c = ['i'];

    var d = a.push(b, true); // 返回的是新数组的长度
}();

// #############array.sort()

var arraySort = function () {
    var n = [4, 42, 15, 16, 23, 8];
    n.sort(function (a, b) {
        return a - b;
    });

    console.log("排序后的数组n：" + n);
}();

// #############sort改良

var sortImprove = function () {
    var by = function (name, minor) {
        return function (o, p) {
            var a, b;
            if (o && p && typeof o === 'object' && typeof p === 'object') {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return typeof minor === 'function' ? minor(o, p) : 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            } else {
                throw {
                    name: 'Error',
                    message: 'Expected an object when sorting by ' + name
                };
            }
        };
    };

    var s = [
        {first: 'Joe', last: 'Besser'},
        {first: 'Moe', last: 'Howard'},
        {first: 'Joe', last: 'DeRita'},
        {first: 'Shemp', last: 'Howard'},
        {first: 'Larry', last: 'Fine'},
        {first: 'Curly', last: 'Howard'}
    ];

    s.sort(by('last', by('first')));

    document.writeln('<pre>');
    for (i  = 0; i < s.length; i += 1) {
        document.write('first: ' + s[i].first + ', ' + 'last: ' + s[i].last);
        document.writeln();
    }
    document.writeln('</pre>');

    var c = '|a|b|c|'.split('|');

    document.write('<pre>');
    for (i = 0; i < c.length; i += 1) {
        document.write(c[i] + ', ');
    }
    document.write('</pre>');

    console.log((0.1 * 10 + 0.2 * 10) / 10);

    var t = 'hey,sb!';

    console.log(t);

    var stooge = {
        t: 'wokao'
    };

    console.log('属性：' + stooge.t);
}();

// #########################创建一个函数时的prototype

var functionFund = function () {
    var myFunc = function () {
        return "I'm a function";
    };

    var myObj = {
        myName: 'zhouwunan',
        myDog: 'laoda',
        myBrother: 'zhouyi'
    };

    console.log(myFunc.prototype);

    console.log(myObj.prototype);

    (function () {
        var hidden_variable;

        console.log('diaonigonggui');
    }());

    console.log(new function () {
        this.name = 'zhouwunan'
    }());
}();

// ###################作用域

//var scope = function () {
//
//     var foo = function () {
//        var a = 3, b = 5;
//
//        var bar = function () {
//            var b = 7, c = 11;
//
//            a += b + c;
//
//            console.log('1. a = ' + a + ', b = ' + b + ', c = ' + c);
//        };
//
//        console.log('2. a = ' + a + ', b = ' + b + ', c = ' + c);
//
//        bar();
//        console.log('3. a = ' + a + ', b = ' + b + ', c = ' + c);
//
//    };
//
//    foo();
//}();

var memoization = function () {

    var count = 0;

    var fibonacci = function () {
        var memo = [0, 1];
        var fib = function (n) {
            var result = memo[n];
            //console.log(result);
            count += 1;
            if (typeof result !== 'number') {
                result = fib(n - 1) + fib(n - 2);
                memo[n] = result;
            }

            return result;
        };

        return fib;

    }();

    document.write('<pre>');

    for (var i = 0; i <= 10; i += 1) {
        document.writeln('// ' + i + ': ' + fibonacci(i));
    }
    document.writeln('count: ' + count);

    document.write('</pre>');
}();

document.writeln("#######################################################");

var memoization1 = function () {
    document.write('<pre>');

    var count = 0;

    var memoizer = function (memo, formula) {
        var recur = function (n) {
            count += 1;
            var result = memo[n];
            if (typeof result !== 'number') {
                result = formula (recur, n);
                memo[n] = result;
            }
            return result;
        };
        return recur;
    };

    var fibonacci = memoizer([0, 1], function (recur, n) {
        return recur (n - 1) + recur (n - 2);
    });

    var i;

    document.writeln('书中方法：');
    for (i = 0; i <= 10; i += 1) {
        document.writeln('// ' + i + ': ' + fibonacci(i));
    }

    document.writeln('count = ' + count);
    document.write('</pre>');
}();

document.writeln("#######################################################");

var memoization2 = function () {

    document.write('<pre>');

    var count = 0;

    var memoizer = function (memo, formula) {
        var recur = function (n) {
            count += 1;
            var result = memo[n];
            //console.log(result);
            if (typeof result !== 'number') {
                result = formula (recur, n);
                memo[n] = result;
            }
            return result;
        };
        return recur;
    };

    var fibonacci = function () {

        var memo = [0, 1];

        return memoizer(memo, function (recur, n) {
            return recur (n - 1) + recur (n - 2);
        });

    }();

    var i;

    document.writeln('我的方法：');
    for (i = 0; i <= 10; i += 1) {
        document.writeln('// ' + i + ': ' + fibonacci(i));
    }

    document.writeln('count = ' + count);
    document.write('</pre>');

}();

var Inheritance = function () {


    var Mammal = function (name) {
        this.name = name;
    };

    var myMammal = {};

    myMammal.prototype = new Mammal();

    console.log(myMammal);

}();
