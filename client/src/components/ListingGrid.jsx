import React from 'react';
import { VCenter } from './Center';
import axios from 'axios';

export const ListingItem = ({width, height, data, ...props}) => {
  return (
    <div style={{
      width,
      height,
    }}> 
      <div style={{
        width: '100%',
        height: '85%',
        backgroundImage: `url('${data.imageUrls[0]}')`,
        // backgroundColor: '#e7d19e',
        // backgroundBlendMode: 'overlay',
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(1.3) grayscale(0.5) sepia(0.1)'
      }} />
        <div><span className='list-item-price'>{'$' + data.price}</span> <span className='list-item-title'>{data.title}</span>
      </div>
    </div>
  )
};

export const ListingItemFill = ({width, height}) => <div style={{ width, height }} />;

export const ListingGrid = ({rows, columns, height, listData, ...props}) => {
  const itemWidthPercent = 95 / columns;
  const fillCount = columns - listData.length % columns;
  const filler = Array(fillCount).fill(0).map((_, i) =>
   <ListingItemFill 
    width={ itemWidthPercent + '%' } 
    height={ height }
    key={ -i - 1 } />);
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }}>
    {
      listData.map((data, i) => 
        <ListingItem 
          data={ data } 
          width={ itemWidthPercent + '%' } 
          height={ height }
          key={ i }/>).concat(filler)
    }
    </div>
  );
}