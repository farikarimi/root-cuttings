import L from 'leaflet';
import { Marker } from 'react-leaflet';
import BookWrapper from './books/BookWrapper';
import features from '../data/narrative_fragments.json';
import A1 from './fragments/A1';
import A2 from './fragments/A2';
import A3 from './fragments/A3';
import A4 from './fragments/A4';
import D1 from './fragments/D1';
import D2 from './fragments/D2';
import D3 from './fragments/D3';
import D5 from './fragments/D5';
import D6 from './fragments/D6';
import D7 from './fragments/D7';
import H1 from './fragments/H1';
import H3 from './fragments/H3';
import H4 from './fragments/H4';
import H5 from './fragments/H5';

const MAP_DATA_INDICES = {
  A1: 0,
  A2: 1,
  A3: 2,
  A4: 3,
  D1: 0,
  D2: 1,
  D3: 2,
  D5: 3,
  D6: 4,
  D7: 5,
  H1: 0,
  H3: 1,
  H4: 2,
  H5: 3,
};

/**
 * Component displaying the narrative fragment, media, and visualizations of the selected geo-object
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.selectedFeature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function FragmentViz({
  selectedFeature, updatePage,
}) {
  /**
     * Coordinates of the geo-object
     */
  const { coordinates } = selectedFeature.geometry;
  /**
     * Name of the narrating character of the selected geo-object used to set the color of the marker icon
     */
  const markerColor = selectedFeature.properties.person.toLowerCase();

  /**                    <button className='icon-button'>
                        <img src={rightArrow} className='icon'/>
                    </button>
     * Icon of the marker shown on the map when a geo-object is selected
     */
  const icon = L.divIcon({
    html: `<i class="bi bi-chat-left-dots-fill" style="color:var(--${markerColor});font-size:1.6rem"/>`,
    className: 'story-icon',
    iconAnchor: [0, 30],
  });

  return (
    <div>
      <Marker
        position={[coordinates[1], coordinates[0]]}
        icon={icon}
        interactive={false}
      />
      {(() => {
        switch (selectedFeature.properties.person) {
          case 'Azar':
            return (
              <BookWrapper startPage={MAP_DATA_INDICES[selectedFeature.id]} updatePage={updatePage}>
                <div><A1 feature={features.features[6]} /></div>
                <div><A2 feature={features.features[7]} /></div>
                <div><A3 feature={features.features[8]} /></div>
                <div><A4 feature={features.features[9]} /></div>
              </BookWrapper>
            );
          case 'Darya':
            return (
              <BookWrapper startPage={MAP_DATA_INDICES[selectedFeature.id]} updatePage={updatePage}>
                <div><D1 feature={features.features[0]} /></div>
                <div><D2 feature={features.features[1]} /></div>
                <div><D3 feature={features.features[2]} /></div>
                <div><D5 feature={features.features[3]} /></div>
                <div><D6 feature={features.features[4]} /></div>
                <div><D7 feature={features.features[5]} /></div>
              </BookWrapper>
            );
          case 'Hadi':
            return (
              <BookWrapper startPage={MAP_DATA_INDICES[selectedFeature.id]} updatePage={updatePage}>
                <div><H1 feature={features.features[10]} /></div>
                <div><H3 feature={features.features[11]} /></div>
                <div><H4 feature={features.features[12]} /></div>
                <div><H5 feature={features.features[13]} /></div>
              </BookWrapper>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}
