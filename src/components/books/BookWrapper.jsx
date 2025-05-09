import React, { useRef } from 'react';
import '../css/App.css';
import HTMLFlipBook from 'react-pageflip';
import { useMap } from 'react-leaflet';

function BookWrapper({ startPage, updatePage, children }) {
  const bookRef = useRef();
  const map = useMap();

  return (
    <div
      role="button"
      tabIndex={0}
      className="flipbook-wrapper"
      onMouseDown={() => { map.dragging.disable(); }}
      onMouseUp={() => { map.dragging.enable(); }}
    >
      <HTMLFlipBook
        width={660}
        height={725}
        startZIndex={490}
        className="flipbook"
        ref={bookRef}
        maxShadowOpacity={0.2}
        onInit={(initob) => {
          console.log(initob.data);
          bookRef.current.pageFlip().turnToPage(startPage);
        }}
        onFlip={(pageNumber) => { console.log('UPDATEPAGE'); updatePage(pageNumber); }}
      >
        {children}
      </HTMLFlipBook>
    </div>
  );
}

export default BookWrapper;
