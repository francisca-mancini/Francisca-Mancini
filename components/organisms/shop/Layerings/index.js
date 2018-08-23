import React from 'react';

import { GridItem } from '../../../atoms/Grid';
import Heading from '../../../atoms/Heading';
import Button from '../../../atoms/Button';

import ProductThumbnail from '../../../molecules/ProductThumbnail';

export default function Layerings({ product1, product2 }) {
  const stickyStyle = {
    top: 0,
    bottom: 'auto'
  };

  return (
    <GridItem columnSize={[0, 0, 8]}>
      <div
        style={stickyStyle}
        className="stickybits h-screen flex items-center justify-center"
      >
        <span className="absolute z-10 pin-t pin-r w-50 pt-60 text-center">
          <Heading size="s" weight="semilight" center>
            Shop Layering Packs
          </Heading>
        </span>
        <div className="pt-95 pb-120 flex w-50 items-center justify-center">
          <ProductThumbnail
            product={product1}
            height
            isLayering
            isSingle
            isNoClick
            isNoPrice
          />
        </div>
        <div className="pt-95 pb-120 flex w-50 items-center justify-center">
          <ProductThumbnail
            product={product2}
            height
            isLayering
            isSingle
            isNoClick
            isNoPrice
          />
        </div>
        <span className="absolute pin-b pin-r w-50 pb-40 text-center">
          <Button size="s">Shop Renaissance Layering Pack</Button>
        </span>
      </div>
    </GridItem>
  );
}
