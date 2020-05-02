import React from 'react';
import {message} from 'antd';
import './ChipDetails.css';
import request from "../../../utils/request";
import GoBackButton from "../../../components/GoBackButton";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../../SystemManagement/SysAddButton";
import config from "../../../config";

class ChipDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      chipContent:[],
      modalShow:false
    }
  }

//取得陶片的详情
  getChipComment=()=>{
    let data={
      id:this.props.chipDetails.id
    };
    request({url:"/getChipContent",method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          chipContent:res.data
        })
      }
    })
  };

  componentDidMount() {
    this.getChipComment();
  }

  //显示弹框
  showModal = ()=>{
    this.setState({
      modalShow: true,
    })
  };

  //点击确定
  handleOk = values => {
    let data={
      content:values.content,
      chipId:this.props.chipDetails.id
    };
    request({url:'/insertChipComment',method:'POST',data:data}).then((res)=>{
      if(res && res.code){
        message.success("新增成功");
        this.getChipComment();
      }
    });

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
    let {chipDetails} = this.props;
    const resource =[
      {
        title:'内容',
        label:'content',
        type:'input',
        rules: config.reg.required,
      }
    ];
    return (
      <div className='ChipDetails-box'>
        <GoBackButton
          color='black'
          gotoBack={this.props.closeDetails}
        />
        <div className='ChipDetails-header'/>
        <div className='ChipDetails-body'>
          <div className='ChipDetails-name'>
            {chipDetails.title}
          </div>
          <div className='ChipDetails-content'>
            {
              this.state.chipContent.map((item,index)=>{
                return(
                  <div>
                    {
                      item.visible?<div className='ChipDetails-text' key={index}>
                        {item.content}
                      </div>:
                        ''
                    }

                  </div>
                )
              })
            }
          </div>
        </div>
        <MyModal
          modalTitle="新增陶片"
          visible={this.state.modalShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          resource={resource}
        />
        <SysAddButton color='#53C4F7' showModal={this.showModal}/>
      </div>
    );
  }
}

export default ChipDetails;