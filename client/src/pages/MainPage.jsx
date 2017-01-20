import fixtures from '../fixtures';

import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { Button } from 'react-bootstrap';

import { performSearch, setToken } from '../actions/userActions';

import { HCenter, ListingGrid, LabeledDropdown, LInput  } from '../components';
import { LOGIN_GATEWAY } from '../../../config/config';

const NavLinks = props => (
  <header className='splash-nav'>
    <div className='nav-links-ctn'>
      About
    </div>
    <div className='nav-links-ctn'>
      {props.id ? <div className='profile-small' style={{
        backgroundImage: `url('http://graph.facebook.com/${props.id}/picture?type=square')`,
      }} /> : null}
      {props.id ? <a href='#' className='name-link'>{ props.name }</a>: <a href={ LOGIN_GATEWAY }>Login</a>}
    </div>
  </header>
)

const NavLinksCtn = connect(state => state.token) (NavLinks);

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
    this.onSearch = this.onSearch.bind(this);
  }
  componentWillMount() {
    let token = null;
    if (document.cookie) {
      token = document.cookie.split('=')[1]
    }
    console.log('TOKEN', token);
    this.props.setToken(token);
  }

  onSearch() {
    this.props.performSearch(this.state.searchText);
  }

  render() {
    return (
      <div className='splash-ctn'>
        <div className='splash-panel'>
          <NavLinksCtn />
          <HCenter className='splash-image-ctn'>
            <div className='splash-content-ctn'>
              <div className='splash-intro-text'>
                <span style={{fontSize: 48, fontWeight: 800, color: '#555'}}>Envoyus</span>
                <br />
                <br />
                <span style={{fontSize: 42, fontWeight: 600, color: '#555'}}>
                  Your new product search.
                </span>
                <br />
                <span style={{fontSize: 18, color: '#555'}}>
                  Thousands of curated listings, with one click
                </span>
              </div>
              <div className='splash-search-ctn'>
                <div style={{
                  width: '65%',
                  borderRight: '1px solid #ccc',
                  padding: '15px 15px 0 15px',
                  height: '100%',
                }}>
                  <LInput 
                    label='Search' 
                    placeholder='Macbook Pro' 
                    width='100%'
                    activeClass='input-ctn-active-style'
                    onChange={ searchText => this.setState({searchText}) }
                    onSubmit={ this.onSearch } />
                </div>
                <div style={{
                  width: '14%',
                  padding: '15px 0 0 15px',
                  height: '100%',
                }}>
                  <LabeledDropdown
                    label='City'
                    width='100%'
                    activeClass='input-ctn-active-style' />
                </div>
                <div style={{
                  width: '20%',
                  padding: '15px 0 0 15px',
                  height: '100%',
                }}>
                  <Button 
                    bsSize='lg' 
                    bsClass='btn search-btn'
                    onClick={ this.onSearch }>Search</Button>
                </div>
              </div>
            </div>
          </HCenter>
        </div>
        
        <HCenter>
          <div className='splash-recommend'>
            <p className='subheader'>Recommended</p>
            <ListingGrid 
              height='320px' 
              listData={fixtures.listData}
              columns={3} />
          </div>
        </HCenter>
      </div>
    );
  }
}

export default connect(state => state, { performSearch, setToken }) (MainPage);
