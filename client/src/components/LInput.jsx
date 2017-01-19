import React from 'react';

export class LInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      inputValue: '',
    };
    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  updateInputValue(evt) {
    this.setState({ inputValue: evt.target.value });
    this.props.onChange && this.props.onChange(evt.target.value);
  }

  handleKeyUp(evt) {
    if (evt.key === 'Enter' && this.props.onSubmit) {
      this.props.onSubmit(this.state.inputValue);
    }
  }

  render() {
    const {inputClass, activeClass, showIcon, labelStyle, label, width, ...props} = this.props;
    const currentClass = this.state.focused ? activeClass : inputClass || 'input-ctn-style';
    const dwidth = width || 400;
    const icon = showIcon ? <i className="fa fa-search" /> : null;
    return (
      <div style={{ width: dwidth }}>
        {
          label !== undefined &&
          <span className='input-label' style={ labelStyle }>
            { label }
          </span>
        }
        { label !== undefined && <br />}
        <div className={ currentClass }>
          <input {...props} type='text' className='input-default'
            value={ this.state.inputValue }
            onFocus={ () => this.setState({focused: true}) }
            onBlur={ () => this.setState({focused: false}) }
            onChange= { this.updateInputValue }
            onKeyUp={ this.handleKeyUp } />
        </div>
      </div>
    )
  }
}