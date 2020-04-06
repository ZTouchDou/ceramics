import React from 'react';
import { Pagination,message } from 'antd';
import './index.css';
import request from "../../../utils/request";
import CerPicInfoTab from "./CerPicInfoTab";
import config from "../../../config";

const pageSize = config.pageSize;


class CeramicsPicture extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      page:1,
      total:10,
      cpData:[]
    }
  }

  //取得赏瓷信息
  getInvitationSC = (page)=>{
    let data = {};
    data.page = page;
    data.pageSize = pageSize*2;
    request({url:'/getInvitationSC',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          cpData:res.data,
          total:res.total
        })
      }
    })
  };

  //删除赏瓷
  deleteInvitation=(id)=>{
    request({url:'/deleteInvitationSCById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success("删除成功");
        this.getInvitationSC(this.state.page);
      }
    })
  };

  componentDidMount() {
    this.getInvitationSC(this.state.page);
  }

  //换页
  changePage=(page)=>{
    this.setState({
      page
    });
    // this.getOriginData(page);
  };

  render() {
    return (
      <div className='CerPic-box'>
        {
          this.state.cpData.map((item,index)=>{
            return(
              <CerPicInfoTab
                key={index}
                infoData={item}
                deleteInvitation={this.deleteInvitation}
              />
            )
          })
        }
        <div style={{width:'100%',textAlign:'center',height:'50px',marginLeft:'50%',transform:'translateX(-50%)'}}>
          <Pagination
            onChange={this.changePage}
            pageSize={pageSize*2}
            defaultCurrent={1}
            total={this.state.total}
          />
        </div>
      </div>
    );
  }
}

export default CeramicsPicture;