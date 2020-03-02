import React from 'react';
import {Icon} from 'antd';
import cloudimg from '../../Image/cloud.png'
import './index.css'
import config from '../../config.js';

const fontName = config.fontName;

const font = {
  fontFamily:fontName
};

class CloudModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  //关闭
  closeDetails = ()=>{
    document.getElementById('cloudcontent').setAttribute('class','cloudcontent-back');
    for(let i=1;i<=7;i++){
      document.getElementById(`cloud${i}`).setAttribute('class',`cloud${i}-back`);
    }
    if(this.props.closeDetails){
      this.props.closeDetails();
    }
  }

  render() {
    let {dataItem} = this.props;
    return (
      <div>
        <div className='cloudcontent' id='cloudcontent'>
          <Icon type="close-circle" className='Icon-close' onClick={this.closeDetails}/>
          <div className='cloudcontent-title' style={{...font}}>
            {dataItem?dataItem.title:''}
          </div>
          <div className='cloudcontent-subtitle' style={{...font}}>
            —— {dataItem?dataItem.subtitle:''}
          </div>
          <div className='cloudcontent-text' style={{...font}}>
            {dataItem?dataItem.content:''}
          </div>
        </div>
        <div className='cloud' id='cloud'>
          <div className='cloud1' id='cloud1'></div>
          <div className='cloud2' id='cloud2'></div>
          <div className='cloud3' id='cloud3'></div>
          <div className='cloud4' id='cloud4'></div>
          <div className='cloud5' id='cloud5'></div>
          <div className='cloud6' id='cloud6'></div>
          <div className='cloud7' id='cloud7'></div>
        </div>
      </div>

    );
  }
}

export default CloudModal;