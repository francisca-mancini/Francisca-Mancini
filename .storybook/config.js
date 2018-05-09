import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';

import '../style.css';

const context = require.context('../components', true, /.stories.js$/)

// addon-info
setDefaults({
  inline: true,
  header: false,
  styles: stylesheet => ({
    ...stylesheet,
    infoBody: {
      ...stylesheet.infoBody,
      boxShadow: "none",
      border: "none"
    },
    infoStory: {
      padding: "20px 40px 20px",
      marginTop: "20px",
      overflow: "hidden"
    }
  })
});

// Option defaults:
setOptions({
  sidebarAnimations: false
});

configure(() => context.keys().forEach(context), module);
