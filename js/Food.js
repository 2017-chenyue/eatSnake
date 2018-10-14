function Food(x ,y , food_pic){
	this.row = x ;
	this.col = y ;
	this.food_pic = food_pic;
}
Food.prototype.reset = function(row , col){
	this.row = row;
	this.col = col;
}