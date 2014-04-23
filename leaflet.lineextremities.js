/* First, define some patterns */

(function () {

var __onAdd = L.Polyline.prototype.onAdd,
    __onRemove = L.Polyline.prototype.onRemove,
    __bringToFront = L.Polyline.prototype.bringToFront;


var PolylineExtremities = {

    SYMBOLS: {
        stopM: {
            'viewBox': '0 0 2 8',
            'refX': '1',
            'refY': '4',
            'markerUnits': 'strokeWidth',
            'orient': 'auto',
            'path': 'M 0 0 L 0 8 L 2 8 L 2 0 z'
        },
        squareM: {
            'viewBox': '0 0 8 8',
            'refX': '4',
            'refY': '4',
            'markerUnits': 'strokeWidth',
            'orient': 'auto',
            'path': 'M 0 0 L 0 8 L 8 8 L 8 0 z'
        }
    },

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

    _drawExtremities: function () {
        var pattern = this._pattern;
        this.showExtremities(pattern);
    },

    

    showExtremities: function (pattern) {
        this._pattern = pattern;

        var styleProperties = ['stroke', 'stroke-opacity'];

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

        this._path.setAttribute('stroke-linecap', 'butt')
        this._path.setAttribute('id', id);

        // Check if the defs node is already created
        if (L.DomUtil.hasClass(svg,'defs')) {
            var defsNode = svg.getElementById('defs');

        } else{
            L.DomUtil.addClass(svg,'defs');
            var defsNode = L.Path.prototype._createElement('defs');
        };

        var markersNode = L.Path.prototype._createElement('marker'),
            markerPath = L.Path.prototype._createElement('path'),
            symbol = PolylineExtremities.SYMBOLS[pattern];

        // Create the markers definition
        for (var attr in symbol) {
            if (attr != 'path') {
                markersNode.setAttribute(attr, symbol[attr]);
            } else{
                markerPath.setAttribute('d', symbol[attr]);
            };
        };

        for (var i = styleProperties.length - 1; i >= 0; i--) {
            markersNode.setAttribute(styleProperties[i], this._path.getAttribute(styleProperties[i]));
            console.log(this._path.getAttribute(styleProperties[i]));
        };
        markersNode.setAttribute('fill', markersNode.getAttribute('stroke'));
        markersNode.setAttribute('fill-opacity', markersNode.getAttribute('stroke-opacity'));
        markersNode.setAttribute('stroke-opacity', '0');

        markersNode.setAttribute('id', id);
        defsNode.appendChild(markersNode);
        defsNode.setAttribute('id', 'defs')
        svg.appendChild(defsNode);
        markersNode.appendChild(markerPath);
        this.defsNode = defsNode;

        // Add the marker to the line
        this._path.setAttribute('marker-start', 'url(#' + id + ')');
        this._path.setAttribute('marker-end', 'url(#' + id + ')');

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
