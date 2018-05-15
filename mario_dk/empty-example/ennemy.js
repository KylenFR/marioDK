
function createBarrel() {
	if (timeDelay > 0) {
		timeDelay -=1;
	} else {
		timeDelay = random(75,125);
		barrels.push(new Barrel(70, 50, 20, 20));
	}
}

function Barrel(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.velocity = 0;
	this.gravity = 0.8;
	this.xdir = 0;
	this.path = random();

	this.show = function() {
		fill(0, 0, 255)
		rect(this.x, this.y, this.w, this.h)
	};

	this.update = function() {
		this.velocity += this.gravity;
		this.y += this.velocity;

		if (this.y > height - this.h) {
			this.y = height - this.h;
			this.velocity = 0;
		}

		if (this.x <= 0) {
			barrels.splice(0, 1);
		}

		if (this.x+this.w >= width) {
			barrels.splice(0, 1);
		}

		for (i in plats) {
			if ((((this.x) > plats[i].x) && ((this.x) < (plats[i].x+plats[i].w))) || (((this.x+this.w) > plats[i].x) && ((this.x+this.w) < (plats[i].x+plats[i].w)))) {
				if (((this.y+this.h) > (plats[i].y-5)) && ((this.y+this.h) < (plats[i].y+plats[i].h))) {
					if (((this.y+this.h) < plats[i].y+plats[i].h) && (this.velocity >= 0)) {
						this.y = plats[i].y-this.h;
						this.velocity = 0;
					}
				}
			}
		}
	};

	this.setXDir = function(dir) {
		this.xdir = dir;
	};

	this.move = function() {
		this.x += this.xdir * 3;
	};

	this.goDown = function() {
		this.setXDir(0);
		for (j in plats) {
			
		}
	};

	this.choosePath = function() {
		for (i in lads) {
			if (this.x > lads[i].x && this.x < lads[i].x+3) {
				if (this.y+this.h < lads[i].y && this.y+this.h > lads[i].y-50) {
					if (this.path > 0.5) {
						this.goDown();
					}
				}
			}
		}
	};
}
