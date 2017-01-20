import React from 'react';
import { VCenter } from './Center';
import axios from 'axios';

const printSpecs = data => {
  let result = [];
  for (var k in data) {
    if (data[k] !== null && k !== 'condition') result.push(<p>{k}: {data[k]}</p>);
  }
  return result;
}

export class ListingItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState({show: !this.state.show});
  }

  render() {
  let infoStyle = {
            position: 'relative',
            top: -350,
            left: 20,
            width: 140,
            height: 180,
            fontSize: 14,
            zIndex: 4,
            fontWeight: 600,
            color: 'white',
          };
  let conditionalStyle = this.state.show ? {} : {
    display: 'hidden'
  };
  let imageStyle = {
          width: '100%',
          height: '85%',
          backgroundImage: `url('${this.props.data.imageUrls[0]}')`,
          // backgroundColor: '#e7d19e',
          // backgroundBlendMode: 'overlay',
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(1.3) grayscale(0.5) sepia(0.1)'
        };
  let conditionalStyle2 = this.state.show ? {
    filter: 'blur(3px) grayscale(1.0) brightness(0.3)'
  } : {}
  infoStyle = Object.assign(infoStyle, conditionalStyle);
  return (
      <div style={{
        width: this.props.width,
        height: this.props.height,
      }}> 
        <div style={Object.assign(imageStyle, conditionalStyle2)} 
        onMouseEnter={this.toggleShow}
        onMouseLeave={this.toggleShow}/>
          <div><span className='list-item-price'>{this.props.data.price ? '$' + this.props.data.price : ''}</span> <span className='list-item-title'>{this.props.data.title}</span>
          {this.state.show ?
            <div style={infoStyle}>
            {this.props.data.specs ? printSpecs(this.props.data.specs) : null}
          </div> : null}
        </div>
      </div>
    )
  }
  
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