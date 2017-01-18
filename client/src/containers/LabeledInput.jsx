import React from 'react';

export class LabeledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  render() {
    const {inputClass, activeClass, labelStyle, label, width, ...props} = this.props;
    const currentClass = this.state.focused ? activeClass : inputClass || '';
    const dwidth = width || 400;
    return (
      <div style={{ width: dwidth }}>
        <span className='input-label' style={labelStyle}>
          {label}
        </span>
        <br />
        <div className={currentClass}>
          <input {...props} type='text' className='input-default'
            onFocus={() => this.setState({focused: true})}
            onBlur={() => this.setState({focused: false})} />
        </div>
      </div>
    )
  }
}