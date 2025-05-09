import L from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import ContentBox from '../ContentBox';
import locations from '../../data/D3/diaspora.json';
import './css/D3.css';

/**
 * Component displaying the text, location description, character bio, and geospatial visualizations related to the narrative fragment D3
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.feature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function D3({ feature, setFeatureFocus, children }) {
  /**
     * Function that defines how the point geo-objects should be displayed on the map
     *
     * @param {GeoJSON.Point} geoJsonPoint The point feature
     * @param {L.LatLng} latLng The latitude and longitude of the point feature
     * @returns {L.Marker}
     */
  const styleMarker = (geoJsonPoint, latLng) => {
    const icon = L.divIcon({
      html: '<i class="bi bi-pin-fill" style="color:var(--darya);font-size:1.6rem"/>',
      className: 'diaspora-icon',
      iconAnchor: [0, 30],
    });
    return L.marker(latLng, { icon, interactive: false });
  };

  /**
   * Binds a tooltip to each marker containing the name of the location
   *
   * @param {GeoJSON.Feature} feature The GeoJSON feature being iterated
   * @param {L.Layer} layer The corresponding Leaflet layer
   */
  const onEachFeature = (geofeature, layer) => {
    if (geofeature.properties && geofeature.properties.name) {
      layer.bindTooltip(geofeature.properties.name, {
        permanent: true,
        direction: 'center',
        className: 'diaspora-label',
      });
    }
  };

  return (
    <div>
      <ContentBox
        person={feature.properties.person}
        setFeatureFocus={setFeatureFocus}
      >
        <div
          className="narrative-fragment-text"
          dangerouslySetInnerHTML={{ __html: feature.properties.text }}
        />
        <p
          style={{ color: 'var(--primary)', fontSize: '8pt' }}
        >
          Auf der Karte sind Daryas Lieblingsorte und -veranstaltungen aus der iranischen Diaspora in Köln markiert.
        </p>
        {children}
      </ContentBox>
      <GeoJSON
        data={locations}
        pointToLayer={styleMarker}
        onEachFeature={onEachFeature}
      />
    </div>
  );
}
