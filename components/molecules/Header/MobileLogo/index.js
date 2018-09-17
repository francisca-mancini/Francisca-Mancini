import React from 'react';

import logoMiniWhite from '../../../../static/images/sprites/logo-mini-white.svg';
import logoMiniBlack from '../../../../static/images/sprites/logo-mini-black.svg';

export default function MobileLogo({ isLight }) {
  return (
    <img
      className="md-hidden"
      src={isLight ? logoMiniWhite : logoMiniBlack}
      width={41}
      height={44}
    />
  );
}
