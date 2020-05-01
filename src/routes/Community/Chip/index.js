import React from 'react';
import {Drawer,message} from 'antd';
import './index.css';
import request from "../../../utils/request";
import ChipInfoTab from "./ChipInfoTab";
import ChipDetails from "./ChipDetails";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../../SystemManagement/SysAddButton";
import config from "../../../config";

const pageSize = 10;

class Chip extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      detailShow:false,
      chipDetails:'',
      chipData:[],
      page:1,
      total:10,
      modalShow:false
    }
  }
  //取得陶片信息
  getUserChip=(page)=>{
    let id = sessionStorage.getItem("userId");
    let data={
      id:id,
      page:page,
      pageSize:pageSize
    };
    request({url:'/getChipFromUser',method:"GET",params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          chipData:res.data,
          total:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getUserChip(this.state.page);
  }

  //跳转详情页
  gotoDetails=(item)=>{
    this.setState({
      chipDetails:item,
      detailShow:true
    })
  };

  // 关闭详情页
  closeDetails=()=>{
    this.setState({
      detailShow:false
    })
  };

  //显示弹框
  showModal = ()=>{
    this.setState({
      modalShow: true,
    })
  };

  //点击确定
  handleOk = values => {
    let data={
      title:values.title,
      userId:sessionStorage.getItem("userId")
    };
    console.log("data:", data);
    request({url:'/insertChip',method:'POST',data:data}).then((res)=>{
      if(res && res.code){
        message.success("新增成功");
        this.getUserChip(this.state.page);
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
    let {detailShow} = this.state;
    const resource =[
      {
        title:'主题',
        label:'title',
        type:'input',
        rules: config.reg.required,
      }
    ];
    return (
      <div className='Chip-box'>
        {
          this.state.chipData.map((item,index)=>{
            return(
              <ChipInfoTab
                key={index}
                item={item}
                gotoDetails={this.gotoDetails.bind(this,item)}
                imgUrl={`CP${index%8+1}.png`}
              />
            )
          })
        }
        <Drawer
          className='ant-drawer-body-Chip'
          placement="right"
          closable={false}
          destroyOnClose={true}
          visible={detailShow}
          width='100vw'
          height='100vh'
        >
          <ChipDetails
            chipDetails={this.state.chipDetails}
            closeDetails={this.closeDetails}
          />
        </Drawer>
        <MyModal
          modalTitle="新增陶片"
          visible={this.state.modalShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          resource={resource}
        />
        <SysAddButton color='#1890FF' showModal={this.showModal}/>
      </div>
    );
  }
}

export default Chip;