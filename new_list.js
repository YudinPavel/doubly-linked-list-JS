class node {
	constructor(value){
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

class LinkedList {
	constructor(...nodes){
		let arr = nodes;

		this.list = new node(arr[0]);
		this.list.prev = null;

		this.firstList = this.list;

		for(let i = 1; i < arr.length; i++){
			this.list.next = new node(arr[i]);
			this.list.next.prev = this.list;
			this.list = this.list.next;
		}

		this.lastList = this.list;
	}

	showList(){
		this.list = this.firstList;
		console.log(this.list);
	}

	toString(){
		this.list = this.firstList;
		let str = this.list.value;
		while(this.list.next){
			this.list = this.list.next;
			str += ', ' + this.list.value;
		}

		return str;
	}

	shift(){
		this.firstList = this.firstList.next;
		this.firstList.prev = null;

		return this.list.value;
	}

	unshift(){
		this.list = this.firstList;
		for(let i = arguments.length - 1; i >= 0; --i){
			this.list.prev = new node(arguments[i]);
			this.list = this.list.prev;
			this.list.next = this.firstList;
			this.firstList = this.list;
		}
	}

	pop(){
		this.list = this.lastList.prev;
		this.list.next = null;
		this.lastList = this.list;

		return this.list.value;
	}

	push(){
		this.list = this.lastList;
		for(let i = 0; i < arguments.length; i++){
			this.list.next = new node(arguments[i]);
			this.list = this.list.next;
			this.list.prev = this.lastList;
			this.lastList = this.list;
		}
	}

	set(pos, value){
		this.list = this.firstList;
		let count = 0;
		let tempPrevList = this.list.prev;
		let tempNextList = this.list;

		while(count < pos){
			if(this.list.next === null){
				this.list.next = new node("");
				this.list.next.prev = this.list;
			}
			this.list = this.list.next;
			tempPrevList = this.list.prev;
			tempNextList = this.list;
			count++;
		}

		this.list.prev = new node(value);
		this.list = this.list.prev;
		this.list.prev = tempPrevList;
		this.list.next = tempNextList;

		if(this.list.prev !== null) //Если элемент - первый
			this.list.prev.next = this.list;
		else
			this.firstList = this.list;
	}

	forEach(func){

		this.list = this.firstList;

		while(this.list !== null){
			this.list.value = func(this.list.value);
			this.list = this.list.next;
		}
	}

	contains(pos){
		let count = 0;

		this.list = this.firstList;

		while(this.list !== null){
			this.list = this.list.next;
			count++;
		}

		if(count > pos){
			return true;
		}
		else{
			return false;
		}
	}

}


var list = new LinkedList(2, 4, 6);

alert(list);

list.showList();

list.forEach(
	function(a){
		a*=2;
		return a;
});

alert(list);

list.showList();

alert(list.contains(0));

