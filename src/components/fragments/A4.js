import ContentBox from '../ContentBox';

/**
 * Component displaying the text, location description, and character bio related to the narrative fragment A4.
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.feature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function A4({ feature, setFeatureFocus, children }) {
  return (
    <div>
      <ContentBox
        narrativeFragment={feature.properties.text}
        person={feature.properties.person}
        setFeatureFocus={setFeatureFocus}
      >
        <span
          style={{ color: 'var(--primary)', fontSize: '8pt' }}
        >
          Auf der Karte ist das Amt für Migration und Integration in Münster markiert.
          <br />
        </span>
      </ContentBox>
      {children}
    </div>
  );
}
