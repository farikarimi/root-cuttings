import { Stack, Button } from 'react-bootstrap';
import { DEFAULT_ZOOM, FEATURE_ZOOM } from './ContentLayer';
import places from '../data/places.json';
import './css/PlaceList.css';

/**
 * Component displaying buttons for zooming into and out of key areas on the map
 *
 * @returns {React.JSX.Element}
 */
export default function PlaceList({
  setCurrentZoom, setCurrentCenter, currentZoom, resetMap,
}) {
  const handleClick = (e) => {
    const placeName = e.target.id;
    places.features.forEach((feature) => {
      if (feature.properties.name === placeName) {
        setCurrentCenter(feature.geometry.coordinates);
        setCurrentZoom(FEATURE_ZOOM);
      }
    });
  };

  return (
    <Stack
      id="place-stack"
      gap={3}
    >
      {places.features.map((place) => (
        <Button
          className="place-button"
          key={place.properties.name}
          onClick={handleClick}
        >
          <i
            className="bi bi-geo-alt-fill"
          />
          <span
            id={place.properties.name}
          >
            {' '}
            {place.properties.name}
          </span>
        </Button>
      ))}
      {currentZoom !== DEFAULT_ZOOM
          && (
          <Button
            className="place-button"
            onClick={resetMap}
          >
            Alle Orte anzeigen
          </Button>
          )}
    </Stack>
  );
}
