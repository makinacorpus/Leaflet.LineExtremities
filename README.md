Leaflet.LineExtremities
================

Shows the extremities of a Polyline.

Check out the [demo](http://makinacorpus.github.com/Leaflet.LineExtremities/) !

Usage
-----

To display "stop" markers at the extremities of a Polyline:
```javascript
    var layer = L.polyLine(...);

    layer.showExtremities('stop');
```

There is currently 4 types of markers:
* `stopM`: perpendicular line
* `squareM`: square
* `dotM`: dot
* `dotL`: large dot

Authors
-------

[![Makina Corpus](http://depot.makina-corpus.org/public/logo.gif)](http://makinacorpus.com)
