/* First, define some patterns */

var stop = {'id': 'stop',
           'viewBox': '0 0 1 8',
           'refX': '0.5',
           'refY': '4',
           'markerUnits': 'strokeWidth',
           'orient': 'auto',
           'path': 'M 0 0 L 0 8 L 1 8 L 1 0 z'};

(function () {

var __onAdd = L.Polyline.prototype.onAdd,
    __onRemove = L.Polyline.prototype.onRemove,
    __updatePath = L.Polyline.prototype._updatePath,
    __bringToFront = L.Polyline.prototype.bringToFront;


var PolylineExtremities = {

    onAdd: function (map) {
        __onAdd.call(this, map);
        this._drawExtremities();
    },

    onRemove: function (map) {
        map = map || this._map;
        __onRemove.call(this, map);
    },

    bringToFront: function () {
        __bringToFront.call(this);
        this._drawExtremities();
    },

    _updatePath: function () {
        __updatePath.call(this);
        this._drawExtremities();
    },

    _drawExtremities: function () {
        var pattern = this._pattern;
        this.showExtremities(pattern);
    },

    

    showExtremities: function (pattern) {
        this._pattern = pattern;

        /* If not in SVG mode or Polyline not added to map yet return */
        /* showExtremities will be called by onAdd, using value stored in this._pattern */
        if (!L.Browser.svg || typeof this._map === 'undefined') {
          return this;
        }

        /* If empty pattern, hide */
        if (!pattern) {
            if (this._patternNode && this._patternNode.parentNode)
                this._map._pathRoot.removeChild(this._patternNode);
            return this;
        }

        var id = 'pathdef-' + L.Util.stamp(this);
        var svg = this._map._pathRoot;

        svg.childNodes[0].childNodes[0].setAttribute('stroke-linecap', 'butt')
        this._path.setAttribute('id', id);

        // Create the marker
        var defsNode = L.Path.prototype._createElement('defs'),
            markersNode = L.Path.prototype._createElement('marker'),
            markerPath = L.Path.prototype._createElement('path');
        for (var attr in window[pattern])
            if (attr != 'path') {
                markersNode.setAttribute(attr, window[pattern][attr]);
            } else{
                markerPath.setAttribute('d', window[pattern][attr]);
            };
        markersNode.appendChild(markerPath);
        defsNode.appendChild(markersNode);
        svg.appendChild(defsNode);
        svg.setAttribute('marker-start', 'url(#' + pattern + ')');
        svg.setAttribute('marker-end', 'url(#' + pattern + ')');
        this.defsNode = defsNode;

        return this;
    }

};

L.Polyline.include(PolylineExtremities);

L.LayerGroup.include({
    showExtremities: function(pattern) {
        for (var layer in this._layers) {
            if (typeof this._layers[layer].showExtremities === 'function') {
                this._layers[layer].showExtremities(pattern);
            }
        }
        return this;
    }
});

})();
