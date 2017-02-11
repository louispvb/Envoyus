import React from 'react';
import axios from 'axios';
import { VCenter } from './Center';

const printSpecs = (data) => {
  let result = [];
  for (var k in data) {
    if (data[k] !== null && k !== 'condition') result.push(<p>{k}: {data[k]}</p>);
  }
  return result;
}

/** A single list item component for grid representation */
export class ListingItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
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
      color: 'white'
    };
    const conditionalStyle = this.state.show ? {} : {
      display: 'hidden'
    };
    const imageStyle = {
      width: '100%',
      height: '85%',
      backgroundImage: `url('${this.props.data.imageUrls[0]}')`,
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'no-repeat',
      filter: 'brightness(1.3) grayscale(0.5) sepia(0.1)'
    };
    const conditionalStyle2 = this.state.show ? {
      filter: 'blur(3px) grayscale(1.0) brightness(0.3)'
    } : {}
    infoStyle = Object.assign(infoStyle, conditionalStyle);
    return (
      <div style={{
        width: this.props.width,
        height: this.props.height
      }}>
        <div style={Object.assign(imageStyle, conditionalStyle2)}
          onClick={this.toggleShow}/>
          <div><span className='list-item-price'>{this.props.data.price ? '$' + this.props.data.price : ''}</span> <span className='list-item-title'>{this.props.data.title}</span>
          {this.state.show ?
            <div style={infoStyle}>
            {this.props.data.specs ? printSpecs(this.props.data.specs) : null}
          </div> : null}
        </div>
      </div>
    );
  }
}

const T = React.PropTypes;
ListingItem.propTypes = {
  data: T.object,
  width: T.number,
  height: T.number
};

export const ListingItemFill = ({ width, height }) => <div style={{ width, height }} />;

ListingItemFill.propTypes = {
  width: T.number,
  height: T.number
};

/**
* @function ListingGrid
* @return {React.Component} {A dynamic grid of listing items}
*/
export const ListingGrid = ({ rows, columns, height, listData, ...props }) => {
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

ListingGrid.propTypes = {
  rows: T.number,
  columns: T.number,
  height: T.number,
  listData: T.array
};
