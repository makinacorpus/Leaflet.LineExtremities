Leaflet.LineExtremities
================

Shows symbols on the extremities of a Polyline, using [SVG markers](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker).

<div class="demo">
<p align="center"> Check out the <a href="https://makinacorpus.github.io/Leaflet.LineExtremities/">demo</a> ! </p>
</div>

Leaflet versions
-----

Works with Leaflet 0.7 and 1.x. Extremities are drawn with SVG markers, so lines
rendered on a canvas get none.

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

CHANGELOG
---------

### 0.2.0

* Support Leaflet 1.x: extremities are drawn in the SVG element holding the line (#14)
* `showExtremities()` replaces the markers of the line instead of adding new ones,
  and `showExtremities(null)` hides them
* Declare Leaflet as a peer dependency (`leaflet >=0.7 <2`)

### 0.1.1

* Create the defs node before the paths (#10)

Authors
-------

[![Makina Corpus](http://depot.makina-corpus.org/public/logo.gif)](http://makinacorpus.com)
