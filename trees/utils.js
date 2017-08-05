/*jshint browser: true*/

(function(){
    "use strict";
    window.Utils = {
        randomNum: randomNum,
        hsvToRgb: hsvToRgb,
        interpolateColor: interpolateColor
    };
    function randomNum (max) {
        //returns a random number from 0 to @max.
        return Math.round(Math.random() * max);
    }

    function hsvToRgb(h, s, v) {
        //returns rgb object from hsv
        //param values (h,s,v must be values (0 =< x <= 1).
        var r; var g; var b; var i; var f; var p; var q; var t;
        if (arguments.length === 1) {
            s = h.s; v = h.v; h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    function interpolateColor (startColor, endColor, percent) {
        //returns rgb color object interpolated b/w two colors.
        //@startColor & @endColor are hex colors (#000000).
        //@percent (0 =< x <= 1).
        var result;
        var start = [];
        var end = [];
        var temp = [];

        start[0] = parseInt(startColor.substr(1,2), 16);
        start[1] = parseInt(startColor.substr(3,2), 16);
        start[2] = parseInt(startColor.substr(5,2), 16);
        end[0] = parseInt(endColor.substr(1,2), 16);
        end[1] = parseInt(endColor.substr(3,2), 16);
        end[2] = parseInt(endColor.substr(5,2), 16);

        temp[0] = parseInt(end[0] * percent + (1 - percent) * start[0], 10);
        temp[1] = parseInt(end[1] * percent + (1 - percent) * start[1], 10);
        temp[2] = parseInt(end[2] * percent + (1 - percent) * start[2], 10);

        result = {
            r: getValidHexComponent(temp[0]),
            g: getValidHexComponent(temp[1]),
            b: getValidHexComponent(temp[2])
        };
        return result;
    }

    function getValidHexComponent (color) {
        var hex = color.toString(16);
        return (hex.length === 2)? hex: '0' + hex;
    }
})();