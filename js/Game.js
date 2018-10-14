function Game(map , snake , food , block){
	this.map = map;
	this.snake = snake;
	this.food = food;
	this.block = block;
	this.timer = null;
	this.flag = null;
	this.removeFlag = null;
	this.init();

}
Game.prototype.init = function(){

	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.renderBlock();
	this.bindEvent();
	this.start();
}
Game.prototype.renderMap = function(){
	this.map.fill();
}
Game.prototype.renderFood = function(){
	var row = this.food.row;
	var col = this.food.col;
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.food_pic + ")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}
Game.prototype.renderSnake = function(){
	var head = this.snake.arr[this.snake.arr.length - 1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
	this.map.arr[head.row][head.col].style.backgroundSize = "cover";
	for(var i = 1 ; i < this.snake.arr.length - 1; i ++){
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
	}
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx ] + ")";
}
Game.prototype.renderBlock = function (){
	for(var i = 0 ; i < this.block.arr.length ; i ++) {
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.block_pic + ")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
}
Game.prototype.start = function (){
	// this.removeFlag = false;
	this.flag = true;
	var me = this;
	this.timer = setInterval(function(){
		if(me.removeFlag){
			me.snake.resetSnake();
			me.map.clear();
			me.renderSnake();
			me.renderFood();
			me.renderBlock();
		}

		me.removeFlag = false;
		// 移动
		me.snake.move();
		me.checkMap();
		me.eatFood();
		me.checkSnake();
		me.checkBlock();
		if(me.flag){
			// 清屏
			me.map.clear();
			// 渲染
			me.renderSnake();
			me.renderFood();
			me.renderBlock();
		}
	},200);
}
Game.prototype.bindEvent = function(){
	var me = this;
	document.onkeydown = function(e){
		var code  = e.keyCode;
		if(code === 37 || code ===38 || code === 39 || code === 40){
			me.snake.Direction(code);
		}
	}
}
Game.prototype.gameOver = function () {
	this.flag = false;
	clearInterval(this.timer);
	// console.log("游戏结束");
	this.alertBtn();

}
Game.prototype.alertBtn = function(){
	var alert = document.createElement("div");
	var startBtn = document.createElement("input");
	var p = document.createElement("p");
	alert.appendChild(p);
	alert.appendChild(startBtn);
	this.map.dom.appendChild(alert);
	p.innerHTML = "游戏结束";
	alert.className = "alert";
	startBtn.className = "startBtn";
	startBtn.type = "button";
	startBtn.value = "重新开始";
	p.className = "p";
	alert.style.display = "block";
	var me = this;
	startBtn.onclick = function(e){
		alert.style.display = "none";
		// me.map.remove();
		me.removeFlag = true;
		me.start()
	}
}

Game.prototype.eatFood = function () {
	var head = this.snake.arr[this.snake.arr.length - 1];
	if(head.row === this.food.row && head.col === this.food.col){
		// console.log("吃到食物了");
		// 蛇增长
		this.snake.growUp();
		// 实物位置改变
		this.resetFood();

	}
}
Game.prototype.resetFood = function(){
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	for(var i = 0 ; i < this.snake.arr.length ; i ++) {
		if(row === this.snake.arr[i].row && col === this.snake.arr[i].col){
			this.resetFood();
			return;
		}
	}
	for(var i = 0 ; i < this.block.arr.length ; i ++) {
		var block = this.block.arr[i];
		if(row === block.row && col === block.col){
			this.resetFood();
			return;
		}
	}
	this.food.reset(row , col);
}
Game.prototype.checkSnake = function (){
	var head = this.snake.arr[this.snake.arr.length - 1];
	for(var i = 0 ; i < this.snake.arr.length - 1 ; i ++) {
		var snake = this.snake.arr[i];
		if(head.row === snake.row && head.col === snake.col){
			this.gameOver();
			return;
		}
	}
}
Game.prototype.checkBlock = function (){
	var head = this.snake.arr[this.snake.arr.length - 1];
	for(var i = 0 ; i < this.block.arr.length ; i ++) {
		var block = this.block.arr[i];
		if(head.row === block.row && head.col === block.col){
			this.gameOver();
			return;
		}
	}
}
Game.prototype.checkMap = function(){
	var head = this.snake.arr[this.snake.arr.length - 1];
	if(head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col){
		// console.log("撞到墙了")
		this.gameOver();
	}
}
