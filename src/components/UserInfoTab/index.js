import React from 'react';
import {Popconfirm, Row, Col, Tooltip, Icon} from 'antd';
import './index.css';

class UserInfoTab extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    let {name,time,content,imgUrl} = this.props;
    return (
      <div className='UserInfoTab-comTab'>
        <div className='UserInfoTab-user'>
          <Row style={{width:'100%',height:'100%'}}>
            <Col span={2} style={{height:'100%'}}>
              <img
                style={{borderRadius:'50%',width:'100%',height:'100%'}}
                src={imgUrl}
                alt='用户头像'
              />
            </Col>
            <Col span={22} style={{height:'100%'}}>
              <div className='UserInfoTab-user-name'>
                {name}
              </div>
              <div className='UserInfoTab-user-time'>
                {time}
              </div>
            </Col>
          </Row>
        </div>
        <div className='UserInfoTab-commentText'>
          {content?content:''}
        </div>
        <div style={{textAlign:'right',fontSize:'20px'}}>
          <Popconfirm
            title='确定删除吗？'
            okText="确定"
            cancelText="取消"
            placement="left"
            onConfirm={this.props.deleteComment}
          >
            <Tooltip placement="bottom" title="删除">
              <Icon type="delete" theme="filled" />
            </Tooltip>
          </Popconfirm>
        </div>
      </div>
    );
  }
}

export default UserInfoTab;