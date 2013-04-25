/*!
 * Concealer 0.0.1
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
		reveal: function( force ) {
			if ( force ) {
				return this.each( function() {
					$(this).css({
						visibility: "visible",
						opacity: 1
					});
				});
			} else {
				return this.each( function() {
					$(this).css("visibility", "visible").animate({ opacity: 1 });
				});
			}
		},
		conceal: function( force ) {
			if ( force ) {
				return this.each( function() {
					$(this).css({
						visibility: "hidden",
						opacity: 0
					});
				});
			} else {
				return this.each( function() {
					$(this).animate({ opacity: 0 }, function() {
						$(this).css("visibility", "hidden");
					});
				});
			}
		},
		disable: function() {
			return this.each( function() {
				$(this).attr("disabled", "disabled");
			});
		},
		enable: function() {
			return this.each( function() {
				$(this).removeAttr("disabled");
			});
		}
	});
}));
