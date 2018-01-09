import React, { Component } from 'react';
import Thumbs from './Thumbs';
import ImageViewer from './ImageViewer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: [],
      viewerIndex: undefined,
      viewerLink: undefined,
      viewerAlt: undefined,
      viewerUrl: undefined,
      viewerTools: undefined
    };
    this.timeout = undefined;
  }

  componentWillMount() {
    this._getData(this.props.jsonFile);
  }

  componentWillUpdate() {
    document.querySelector('.container').className = 'container active';   
    this._tweenViewerImage();
  }

  componentWillUnmount() {
    document.querySelector('body').className = '';
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <section className = "container">
        <header className = "main-header">
          <h1 className = "app-title">{this.props.pageName}</h1>
        </header>
        <figure className='image-viewer-thumbs'>
          <Thumbs
            json = {this.state.jsonData}
            onClick = {(e, opts) => this._openViewer(e, opts)}
          ></Thumbs>
        </figure>
        <ImageViewer
          viewerLink = {this.state.viewerLink}
          viewerAlt = {this.state.viewerAlt}
          viewerUrl = {this.state.viewerUrl}
          viewerTools = {this.state.viewerTools}
          onCloseClick = {() => this._closeViewer()}
          onNextClick = {() => this._showNext()}
          onPrevClick = {() => this._showPrev()}
        ></ImageViewer>
      </section>
    );
  }

  _openViewer(e, opts = {}) {
    if (e) e.preventDefault();

    const {
      viewerIndex,
      viewerLink,
      viewerAlt,
      viewerUrl,
      viewerTools
    } = opts;

    this.setState({
      viewerIndex,
      viewerLink,
      viewerAlt,
      viewerUrl,
      viewerTools
    });
  }

  _showNext() {
    const nextIndex = this.state.viewerIndex === this.state.jsonData.length - 1 ? 0 : this.state.viewerIndex + 1;
    this._incrementViewer(nextIndex);
  }

  _showPrev() {
    const prevIndex = this.state.viewerIndex ===  0 ? this.state.jsonData.length - 1: this.state.viewerIndex - 1;
    this._incrementViewer(prevIndex);
  }

  _incrementViewer(index) {
    const stagedObj = this.state.jsonData[index];
    const opts = {
      viewerIndex: index,
      viewerLink: `./images/large/${stagedObj.image}`,
      viewerAlt: stagedObj.title,
      viewerUrl: stagedObj.url,
      viewerTools: stagedObj.tools
    };
    this._closeViewer();
    setTimeout(() => {
      this._openViewer(undefined, opts);
    }, 1600);
  }

  _closeViewer() {
    document.querySelector('.image-viewer figcaption').className = '';
    document.querySelectorAll('.image-strip-container div').forEach((img) => {
      img.className = 'image-strip';
    });
    clearTimeout(this.timeout);
    setTimeout(() => {
      this.setState({
        viewerIndex: undefined,
        viewerLink: undefined,
        viewerAlt: undefined,
        viewerUrl: undefined,
        viewerTools: undefined
      });
    }, 1600);
  }

  _getData(url) {
    const httpReq = new XMLHttpRequest();
    const app = this;

    httpReq.open('GET', url);
    httpReq.send();
    httpReq.onreadystatechange = () => {
      if (httpReq.readyState === XMLHttpRequest.DONE) {
        if (httpReq.status === 200) {
          app.setState( {jsonData: JSON.parse(httpReq.responseText)} );
        }
      }
    }
  }

  _tweenViewerImage() {
    const $viewerImage = document.querySelector('.image-viewer img');
    if ($viewerImage) {
      const $imageStripContainer = document.querySelector('.image-strip-container');
      const $imageStrip = $imageStripContainer.querySelectorAll('.image-strip');
      $viewerImage.onload = () => {
        const imageWidth = $viewerImage.width;
        const imageHeight = $viewerImage.height;
        $imageStripContainer.style.height = imageHeight / 10 + 'vw';
        $imageStripContainer.style.width = imageWidth / 10 + 'vw';
        $imageStripContainer.style.maxHeight = imageHeight + 'px';
        $imageStripContainer.style.maxWidth = imageWidth + 'px';
        document.querySelector('.image-viewer figcaption').className = 'active';

        if (matchMedia) {
          const mq = window.matchMedia('(max-width: 500px)');
          mq.addListener(onWidthChange);
          onWidthChange(mq);
        }

        $imageStrip.forEach((img, i) => {
          img.style.backgroundImage = `url(${this.state.viewerLink})`;
          if (i === $imageStrip.length - 1) {
            this.timeout = setTimeout(() => {
              img.className = 'image-strip active';
            }, 1800);
          } else {
            img.className = 'image-strip active';
          }
        });

        function onWidthChange(mq) {
          if (mq.matches) {
            const aspectRatio = imageWidth / imageHeight;
            $imageStripContainer.style.minHeight = 100 / aspectRatio + 'vw'
          } else {
             $imageStripContainer.style.minHeight = ''
          }
        }
      };
    }
  }
}

export default Home;
