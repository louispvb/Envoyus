import fixtures from './fixtures';

import React from 'react';
import axios from 'axios';
import { HCenter, LabeledInput, ListingGrid, LabeledDropdown } from './containers';
import { Button } from 'react-bootstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='splash-ctn'>
        <div className='splash-panel'>
          <header className='splash-nav'>
            <div className='nav-links-ctn'>
              About
            </div>
            <div className='nav-links-ctn'>
              Sign Up
            </div>
            <div className='nav-links-ctn'>
              Login
            </div>
          </header>
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
                  <LabeledInput 
                    label='Search' 
                    placeholder='Macbook Pro' 
                    width='100%'
                    activeClass='input-ctn-active-style' />
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
                  <Button bsSize='lg' bsClass='btn search-btn'>Search</Button>
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