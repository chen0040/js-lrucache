import {MinPQ} from '../build/LRUCache';
import expect from 'expect';

describe('MinPQ', () => {
   it('should store items in descending order and return min item on delete', () => {
      let pq = new MinPQ((a, b) => a - b);
       pq.add(100);
       pq.add(99);
       pq.add(94);
       pq.add(1);
       expect(pq.peek().value).toEqual(1);
       pq.add(5);
       expect(pq.peek().value).toEqual(1);
       pq.add(10);
       pq.add(50);
       
       
       
       expect(pq.size()).toEqual(7);
       expect(pq.remove().value).toEqual(1);
       expect(pq.remove().value).toEqual(5);
       expect(pq.remove().value).toEqual(10);
       expect(pq.remove().value).toEqual(50);
       expect(pq.remove().value).toEqual(94);
       expect(pq.remove().value).toEqual(99);
       expect(pq.remove().value).toEqual(100);
       expect(pq.size()).toEqual(0);
       expect(pq.isEmpty()).toEqual(true);
   });
    
   it('should allow value associated with key to change and re order the stored item accordingly', ()=> {
        let pq = new MinPQ((a, b) => a - b);
        pq.put('a', 100);
        pq.put('b', 101);
        pq.put('c', 99);
       
        expect(pq.peek().key).toEqual('c');
        pq.put('a', 50);
        expect(pq.peek().key).toEqual('a');
        pq.put('b', 10);
        expect(pq.peek()).toEqual({key: 'b', value: 10});
        pq.put('b', 100);
        expect(pq.peek()).toEqual({key: 'a', value: 50});
       
        let pq2 = pq.deepCopy();
        expect(pq2.containsKey('a')).toEqual(true);
        expect(pq2.containsKey('d')).toEqual(false);
       
        
       
        expect(pq.remove().key).toEqual('a');
        expect(pq.remove().key).toEqual('c');
        expect(pq.remove()).toEqual({key: 'b', value: 100});
       
        expect(pq.containsKey('a')).toEqual(false);
   });
});