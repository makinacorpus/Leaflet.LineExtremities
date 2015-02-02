Leaflet.LineExtremities
================

Shows symbols on the extremities of a Polyline, using [SVG markers](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker).

Check out the [demo](http://makinacorpus.github.com/Leaflet.LineExtremities/) !

Leaflet versions
-----

The version on the `gh-pages` branch targets Leaflet 0.7.3.

Please use the `leaflet0.8-dev` branch to be compatible with the development version of Leaflet (0.8).

Usage
-----

To display dots at the extremities of a Polyline:

```javascript
    var layer = L.polyLine(...);

    layer.showExtremities('dotM');
```

There is currently 5 types of markers:
* `stopM`: perpendicular line
* `squareM`: square
* `dotM`: dot
* `dotL`: large dot
* `arrowM`: arrow

Authors
-------

[![Makina Corpus](http://depot.makina-corpus.org/public/logo.gif)](http://makinacorpus.com)
