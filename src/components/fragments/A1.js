import ContentBox from '../ContentBox';

/**
 * Component displaying the text, location description, and character bio related to the narrative fragment A1
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.feature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function A1({ feature, setFeatureFocus, children }) {
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
          Auf der Karte ist Azars Wohnung in Münster markiert.
          <br />
        </span>
        {children}
      </ContentBox>
    </div>
  );
}
