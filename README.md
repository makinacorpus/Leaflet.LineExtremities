Leaflet.LineExtremities
================

Shows symbols on the extremities of a Polyline, using [SVG markers](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker).

Check out the [demo](http://makinacorpus.github.com/Leaflet.LineExtremities/) !

Usage
-----

To display dots at the extremities of a Polyline:

```javascript
    var layer = L.polyLine(...);

    layer.showExtremities('dotM');
```

There is currently 4 types of markers:
* `stopM`: perpendicular line
* `squareM`: square
* `dotM`: dot
* `dotL`: large dot

Authors
-------

[![Makina Corpus](http://depot.makina-corpus.org/public/logo.gif)](http://makinacorpus.com)
