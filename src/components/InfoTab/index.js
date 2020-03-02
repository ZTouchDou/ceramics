import React from 'react';
import MyModal from "../MyModal";

import './index.css';

class InfoTab extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      modalShow:false
    }
  }

  //显示弹框
  showModal = ()=>{
    this.setState({
      modalShow: true,
    });
  };

  //点击确定
  handleOk = e => {
    this.setState({
      modalShow: false,
    });
  };

  //点击取消
  handleCancel = e => {
    this.setState({
      modalShow: false,
    });
  };

  render() {
    let {item,resource} = this.props;
    return (
      <div>
        <div  className='InfoTab-box' onClick={this.showModal}>
          <div className='InfoTab-title'>
            {item.title.length>9?(item.title.slice(0,9)+'...'):item.title}
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
        <MyModal
          visible={this.state.modalShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          resource={resource}
        />
      </div>
    );
  }
}

export default InfoTab;