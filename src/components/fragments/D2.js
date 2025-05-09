import { useEffect } from 'react';
import { useMap, ImageOverlay } from 'react-leaflet';
import ContentBox from '../ContentBox';
import ImageCarousel from '../ImageCarousel';
import dtl from '../../data/D2/germany_overlay.png';
import img1 from '../../data/D2/photos/1.jpeg';
import img3 from '../../data/D2/photos/3.jpeg';
import img4 from '../../data/D2/photos/4.jpeg';
import img5 from '../../data/D2/photos/5.jpeg';
import img6 from '../../data/D2/photos/6.jpeg';
import img7 from '../../data/D2/photos/7.jpeg';
import img8 from '../../data/D2/photos/8.jpeg';
import './css/D2.css';
import { useContentContext } from '../ContentLayer';

/**
 * Component displaying the text, location description, images, character bio, and geospatial visualizations related to the narrative fragment D2
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.feature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function D2({ feature, setFeatureFocus, children }) {
  /**
     * The Leaflet map object
     */
  const map = useMap();
  /**
     * Northwest bound of the Germany image overlay
     */
  const nwBound = [38.585562030270566, 48.81217666252593];
  /**
     * Southeast bound of the Germany image overlay
     */
  const seBound = [26.10270924957595, 60.06376547836262];
  /**
     * The images to be displayed in the slide show
     */
  const images = [img1, img3, img4, img5, img6, img7, img8];
  const { selectedFeature } = useContentContext();
  /**
     * Zooms out and pans the map to show the entirety of the Germany image overlay after the view is focussed on the location marker
     */
  useEffect(() => {
    if (selectedFeature.id === 'D2') {
      setTimeout(() => {
        map.flyToBounds([[nwBound[0], nwBound[1] - 7], [seBound[0], seBound[1] - 7]]);
      }, 4000);
    }
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
        <p
          style={{ color: 'var(--primary)', fontSize: '8pt', marginTop: '-10px' }}
        >
          Auf der Karte ist der Saei-Park – Daryas Lieblingspark in der Nähe der ehemaligen Wohnung ihrer Familie – in Teheren markiert.
          <br />
          <br />
        </p>
        <ImageCarousel
          images={images}
        />
        {children}
      </ContentBox>
      <ImageOverlay
        url={dtl}
        zIndex={900}
        bounds={[nwBound, seBound]}
      />
    </div>
  );
}
