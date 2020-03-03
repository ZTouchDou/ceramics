import React from 'react';
import './index.css';

const color1='#ff0000';
const color2='#f67d00';

class TechnologyStep extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let {keyNumber,slideTo} = this.props;
    return (
      <div className='Step-box'>
        <div
          style={{marginTop:'-3vh',marginLeft:'10vw',
          backgroundColor:`${(keyNumber&&keyNumber>=1)?color1:color2}`}}
          onClick={slideTo.bind(this,1)}
        >

        </div>
        <div
          style={{marginTop:'2vh',marginLeft:'10vw',
          backgroundColor:`${(keyNumber&&keyNumber>=2)?color1:color2}`}}
          onClick={slideTo.bind(this,2)}
        >

        </div>
        <div
          style={{marginTop:'1vh',marginLeft:'25vw',
          backgroundColor:`${(keyNumber&&keyNumber>=3)?color1:color2}`}}
          onClick={slideTo.bind(this,3)}
        >

        </div>
        <div
          style={{marginTop:'1vh',marginLeft:'0vw',
          backgroundColor:`${(keyNumber&&keyNumber>=4)?color1:color2}`}}
          onClick={slideTo.bind(this,4)}
        >

        </div>
        <div
          style={{marginTop:'2vh',marginLeft:'17vw',
          backgroundColor:`${(keyNumber&&keyNumber>=5)?color1:color2}`}}
          onClick={slideTo.bind(this,5)}
        >

        </div>
        <div
          style={{marginTop:'2vh',marginLeft:'4vw',
          backgroundColor:`${(keyNumber&&keyNumber>=6)?color1:color2}`}}
          onClick={slideTo.bind(this,6)}
        >

        </div>
        <div
          style={{marginTop:'3vh',marginLeft:'4vw',
          backgroundColor:`${(keyNumber&&keyNumber>=7)?color1:color2}`}}
          onClick={slideTo.bind(this,7)}
        >

        </div>
        <div
          style={{marginTop:'2vh',marginLeft:'20vw',
          backgroundColor:`${(keyNumber&&keyNumber>=8)?color1:color2}`}}
          onClick={slideTo.bind(this,8)}
        >

        </div>
        <div
          style={{marginTop:'2vh',marginLeft:'10vw',
          backgroundColor:`${(keyNumber&&keyNumber>=9)?color1:color2}`}}
          onClick={slideTo.bind(this,9)}
        >
        </div>
      </div>
    );
  }
}

export default TechnologyStep;