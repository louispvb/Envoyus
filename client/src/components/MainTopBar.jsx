import React from 'react';
import { Link } from 'react-router';
import { LInput } from '../components';

export const MainTopBar = props => (
  <div className='main-top-bar'>
    <div className='top-bar-logo'>
      <Link to='/'><i className="fa fa-grav" /></Link>
    </div>
    <div className='top-bar-search-ctn'>
      <LInput 
        placeholder={ props.placeholder }
        width='100%'
        activeClass='input-ctn-active-style'
        onSubmit={ props.onSubmit } />
    </div>
    <div className='top-bar-nav-ctn'>
      <div className='nav-links2-ctn'>
        About
      </div>
      <div className='nav-links2-ctn'>
        Sign Up
      </div>
      <div className='nav-links2-ctn'>
        Login
      </div>
    </div>
  </div>
);
