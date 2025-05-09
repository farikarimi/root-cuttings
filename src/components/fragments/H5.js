import { useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import ContentBox from '../ContentBox';
import natureSound from '../../data/H5/nature.mp3';
import image from '../../data/H5/gilan_house.JPG';
import './css/H5.css';
import { useContentContext } from '../ContentLayer';
/**
 * Component displaying the text, location description, image, and character bio and playing the audio related to the narrative fragment H5
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.feature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function H5({ feature, setFeatureFocus, children }) {
  /**
     * Attribution text for the image
     */
  const soundAttribution = '100% Nature (Brook Sounds and Birds).mp3 by Sonoquilibrium – https://freesound.org/s/514750/ – License: Attribution NonCommercial 3.0';
  /**
     * Attribution text for the sound
     */
  const imageAttribution = 'Irangilaneh, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons';
  const { selectedFeature } = useContentContext();

  /**
     * Plays the audio on repeat and pauses it when the content box is closed
     */
  useEffect(() => {
    if (selectedFeature.id === 'H5') {
      const rainAudio = new Audio(natureSound);
      rainAudio.play();
      rainAudio.loop = true;
      return () => rainAudio.pause();
    }
    return () => {};
  }, [selectedFeature]);

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
          Auf der Karte ist der Ort markiert, wo Hadis Haus in Gilan stehen könnte.
          <br />
        </p>
        <div
          className="d-flex justify-content-center"
        >
          <Image
            id="h5-image"
            src={image}
            rounded
          />
        </div>
        <p
          id="attribution"
        >
          Foto:
          {' '}
          {imageAttribution}
          <br />
          Audio:
          {' '}
          {soundAttribution}
        </p>
        {children}
      </ContentBox>
    </div>
  );
}
