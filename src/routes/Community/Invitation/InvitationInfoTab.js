import React from 'react';
import {Popconfirm, Icon, notification, Row, Col} from 'antd';
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
  handleDelete=(id,e)=>{
    console.log("id:", id);
    notification['success']({
      message: '成功',
      description:
        '删除操作成功（假的，接口还没调呢）( ‘-ωก̀ )',
      duration: 0,
    });
  };

  render() {
    return (
      <div className='InvIn-box'>
        <img className='InvIn-le' src={in1} alt='配图'/>
        <div className='InvIn-ri'>
          <div className='InvIn-header'>
            <div className='InvIn-title'>
              西游记
            </div>
            <div onClick={this.topPropagationClick}>
              <Popconfirm
                title='确定删除吗？'
                okText="确定"
                cancelText="取消"
                placement="left"
                onConfirm={this.handleDelete.bind(this)}
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
                  观棋柯烂，伐木丁丁，云边谷口徐行。卖薪沽酒，狂笑自陶情。苍径秋高，对月枕松根，一觉天明。认旧林，登崖过岭，持斧断枯藤。收来成一担，行歌市上，易米三升。更无些子争竞，时价平平。不会机谋巧算，没荣辱，恬淡延生。相逢处，非仙即道，静坐讲《黄庭》。
                </div>
              </Col>
              <Col span={12} style={{height:'100%'}}>
                <div className='InvIn-time'>
                  <div className='InvIn-year'>
                    2020
                  </div>
                  <div className='InvIn-day'>
                    3/3
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

export default InvitationInfoTab;