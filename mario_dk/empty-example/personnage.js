
function Perso(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.gravity = 0.80;
	this.velocity = 0;
	this.lift = -13;
	this.xdir = 0;
	this.ydir = 0;
	this.toDelete = false;

	this.show = function() {
		fill(255, 0, 0)
		rect(this.x, this.y, this.w, this.h);
	};

	this.setXDir = function(dir) {
		this.xdir = dir;
	};

	this.setYDir = function(dir) {
		this.ydir = dir*4;
	};

	this.walk = function() {
		this.x += this.xdir * 4;
	};

	this.jump = function() {
		this.velocity += this.lift;
	};

	this.climb = function() {
		this.y -= this.ydir;
	};

	this.collide = function(obj) {
		for (i in barrels) {
			if ((barrels[i].x > this.x && barrels[i].x < this.x+this.w) || (barrels[i].x+barrels[i].w > this.x && barrels[i].x+barrels[i].w < this.x+this.w)) {
				if (barrels[i].y > this.y && barrels[i].y < this.y+this.h) {
					barrels.splice(i, 1);
					this.toDelete = true;
					alert('Game Over');
				}
			}
		}
	};

	this.update = function() {
		this.velocity += this.gravity;
		this.y += this.velocity;

		if (this.y > height - this.h) {
			this.y = height - this.h;
			this.velocity = 0;
			jump = false;
		}

		if (this.x <= 0) {
			this.x = 0;
		}

		if (this.x+this.w >= width) {
			this.x = width-this.w;
		}

		for (i in plats) {
			if ((((this.x) > plats[i].x) && ((this.x) < (plats[i].x+plats[i].w))) || (((this.x+this.w) > plats[i].x) && ((this.x+this.w) < (plats[i].x+plats[i].w)))) {
				if (((this.y+this.h) > (plats[i].y-5)) && ((this.y+this.h) < (plats[i].y+plats[i].h))) {
					if (((this.y+this.h) < plats[i].y+plats[i].h) && (this.velocity >= 0)) {
						this.y = plats[i].y-this.h;
						this.velocity = 0;
						jump = false;
					}
				}
			}
		}
	};
}

function deleting(obj) {
	if (obj.toDelete) {
		mario = null;
	}
}
