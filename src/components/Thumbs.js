import React, { Component } from 'react';

class Thumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerLink: ''
    }
  }
  render() {
    const json = this.props.json;

    return (
      json.map((data, i) => (
        <a
          href = "#to"
          key = {i}
          onClick = {(event) => this.props.onClick(
            event,
            {
              viewerIndex: i,
              viewerLink: `./images/large/${data.image}`,
              viewerAlt: data.title,
              viewerUrl: data.url,
              viewerTools: data.tools
            })}
          >
          <img
            src = {`./images/thumbs/${data.image}`}
            alt = {data.title}
            title = {data.title}   
          />
        </a>)) 
    );
  }
}

export default Thumbs;