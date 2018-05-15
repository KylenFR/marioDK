
function Ladder(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.show = function() {
		fill(150, 150, 150)
		rect(this.x, this.y, this.w, this.h);
	}
}
