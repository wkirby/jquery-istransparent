/*!
 * jQuery isTransparent - v1.1 - 2013-10-15          *
 * Author: Wyatt Kirby <wyatt@genius.com>            *
 * Licensed under the MIT license                    */

;(function($, window, document, undefined) {
    'use strict';

    // Set up jQuery Plugin
    // ----------------------------------------------------

    $.fn.isTransparent = function(options) {
        var retVal = false;

        this.each(function() {
            if (!$.data(this, 'plugin_isTransparent')) {
                $.data(this, 'plugin_isTransparent', true);
                retVal = new TransparencyCheck(this, options).isTransparent;
            }
        });

        return retVal;
    };

    function TransparencyCheck(element, options) {
        this.image = element;
        this.isTransparent = false;
        this.options = $.extend(true, {}, $.fn.isTransparent.defaults, options);

        // Variable Check
        // ---------------------------

        if ( this.options.quality < 0 ) {
            this.options.quality = 0;
        } else if ( this.options.quality > 10 )  {
            this.options.quality = 10;
        }

        if ( this.options.opacityThreshold < 0 ) {
            this.options.opacityThreshold = 0;
        } else if ( this.options.opacityThreshold > 255 ) {
            this.options.opacityThreshold = 255;
        }

        this.init();
    }

    // Plugin Constructor
    // ----------------------------------------------------

    TransparencyCheck.prototype.init = function() {

        if (!$(this.image).is("img")) {
            throw new Error("Element is not an image");
        }

        var quality = this.options.quality,
            image = new CanvasImage(this.image),
            imageData = image.getImageData(),
            pixels = imageData.data,
            pixelCount = image.getPixelCount(),
            pixelArray = [];

        // Check color of each pixel, store it in an array if it meets minimum
        // threshold for "visibility."

        for (var i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
            offset = i * 4;
            r = pixels[offset + 0];
            g = pixels[offset + 1];
            b = pixels[offset + 2];
            a = pixels[offset + 3];

            // If pixel is mostly opaque and not white
            // add it to the array.
            if (a >= this.options.opacityThreshold) {
                if (!(r > 250 && g > 250 && b > 250)) {
                    pixelArray.push([r, g, b]);
                }
            }
        }

        // Clean up
        image.removeCanvas();

        // If the array is empty, nothing registered as a visible color
        // so we can set our transparency var to true.

        this.isTransparent = pixelArray.length ? false : true;
    };

    // User Accessible Defaults
    // ----------------------------------------------------

    $.fn.isTransparent.defaults = {
        opacityThreshold: 125,
        quality: 5
    };

    // Canvas Utility Class
    // ----------------------------------------------------

    var CanvasImage = function(image) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        this.width = this.canvas.width = image.width;
        this.height = this.canvas.height = image.height;

        this.context.drawImage(image, 0, 0, this.width, this.height);
    };

    CanvasImage.prototype.getPixelCount = function() {
        return this.width * this.height;
    };

    CanvasImage.prototype.getImageData = function() {
        return this.context.getImageData(0, 0, this.width, this.height);
    };

    CanvasImage.prototype.removeCanvas = function() {
        this.canvas.parentNode.removeChild(this.canvas);
    };

})(jQuery, window, document);