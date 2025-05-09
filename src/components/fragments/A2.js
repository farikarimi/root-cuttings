import L from 'leaflet';
import { Polyline, Marker } from 'react-leaflet';
import ContentBox from '../ContentBox';

/**
 * Component displaying the text, location description, character bio, and geospatial visualizations related to the narrative fragment A2
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.feature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function A2({ feature, setFeatureFocus, children }) {
  /**
     * Icon for the marker respresenting Darya's house on the map
     */
  const icon = L.divIcon({
    html: '<i class="bi bi-house-fill" style="color:var(--darya);font-size:1.8rem"/>',
    className: 'house-icon',
    iconAnchor: [13, 20],
  });

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
        <span
          style={{ color: 'var(--primary)', fontSize: '8pt' }}
        >
          Auf der Karte sind Azars Lieblingspark in Münster und Daryas Wohnung in Köln markiert.
          <br />
        </span>
      </ContentBox>
      <Polyline
        positions={[[51.963718, 7.60855], [50.96099513916005, 6.9507913696124035]]}
        pathOptions={{
          color: 'var(--darya)', weight: 5, opacity: 0.7, dashArray: '1, 20', dashOffset: '0',
        }}
        interactive={false}
      />
      <Marker
        position={[50.96099513916005, 6.9507913696124035]}
        icon={icon}
        interactive={false}
      />
      {children}
    </div>
  );
}
