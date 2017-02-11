import React from 'react';

/**
* @function HCenter
* @param  {type} props
* @return {React.Component} {Horizontally centers children}
*/
export const HCenter = props => {
  const { style, ...restProps } = props;
  return (
    <div {...restProps} style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      ...style
    }}>
      { props.children }
    </div>
  );
};

/**
* @function VCenter
* @return {React.Component} {Vertically centers children}
*/
export const VCenter = props => (
  <div {...props} style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }}>
    { props.children }
  </div>
);