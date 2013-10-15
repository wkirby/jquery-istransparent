# isTransparent

Backstretch is a simple jQuery plugin that allows you to add a dynamically-resized, slideshow-capable background image to any page or element. The image will stretch to fit the page/element, and will automatically resize as the window/element size changes.
## Demo

There are a couple of examples included with this package, or feel free to check it out live [on the project page itself](http://srobbin.com/jquery-plugins/backstretch/).

## Setup

Include the jQuery library (version 1.7 or newer) and Backstretch plugin files in your webpage (preferably at the bottom of the page, before the closing BODY tag):

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="jquery.isTransparent.min.js"></script>

<script>

  // Basic Usage
  // This will return true if the image is transparent, and
  // false if parts of the image are opaque.

  $("img").isTransparent();

  // You can also set options which will determine the speed
  // and threshold for transparency.
  
  $("img").isTransparent({
    opacityThreshold: 125,
    quality: 5
  });

  // If you'd like to set the defaults for these settings, rather
  // than setting them each time you call the function, you can
  // do so by adjusting the variables before calling isTransparent()

  $.fn.isTransparent.defaults.opacityThreshold: 200;
  $.fn.isTransparent.defaults.quality: 0;

</script>
```

## Options

| Name | Description | Type | Default |
|------|-------------|------|---------|
| `opacityThreshold` | The minimum threshold to be considered opaque. Operates on a scale of 0 - 255, where 255 is fully opaque. | Int | 125 |
| `quality` | The quality at which you'd like to check the image. Higher numbers run faster, but will be less accurate in determining transparency. | Int | 5 |

## Changelog

### Version 1.0

* Initial release

## Thanks To

Many thanks to Color Thief by Lokesh Dhakar (http://lokeshdhakar.com/projects/color-thief/) for the code which traverses the images pixels checking for alpha values.