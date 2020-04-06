import React from 'react';
import {Popconfirm,Tooltip,Icon,message,Row,Col,Avatar} from 'antd';
import './CerPicInfoTab.css'
import UserInfoTab from "../../../components/UserInfoTab";
import config from "../../../config";

const uploadUrl = config.poxzy.imgUrl;

class CerPicInfoTab extends React.Component{
  constructor(props) {
    super(props);

  }

  //删除评论
  deleteInvitation=()=>{
    if(this.props.deleteInvitation){
      this.props.deleteInvitation(this.props.infoData.id);
    }
  };

  render() {
    let {infoData} = this.props;
    return (
      <div className='CerInfoTab-box'>
        <div className='CerInfoTab-header'>
          <img
            style={{width:'100%',minHeight:'10vh'}}
            src={uploadUrl+infoData.imgUrl}
            alt='配图'
          />
        </div>
        <div className='CerInfoTab-body'>
          <Row>
            <Col span={21}>
              <div style={{fontSize:'20px'}}>
                ID：{infoData.id}
              </div>
            </Col>
            <Col span={3}>
              <div style={{textAlign:'right',fontSize:'20px',color:'#ccc'}}>
                <Popconfirm
                  title='确定删除吗？'
                  okText="确定"
                  cancelText="取消"
                  placement="left"
                  onConfirm={this.deleteInvitation}
                >
                  <Tooltip placement="bottom" title="删除">
                    <Icon type="close-circle" theme="filled" />
                  </Tooltip>
                </Popconfirm>
              </div>
            </Col>
          </Row>
          <div>
            <Row>
              <Col span={4}>
                <Avatar src={uploadUrl+infoData.userImg}/>
              </Col>
              <Col span={20} style={{fontSize:'18px',paddingTop:'10px'}}>
                {infoData.userName}
              </Col>
            </Row>
          </div>
          <div style={{fontSize:'20px',width:'100%',height:'96%',overflow:'auto',marginTop:'10px'}}>
            {infoData.content}
          </div>
        </div>
      </div>
    );
  }
}

export default CerPicInfoTab;