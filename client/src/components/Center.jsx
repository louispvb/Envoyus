import React from 'react';

export const HCenter = (props) => {
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

export const VCenter = (props) => (
  <div {...props} style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }}>
    { props.children }
  </div>
);