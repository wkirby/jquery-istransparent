# isTransparent

isTransparent is a simple jQuery plugin used to determine whether or not an image can be considered visible to users based on the image data's color and opacity — not the CSS settings for `visibility` and `opacity`.

## Usage

Include the jQuery library (version 1.7 or newer) and isTransparent plugin files at the bottom of your page, before the closing `<body>` tag.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
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