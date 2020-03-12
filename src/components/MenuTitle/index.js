import React from 'react';
import {Row, Col, Icon} from 'antd';

class MenuTitle extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    let {closeable,color, content} = this.props;
    return (
      <div style={{width:"100%",height:"50px",padding:"10px 10px"}}>
        <Row>
          <Col span={23}>
            <div style={{width:'90%'}}>
              <Icon style={{color:`${color}`}} type="tablet" theme="filled" />
              <span style={{fontWeight:'bold'}}> {content}</span>
            </div>
          </Col>
          <Col span={1}>
            {
              closeable &&
              <div>
                <Icon
                  onClick={this.props.closeDetails}
                  style={{fontSize:'25px'}}
                  type="close-circle"
                  theme="filled"
                />
              </div>
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default MenuTitle;