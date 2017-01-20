import React from 'react';
import { LOGIN_GATEWAY } from '../../../config/config';

export const NavLinks = props => (
  <div className={props.navLinkCtnClass}>
    <div className={props.navLinkClass}>
      {props.id ? <div className='profile-small' style={{
        backgroundImage: `url('http://graph.facebook.com/${props.id}/picture?type=square')`,
      }} /> : null}
      {props.id ? <a href='#' className='name-link'>{ props.name }</a>
      : <a href={ LOGIN_GATEWAY }><i className="fa fa-sign-in" aria-hidden="true" /> Login</a>}
    </div>
    <div className={props.navLinkClass}>
      <a href="https://github.com/BLeNd-HR51/Envoyus"><i className="fa fa-github-alt" aria-hidden="true" /> Github</a>
    </div>
    <div className={props.navLinkClass}>
      <a href='#'>About</a>
    </div>
  </div>
);

