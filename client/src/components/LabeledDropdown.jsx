import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export class LabeledDropdown extends React.Component {
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
        <span className='input-label' style={{
          marginLeft: 14,
          ...labelStyle
        }}>
          {label}
        </span>
        <br />
        <div className={currentClass}>
          <DropdownButton title="Dropdown" bsStyle='link' id="bg-nested-dropdown">
            <MenuItem eventKey="1">Dropdown link</MenuItem>
            <MenuItem eventKey="2">Dropdown link</MenuItem>
          </DropdownButton>
        </div>
      </div>
    )
  }
}