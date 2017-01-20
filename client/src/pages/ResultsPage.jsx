import fixtures from '../fixtures';

import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Slider from 'rc-slider';
import debounce from 'lodash/debounce';
import compose from 'lodash/fp/compose';

import { performSearch, setPriceFilter, setConditionFilter } from '../actions/userActions';

import { MainTopBar, ListingGrid, Map } from '../components';
import { MainTopBarCtn, ListingGridCtn, NavLinksCtn } from '../containers';
import 'style-loader!css-loader!rc-slider/assets/index.css';

const SearchSettings = props => (
  <div className='search-settings-ctn'>
    <div className='setting-row'>
      <div className='setting-row-label'>Price Range</div>
      <div className='setting-row-cntrl'>
        <Slider range allowCross={false} defaultValue={[0, 1500]} min={0} max={1500} onChange={([l, u]) => props.setPriceFilter(l, u)} />
      </div>
    </div>
    <div className='setting-row'>
      <div className='setting-row-label'>Condition Range</div>
      <div className='setting-row-cntrl'>
        <Slider range allowCross={false} defaultValue={[0, 10]} min={0} max={10} onChange={([l, u]) => props.setConditionFilter(l, u)} />
      </div>
    </div>
    <div style={{}}>
      <div className='final-setting-row'>
        <Button>Filters</Button>
        <div className='result-count'>{props.resultCount} Results · {props.cities[props.citySelection].cityName}</div>
      </div>
    </div>
  </div>
);

const SearchSettingsCtn = connect(
  state => state, 
  dispatch => { 
    return { 
      setPriceFilter: debounce(compose(dispatch, setPriceFilter), 1000), 
      setConditionFilter: debounce(compose(dispatch, setConditionFilter), 1000)
    };
  }) (SearchSettings);

class ResultsPage extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.performSearch(this.props.params.query, 10, 0, false);
  }
  
  render() {
    const city = this.props.cities[this.props.citySelection];
    const latitude = city.lat;
    const longitude = city.long;
    return (
      <div className='results-page'>
        <MainTopBarCtn placeholder={ this.props.params.query || 'Search' }>
          <NavLinksCtn navLinkClass='nav-links2-ctn' navLinkCtnClass='top-bar-nav-ctn' />
        </MainTopBarCtn>
        <div className='split-pane-horiz'>
          <div className='results-ctn'>
            <SearchSettingsCtn />
            <div className='search-results'>
              <ListingGridCtn 
                height='400px' 
                columns={2} />
            </div>
          </div>
          <div
          className='map-ctn'>
            <Map 
            listings={Array(50).fill(0).map(_ => ({
                lat: latitude + (Math.random() / 20) - .03,
                long: longitude + (Math.random() / 20) - .03,
            }))} 
              currentLocation={{
                longitude,
                latitude,
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