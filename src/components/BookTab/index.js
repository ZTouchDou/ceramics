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
  marginLeft: '3vw',
  //marginBottom: '4vh',
};

//leftcontent字体样式
const contentStyle1= {
  fontSize: '4vmin',
  fontFamily: fontName,
  padding:"0 2vw",
  height:"10vh",
  overflow:"hidden",
  color: 'rgba(0,0,0,1)',
};

//bottomcontent字体样式
const contentStyle2={
  fontSize: '3vmin',
  fontFamily: fontName,
  padding:"0 2vw",
  height:"25vh",
  overflow:'auto',
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
      <div style={{marginTop:'4vh'}}>
            <p style={pStyle}>{title}</p>
            <Row>
              <Col span={10}>
                <div style={{height:'37vh',marginLeft:'3vw'}}>
                  {
                    imgUrl ?
                      <img src={imgUrl} style={{width:'100%',height:'100%',borderRadius:'4px'}} alt='配图'/>:''
                  }
                </div>
              </Col>
              <Col span={14}>
                <div style={contentStyle1}>{leftContent}</div>
                <div style={contentStyle2}>{bottomContent}</div>
              </Col>
            </Row>

      </div>
    )
  }
}
export default BookTab;