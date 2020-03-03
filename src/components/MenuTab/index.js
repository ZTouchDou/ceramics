import React from 'react';
import {Col, Row, Divider} from 'antd';
import config from '../../config.js';

let fontName = config.fontName;

const pStyle = {
  fontSize: '6vmin',
  fontFamily:fontName,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '2vh',
  display: 'block',
  marginBottom: '4vh',
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: '5vmin',
      fontFamily:fontName,
      lineHeight: '4vh',
      marginBottom: '1vh',
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    {content}
  </div>
);

class MenuTab extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let {title, content, divider, imgUrl, bottomContent} = this.props;
    return (
      <div onClick={this.props.gotoTab}>
        <Row>
          <Col span={4}>
            <p style={pStyle}>{title}</p>
            <DescriptionItem content={content} />
          </Col>
          <Col span={23}>
            <div style={{height:'20vh'}}>
              {
                imgUrl ?
                <img src={imgUrl} style={{width:'100%',height:'150%',borderRadius:'100'}} alt='菜单配图'/>:''
              }
            </div>
            <div style={{height:'5vh', fontSize:'3vmin',lineHeight:'3vh',fontStyle:'italic',marginTop:'2vh'}}>
              {bottomContent}
            </div>
          </Col>
        </Row>
        {
          divider &&
          <Divider/>
        }
      </div>
    )
  }
}

export default MenuTab;