import fixtures from '../fixtures';

import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Slider from 'rc-slider';

import { performSearch } from '../actions/userActions';

import { MainTopBar, ListingGrid, Map } from '../components';
import { MainTopBarCtn, ListingGridCtn } from '../containers';
import 'style-loader!css-loader!rc-slider/assets/index.css';

class ResultsPage extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.performSearch(this.props.params.query, 10, 0, false);
  }
  
  render() {
    return (
      <div className='results-page'>
      <MainTopBarCtn placeholder={ this.props.params.query || 'Search' } />
        <div className='split-pane-horiz'>
          <div className='results-ctn'>
            <div className='search-settings-ctn'>
              <div className='setting-row'>
                <div className='setting-row-label'>Price Range</div>
                <div className='setting-row-cntrl'>
                  <Slider range allowCross={false} defaultValue={[0, 20]} onChange={v => console.log(v)} />
                </div>
              </div>
              <div className='setting-row'>
                <div className='setting-row-label'>Condition Range</div>
                <div className='setting-row-cntrl'>
                  <Slider range allowCross={false} defaultValue={[20, 80]} onChange={v => console.log(v)} />
                </div>
              </div>
              <div style={{}}>
                <div className='final-setting-row'>
                  <Button>Filters</Button>
                  <div className='result-count'>30+ Results · San Francisco</div>
                </div>
              </div>
            </div>
            <div className='search-results'>
              <ListingGridCtn 
                height='400px' 
                columns={2} />
            </div>
          </div>
          <div
          className='map-ctn'>
            <Map listings={[]} currentLocation={{
              longitude: '-122.408949',
              latitude: '37.783591',
              locationGiven: true,
              zipcode: ''
            }} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state, { performSearch }) (ResultsPage);