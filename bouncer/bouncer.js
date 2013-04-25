/*!
 * Bouncer 0.0.2
 *
 * Copyright 2013 Francis Tseng (@frnsys / frnsys.com)
 * Released under the MIT License
 */

;(function (factory) {
	if (typeof define === 'function' && define.amd) {
			// AMD. Register as an anonymous module.
			define(['jquery'], factory);
	} else {
			// Browser globals
			factory(jQuery);
	}
}(function ($, window, document, undefined) {
	'use strict'

	$.fn.extend({
		bouncer: function( opts ) {
			return this.each( function() {
				var self = $(this);
				if (self.data("bouncer")) return;
				self.data("bouncer", new Bouncer( self, opts ));
			});
		}
	});

	// Defaults
	$.fn.bouncer.options = {
		distToGround: 200,
		velocity: 2,
		acceleration: 0.01,
		resetVelocity: -1
	}

	function Bouncer( el, o ) {
		var b = this;

		b.ball = el,
		b.opts = $.extend( {}, $.fn.bouncer.options, o || {} ),
		b.vel = b.opts.velocity,
		b.resetVel = b.opts.resetVelocity,
		b.acc = b.opts.acceleration,
		b.dist = b.opts.distToGround,
		b.y = parseInt(b.ball.css("margin-top"),10),

		b.bounce = function() {
			b.interval = setInterval( function() {
				b.ball.css("margin-top", b.y += b.vel);
				b.vel += b.acc;
				if ( parseInt(b.ball.css("margin-top")) > b.dist ) {
					b.vel = b.resetVel;
				}
			},1);
		},

		b.stop = function() {
			clearInterval( b.interval );
		},

		b.reset = function() {
			b.ball.css("margin-top",0);
		}
	}

	$.fn.extend({
		bounce: function() {
			return this.each( function() {
				if ( $(this).data("bouncer") ) {
					$(this).data("bouncer").bounce();
				}
			});
		},
		stopBouncing: function() {
			return this.each( function() {
				if ( $(this).data("bouncer") ) {
					$(this).data("bouncer").stop();
				}
			});
		},
		resetBouncing: function() {
			return this.each( function() {
				if ( $(this).data("bouncer") ) {
					$(this).data("bouncer").reset();
				}
			});
		}
	});

}));
