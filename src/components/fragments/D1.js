import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import ImageCarousel from '../ImageCarousel';
import ContentBox from '../ContentBox';
import img1 from '../../data/D1/photos/1_mother.png';
import img2 from '../../data/D1/photos/2_birthday_2_copy.png';
import img3 from '../../data/D1/photos/3_ball_game.png';
import img4 from '../../data/D1/photos/4_grandparents.png';
import img5 from '../../data/D1/photos/5_dance.png';
import img6 from '../../data/D1/photos/6_picknick.png';
import img7 from '../../data/D1/photos/7_teenagers.png';
import img8 from '../../data/D1/photos/8_older.png';
import { useContentContext } from '../ContentLayer';

/**
 * Component displaying the text, location description, images, character bio, and visual effects related to the narrative fragment D1
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.feature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function D1({ feature, setFeatureFocus, children }) {
  /**
     * The images to be displayed in the slide show
     */
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];
  /**
     * The Leaflet map object
     */
  const map = useMap();
  const { selectedFeature } = useContentContext();
  /**
     * Slowly pans the map towards Teheran
     */
  useEffect(() => {
    if (selectedFeature.id === 'D1') {
      const handleFlyEnd = () => {
        map.panTo([35.73407393552157, 51.401564933532534], { animate: true, duration: 400, easeLinearity: 1 });
        map.off('moveend', handleFlyEnd);
      };

      map.on('moveend', handleFlyEnd);
    }
  });

  return (
    <div>
      <ContentBox
        // narrativeFragment={feature.properties.text}
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
          Auf der Karte ist Daryas Wohnung in Köln markiert.
          <br />
          <br />
        </p>
        <ImageCarousel
          images={images}
        />
        {children}
      </ContentBox>
    </div>
  );
}
