Bouncer
=======

A very simple bouncer jQuery plugin, mainly for use in my own projects.
Bouncer will create a bouncing ball. Or, you can bounce whatever element you
like.

Basic demo available [here](http://supermedes.com/labs/studies/bouncer/).

### Usage:
```javascript
	var bouncer = $("#bouncer").bouncer();
	bouncer.bounce();
	bouncer.stopBouncing();
	bouncer.resetBouncing();
```

When you initialize the bouncer, you can pass some parameters:
```javascript
	var opts = {
		distToGround: 200,	// distance til the bouncer hits the ground
		velocity: 2, 				// how fast the ball initially falls
		acceleration: 0.01,	// acceleration due to gravity
		resetVelocity: -1		// the velocity of the bouncer after it hits the
			ground
	}
	
	var bouncer = $("#bouncer").bouncer( opts );
```
