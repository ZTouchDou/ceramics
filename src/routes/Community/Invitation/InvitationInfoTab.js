import React from 'react';
import { withRouter } from 'react-router-dom'
import {Popconfirm, Icon,Row, Col} from 'antd';
import moment from 'moment';
import in1 from '../../../Image/Invitation1.jpg';
import './InvitationInfoTab.css';

class InvitationInfoTab extends React.Component{
  constructor(props) {
    super(props);

  }

  //添加这个点击事件是为了阻止事件冒泡
  topPropagationClick=(e)=>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  //确认删除
  handleDelete=(id)=>{
    if(this.props.deleteInvitation){
      this.props.deleteInvitation(id);
    }
  };

  //跳转详情页
  gotoDetails=(id)=>{
    if(id){
      sessionStorage.setItem("invJCId",id);
      this.props.history.push('/Community/ComJC');
    }
  };

  render() {
    let {item}=this.props;
    return (
      <div className='InvIn-box' onClick={this.gotoDetails.bind(this,item.id)}>
        <img className='InvIn-le' src={in1} alt='配图'/>
        <div className='InvIn-ri'>
          <div className='InvIn-header'>
            <div className='InvIn-title'>
              {item.title}
            </div>
            <div onClick={this.topPropagationClick}>
              <Popconfirm
                title='确定删除吗？'
                okText="确定"
                cancelText="取消"
                placement="left"
                onConfirm={this.handleDelete.bind(this,item.id)}
              >
                <div className='InvIn-delete'>
                  <Icon type="close-circle" theme="filled" />
                </div>
              </Popconfirm>
            </div>
          </div>
          <div className='InvIn-content'>
            <Row style={{height:'100%'}}>
              <Col span={12} style={{height:'100%'}}>
                <div className='InvIn-text'>
                  {item.content}
                </div>
              </Col>
              <Col span={12} style={{height:'100%'}}>
                <div className='InvIn-time'>
                  <div className='InvIn-year'>
                    {moment(Number(item.time)).format("YYYY")}
                  </div>
                  <div className='InvIn-day'>
                    {moment(Number(item.time)).format("MM/DD")}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(InvitationInfoTab);