import React from 'react';
import {Popconfirm, Icon,notification }from 'antd';
import './CommentInfoTab.css';

class CommentInfoTab extends React.Component{
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
      <div className='ComInfoTab-box'>
        <div className='ComInfoTab-header'>
          <div className='ComInfoTab-time'>
            2020/3/4
          </div>
          <div onClick={this.topPropagationClick}>
            <Popconfirm
              title='确定删除吗？'
              okText="确定"
              cancelText="取消"
              placement="left"
              onConfirm={this.handleDelete}
            >
              <div className='ComInfoTab-delete'>
                <Icon type="close-circle" theme="filled" />
              </div>
            </Popconfirm>
          </div>
        </div>
        <div className='ComInfoTab-body'>
          Support for let and class redeclarations When experimenting with new code in the Console
        </div>
        <div className='ComInfoTab-invitation'>
          Improved WebAssembly debugging The Sources pannel has increased support for stepping over code.
        </div>
      </div>
    );
  }
}

export default CommentInfoTab;