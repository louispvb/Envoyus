import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export class LabeledDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      selectedKey: 0,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(evtKey) {
    this.setState({selectedKey: evtKey});
    this.props.onSelect(evtKey);
  }

  render() {
    const {inputClass, activeClass, labelStyle, label, width, ...props} = this.props;
    const currentClass = this.state.focused ? activeClass : inputClass || '';
    const dwidth = width || 400;

    const title = (this.props.listData.length && this.props.listData[this.state.selectedKey]) || 'Select';
    return (
      <div style={{ width: dwidth }}>
        <span className='input-label' style={{
          marginLeft: 14,
          ...labelStyle
        }}>
          {label}
        </span>
        <br />
        <div className={currentClass}>
          <DropdownButton 
            title={title} 
            bsStyle='link' 
            id='bg-nested-dropdown'
            noCaret
            onSelect={this.handleSelect}>
            {this.props.listData.map((name, i) => <MenuItem eventKey={i} key={i}>{name}</MenuItem>)}
          </DropdownButton>
        </div>
      </div>
    )
  }
}