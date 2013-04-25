/*!
 * Sliders 0.0.3
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
		slider: function( o ) {
			return this.each( function() {
				var self = $(this);
				if (self.data("slider")) return;
				self.data("slider", new Slider( self, o ));
			});
		}
	});

	// Defaults
	$.fn.slider.options = {
		from: "right",
		selector: "section",
		keyboard: true,
		interval: 0, // 0 => no autoplay
		loop: true,
		autoplay: false,
		speed: 500
	}

	function Slider( container, o ) {
		var s = this;

		// Private
		var Slide = function( el ) {
			var self = this;
			self.el = el,
			self.height = el.outerHeight();

			el.css({
				position: "absolute",
				left: s.start,
				width: "100%",
				height: "100%",
				top: 0
			});

			self.slideEnd = function( callback ) {
				s.sliding = true;
				el.animate({ left: s.end }, s.speed, function() {
					s.sliding = false;
					if (callback) callback();
				});
				return self;
			},
			self.slideStart = function( callback ) {
				s.sliding = true;
				el.animate({ left: s.start }, s.speed, function() {
					s.sliding = false;
					if (callback) callback();
				});
				return self;
			},
			self.slideIn = function( callback ) {
				s.sliding = true;
				el.animate({ left: 0 }, s.speed, function() {
					s.sliding = false;
					if (callback) callback();
				});
				return self;
			},
			self.resetStart = function() {
				el.css({ left: s.start });
				return self;
			},
			self.resetEnd = function() {
				el.css({ left: s.end });
				return self;
			},
			self.display = function() {
				el.css({ left: 0 });
				return self;
			};

			return self;
		}

		// Container CSS
		container.css({
			overflow: "hidden",
			position: "relative",
			width: "100%"
		});

		s.opts = $.extend( {}, $.fn.slider.options, o || {} ),
		s.selector = s.opts.selector,
		s.container = container,
		s.sliding = false,
		s.current_index = 0,
		s.end = s.opts.from == "right" ? "-100%" : "100%",
		s.start = s.opts.from == "right" ? "100%" : "-100%";

		s.slides =  [];
		container.find(s.selector).each( function() {
			s.slides.push( new Slide( $(this) ) );
		});

		s.current_slide = s.slides[s.current_index].display();
		s.total = s.slides.length;

		// Set container height
		// Will need to bind resize event
		var container_height = 0;
		$.each(s.slides, function() {
			var this_height = this.height;
			container_height = container_height > this_height ? container_height : this_height;
		});
		container.height( container_height );

		s.next = function( callback ) {
			if ( !s.sliding ) {
				s.current_slide.slideEnd( callback );

				if ( s.current_index < s.total - 1 ) {
					s.current_index++;
				} else if ( s.opts.loop ) {
					s.current_index = 0;
				} else {
					return s;
				}
				s.current_slide = s.slides[s.current_index].resetStart().slideIn( callback );
			}
			return s;
		},

		s.prev = function( callback ) {
			if ( !s.sliding ) {
				s.current_slide.slideStart( callback );

				if ( s.current_index > 0 ) {
					s.current_index--;
				} else if ( s.opts.loop ) {
					s.current_index = s.total - 1;
				} else {
					return s;
				}
				s.current_slide = s.slides[s.current_index].resetEnd().slideIn( callback );
			}
			return s;
		},
		
		s.pause = function() {
			if ( s.interval ) {
				clearInterval(s.interval);
			}
			return s;
		},
		s.play = function() {
			if ( s.opts.interval > 0 ) {
				var interval = s.opts.interval > s.opts.speed ? s.opts.interval : s.opts.speed;
				s.interval = setInterval(s.next, interval);
			}
			return s;
		};


		if ( s.opts.keyboard ) {
			$(document).keydown(function(e){
				// Left
				if ( e.keyCode == 37 ) {
					s.prev();
				}
				// Right
				if ( e.keyCode == 39 ) {
					s.next();
				}
			});
		}

		if ( s.opts.autoplay ) {
			s.play();
		}

	}

}));
