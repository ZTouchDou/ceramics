import React from 'react';
import { Pagination } from 'antd';
import InfoTab from "../../../components/InfoTab";
import TC from '../../../JSON/TC/TC.json';
import config from "../../../config";
import SysComJCDetails from "./SysComJCDetails";

const pageSize = config.pageSize;

class SysComJC extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible:false
    }
  }

  //显示详情框
  showModal=()=>{
    sessionStorage.setItem('invitationType','major');
    this.setState({
      visible:true
    })
  };

  //关闭详情框
  closeDetails=()=>{
    this.setState({
      visible:false
    })
  };

  //换页
  changePage=(page,pageSize)=>{
    console.log("page,pageSize:", page,pageSize);
  };

  render() {
    let {visible} = this.state;
    return (
      <div style={{display:'flex',flexWrap:'wrap'}}>
        {
          TC.map((item,index)=>{
            return (
              <InfoTab
                showModal={this.showModal.bind(this,item,'修改')}
                item={item}
                key={index}
              />
            )
          })
        }
        <div style={{height:'50px',marginLeft:'50%',transform:'translateX(-50%)'}}>
          <Pagination
            onChange={this.changePage}
            defaultCurrent={1}
            pageSize={pageSize}
            total={500}
          />
        </div>
        {
          visible &&
            <SysComJCDetails
              closeDetails={this.closeDetails}
            />
        }
      </div>
    );
  }
}

export default SysComJC;