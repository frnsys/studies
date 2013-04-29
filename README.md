Studies
=======

A bunch of small jQuery plugins for projects I work on.

## Bouncer

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


## Sliders

> Sliders is an American science fiction television series that was 
> broadcast for five seasons between 1995 and 2000. The series follows a
> group of travelers as they use a wormhole to "slide" between different
> parallel universes.
– [Wikipedia](http://en.wikipedia.org/wiki/Sliders)

A very simple slider jQuery plugin, mainly for use in my own projects.

Basic demo available [here](http://supermedes.com/labs/studies/sliders/).


## Counter

A very simple counting jQuery plugin, mainly for use in my own projects.
Counter will take an element with a number in it and count to a target
value.

Basic demo available [here](http://supermedes.com/labs/studies/counter/).

### Usage:
```javascript
	$("#counter").counter( 100 );
	
	$("#counter").counter( 100, function() {
		// do stuff
	});
```


## Concealer

A very simple jQuery plugin, mainly for use in my own projects. It fades
out (conceals) or fades in (reveals) an element, but uses `visibility`
instead of `display`.

Basic demo available [here](http://supermedes.com/labs/studies/concealer/).


## Scriber

A very simple "rich"-editing textarea. It will insert some relevant HTML
tags, though it does not actually render out rich text.

Basic demo available
[here](http://supermedes.com/labs/studies/scriber/).