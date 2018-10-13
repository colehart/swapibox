import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ScrollingText.css';


class ScrollingText extends Component {
  constructor() {
    super();
    this.state = {
      film: 0
    }
  }

  changeText = () => {
    const newFilm = Math.floor(Math.random() * 7);
    this.setState({ film: newFilm });
  }

  render() {
    const currentFilm = this.props.allFilms[this.state.film]
    const { title, releaseDate, openingCrawl } = currentFilm;

    return (
      <aside
        className="ScrollingText"
        onAnimationEnd={this.changeText}>
        <p className="opening-crawl">{openingCrawl}</p>
        <h3 className="title">{title}</h3>
        <h4 className="release-date">{releaseDate}</h4>
      </aside>
    )
  }
}

ScrollingText.propTypes = {
  allFilms: PropTypes.array.isRequired
}

export default ScrollingText;