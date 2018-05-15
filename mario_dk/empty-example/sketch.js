var mario;
var barrels = [];
var plats = [];
var lads = [];

var direction;
var jump = false;
var timeDelay = 0;

function setup() {
	createCanvas(800, 600);

	plats.push(new Platform(0, 442, 600, 38));
	plats.push(new Platform(200, 284, 600, 38));
	plats.push(new Platform(0, 126, 600, 38));
	plats.push(new Platform(630, 520, 60, 30));
	plats.push(new Platform(110, 362, 60, 30));
	plats.push(new Platform(630, 204, 60, 30));

	lads.push(new Ladder(500, 450, 50, 150));
	lads.push(new Ladder(250, 322, 50, 150));
	lads.push(new Ladder(500, 164, 50, 150));

	mario = new Perso(50, height-51, 30, 40);
}

function draw() {
	background(40, 40, 40);
	noStroke();

	for (var i = 0; i < lads.length; i++) {
		lads[i].show()
	}

	for (var i = 0; i < plats.length; i++) {
		plats[i].show();
	}

	createBarrel();

	for (j in barrels) {
		barrels[j].show();
		barrels[j].update();

		for (k in plats) {
			if ((((barrels[j].x) > plats[k].x) && ((barrels[j].x) < (plats[k].x+plats[k].w))) || (((barrels[j].x+barrels[j].w) > plats[k].x) && ((barrels[j].x+barrels[j].w) < (plats[k].x+plats[k].w)))) {
				if (((barrels[j].y+barrels[j].h) > (plats[k].y-5)) && ((barrels[j].y+barrels[j].h) < (plats[k].y+plats[k].h))) {
					if (plats[k].x == 0) {
						barrels[j].setXDir(1);
					} else {
						barrels[j].setXDir(-1);
					}
				}
			}
		}

		barrels[j].move();
		barrels[j].choosePath();
	}

	if (mario != null) {

		mario.update();

		mario.walk();
		mario.climb();
		mario.collide();
		mario.show();

		deleting(mario);
	}
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
		mario.setXDir(-1);
  }

	if (keyCode === RIGHT_ARROW) {
		mario.setXDir(1);
  }

	if (keyCode === UP_ARROW && jump == false) {
		for (i in lads) {
			if ((mario.x > lads[i].x && mario.x < lads[i].x+lads[i].w) || (mario.x+mario.w > lads[i].x && mario.x+mario.w < lads[i].x+lads[i].w)) {
				if (mario.y+mario.h >= lads[i].y && mario.y+mario.h <= lads[i].y+lads[i].h) {
					mario.setYDir(1);
				}
			} else if (jump == false) {
					mario.jump();
				jump = true;
			}
		}
	}
}


function keyReleased() {
	if (keyCode === LEFT_ARROW | keyCode === RIGHT_ARROW) {
		mario.setXDir(0);
	}

	if (keyCode === UP_ARROW) {
		mario.setYDir(0);
	}
}
