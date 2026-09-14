/* GISVN compatibility bridge for Vietflex 1.0.0.
 * Vietflex exports constructors; the existing field tools and MarkerCluster use
 * Leaflet-style factories. Keep this adapter small and explicit so the GIS logic
 * can migrate without mixing two map engines on the same page. */
(function attachVietflexCompatibility(global) {
  'use strict';

  var V = global.Vietflex;
  if (!V) {
    throw new Error('Không tải được Vietflex. Kiểm tra CDN hoặc bản dự phòng cục bộ.');
  }

  function factory(Type) {
    return function createInstance() {
      return Reflect.construct(Type, Array.prototype.slice.call(arguments));
    };
  }

  V.map = factory(V.LeafletMap);
  V.marker = factory(V.Marker);
  V.circle = factory(V.Circle);
  V.circleMarker = factory(V.CircleMarker);
  V.divIcon = factory(V.DivIcon);
  V.featureGroup = factory(V.FeatureGroup);
  V.geoJSON = factory(V.GeoJSON);
  V.imageOverlay = factory(V.ImageOverlay);
  V.layerGroup = factory(V.LayerGroup);
  V.polygon = factory(V.Polygon);
  V.polyline = factory(V.Polyline);
  V.popup = factory(V.Popup);
  V.canvas = factory(V.Canvas);
  V.tileLayer = factory(V.TileLayer);
  V.tileLayer.wms = factory(V.WMSTileLayer);

  V.point = factory(V.Point);
  V.latLng = factory(V.LatLng);
  V.latLngBounds = factory(V.LatLngBounds);

  ['setOptions', 'stamp'].forEach(function exposeUtility(name) {
    if (!V[name] && V.Util && V.Util[name]) V[name] = V.Util[name];
  });

  // MarkerCluster 1.5 still consumes the legacy Leaflet class/utility API.
  V.extend = V.extend || function extend(destination) {
    for (var sourceIndex = 1; sourceIndex < arguments.length; sourceIndex += 1) {
      var source = arguments[sourceIndex];
      if (!source) continue;
      Object.keys(source).forEach(function copyProperty(key) {
        destination[key] = source[key];
      });
    }
    return destination;
  };

  V.bind = V.bind || function bind(callback, context) {
    var preset = Array.prototype.slice.call(arguments, 2);
    return function boundCallback() {
      var runtime = Array.prototype.slice.call(arguments);
      return callback.apply(context, preset.length ? preset.concat(runtime) : runtime);
    };
  };

  if (V.Util && !V.Util.isArray) V.Util.isArray = Array.isArray;

  if (V.Class && !V.Class.extend) {
    V.Class.extend = function extendClass(definition) {
      var Parent = this;
      var properties = definition || {};
      var Child = class extends Parent {};
      var parentOptions = Parent.prototype.options || null;

      if (properties.statics) V.extend(Child, properties.statics);
      if (properties.includes) {
        var mixins = Array.isArray(properties.includes)
          ? properties.includes
          : [properties.includes];
        mixins.forEach(function includeMixin(mixin) {
          Child.include(mixin);
        });
      }

      Object.keys(properties).forEach(function copyPrototypeProperty(key) {
        if (key !== 'statics' && key !== 'includes' && key !== 'options') {
          Child.prototype[key] = properties[key];
        }
      });

      if (properties.options) {
        Child.prototype.options = V.extend(Object.create(parentOptions), properties.options);
      }

      return Child;
    };
  }

  // MarkerCluster 1.5 reads the historical global name during initialization.
  global.L = V;
})(window);
