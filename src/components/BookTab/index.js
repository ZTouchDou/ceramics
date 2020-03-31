import React from 'react';
import {Col, Row, Divider} from 'antd';
import config from '../../config.js';
let fontName = config.fontName;


//title字体样式
const pStyle = {
  fontSize: '5vmin',
  fontFamily:fontName,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '2vh',
  display: 'block',
  marginLeft: '3vw',
  marginTop: '-37vh'
  //marginBottom: '4vh',
};

//leftcontent字体样式
const contentStyle1= {
  fontSize: '4vmin',
  fontFamily: fontName,
  width: '50%',
  height: '30vh',
  marginLeft:'45vw',
  marginTop:'-38vh',
  color: 'rgba(0,0,0,1)',
};

//bottomcontent字体样式
const contentStyle2={
  fontSize: '3vmin',
  fontFamily: fontName,
  width: '50%',
  height: '100%',
  marginTop:'-20vh',
  marginLeft:'45vw',
  color: 'rgba(0,0,0,1)',
};

class BookTab extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let {title, leftContent, imgUrl, bottomContent} = this.props;
    return (
      <div style={  {marginBottom: '50vh'}}>
            <p style={pStyle}>{title}</p>
            <div style={{height:'37vh',width:'40%',marginLeft:'3vw'}}>
              {
                imgUrl ?
                  <img src={imgUrl} style={{width:'100%',height:'100%',borderRadius:'4px'}} alt='配图'/>:''
              }
            </div>
            <p style={contentStyle1}>{leftContent}</p>
            <p style={contentStyle2}>{bottomContent}</p>

      </div>
    )
  }
}
export default BookTab;