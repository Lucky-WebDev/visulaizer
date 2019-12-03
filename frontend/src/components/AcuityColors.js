import React from 'react';
import './AcuityColors.css';
import ColorPicker from './ColorPicker';

class AcuityColors extends React.Component{
  createFalseArray() {
    const arr = new Array(this.props.numAcuities);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = false;
    }

    return arr;
  }

  state = {
    colorPickers: [false, false, false, false, false],
    colors: [
      "#781A03",
      "#A02304",
      "#C82C05",
      "#D35637",
      "#DE8069",
    ],
  };

  updateActiveColorPicker = (picker, value) => {
    const pickers = [...this.state.colorPickers];
    pickers[picker] = value;
    this.setState({ colorPickers: pickers });
  }

  handleClick = (picker) => {
    this.updateActiveColorPicker(picker, !this.state.colorPickers[picker]);
  };

  handleClose = (picker) => {
    this.updateActiveColorPicker(picker, false);
  };

  handleChange = (picker, color) => {
    const colors = [...this.state.colors];
    colors[picker] = color.hex;
    this.setState({ colors });
  };
  
  render() {
    const ColorPickers = [...Array(this.props.numAcuities).keys()].map(picker => {
      const acuityNumber = picker + 1;
      return <div key={picker} className="ColorPickerContainer">
        <div className="AcuityNumber">{acuityNumber}</div>
        <ColorPicker
          color={this.state.colors[picker]}
          onThumbnailClick={() => this.handleClick(picker)}
          displayColorPicker={this.state.colorPickers[picker]}
          onColorPickerChange={(newColor) => 
            this.handleChange(picker, newColor)}
          onCloseColorPicker={() => this.handleClose(picker)}
        />
      </div>;
    });

    return <div className="ColorPickersContainer">
      <label style={{textAlign: "center"}}>Acuity Color Selector</label>
      <div className="ColorPickers">{ColorPickers}</div>
    </div>;
  }
}

export default AcuityColors;