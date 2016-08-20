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





