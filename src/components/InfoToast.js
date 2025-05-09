import React, { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import './css/InfoToast.css';
import features from '../data/narrative_fragments.json';

/**
 * Component displaying a welcome message and instructions on how to navigate the web app
 *
 * @returns {React.JSX.Element}
 */
export default function InfoToast({ updateFeature }) {
  /**
     * State storing a boolean value indicating whether the element is shown
     */
  const [showToast, setShowToast] = useState(true);

  return (
    <Toast
      show={showToast}
      id="info-toast"
    >
      <Button
        variant="link"
        id="close-toast"
        onClick={() => setShowToast(false)}
      >
        x
      </Button>
      <Toast.Body
        className="mt-3 p-3"
      >
        Willkommen!
        <br />
        <br />
        Auf dieser Seite erzählen dir
        {' '}
        <button type="button" id="hadi-button" onClick={() => { updateFeature(features.features[10]); }}>Hadi</button>
        ,
        {' '}
        <button type="button" id="azar-button" onClick={() => { updateFeature(features.features[6]); }}>Azar</button>
        {' '}
        und
        {' '}
        <button type="button" id="darya-button" onClick={() => { updateFeature(features.features[0]); }}>Darya</button>
        ,
        welche Auswirkungen die Migration nach Deutschland auf ihre Leben hatte.
        <br />
        <br />
        Um mehr über sie zu erfahren, klicke auf die Marker
        {' '}
        <i className="bi bi-chat-left-text-fill" id="toast-icon" />
        {' '}
        auf der Karte.
        Um alle Marker an einem bestimmten Ort zu sehen, klicke auf der linken Seite auf den Ortsnamen.
      </Toast.Body>
    </Toast>
  );
}
