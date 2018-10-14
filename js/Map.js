function Map (row , col , width , height){
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	this.dom = document.createElement("div");
	this.arr = [];
}
Map.prototype.fill = function(){

	for(var i = 0 ; i < this.row ; i ++) {
		var row_dom = document.createElement("div");
		var row_arr = [];
		row_dom.className = "row";
		for(var j = 0 ; j < this.col ; j ++){
			var col_dom = document.createElement("span");
			row_dom.appendChild(col_dom);
			row_arr.push(col_dom);
			col_dom.className = "col";
		}
		this.dom.appendChild(row_dom);
		this.arr.push(row_arr);
	}
	document.body.appendChild(this.dom);
	this.dom.className = "dom";
}
Map.prototype.clear = function(){
	for(var i = 0 ; i < this.row ; i ++) {
		for(var j = 0 ; j < this.col ; j ++) {
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
}
Map.prototype.remove = function (){
	document.body.removeChild(this.dom);
	for(var i = 0 ; i < this.row ; i ++) {
		// var row_arr = this.arr[i];
		// for(var j = 0 ; j < this.col ; j ++) {
		// 	row_arr.pop();
		// }
		this.arr.pop();
	}
	console.log("清除游戏");
}