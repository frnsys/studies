Vider
=====

Generate YouTube and Vimeo embed code on-the-fly based on links to those
videos.

Vider should be used on elements that have a `href` attribute (i.e.
        hyperlinks).

Suggested usage would be something like:

HTML
```html
    <a href="https://www.youtube.com/watch?v=-ChppfnazzE" data-video="true">
```

Javascript
```js
    $('[data-video=true]').on('click', function() {
        $(this).vider( function($embed) {
            $('.overlay').append( $embed ).fadeIn();
        });
        return false;
    });
```

You must used the included CSS for this to work properly.
The included CSS will ensure that the embed container is responsive.

However, the example implementation above means you have the flexibility
to allow links to revert to their default behavior on mobile, for
instance.

```js
    // Maybe better to use http://modernizr.com/,
    // but for example...
    var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);

    $('[data-video=true]').on('click', function() {
        if ( !isMobile ) {
            $(this).vider( function($embed) {
                $('.overlay').append( $embed ).fadeIn();
            });
            return false;
        }
    });
```

You can also pass in options to customize the embedded player.

```js
    $(this).vider( function($embed) {
        $('.overlay').append( $embed ).fadeIn();
    }, {
        // Default values
        autoplay: 1,        // Autoplay (YouTube, Vimeo)
        api:      0,        // Toggle Javascript API (YouTube, Vimeo)
        loop:     0,        // Toggle looping (YouTube, Vimeo)
        title:    0,        // Toggle the title (Vimeo)
        byline:   0,        // Toggle the byline (Vimeo)
        portrait: 0,        // Toggle uploader's image (Vimeo)
        showinfo: 0,        // Toggle video info (YouTube)
        color:    'fc5436'  // Set the player's colors (Vimeo)
    });
```

