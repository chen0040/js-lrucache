"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MinPQ = exports.MinPQ = function () {
    function MinPQ(comparator) {
        _classCallCheck(this, MinPQ);

        this.comparator = comparator;
        this.pq = [null];
        this.qp = {};
        this.values = {};
        this.N = 0;
    }

    _createClass(MinPQ, [{
        key: "deepCopy",
        value: function deepCopy() {
            var clone = new MinPQ(this.comparator);

            clone.pq = [];
            clone.qp = {};
            clone.values = {};
            clone.N = this.N;
            for (var i = 0; i < this.pq.length; ++i) {

                clone.pq.push(this.pq[i]);
                clone.qp[this.pq[i]] = this.qp[this.pq[i]];
                clone.values[this.pq[i]] = Object.assign({}, this.values[this.pq[i]]);
            }

            return clone;
        }
    }, {
        key: "add",
        value: function add(key, value) {
            if (!value) value = key;
            this.values[key] = value;
            if (this.pq.length < this.N + 1) {
                this.pq.push(null);
            }
            this.N += 1;

            this.pq[this.N] = key;
            this.qp[key] = this.N;

            this.swim(this.N);
        }
    }, {
        key: "put",
        value: function put(key, value) {
            if (key in this.values) {
                var pos = this.qp[key];
                var cmp = this.comparator(this.values[key], value);
                if (cmp < 0) {
                    this.values[key] = value;
                    this.sink(pos);
                } else if (cmp > 0) {
                    this.values[key] = value;
                    this.swim(pos);
                }
            } else {
                this.add(key, value);
            }
        }
    }, {
        key: "get",
        value: function get(key) {
            return this.values[key];
        }
    }, {
        key: "containsKey",
        value: function containsKey(key) {
            return key in this.values;
        }
    }, {
        key: "size",
        value: function size() {
            return this.N;
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return this.N == 0;
        }
    }, {
        key: "remove",
        value: function remove() {
            if (this.N == 0) {
                return { key: undefined, value: undefined };
            }
            var key = this.pq[1];
            var value = this.values[key];
            delete this.values[key];

            this.exchange(1, this.N);
            this.N -= 1;
            this.sink(1);
            return { key: key, value: value };
        }
    }, {
        key: "peek",
        value: function peek() {
            if (this.N == 0) {
                return undefined;
            }
            return { key: this.pq[1], value: this.values[this.pq[1]] };
        }
    }, {
        key: "swim",
        value: function swim(k) {
            while (k > 1) {
                var parent = Math.floor(k / 2);
                if (this.comparator(this.values[this.pq[parent]], this.values[this.pq[k]]) > 0) {
                    this.exchange(parent, k);
                    k = parent;
                } else {
                    break;
                }
            }
        }
    }, {
        key: "sink",
        value: function sink(k) {
            while (k * 2 <= this.N) {
                var child = k * 2;
                if (child < this.N && this.comparator(this.values[this.pq[child + 1]], this.values[this.pq[child]]) < 0) {
                    child += 1;
                }
                if (this.comparator(this.values[this.pq[child]], this.values[this.pq[k]]) < 0) {
                    this.exchange(child, k);
                    k = child;
                } else {
                    break;
                }
            }
        }
    }, {
        key: "exchange",
        value: function exchange(i, j) {
            var temp = this.pq[i];
            this.pq[i] = this.pq[j];
            this.pq[j] = temp;

            this.qp[this.pq[i]] = i;
            this.qp[this.pq[j]] = j;
        }
    }]);

    return MinPQ;
}();

var LRUCache = function () {
    function LRUCache(maxCapacity) {
        _classCallCheck(this, LRUCache);

        this.maxCapacity = maxCapacity;
        this.counter = 0;
        this.pq = new MinPQ(function (a, b) {
            return a.time - b.time;
        });
    }

    _createClass(LRUCache, [{
        key: "get",
        value: function get(key) {
            if (this.pq.containsKey(key)) {
                var result = this.pq.get(key);
                this.update(key);
                return result;
            } else {
                return undefined;
            }
        }
    }, {
        key: "update",
        value: function update(key) {
            if (this.pq.containsKey(key)) {
                var value = this.pq.get(key);
                this.counter += 1;
                var newValue = Object.assign({}, value, { time: this.counter });
                this.pq.put(key, newValue);
                delete value.time;
                return value;
            }
        }
    }, {
        key: "containsKey",
        value: function containsKey(key) {
            return this.pq.containsKey(key);
        }
    }, {
        key: "put",
        value: function put(key, value) {
            this.counter += 1;
            var newValue = Object.assign({}, value, { time: this.counter });
            this.pq.put(key, newValue);
            if (this.pq.size() > this.maxCapacity) {
                this.pq.remove();
            }
        }
    }, {
        key: "size",
        value: function size() {
            return this.pq.size();
        }
    }, {
        key: "deepCopy",
        value: function deepCopy() {
            var clone = new LRUCache();
            clone.maxCapacity = this.maxCapacity;
            clone.counter = this.counter;
            clone.pq = this.pq.deepCopy();
            return clone;
        }
    }, {
        key: "copy",
        value: function copy() {
            var clone = new LRUCache();
            clone.maxCapacity = this.maxCapacity;
            clone.counter = this.counter;
            clone.pq = this.pq;
            return clone;
        }
    }]);

    return LRUCache;
}();

exports.default = LRUCache;