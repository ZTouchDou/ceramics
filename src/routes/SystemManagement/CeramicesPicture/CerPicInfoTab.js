import React from 'react';
import {Popconfirm,Tooltip,Icon,message,Row,Col} from 'antd';
import './CerPicInfoTab.css'

class CerPicInfoTab extends React.Component{
  constructor(props) {
    super(props);

  }

  //删除评论
  deleteInvitation=()=>{
    message.success('删除成功');
  };

  render() {
    return (
      <div className='CerInfoTab-box'>
        <div className='CerInfoTab-header'>
          <img
            style={{width:'100%',minHeight:'10vh'}}
            src={this.props.imgUrl}
            alt='配图'
          />
        </div>
        <div className='CerInfoTab-body'>
          <Row>
            <Col span={21}>
              <div style={{fontSize:'20px'}}>
                ID：102258
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
          <div style={{width:'100%',height:'96%',overflow:'auto'}}>
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

export default CerPicInfoTab;