// import { useEffect } from 'react';
// import { useMap } from 'react-leaflet';
import { Image } from 'react-bootstrap';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-leaflet';
import { useContentContext } from '../ContentLayer';
import ContentBox from '../ContentBox';
import image from '../../data/H3/working.png';
import './css/H3.css';
import '../css/App.css';/**
 * Component displaying the text, location description, image, character bio, and visual effects related to the narrative fragment H3
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.feature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function H3({ feature, setFeatureFocus, children }) {
  /**
     * The Leaflet map object
     */
  const map = useMap();

  const { selectedFeature } = useContentContext();
  /**
     * Coordinates of the selected geo-object
     */
  const coords = feature.geometry.coordinates;
  /**
     * Modified coordinates to fit the layout with the content box
     */
  const modifiedCoords = useMemo(() => [coords[0] - 0.023, coords[1]], [coords]);

  /**
     * Creates a visual effect that simulates an earth quake
     */
  useEffect(() => {
    if (selectedFeature.id === 'H3') {
      const handleFlyEnd = () => {
        map.off('moveend', handleFlyEnd);
        const resetButton = document.getElementById('reset-button');
        resetButton?.classList.add('disabled');

        const startEarthquake = () => {
          let iteration = 0;
          const maxIterations = 20;
          const earthquakeInterval = 100;
          let earthquakeEffect;

          const stopEarthquake = () => {
            if (earthquakeEffect) {
              clearInterval(earthquakeEffect);
            }
            resetButton?.classList.remove('disabled');
          };

          earthquakeEffect = setInterval(() => {
            if (iteration >= maxIterations) {
              stopEarthquake();
              return;
            }

            const offsetLat = (Math.random() - 0.5) * 0.008;
            const offsetLng = (Math.random() - 0.5) * 0.008;

            map.setView([modifiedCoords[1] + offsetLat, modifiedCoords[0] + offsetLng]);
            iteration += 1;
          }, earthquakeInterval);

          return stopEarthquake;
        };

        const timeout = setTimeout(() => {
          const cleanupEarthquake = startEarthquake();

          return () => {
            clearTimeout(timeout);
            cleanupEarthquake?.();
          };
        }, 3000);

        return () => {
          clearTimeout(timeout);
        };
      };
      map.on('moveend', handleFlyEnd);

      return () => {
        map.off('moveend', handleFlyEnd);
      };
    }
    return () => {};
  }, [selectedFeature, map, modifiedCoords]);

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
          Auf der Karte ist das Dorf Aghuzlu markiert, aus dem Hadis Eltern stammen.
          <br />
          <br />
        </p>
        <div
          className="d-flex justify-content-center"
        >
          <Image
            id="h3-image"
            src={image}
            rounded
          />
        </div>
        {children}
      </ContentBox>
    </div>
  );
}
