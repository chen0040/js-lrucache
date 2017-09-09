# js-lrucache

least recently used cache implemented using ES6 and Babel

# Install

Run the following command:

```bash
npm install js-lrucache
```

# Usage

Below are the ES6 code demo:

```Javascript
import LRUCache from 'js-lrucache';

let cache = new LRUCache(4); // max capacity is 4
cache.put('a', { value: 1 });
cache.put('b', { value: 2 });
cache.put('c', { value: 3 });
cache.put('d', { value: 4 });
console.log(cache.size()); // display 4
cache.put('e', { value: 5 }); // 'a' gets removed as capacity is only 4 and 'a' is the oldest item stored
console.log(cache.size()); // display 4;
console.log(cache.get('a')); // display undefined as cache now contains only 'b', 'c', 'd', 'e'
cache.get('b'); // 'b' has been access recently 
cache.put('f', { value: 6 }); // 'c' gets removed as 'b' access more recently than 'c'
console.log(cache.get('b')); // display { value: 2 }
console.log(cache.get('c')); // display undefined as 'c' has been removed 

let cache2 = cache.deepCopy();
console.log(cache2.get('b')); // display { value: 2 }
```

Below are the Javascript code demo:

```Javascript
var LRUCache = require('js-lrucache').default;

let cache = new LRUCache(4); // max capacity is 4
cache.put('a', { value: 1 });
cache.put('b', { value: 2 });
cache.put('c', { value: 3 });
cache.put('d', { value: 4 });
console.log(cache.size()); // display 4
cache.put('e', { value: 5 }); // 'a' gets removed as capacity is only 4 and 'a' is the oldest item stored
console.log(cache.size()); // display 4;
console.log(cache.get('a')); // display undefined as cache now contains only 'b', 'c', 'd', 'e'
cache.get('b'); // 'b' has been access recently 
cache.put('f', { value: 6 }); // 'c' gets removed as 'b' access more recently than 'c'
console.log(cache.get('b')); // display { value: 2 }
console.log(cache.get('c')); // display undefined as 'c' has been removed 

let cache2 = cache.deepCopy();
console.log(cache2.get('b')); // display { value: 2 }
```
