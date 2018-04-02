import React from 'react';

const ImageViewer = (props) => {
	const { viewerLink, viewerTools, viewerUrl, viewerAlt } = props;
  const imageStrips = Array(10).fill().map((strip, i) => (<div key = {i} className = 'image-strip'></div>) );

  const launchLink = viewerUrl ? <a className = 'launch-btn' href = {viewerUrl.toString()} target='_blank'>Launch</a> : undefined;

  return (
    <figure  className = {viewerLink ? 'active image-viewer' : 'hide image-viewer'}>
      <div className = 'viewer-overlay' onClick = {() => props.onCloseClick()}></div>
      <div className = 'image-strip-container'>
        { imageStrips }
        <div className = 'image-strip'>
          <img src = {viewerLink} className = 'hide' alt = {viewerAlt || `image here`}/>
        </div>
        <i className = 'close-btn' onClick = {() => props.onCloseClick()}>&times;</i>
        <a className = 'prev-btn' onClick = {() => props.onPrevClick()}>Prev</a>
        <a className = 'next-btn' onClick = {() => props.onNextClick()}>Prev</a>
      </div>
      <figcaption>
        <p>What: {viewerAlt}</p>
        <p>Tools: <span  dangerouslySetInnerHTML = {{__html: viewerTools}} /></p>
        {launchLink}
      </figcaption>  
    </figure>
  ); 
}

export default ImageViewer;