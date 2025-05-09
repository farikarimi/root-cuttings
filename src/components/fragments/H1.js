import ContentBox from '../ContentBox';

/**
 * Component displaying the text, location description, YouTube video, and character bio related to the narrative fragment H1
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.feature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function H1({ feature, setFeatureFocus, children }) {
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
          Auf der Karte ist Hadis Wohnung in Speyer markiert.
          <br />
          <br />
        </p>
        <div
          className="d-flex justify-content-center"
        >
          <iframe
            width="40%"
            height="240"
            title="Ice Flower"
            src="https://www.youtube.com/embed/YRdih8Hckj4?loop=1&playlist=YRdih8Hckj4"
          />
        </div>
        <br />
        {children}
      </ContentBox>
    </div>
  );
}
