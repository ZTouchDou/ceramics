import React from 'react';
import { Pagination, message } from 'antd';
import InfoTab from "../../../components/InfoTab";
import request from "../../../utils/request";
import TC from '../../../JSON/TC/TC.json';
import config from "../../../config";
import SysComJCDetails from "./SysComJCDetails";

const pageSize = config.pageSize;

class SysComJC extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      jcData:[],
      jcDetails:'',
      page:1,
      total:10,
    }
  }

  //取得鉴瓷帖子
  getInvitationJC=(page)=>{
    let data = {};
    data.page = page;
    data.pageSize = pageSize;
    request({url:'/getInvitationJC',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          jcData:res.data,
          total:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getInvitationJC(this.state.page);
  }

  //显示详情框
  showModal=(item)=>{
    sessionStorage.setItem('invitationType','major');
    this.setState({
      jcDetails:item,
      visible:true
    })
  };

  //删除帖子
  deleteInvitation=(id)=>{
    request({url:'/deleteInvitationJCById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success("删除成功");
        this.getInvitationJC(this.state.page);
      }else{
        message.error("删除失败")
      }
    })
  };

  //关闭详情框
  closeDetails=()=>{
    this.setState({
      visible:false
    })
  };

  //换页
  changePage=(page)=>{
    this.setState({
      page
    });
    this.getInvitationJC(page);
  };


  render() {
    let {visible} = this.state;
    return (
      <div style={{display:'flex',flexWrap:'wrap'}}>
        {
          this.state.jcData.map((item,index)=>{
            return (
              <InfoTab
                showModal={this.showModal.bind(this,item,'修改')}
                item={item}
                key={index}
                deleteData={this.deleteInvitation}
              />
            )
          })
        }
        <div style={{width:'100%',textAlign:'center',height:'50px',marginLeft:'50%',transform:'translateX(-50%)'}}>
          <Pagination
            onChange={this.changePage}
            defaultCurrent={1}
            pageSize={pageSize}
            total={this.state.total}
          />
        </div>
        {
          visible &&
            <SysComJCDetails
              closeDetails={this.closeDetails}
              jcDetails={this.state.jcDetails}
            />
        }
      </div>
    );
  }
}

export default SysComJC;