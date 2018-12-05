import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Observer from 'react-intersection-observer';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

import generalStyles from './general.module.css';

import soundOn from '../../../static/images/sprites/sound-on.svg';
import soundOff from '../../../static/images/sprites/sound-off.svg';

export default class HeroVideo extends PureComponent {
  constructor() {
    super();

    this.state = {
      isPlaying: false,
      isMuted: true
    };

    this.duration = 0;

    this.handleIntersection = this.handleIntersection.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPlaying !== this.props.isPlaying && this.props.isPlaying) {
      setTimeout(() => {
        this.setState({ isPlaying: true });
      }, 1150); // quick&dirty: following Loader's .containerHide timings
    }
  }

  onDuration = duration => {
    this.duration = duration;
  };

  onProgress = state => {
    this.currentTime = state.playedSeconds;

    const timeFraction = (this.currentTime / this.duration) * 100;
    this.barRef.style.transform = `translateX(${timeFraction.toFixed(3)}%)`;
  };

  toggleMute() {
    this.setState({ isMuted: !this.state.isMuted });
  }

  handleIntersection(inView) {
    const { isPlaying } = this.props;

    if (!isPlaying) return;
    this.setState({ isPlaying: inView });
  }

  render() {
    const { src, poster } = this.props;
    const { isMuted } = this.state;
    const soundOnClassName = classNames(generalStyles.soundOn, {
      hidden: !isMuted
    });
    const soundOffClassName = classNames(generalStyles.soundOff, {
      hidden: isMuted
    });

    return (
      <Observer onChange={this.handleIntersection}>
        <div id="heroVideo" data-poster={poster} className={generalStyles.hero}>
          <ReactPlayer
            ref={ref => {
              this.playerRef = ref;
            }}
            className={generalStyles.video}
            width="100%"
            height="auto"
            url={src}
            volume={isMuted ? 0 : 1}
            muted={isMuted}
            loop
            playsinline
            playing={this.state.isPlaying}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
          />
          <div className={generalStyles.seekbarContainer}>
            <div className={generalStyles.seekbar}>
              <div
                ref={ref => {
                  this.barRef = ref;
                }}
                className={generalStyles.bar}
              />
            </div>
            <div
              className={generalStyles.sound}
              onClick={this.toggleMute.bind(this)}
            >
              <img src={soundOn} className={soundOnClassName} />
              <img src={soundOff} className={soundOffClassName} />
            </div>
          </div>
        </div>
      </Observer>
    );
  }
}

HeroVideo.propTypes = {
  isPlaying: PropTypes.bool
};

HeroVideo.defaultProps = {
  isPlaying: true
};
