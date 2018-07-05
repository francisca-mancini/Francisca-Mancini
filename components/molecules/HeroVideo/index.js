import React, { PureComponent } from 'react';
import Observer from 'react-intersection-observer';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

import generalStyles from './general.module.css';

import video from '../../../static/videos/_temp/video2.mp4';

export default class HeroVideo extends PureComponent {
  constructor() {
    super();

    this.state = {
      isPlaying: false
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

  handleIntersection(inView) {
    const { isPlaying } = this.props;

    if (!isPlaying) return;
    this.setState({ isPlaying: inView });
  }

  render() {
    return (
      <Observer onChange={this.handleIntersection}>
        <div id="heroVideo" className={generalStyles.hero}>
          <ReactPlayer
            ref={ref => {
              this.playerRef = ref;
            }}
            className={generalStyles.video}
            width="100%"
            height="auto"
            url={video}
            volume={0}
            muted
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
