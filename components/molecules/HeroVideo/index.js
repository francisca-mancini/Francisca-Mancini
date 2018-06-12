import React, { PureComponent } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import Raf from '../../../lib/raf';

import generalStyles from './general.css';

import video from '../../../static/videos/_temp/video.mp4';

export default class HeroVideo extends PureComponent {
  constructor() {
    super();

    this.state = {
      isPlaying: true
    };

    this.RAF = new Raf();
    this.videoTotalTime = 0;

    this.loop = this.loop.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.RAF.subscribe(this.loop);
    this.RAF.start();

    this.videoTotalTime = this.videoRef.duration;
  }

  componentWillUnmount() {
    this.RAF.unsubscribe();
    this.RAF = null;
  }

  handleVisibilityChange(visible) {
    if (visible) {
      this.RAF.start();
    } else {
      this.RAF.stop();
    }
  }

  handleClick() {
    const { isPlaying } = this.state;

    if (isPlaying) {
      this.setState({ isPlaying: false }, () => {
        this.videoRef.pause();
      });
    } else {
      this.setState({ isPlaying: true }, () => {
        this.videoRef.play();
      });
    }
  }

  loop() {
    const timeFraction =
      (this.videoRef.currentTime / this.videoTotalTime) * 100;
    this.barRef.style.transform = `translateX(${timeFraction}%)`;
  }

  render() {
    return (
      <VisibilitySensor
        onChange={this.handleVisibilityChange}
        partialVisibility
      >
        <div className={generalStyles.hero} onClick={this.handleClick}>
          <div className={generalStyles.inner}>
            <video
              ref={ref => {
                this.videoRef = ref;
              }}
              className={generalStyles.video}
              src={video}
              autoPlay
              loop
              muted
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
        </div>
      </VisibilitySensor>
    );
  }
}
