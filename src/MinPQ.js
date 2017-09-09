class MinPQ {
    constructor(comparator) {
        this.comparator = comparator;
        this.pq = [null];
        this.qp = {};
        this.values = {};
        this.N = 0;
    }
    
    deepCopy() {
        let clone = new MinPQ(this.comparator);
        
        clone.pq = [];
        clone.qp = {};
        clone.values = {};
        clone.N = this.N;
        for(var i=0; i < this.pq.length; ++i) {
            
            clone.pq.push(this.pq[i]);
            clone.qp[this.pq[i]] = this.qp[this.pq[i]];
            clone.values[this.pq[i]] = Object.assign({}, this.values[this.pq[i]]);
        }
        
        
        return clone;
    }
    
    add(key, value) {
        if(!value) value = key;
        this.values[key] = value;
        if(this.pq.length < this.N+1) {
            this.pq.push(null);
        }
        this.N += 1;
        
        this.pq[this.N] = key;
        this.qp[key] = this.N;
        
        this.swim(this.N);
    }
    
    put(key, value) {
        if(key in this.values) {
            let pos = this.qp[key];
            let cmp = this.comparator(this.values[key], value);
            if(cmp < 0) {
                this.values[key] = value;
                this.sink(pos);
            } else if(cmp > 0) {
                this.values[key] = value;
                this.swim(pos);
            }
        } else {
            this.add(key, value);
        }
    }
    
    get(key) {
        return this.values[key];
    }
    
    containsKey(key) {
        return (key in this.values);
    }
    
    size() {
        return this.N;
    }
    
    isEmpty() {
        return this.N == 0;
    }
    
    remove() {
        if(this.N == 0) {
            return { key: undefined, value: undefined };
        }
        let key = this.pq[1];
        let value = this.values[key];
        delete this.values[key];
        
        this.exchange(1, this.N);
        this.N -= 1;
        this.sink(1);
        return {key: key, value: value};
    }
    
    peek() {
        if(this.N == 0) {
            return undefined;
        }
        return { key: this.pq[1], value: this.values[this.pq[1]] };
    }
    
    swim(k) {
        while(k > 1) {
            let parent = Math.floor(k / 2);
            if(this.comparator(this.values[this.pq[parent]], this.values[this.pq[k]]) > 0) {
                this.exchange(parent, k);
                k = parent;
            } else {
                break;
            }
        }
    }
    
    sink(k) {
        while(k * 2 <= this.N) {
            let child = k * 2;
            if(child < this.N && this.comparator(this.values[this.pq[child+1]], this.values[this.pq[child]]) < 0) {
                child += 1;
            } 
            if(this.comparator(this.values[this.pq[child]], this.values[this.pq[k]]) < 0) {
                this.exchange(child, k);
                k = child;
            } else {
                break;
            }
        }
    }
    
    exchange(i, j) {
        let temp = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = temp;
        
        this.qp[this.pq[i]] = i;
        this.qp[this.pq[j]] = j;
    }
}

export default MinPQ;