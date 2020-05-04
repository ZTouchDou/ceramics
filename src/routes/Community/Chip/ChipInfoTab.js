import React from 'react';
import {Icon,Popconfirm} from 'antd';
import './ChipInfoTab.css';

class ChipInfoTab extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  //添加这个点击事件是为了阻止事件冒泡
  topPropagationClick=(e)=>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  render() {
    let {item, imgUrl} = this.props;
    const mask={
      "WebkitMask":`url(${require('../../../Image/'+imgUrl)})`,
      "WebkitMaskSize":"100% 100%"
    };
    return (
      <div className='ChipInfoTab-box' onClick={this.props.gotoDetails}>
        <div className='ChipInfoTab-name'>
          <div className='ChipInfoTab-name-delete'>
            <div onClick={this.topPropagationClick}>
              <Popconfirm
                title='确定删除吗？'
                okText="确定"
                cancelText="取消"
                placement="left"
                onConfirm={this.props.deleteChip}
              >
                <div className='InvIn-delete'>
                  <Icon type="close-circle" theme="filled" />
                </div>
              </Popconfirm>
            </div>
          </div>
          <div className='ChipInfoTab-name-title'>
            {item.title}
          </div>
        </div>
        <div className='ChipInfoTab-pic' style={{...mask}}/>
      </div>
    );
  }
}

export default ChipInfoTab;