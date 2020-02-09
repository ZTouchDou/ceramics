import React from 'react';
import './index.css';
import MenuButton from "../../components/MenuButton";

class Technology extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className='Technology-box'>
        <MenuButton/>
        <div className='Technology-content'>
          1
        </div>
        <div className='Technology-content'>
          2
        </div>
        <div className='Technology-content'>
          3
        </div>
        <div className='Technology-content'>
          4
        </div>
      </div>
    );
  }
}

export default Technology;