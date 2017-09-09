import MinPQ from './MinPQ';

class LRUCache {
    constructor(maxCapacity) {
        this.maxCapacity = maxCapacity;
        this.counter = 0;
        this.pq = new MinPQ((a, b) => a.time - b.time);
    }
    
    get(key) {
        if(this.pq.containsKey(key)) {
            return this.pq.get(key);
        } else {
            return undefined;
        }
    }
    
    update(key) {
        if(this.pq.containsKey(key)) {
            let value = this.pq.get(key);
            this.counter += 1;
            let newValue = Object.assign({}, value, { time: this.counter });
            this.pq.put(key, newValue);
            delete value.time;
            return value;
        }
    }
    
    containsKey(key) {
        return this.pq.containsKey(key);
    }
    
    put(key, value) {
        this.counter += 1;
        let newValue = Object.assign({}, value, { time: this.counter });
        this.pq.put(key, newValue);
        if(this.pq.size() > this.maxCapacity) {
            this.pq.remove();
        }
    }
    
    size() {
        return this.pq.size();
    }
    
    deepCopy() {
        let clone = new LRUCache();
        clone.maxCapacity = this.maxCapacity;
        clone.counter = this.counter;
        clone.pq = this.pq.deepCopy();
        return clone;
    }
    
    copy() {
        let clone = new LRUCache();
        clone.maxCapacity = this.maxCapacity;
        clone.counter = this.counter;
        clone.pq = this.pq;
        return clone;
    }
}

export default LRUCache;