import { useState, useEffect } from 'react';
import { Button, Card, Collapse } from 'react-bootstrap';
import bios from '../data/bios.json';
import './css/ContentBox.css';

/**
 * Component displaying a box containing a narrative fragment, the related media, any embedded child elements and the narrating character's bio
 *
 * @param {object} props
 * @param {React.ReactNode} props.children Embedded children
 * @param {string} props.narrativeFragment The narrative fragment to be displayed
 * @param {string} props.person The name of the narrating character
 * @returns {React.JSX.Element}
 */
export default function ContentBox({
  children, narrativeFragment, person,
}) {
  /**
     * State storing a boolean value indicating whether the long character bio is collapsed
     */
  const [collapseOpen, setCollapseOpen] = useState(false);
  /**
     * State storing an object containing the short and long character bio
     */
  const [bio, setBio] = useState({});

  /**
     * Sets the value of the character bio when the content box is opened
     * */
  useEffect(() => {
    if (person) {
      setBio(bios[person]);
    }
  }, [person]);

  return (
    <Card
      id="content-box"
    >
      <Card.Body
        id="card-body"
      >
        <Card.Text className="m-4 narrative-fragment-text">
          {Array.isArray(narrativeFragment)
            ? narrativeFragment.map((segment) => (
              <span
                key={segment.id}
                title={segment.hover || ''}
                style={segment.hover ? { textDecoration: 'underline', cursor: 'help' } : {}}
              >
                {segment.content}
              </span>
            ))
            : narrativeFragment}
        </Card.Text>
        {children}
        <br />
        <p>
          {bio.short_bio}
        </p>
        <Button
          variant="link"
          id="show-more-button"
          onClick={() => setCollapseOpen(!collapseOpen)}
          aria-controls="character-info"
          aria-expanded={collapseOpen}
        >
          {collapseOpen ? 'Weniger anzeigen' : 'Mehr anzeigen'}
        </Button>
        <Collapse
          in={collapseOpen}
          id="show-more-collapse"
        >
          <div
            id="long-bio"
          >
            {bio.long_bio}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
