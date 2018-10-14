function Snake(pic_object){
	this.arr = [
		{row : 5 , col : 5},
		{row : 5 , col : 6},
		{row : 5 , col : 7},
		{row : 5 , col : 8},
		{row : 5 , col : 9}
	];
	this.direction = 39;
	this.pic_object = pic_object;
	this.head_pic = pic_object.head_pic;
	this.body_pic = pic_object.body_pic;
	this.tail_pic = pic_object.tail_pic;
	this.head_idx = 2;
	this.tail_idx = 0;
	this.lock = true;
}
Snake.prototype.resetSnake = function (){
	console.log(123);
	this.direction = 39;
	this.head_idx = 2;
	this.arr = [
		{row : 5 , col : 5},
		{row : 5 , col : 6},
		{row : 5 , col : 7},
		{row : 5 , col : 8},
		{row : 5 , col : 9}
	];
}
Snake.prototype.move = function (){
	var head = {
		row : this.arr[this.arr.length - 1].row,
		col : this.arr[this.arr.length - 1].col
	}
	if(this.direction === 39){
		head.col ++ ;
	} else if (this.direction === 40) {
		head.row ++ ; 
	} else if (this.direction === 37) {
		head.col -- ;
	} else if (this.direction === 38) {
		head.row -- ;
	}
	this.arr.push(head);
	this.arr.shift();
	this.lock = true;
	var tail = this.arr[0];
	var pg = this.arr[1];
	if (tail.row === pg.row){
		this.tail_idx = tail.col > pg.col ? 2 : 0 ;
	} else if(tail.col === pg.col){
		this.tail_idx = tail.row > pg.row ? 3 : 1 ;
	}
}
Snake.prototype.Direction = function (code){
	if(!this.lock){
		return;
	}
	this.lock = false;
	var result = Math.abs(this.direction - code);
	if(result == 0 || result == 2){
		return;
	} else {
		this.direction = code;
	}
	if(this.direction === 37){
		this.head_idx = 0;
	} else if (this.direction === 38) {
		this.head_idx = 1;
	} else if (this.direction === 39) {
		this.head_idx = 2;
	} else if (this.direction === 40) {
		this.head_idx = 3;
	}
}
Snake.prototype.growUp = function () {
	this.arr.unshift(this.arr[0]);
}