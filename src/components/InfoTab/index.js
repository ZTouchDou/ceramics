import React from 'react';
import {Icon, notification, Popconfirm, Tooltip} from 'antd';

import './index.css';

class InfoTab extends React.Component{
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

  //确认删除
  handleDelete=(id,e)=>{
    console.log("id:", id);
    if(this.props.deleteData){
      this.props.deleteData(id);
    }
  };

  render() {
    let {item} = this.props;
    return (
      <div>
        <div  className='InfoTab-box' onClick={this.props.showModal}>
          <div className='InfoTab-header'>
            <div className='InfoTab-title'>
              <Tooltip title={`id:${item.id?item.id:1001}`}>
                <Icon type="fire" theme="filled" style={{fontSize:'20px',color:'red'}}/>
              </Tooltip>
              &nbsp;
              {item.title.length>7?(item.title.slice(0,7)+'...'):item.title}
            </div>
            <div onClick={this.topPropagationClick}>
              <Popconfirm
                title='确定删除吗？'
                okText="确定"
                cancelText="取消"
                placement="left"
                onConfirm={this.handleDelete.bind(this,item.id)}
              >
                <div className='InfoTab-delete'>
                  <Icon type="close-circle" theme="filled" />
                </div>
              </Popconfirm>
            </div>
          </div>
          {
            item.subtitle &&
            <div className='InfoTab-subtitle'>
              ——{item.subtitle.length>9?(item.subtitle.slice(0,9)+'...'):item.subtitle}
            </div>
          }
          <div className='InfoTab-content' style={{height:`${item.subtitle?'50%':'60%'}`}}>
            {item.content}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoTab;