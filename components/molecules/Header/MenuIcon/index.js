import React from 'react';

import menuWhite from '../../../../static/images/sprites/menu-white.svg';
import menuBlack from '../../../../static/images/sprites/menu-black.svg';

export default function MenuIcon({ isLight }) {
  return <img src={isLight ? menuWhite : menuBlack} width={34} height={18} />;
}
