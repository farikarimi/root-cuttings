import { MapContainer, ZoomControl, TileLayer } from 'react-leaflet';
import ContentLayer from './ContentLayer';
import './css/App.css';
// eslint-disable-next-line import/order

export const MAP_CENTER = [40.637262, 32.083669];
/**
 * Initial zoom level of the map
 */
export const DEFAULT_ZOOM = 4.5;

/**
 * Component displaying the map container and all embedded child elements
 *
 * @returns {React.JSX.Element}
 */
export default function App() {
  const esriWorldImagery = {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    // eslint-disable-next-line max-len
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  };

  return (
    <MapContainer
      className="map-container"
      center={MAP_CENTER}
      zoomControl={false}
      zoom={4.5}
      minZoom={4.5}
      maxZoom={18}
      zoomSnap={0.5}
      zoomDelta={0.5}
      maxBounds={[[90, -180], [-90, 180]]}
      maxBoundsViscosity={1.0}
    >

      <TileLayer
        attribution={esriWorldImagery.attribution}
        url={esriWorldImagery.url}
        tileSize={512}
        zoomOffset={-1}
      />
      <ContentLayer />
      <ZoomControl
        position="bottomright"
      />
    </MapContainer>
  );
}
