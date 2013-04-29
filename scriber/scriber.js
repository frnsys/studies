/*!
 * Scriber 0.0.1
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
		scriber: function() {
			return this.each( function() {
				var self = $(this);
				if (self.data("scriber")) return;
				self.data("scriber", new Scriber( self ));
			});
		}
	});

	function Scriber( el ) {
		var s = this;
		s.el = el,
		s.textarea = el.find("textarea")[0],
		s.prompt = s.el.find(".prompt");

		// BOLD
		s.el.on("click", ".control__bold", function() {
			if ( s.selection() != "" ) {
				var newText = "<b>" + s.selection() + "</b>";
				s.replace( newText );
			}
		});

		// ITALIC
		s.el.on("click", ".control__italic", function() {
			if ( s.selection() != "" ) {
				var newText = "<i>" + s.selection() + "</i>";
				s.replace( newText );
			}
		});

		// LINK
		s.el.on("click", ".control__link", function() {
			var selection = s.selection()
				, input = s.prompt.find(".input__link");

			if ( s.active == this && s.prompt.is(":visible") ) {
				s.prompt.slideUp();
			} else {
				s.active = this;
				s.prompt.slideUp(function() {
					input.show().siblings().hide();
					s.prompt.slideDown(function() {
						input.focus();
						input.on("keypress", function(e) {
							if ( e.keyCode == 13 ) {
								if ( input.val() !== "" ) {
									var newText = "<a href='" + input.val() + "'>" + selection + "</a>";
									s.replace( newText );
								}
								s.prompt.slideUp(function() {
									input.val("");
								});
							}
						});
					});
				});
			}
		});

		// IMAGE
		s.el.on("click", ".control__image", function() {
			var input = s.prompt.find(".input__image");

			if ( s.active == this && s.prompt.is(":visible") ) {
				s.prompt.slideUp();
			} else {
				s.active = this;
				s.prompt.slideUp(function() {
					s.prompt.find(".upload").show();
					input.show().siblings("input").hide();
					s.prompt.slideDown(function() {
						input.focus();

						/*
						Up to user to bind $(".upload") to the right action.
						s.prompt.find(".upload").on("click", function() {
							s.prompt.slideUp(function() {
								input.val("");
							});
						});
						*/
					});
				});
			}
		});

		s.replace = function( newText ) {
			var start = $(s.textarea).val().substring(0, s.textarea.selectionStart)
				, end = $(s.textarea).val().substring(s.textarea.selectionEnd);

			$(s.textarea).val( start + newText + end );

			return $(s.textarea).val();
		},

		s.selection = function() {
			return $(s.textarea).val().substring(s.textarea.selectionStart, s.textarea.selectionEnd);
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
