import React, { Component } from 'react';
import PropTypes from 'prop-types';
import whiteSaber from './../../assets/icons/lightsaber-wt.png';
import blackSaber from './../../assets/icons/lightsaber-bk.png';
import './Card.css';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      src: whiteSaber
    };
  }

  checkActive = () => {
    if (!this.props.isActive) {
      this.props.addFavorite()
    } else {
      this.props.removeFavorite()
    }
  }

  createListItems = (contentsList) => {
    contentsList.shift()
    const id = contentsList.shift()
    return contentsList.map((item, index) => {
      return(
        <li key={`${id}-${index}`}>
          {item[0]}: <span className='details'>{item[1]}</span>
        </li>
      )
    })
  }

  render() {
    const { src } = this.state;
    const { contents , currentDisplay , isActive } = this.props;
    const contentsList = Object.entries(contents)

    return (
      <article className={
        `Card ${currentDisplay}-` + (isActive ? 'bg-glow' : 'bg-off')
      }>
        <h3 className={'name ' + (isActive ? 'is-black' : 'is-white')}>
          {contents.name}
        </h3>
        <div className={
          `saber ${currentDisplay}-` + (isActive ? 'is-glowing' : 'is-off')
        }>
        </div>
        <img
          className='hilt'
          src={src}
          onMouseOver={() => {this.setState({ src: blackSaber })}}
          onMouseOut={() => {this.setState({ src: whiteSaber })}}
          alt='The hilt of a lightsaber. Turn the lightsaber on to favorite this card.'
          onClick={() => {
            this.setState({ src: whiteSaber });
            this.checkActive();
          }} />
        <ul className='content'>
          {this.createListItems(contentsList)}
        </ul>
      </article>
    )
  }
}

Card.propTypes = {
  contents: PropTypes.object.isRequired,
  currentDisplay: PropTypes.string.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
}

export default Card;