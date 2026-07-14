import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Thailand. MapLibre takes [lng, lat] — the reverse of the [lat, lng] order used
// everywhere on the Python side. This is the single most common bug in this file.
const THAILAND_CENTER: [number, number] = [100.9925, 13.7563];
const THAILAND_BOUNDS: [[number, number], [number, number]] = [
  [97.3, 5.6], // SW
  [105.7, 20.5], // NE
];

// Keyless demo basemap, fine for the placeholder. Swap for a Thailand-appropriate
// style before the demo video — this one has no Thai labels.
const STYLE_URL = "https://demotiles.maplibre.org/style.json";

export function RiskMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: THAILAND_CENTER,
      zoom: 5,
      maxBounds: THAILAND_BOUNDS,
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;

    // TODO(Phase 3): map.on("load") -> addSource({type:"geojson"}) with the H3 hex
    // risk cells from GET /hotspots, then addLayer({type:"fill"}) with a
    // data-driven fill-color interpolating on the risk score.
    // Hex cells become GeoJSON polygons via h3.cellToBoundary() on the API side —
    // ship polygons, not H3 strings, so the frontend needs no H3 library.

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />;
}
