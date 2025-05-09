import ContentBox from '../ContentBox';
import ImageCarousel from '../ImageCarousel';
import souvenirIran from '../../data/A3/souvenir_iran.jpeg';
import souvenirVietnam from '../../data/A3/souvenir_vietnam.jpg';

/**
 * Component displaying the text, location description, images, and character bio related to the narrative fragment A3
 *
 * @param {object} props
 * @param {GeoJSON.Feature} props.feature The geo-object that was clicked on by the user
 * @param {React.Dispatch} props.setFeatureFocus Function to update the value indicating whether a geo-object is currently selected or not
 * @returns {React.JSX.Element}
 */
export default function A3({ feature, setFeatureFocus, children }) {
  /**
     * Attribution text for the first image of the slide show
     */
  const imageAttribution = 'Phương Huy, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons';

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
          Auf der Karte ist Café Tante August in Münster markiert.
          <br />
          <br />
        </p>
        <ImageCarousel
          images={[souvenirVietnam, souvenirIran]}
        />
        <p
          id="attribution"
        >
          <br />
          Foto 1:
          {imageAttribution}
        </p>
      </ContentBox>
      {children}
    </div>
  );
}
