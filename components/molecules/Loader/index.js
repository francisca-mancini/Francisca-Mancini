import React, { PureComponent } from 'react';
import imagesLoaded from 'imagesloaded';
import classNames from 'classnames';
import { withRouter } from 'next/router';

import generalStyles from './general.module.css';

import loadingImage from '../../../static/images/loading-bg.jpg';

class Loader extends PureComponent {
  constructor() {
    super();

    this.heroHeight = 0;

    this.state = {
      imagesLoaded: false,
      videoLoaded: false,
      animationLoaded: false,
      hideLoader: false,
      ready: false
    };

    this.checkVideo = this.checkVideo.bind(this);
    this.checkAnimation = this.checkAnimation.bind(this);
  }

  componentDidMount() {
    this.checkImages();
    this.checkVideo();

    this.containerRef.style.height = `${this.containerRef.offsetHeight}px`;

    this.maskRef.addEventListener('animationend', this.checkAnimation, false);
    window.addEventListener('load', this.checkVideo, false);
  }

  componentDidUpdate(prevProps, prevState) {
    const { imagesLoaded, videoLoaded, animationLoaded, ready } = this.state;

    if (
      prevState.imagesLoaded !== imagesLoaded ||
      prevState.videoLoaded !== videoLoaded ||
      prevState.animationLoaded !== animationLoaded
    ) {
      console.log('change');

      if (!ready && imagesLoaded && videoLoaded && animationLoaded) {
        console.log('ready should be true');
        this.launchLoader();
      }
    }
  }

  checkImages() {
    imagesLoaded(
      '#root',
      { background: true },
      function(e) {
        this.setState({ imagesLoaded: true });
      }.bind(this)
    );
  }

  checkAnimation() {
    this.setState({ animationLoaded: true });
  }

  checkVideo() {
    const { videoLoaded } = this.state;
    const video = document.querySelector('video');

    if (videoLoaded) return;

    if (video.readyState === 4) {
      this.setState({ videoLoaded: true });
    } else {
      setTimeout(this.checkVideo, 100);
    }
  }

  launchLoader() {
    const videoContainer = document.querySelector('#heroVideo');

    this.containerRef.style.height = `${videoContainer.offsetHeight}px`;

    this.setState({ hideLoader: true });
    this.props.onUpdate(true);
  }

  render() {
    const { hideLoader } = this.state;
    const containerClassName = classNames(generalStyles.container, {
      [generalStyles.containerHide]: hideLoader
    });
    const innerClassName = classNames(generalStyles.inner, {
      [generalStyles.innerHide]: hideLoader
    });
    const holderClassName = classNames(generalStyles.holder, {
      [generalStyles.holderOut]: hideLoader
    });
    const holderInnerClassName = classNames(generalStyles.holderInner, {
      [generalStyles.holderInnerOut]: hideLoader
    });

    return (
      <div
        className={containerClassName}
        ref={ref => {
          this.containerRef = ref;
        }}
      >
        <div
          className={innerClassName}
          ref={ref => {
            this.innerRef = ref;
          }}
          style={{ backgroundImage: `url(${loadingImage})` }}
        >
          <div className={holderClassName}>
            <div className={holderInnerClassName}>
              <div className={generalStyles.strokeHolder}>
                <svg
                  className={generalStyles.svg}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="10"
                  viewBox="0 0 602.1 657"
                >
                  <path
                    className={generalStyles.path1}
                    d="M301,95L260,0c-13,13-19,19-37,19h-67c-36,0-65,25-65,60c0,53,52,53,54,85c13-7,28-22,17-43c12-2,15-15,15-23
                    c-15,7-38,4-38-14c0-9,8-17,17-17h58l-29,102c15,1,30,6,43,13l25-86l48,112l48-112l26,89c13-8,27-13,42-16L388,67h58
                    c9,0,17,8,17,17c0,18-23,21-38,14c0,8,3,21,15,23c-11,21,4,36,17,43c2-32,54-32,54-85c0-35-29-60-65-60h-67c-18,0-24-6-37-19
                    L301,95z"
                  />
                  <path
                    className={generalStyles.path2}
                    d="M278,271c-85-138-165-47-243-47c-10,0-21-3-34-10c-6,25,15,49,37,53c-4,13,4,33,12,41c54-66,132-99,180-21l27,44l29-47
                    L278,271z"
                  />
                  <path
                    className={generalStyles.path3}
                    d="M198,288c-11-13-25-20-42-19l-25,88c-10,36-28,48-46,48c-7,0-15-1-24-4c0,12,5,30,17,36c-5,8-7,19-7,28c0,14,6,27,19,36
                    c12-51,58-41,84-130L198,288z"
                  />
                  <path
                    className={generalStyles.path4}
                    d="M428,371c26,89,72,79,84,130c13-9,19-22,19-36c0-9-2-20-7-28c12-6,17-24,17-36c-9,3-17,4-24,4c-18,0-36-12-46-48l-25-88
                    c-17-1-31,6-42,19L428,371z"
                  />
                  <path
                    className={generalStyles.path5}
                    d="M494,557c-8,2-14,3-20,3c-21,0-29-13-47-42l-52-86h-57l88,144c28,46,49,42,59,81c13-9,19-22,19-36c0-9-2-20-7-28
                    C489,587,494,569,494,557L494,557z"
                  />
                  <path
                    className={generalStyles.path6}
                    d="M246,356c-21,0-33-7-38-10c-2,8-4,20,3,27c-18,3-22,32-10,44c7-9,17-13,28-13h15l-69,114c-18,29-26,42-47,42
                    c-6,0-12-1-20-3c0,12,5,30,17,36c-5,8-7,19-7,28c0,14,6,27,19,36c10-39,31-35,59-81l105-172h72c11,0,21,4,28,13c12-12,8-41-10-44
                    c7-7,5-19,3-27c-5,3-17,10-38,10h-26l42-69c47-78,126-45,180,21c8-8,16-28,12-41c22-4,43-28,37-53c-13,7-24,10-34,10
                    c-78,0-159-92-243,47l-51,85H246z"
                  />
                </svg>
              </div>

              <div
                className={generalStyles.maskHolder}
                ref={ref => {
                  this.maskRef = ref;
                }}
              >
                <svg
                  className={generalStyles.svgMask}
                  fill="#ffffff"
                  viewBox="0 0 602.1 657"
                >
                  <path
                    d="M301,95L260,0c-13,13-19,19-37,19h-67c-36,0-65,25-65,60c0,53,52,53,54,85c13-7,28-22,17-43c12-2,15-15,15-23
                    c-15,7-38,4-38-14c0-9,8-17,17-17h58l-29,102c15,1,30,6,43,13l25-86l48,112l48-112l26,89c13-8,27-13,42-16L388,67h58
                    c9,0,17,8,17,17c0,18-23,21-38,14c0,8,3,21,15,23c-11,21,4,36,17,43c2-32,54-32,54-85c0-35-29-60-65-60h-67c-18,0-24-6-37-19
                    L301,95z"
                  />
                  <path
                    d="M278,271c-85-138-165-47-243-47c-10,0-21-3-34-10c-6,25,15,49,37,53c-4,13,4,33,12,41c54-66,132-99,180-21l27,44l29-47
                    L278,271z"
                  />
                  <path
                    d="M198,288c-11-13-25-20-42-19l-25,88c-10,36-28,48-46,48c-7,0-15-1-24-4c0,12,5,30,17,36c-5,8-7,19-7,28c0,14,6,27,19,36
                    c12-51,58-41,84-130L198,288z"
                  />
                  <path
                    d="M428,371c26,89,72,79,84,130c13-9,19-22,19-36c0-9-2-20-7-28c12-6,17-24,17-36c-9,3-17,4-24,4c-18,0-36-12-46-48l-25-88
                    c-17-1-31,6-42,19L428,371z"
                  />
                  <path
                    d="M494,557c-8,2-14,3-20,3c-21,0-29-13-47-42l-52-86h-57l88,144c28,46,49,42,59,81c13-9,19-22,19-36c0-9-2-20-7-28
                    C489,587,494,569,494,557L494,557z"
                  />
                  <path
                    d="M246,356c-21,0-33-7-38-10c-2,8-4,20,3,27c-18,3-22,32-10,44c7-9,17-13,28-13h15l-69,114c-18,29-26,42-47,42
                    c-6,0-12-1-20-3c0,12,5,30,17,36c-5,8-7,19-7,28c0,14,6,27,19,36c10-39,31-35,59-81l105-172h72c11,0,21,4,28,13c12-12,8-41-10-44
                    c7-7,5-19,3-27c-5,3-17,10-38,10h-26l42-69c47-78,126-45,180,21c8-8,16-28,12-41c22-4,43-28,37-53c-13,7-24,10-34,10
                    c-78,0-159-92-243,47l-51,85H246z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Loader);
