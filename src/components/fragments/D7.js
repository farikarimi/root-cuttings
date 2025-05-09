import { useState } from 'react';
import {
  Button, Stack, Modal, Toast, Image,
} from 'react-bootstrap';
import ContentBox from '../ContentBox';
import collage from '../../data/D7/collage.jpg';
import './css/D7.css';
import { useContentContext } from '../ContentLayer';

/**
 * Component displaying the text, location description, image, character bio and interactive UI elements related to the narrative fragment D7.
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.feature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function D7({ feature, setFeatureFocus, children }) {
  /**
     * State storing a boolean value indicating whether the input prompt is shown
     */
  const [showModal, setShowModal] = useState(true);
  /**
     * State storing a boolean value indicating whether the reply to the user input is shown
     */
  const [showToast, setShowToast] = useState(false);
  /**
     * The Leaflet map object
     */
  const { setCurrentCenter, selectedFeature } = useContentContext();
  /**
     * Function handling user interaction with the prompt element and paning the map to Frankfurt Airport
     */
  const handleChoice = () => {
    setShowModal(false);
    setCurrentCenter([50.037832541828124, 8.551775972924135 - 0.012]);
    setTimeout(() => {
      setShowToast(true);
    }, 6000);
  };

  return (
    <div>
      <Toast
        show={showToast}
      >
        <Button
          variant="link"
          id="close-toast"
          onClick={() => setShowToast(false)}
        >
          x
        </Button>
        <Toast.Body
          className="mt-3"
        >
          Das war eine rhetorische Frage.
          <br />
          Willkommen in Deutschland!
        </Toast.Body>
      </Toast>
      <ContentBox
        narrativeFragment={feature.properties.text}
        person={feature.properties.person}
        setFeatureFocus={setFeatureFocus}
      >
        <div
          className="d-flex justify-content-center"
        >
          <Image
            id="d7-image"
            src={collage}
            rounded
          />
        </div>
        <span
          style={{ color: 'var(--primary)', fontSize: '8pt' }}
        >
          Auf der Karte ist der Imam Khomeini-Flughafen in Teheran markiert.
          <br />
          <span
            className="tooltip"
            data-tooltip="Der Imam Khomeini-Flughafen ist der wichtigste internationale Flughafen des Iran."
          >
            Mehr dazu
          </span>
        </span>
        {children}
      </ContentBox>
      { selectedFeature.id === 'D7'
      && (
      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        centered
      >

        <Modal.Body>
          <p>Bist du bereit, alles hinter dir zu lassen?</p>
          <Stack
            gap={1}
          >
            <Button
              className="modal-button"
              onClick={handleChoice}
            >
              Moment mal.. Worum geht&apos;s überhaupt?
            </Button>
            <Button
              className="modal-button"
              onClick={handleChoice}
            >
              Kann ich kurz überlegen?
            </Button>
            <Button
              className="modal-button"
              onClick={handleChoice}
            >
              Nein!
            </Button>
          </Stack>
        </Modal.Body>
      </Modal>
      ) }
    </div>
  );
}
