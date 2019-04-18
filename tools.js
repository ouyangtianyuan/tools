

//兼容浏览器所封装的方法


function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}; //取消冒泡事件封装方法


function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
} //阻止默认菜单封装方法


function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false)
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}; //事件封装方法

function removeEvent(elem, type, handle) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handle, false)
    } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, function () {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle = null;
    }
}; //清除事件封装方法


function getViewportOffset() {
    if (window.innerWidth) {
        return {
            x: window.innerWidth,
            y: window.innerHeight
        }

    } else {

        if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clienHieght
            }

        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }

        }

    }
}; //获取窗口尺寸封装方法




Element.prototype.myChild = function () {

    var child = this.childNodes;
    var len = child.length;
    var arr = [];

    for (i = 0; i < len; i++) {
        if (child[i].nodeType == 1) {
            arr.push(child[i])
        }

    }
    return arr;
}; //获取子元素原型封装方法

function retSibling(e, n) {
    while (n && e) {
        if (n > 0) {
            if (e.nextElementSibling) {
                e = e.nextElementSibling;

            } else {
                for (e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);
            }
            n--;
        } else {
            if (e.previousElementSibling) {
                e = e.previousElementSibling;

            } else {
                for (e = e.previousSibling; e && e.nodeType != 1; e = e.previousSibling);
            }
            n++;
        }
    }
    return e;
}; //获取兄弟元素节点封装方法


function retParent(ele, n) {
    while (n && ele) {
        ele = ele.parentNode;
        n--;
    }
    return ele;
};//获取祖辈元素节点封装方法

function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }

    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}; //获取滚动尺寸封装方法




Document.prototype.getByClassName = function (className) {

    var arr = document.getElementsByTagName("*");
    var allDomArr = Array.prototype.slice.call(arr, 0);
    var fillterArr = [];
    function dealClass(dom) {
        var reg = /\s+/g;
        var arrClassName = dom.className.replace(reg, " ").trim();
        return arrClassName
    }
    allDomArr.forEach(function (ele, index) {
        var itemClassArr = dealClass(ele).split(" ");
        for (var i = 0; i < itemClassArr.length; i++) {
            if (itemClassArr[i] == className) {
                fillterArr.push(ele);
                break;
            }
        }
    })
    return fillterArr;
};//获取className命名元素原型封装方法




function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop]; //null可添伪元素
    } else {
        return elem.currentStyle[prop];
    }
}; //获取属性样式封装方法



function startMove(obj, json, callback) {
    clearInterval(obj.timer);
    var speed, cur;
    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in json) {
            if (attr == 'opacity') {
                cur = parseFloat(getStyle(obj, attr)) * 100
            } else {
                cur = parseInt(getStyle(obj, attr))
            }
            speed = (json[attr] - cur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (attr == 'opacity') {
                obj.style[attr] = (cur + speed) / 100;
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
            if (json[attr] != cur) {
                bStop = false;
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            typeof callback == 'function' ? callback() : '';
        }
    }, 30)
};//缓冲运动封装方法

function inherit(Target, Origin) {
    function F() { };
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    Target.prototype.uber = Origin.prototype;
}//圣杯模式
var inherit = (function () {
    var F = function () { };
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;
    }
}()) //雅虎

//继承方法封装


function drag(elem) {
    var disX,
        disY;
    addEvent(elem, 'mousedown', function (e) {
        var event = e || window.event;
        disX = event.clientX - parseInt(getStyle(elem, 'left'));
        disY = event.clientY - parseInt(getStyle(elem, 'top'));
        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        stopBubble(event);
    });

    function mouseMove(e) {
        var event = e || window.event;
        elem.style.left = event.clientX - disX + 'px';
        elem.style.top = event.clientY - disY + 'px';
    };

    function mouseUp(e) {
        var event = e || window.event;
        removeEvent(document, 'mousemove', mouseMove)
    };
    addEvent(document, 'contextmenu', contextMenu)
    function contextMenu(e) {
        var event = e || window.event;
        event.preventDefault();
    }
}; //拖拽事件封装方法


function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrolLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}; //获取浏览器滚动尺寸封装方法


function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode == "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}; //获取浏览器窗口的尺寸封装方法


function deepClone(origin, target) {
    var target = target || {},
        toStr = Object.prototype.toString,
        arrStr = "[object Array]";
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] !== "null" && typeof (origin[prop]) == 'object') {
                if (toStr.call(origin[prop]) == arrStr) {
                    target[prop] = [];
                } else {
                    target[prop] = {};
                } // 三目运算符（判断条件？是：否）target[prop]=toStr.call(origin[prop])==arrStr?[]:{};
                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}; //深度克隆封装方法


function type(target) {

    var temp = {
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Boolean]": "boolean-object",
        "[object String]": "string-object",
        "[object Number]": "number-object"
    },

        typ = typeof (target);

    if (target === null) {
        return "null"
    } else if (typ == "object") {
        var toStr = Object.prototype.toString.call(target);
        return temp[toStr]
    } else {
        return typ
    }

}; //返回类型封装方法


Array.prototype.unique = function () {
    var temp = {},
        arr = [],
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = "abc";
            arr.push(this[i])
        }
    }
    return arr
}; //数组去重原型封装方法1

Array.prototype.unique = function () {
    var newArr = [];
    for (var i = 0; i < this.length; i++) {
        for (var j = i + 1; j < this.length; j++) {
            if (this[j] == this[i]) {
                j = ++i
            }
        }
        newArr.push(this[i])
    }
    return newArr
}; //数组去重原型封装方法2


function unique(arr) {
    var newArr = [];
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
} //数组去重原型封装方法3

String.prototype.uniquestr = function () {
    var temp = {},
        newStr = '';
    for (var i = 0; i < this.length; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = 'abc';
            newStr += this[i]
        }
    }
    return newStr;
}; //字符串去重封装方法1

function uniqueStr(str) {

    var newStr = '',
        len = str.length
    for (var i = 0; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
            if (str[j] === str[i]) {
                j = ++i
            }
        }
        newStr += str[i]
    }
    return newStr
}; //字符串去重封装方法2


function uniqueStrOne(str) {
    var temp = {};
    for (var i = 0; i < str.length; i++) {
        if (temp[str[i]]) {
            temp[str[i]]++;
        } else {
            temp[str[i]] = 1;
        }
    }
    for (var a in temp) {
        if (temp[a] == 1) {
            return a;
        }
    }
}; //字符串第一次只出现一次封装方法

Element.prototype.insertAfter = function (target, after) {
    var before = after.nextElementSibling;

    if (before == null) {
        this.appendChild(target);
    } else {
        this.insertBefore(target, before);
    }
}; //在元素子节点之后插入元素节点原型封装方法


function reverseChild(elem) {
    var child = elem.children,
        len = child.length;
    for (var i = len - 2; i >= 0; i--) {
        var children = elem.removeChild(child[i]);
        elem.appendChild(children)
    }
};
Element.prototype.reverseChild = function () {
    var child = this.children,
        len = child.length;
    for (var i = len - 2; i >= 0; i--) {
        var children = this.removeChild(child[i]);
        this.appendChild(children)
    }
}; //给元素子节点逆序封装方法

function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "complete" || script.readyState == "loaded") {
                callback();
            }
        }
    } else {
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}; // js异步加载封装方法


function memorize(fn) {
    var temp = {};
    return function () {
        var key = arguments.length + Array.prototype.join.call(arguments);
        if (temp[key]) {
            return temp[key]
        } else {
            temp[key] = fn.apply(this, arguments);
            return temp[key]
        }
    }
};//性能优化函数记忆封装方法

function throttle(handler, wait) {
    var lastTime = 0;
    return function (e) {
        var nowTime = new Date().getTime();
        if (nowTime - lastTime > wait) {
            handler.apply(this, arguments);
            lastTime = nowTime;
        }
    }
};//优化网络请求性能（节流）封装方法

function debounce(handler, delay) {
    var timer = null;
    return function () {
        var _self = this,
            _arg = arguments;
        clearTimeout(timer)
        timer = setTimeout(function () {
            handler.apply(_self, _arg)
        }, delay)
    }
};//优化页面请求性能（防抖）封装函数



function FixedCurry(fn) {
    var args = [].slice.call(arguments, 1)
    return function () {
        var newArg = args.concat([].slice.call(arguments, 0));
        return fn.apply(this, newArg);
    }
}//浅度柯里化封装函数
function Curry(fn, length) {
    var length = length || fn.length;
    return function () {
        if (arguments.length < length) {
            var combined = [fn].concat([].slice.call(arguments, 0));
            return Curry(FixedCurry.apply(this, combined), length - arguments.length);
        } else {
            return fn.apply(this, arguments);
        }
    }
}//柯里化封装函数


Array.prototype.flatten = function () {
    var resArr = [],
        len = this.length;
    this.forEach(function (item) {
        var type = Object.prototype.toString.call(item)
        type == '[object Array]' ? resArr = resArr.concat(item.flatten()) : resArr.push(item)
    })
    return resArr
}
function flatten1(arr) {
    var arr = arr || [];
    return arr.reduce(function (prev, next) {
        return Object.prototype.toString.call(next) == '[object Array]' ? prev.concat(flatten1(next)) : prev.concat(next)
    }, [])
}
const flatten2 = arr => arr.reduce((prev, next) => Object.prototype.toString.call(next) == '[object Array]' ?
    prev.concat(flatten1(next)) : prev.concat(next), [])//Es6
//js数据扁平化封装函数


Array.prototype.myFilter = function (fn) {
    var arr = [],
        len = this.length,
        toStr = Object.prototype.toString,
        arrStr = "[object Array]"
    for (var i = 0; i < len; i++) {
        if (fn(this[i], i)) {
            if (typeof this[i] == 'object') {
                toStr.call(this[i]) == arrStr ? arr.push(deepClone([], this[i])) : arr.push(deepClone({}, this[i]))
            } else {
                arr.push(this[i])
            }
        }
    }
    return arr
}//遍历筛选封装方法

Array.prototype.myReduce = function (fn, init) {
    var len = this.length,
        i = 0;
    if (init === undefined) {
        init = this[0];
        i = 1;
    }
    for (i; i < len; i++) {
        init = fn(init, this[i], i)
    }
    return init
}//reduce的模拟封装方法

function compose() {
    var args = Array.prototype.slice.call(arguments);
    return function (x) {
        return args.reduce(function (res, cb) {
            return cb(res)
        }, x)
    }
}
function compose1() {
    var args = Array.prototype.slice.call(arguments),
        len = args.length - 1;
    return function (x) {
        var result = args[len](x)
        while (len--) {
            result = args[len](result)
        }
        return result
    }
}//函数组合运用封装方法


function ajax(method, url, date, callback, flag) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }
    method = method.toUpperCase();
    if (method == 'GET') {
        xhr.open(method, url + '?' + date, flag);
        xhr.send();
    } else if (method == 'POST') {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(date);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText)
            }
        }
    }
}//ajax函数封装

function cookie() {
    var cookie = {
        setCookie: function (name, value, time) {
            var date = new Date();
            date.setDate(date.getDate() + time);
            document.cookie = name + '=' + value + ';expires=' + date;
            return this;
        },
        removeCookie: function (name) {
            return this.setCookie(name, '', -1)
        },
        getCookie: function (name, callback) {
            var allCookie = document.cookie.split('; ');
            for (var i = 0; i < allCookie.length; i++) {
                var itemCookie = allCookie[i].split('=');
                if (itemCookie[0] == name) {
                    callback(itemCookie[1]);
                    return this;
                }
            }
            callback(undefined);
            return this;
        }
    }
    return cookie;
}//cookie函数封装


// 计时器封装方法
window.animation = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60)
        }
})()//设置计时器
window.clearAnimation = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        function (id) {
            window.clearTimeout(id)
        }
})()//清除计时器



function Random(n) {
    let max = 1;
    for (let i = 0; i < n; i++) {
        max *= 10;
    }
    return (function () {
        let str = '' + parseInt(Math.random() * max)
        let count = n - str.length;
        for (let i = 0; i < count; i++) {
            str += '0';
        }
        return str;
    })()
}//返回长度为n的随数字字符串的函数

Array.prototype.RandomSort = function(){
    var len = this.length;
    var temp;
    for(var i = 0; i< len; i++){
        var index = Math.ceil(Math.random()*(len - 1));
        temp = this[index];
        this[index] =  this[i];
        this[i] = temp;
    }
    return this;
}//数组乱序

Array.prototype.unique = function () {
    let maps = new Map();
    let res = [];
    this.forEach(item => {
        if (!maps.has(item)) {
            maps.set(item);
            res.push(item)
        }
    })
    return res;
}//Map方法去重数组


function bubbleSort(arr) {
    let len = arr.length;
    for (var i = len; i >= 2; i--) {
        for (var j = 0; j < i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                var temp;
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}//数组冒泡排序



function selectSort(arr){
    var len= arr.length
    for(var i = 0; i < len; i++){
        var max = 0;
        for(var j = 0; j < len - i; j++){
            if(arr[j] > arr[max]){
                max = j
            }
        }
        var temp = arr[max]
        arr[max] = arr[len - i -1]
        arr[len - i - 1] = temp
    }
    return arr
} // 数组选择排序


function myMap() {
    this.init()
}
myMap.prototype.len = 8
myMap.prototype.bucket = []
myMap.prototype.init = function () {
    for (let i = 0; i < this.len; i++) {
        this.bucket[i] = { next: null }
    }
}
myMap.prototype.makeHash = function (key) {
    let hash = 0
    if (typeof key == 'string') {
        //取后三位字符串处理
        let len = (key.length > 3) ? key.length : 3
        for (let i = len - 3; i < len; i++) {
            hash += (key[i] !== undefined) ? key[i].charCodeAt() : 0
        }
    } else if (isNaN(key)) {
        hash = 0
    } else {
        hash = + key
    }
    return hash
}
myMap.prototype.set = function (key, value) {
    let hash = this.makeHash(key)
    let list = this.bucket[hash % this.len]
    let nextNode = list
    while (nextNode.next) {
        if (nextNode.next.key === key) {
            nextNode.next.value = value
            return
        } else {
            nextNode = nextNode.next
        }
    }
    nextNode.next = { key, value, next: null }
}
myMap.prototype.get = function (key) {
    let hash = this.makeHash(key);
    let list = this.bucket[hash % this.len]
    let nextNode = list
    while (nextNode.next) {
        if (nextNode.next.key === key) {
            return nextNode.next.value
        } else {
            nextNode = nextNode.next
        }
    }
    return undefined
}
myMap.prototype.has = function (key) {
    let hash = this.makeHash(key);
    let list = this.bucket[hash % this.len]
    let nextNode = list
    while (nextNode.next) {
        if (nextNode.next.key === key) {
            return true
        } else {
            nextNode = nextNode.next
        }
    }
    return false
}
myMap.prototype.delete = function (key) {
    let hash = this.makeHash(key);
    let list = this.bucket[hash % this.len]
    let nextNode = list
    while (nextNode.next) {
        if (nextNode.next.key === key) {
            nextNode.next = nextNode.next.next
            return true
        } else {
            nextNode = nextNode.next
        }
    }
    nextNode.next = { key, value, next: null }
    return false
}
myMap.prototype.clear = function () {
    this.init()
}//模拟Map方法




function createIterator(arr = []) {
    var nextIndex = 0;
    return {
        next() {
            if (nextIndex > arr.length - 1) {
                return {
                    value: undefined,
                    done: true
                }
            } else {
                return {
                    value: arr[nextIndex++],
                    done: false
                }
            }
        }
    }
}//数组迭代器


class myPromise {
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw TypeError(`myPromise resolver ${fn} is not a function`)
        }
        this.status = 'pending'
        this.data = undefined
        this.resolvedCBArr = []
        this.rejectedCBArr = []
        let resolved = (data) => {
            setTimeout(() => {
                if (this.status == 'pending') {
                    this.status = 'resolved'
                    this.data = data
                    this.resolvedCBArr.forEach(fn => fn())
                }
            }, 0)
        }
        let rejected = (data) => {
            if (this.status == 'pending') {
                setTimeout(() => {
                    this.status = 'rejected'
                    this.data = data
                    this.rejectedCBArr.forEach(fn => fn())
                }, 0)
            }
        }
        fn(resolved, rejected)
    }
    then(resolvedFn, rejectedFn) {
        if (this.status == 'resolved') {
            let res = resolvedFn(this.data)
            if (res instanceof myPromise) {
                return res
            } else {
                return myPromise.resolved(res)
            }
        }
        if (this.status == 'rejected') {
            let res = rejectedFn(this.data)
            if (res instanceof myPromise) {
                return res
            } else {
                return myPromise.resolved(res)
            }
        }
        if (this.status == 'pending') {
            return new Promise((resolved, rejected) => {
                this.resolvedCBArr.push(((resolvedFn) => {
                    return () => {
                        let res = resolvedFn(this.data)
                        if (res instanceof myPromise) {
                            res.then(resolved, rejected)
                        } else {
                            resolved(res)
                        }
                    }
                })(resolvedFn))
                this.rejectedCBArr.push(((rejectedFn) => {
                    return () => {
                        let res = rejectedFn(this.data)
                        if (res instanceof myPromise) {
                            res.then(resolved, rejected)
                        } else {
                            resolved(res)
                        }
                    }
                })(rejectedFn))
            })
        }
    }
    static resolved(data) {
        return new myPromise(resolved => resolved(data))
    }
    static rejected(data) {
        return new myPromise(rejected => rejected(data))
    }
} //模拟Promise函数封装



let nodeHead = { type: 'head', next: null }
class node {
    constructor(key) {
        this.key = key
        this.next = null
    }
}
function insertNode(startNode, node, num = Infinity) {
    if (num < 1) {
        return
    }
    while (startNode.next && --num > 0) {
        startNode = startNode.next
    }
    let nextNode = startNode.next
    startNode.next = node
    node.next = nextNode
} //节点链表插入
function findRing(nodeHead) {
    let point1 = nodeHead.next
    let point2 = point1 && point1.next
    while (point1 && point2) {
        if (point1 == point2) {
            return true
        }
        point1 = point1.next
        point2 = point2.next
        point2 = point2 && point2.next
    }
    return false
}//检测是否有环

function evenOne(arr) {
    var len = arr.length;
    var obj = {}
    var newArr = []
    for (var i = 0; i < len; i++) {
        if (obj[arr[i]]) {
            obj[arr[i]]++
        } else {
            obj[arr[i]] = 1
        }
    }
    for (var p in obj) {
        if (obj[p] == 1) {
            newArr.push(parseInt(p))
        }
    }
    return newArr
} //找出数组只出现一次数字的方法1
function evenOne1(arr) {
    var len = arr.length
    var res = []
    for (var i = 0; i < len; i++) {
        if (arr.indexOf(arr[i]) == arr.lastIndexOf(arr[i])) {
            res.push(arr[i])
        }
    }
    return res
}//找出数组只出现一次数字的方法2
function  xorOne(arr){
    var len = arr.length
    var res = 0
    for(var i = 0; i < len; i++){
        res = res ^ arr[i]
    }
    return res
} //找出数组只出现一次有且只有一个不重复的数字，异或思想



var single = function (fn) {
    var res = null;
    return function () {
        if (!res) {
            res = fn.apply(this, arguments)
        }
        return res
    }
} //单例模式