import React from 'react';
import { Link } from 'react-router';
import { LInput } from '../components';

/** Top bar for the results page */
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
    { props.children }
  </div>
);

const T = React.PropTypes;
MainTopBar.propTypes = {
  placeholder: T.string,
  onSubmit: T.func,
  children: T.any
};
