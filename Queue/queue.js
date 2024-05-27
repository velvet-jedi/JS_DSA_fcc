function Queue (){
    collection = [];

    this.print = function() {
        console.log(collection);
    };

    this.enqueue = function(el){
        collection.push(el);
    }

    this.dequeue = function(){
        collection.shift(); // remove the first element and return it
    }


    this.first = function(){
        return collection[0];
    }

    this.isEmpty = function(){
        return (collection.length === 0);
    }

    this.size = function(){
        return collection.length;
    }
}

var q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.print();
q.dequeue();
q.print();