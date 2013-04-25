/*!
 * Counter 0.0.1
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
		counter: function( target, callback ) {
			return this.each( function() {
				var self = $(this)
					, value = parseInt( self.text() )
					, start = value;

				counter( target, start, self, callback );
			});
		}
	});

	function counter( target, start, el, callback ) {
		var value = parseInt( el.text() )

		// Homemade easing function
		// Could use refining
		var diffA = Math.abs( ( start - value )/(start - target) )
			, diffB = Math.abs( ( target - value )/(start - target) )
			, mod = Math.pow( Math.abs(diffA - diffB), 1.5);

		if ( target < value ) {
			el.text( (value - 1).toString() );
			if ( value > target ){
				setTimeout( function() {
					counter( target, start, el, callback );
				}, 100 * mod);
			} else {
				if ( isFunction(callback) ) {
					callback.call(el);
				}
				return true;
			}
		} else {
			if ( value < target ){
				el.text( (value + 1).toString() );
				setTimeout( function() {
					counter( target, start, el, callback );
				}, 100 * mod);
			} else {
				if ( isFunction(callback) ) {
					callback.call(el);
				}
				return true;
			}
		}
	}

	// http://goo.gl/j1SHA
	function isFunction( func ) {
		var getType = {};
		return func && getType.toString.call(func) === '[object Function]';
	}

}));
