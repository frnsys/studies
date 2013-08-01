/*!
 * Vider 0.0.1
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
		vider: function( callback, opts ) {
			return this.each( function() {
                var url = $(this).attr('href');
                if (url) {
                    vider( url, callback, opts );
                }
			});
		}
	});

    function vider(url, callback, opts) {
        var opts = opts || {},
            opts.autoplay = opts.autoplay || 1,
            opts.loop     = opts.loop     || 0,
            opts.title    = opts.title    || 0,
            opts.byline   = opts.byline   || 0,
            opts.portrait = opts.portrait || 0,
            opts.showinfo = opts.showinfo || 0,
            opts.api      = opts.api      || 0,
            opts.color    = opts.color    || 'fc5436',
            chunks, video_id, embedUrl, embedCode;

        // YouTube
        if ( url.match(/youtube/g) ) {
            video_id = getParameterByName(url, 'v');
            embedUrl = '//www.youtube.com/embed/' + video_id + '?' +
                    'autoplay='    + opts.autoplay  + '&amp;' +
                    'loop='        + opts.loop      + '&amp;' +
                    'enablejsapi=' + opts.api       + '&amp;' +
                    'showinfo='    + opts.showinfo;

        // Vimeo
        } else if ( url.match(/vimeo/g) ) {
            chunks = url.replace(/^\/|\/$/g, '').split('/');
            video_id = chunks[chunks.length - 1];
            embedUrl = 'http://player.vimeo.com/video/' + video_id + '?' +
                     'autoplay=' + opts.autoplay + '&amp;' +
                     'loop='     + opts.loop     + '&amp;' +
                     'title='    + opts.title    + '&amp;' +
                     'byline='   + opts.byline   + '&amp;' +
                     'portrait=' + opts.portrait + '&amp;' +
                     'api='      + opts.api      + '&amp;' +
                     'color='    + opts.color;
        }

        embedCode = '<div class="has-video">'+
                        '<div class="embed-container">'+
                            '<iframe src="' + embedUrl + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'+
                            '<div class="icon-close"></div>'+
                        '</div>'+
                    '</div>';

        callback.call( $(embedCode) );
    }

    // Get URL params by names
    // Thx: http://bit.ly/1bE7KiC
    function getParameterByName(url, name) {
        name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(url);
        return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

}));
