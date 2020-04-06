import React from 'react';
import {Drawer} from 'antd';
import './index.css';
import request from "../../../utils/request";
import ChipInfoTab from "./ChipInfoTab";
import ChipDetails from "./ChipDetails";

const pageSize = 10;

class Chip extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      detailShow:false,
      chipDetails:'',
      chipData:[],
      page:1,
      total:10
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

  render() {
    let {detailShow} = this.state;
    return (
      <div className='Chip-box'>
        {
          this.state.chipData.map((item,index)=>{
            return(
              <ChipInfoTab
                key={index}
                item={item}
                gotoDetails={this.gotoDetails.bind(this,item)}
                imgUrl={`CP${index+1}.png`}
              />
            )
          })
        }
        <Drawer
          className='ant-drawer-body-Chip'
          placement="right"
          closable={false}
          visible={detailShow}
          width='100vw'
          height='100vh'
        >
          <ChipDetails
            chipDetails={this.state.chipDetails}
            closeDetails={this.closeDetails}
          />
        </Drawer>
      </div>
    );
  }
}

export default Chip;