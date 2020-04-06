import React from 'react';
import {Row, Col, Icon, Popconfirm} from 'antd';
import './CerPicInfoTab.css'
import image from '../../../Image/6.jpg';
import config from "../../../config";

const uploadUrl = config.poxzy.imgUrl;

class CerPicInfoTab extends React.Component{
  constructor(props) {
    super(props);

  }

  handleDelete=(id)=>{
    if(this.props.deleteInvitation){
      this.props.deleteInvitation(id);
    }
  };

  render() {
    let {item}=this.props;
    return (
      <div className='CerInfoTab-box'>
        <div className='CerInfoTab-header'>
          {
            item.imgUrl?
              <img
                style={{width:'100%',minHeight:'10vh'}}
                src={uploadUrl+item.imgUrl}
                alt='配图'
              />:
              <img
                style={{width:'100%',minHeight:'10vh'}}
                src={image}
                alt='配图'
              />
          }
        </div>
        <div className='CerInfoTab-body'>
          <div>
            <Row>
              <Col span={23}>

              </Col>
              <Col span={1}>
                <Popconfirm
                  title='确定删除吗？'
                  okText="确定"
                  cancelText="取消"
                  placement="left"
                  onConfirm={this.handleDelete.bind(this,item.id)}
                >
                  <Icon type="close-circle" theme="filled" />
                </Popconfirm>
              </Col>
            </Row>
          </div>
          <div style={{width:'100%',height:'96%',overflow:'auto'}}>
            {item.content}
          </div>
        </div>
      </div>
    );
  }
}

export default CerPicInfoTab;