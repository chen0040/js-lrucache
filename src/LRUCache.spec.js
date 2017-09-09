import LRUCache from './LRUCache';

describe('LRUCache', () => {
   it('should delete least recently used item when items in cache is greater than its capacity', () => {
       let cache = new LRUCache(4);
       cache.put('a', { value: 1 });
       cache.put('b', { value: 2 });
       cache.put('c', { value: 3 });
       cache.put('d', { value: 4 });
       expect(cache.size()).toEqual(4);
       cache.put('e', { value: 5 });
       expect(cache.size()).toEqual(4);
       expect(cache.get('a')).toEqual(undefined);
       cache.get('b');
       cache.put('f', { value: 6 });
       expect(cache.get('b')).toEqual({ value: 2 });
       expect(cache.get('c')).toEqual(undefined);
       
       let cache2 = cache.deepCopy();
       expect(cache2.get('b')).toEqual({ value: 2 });
   }) ;
});