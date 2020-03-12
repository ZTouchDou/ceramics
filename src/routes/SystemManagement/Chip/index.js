import React from 'react';
import {Pagination} from 'antd';
import './index.css';
import config from "../../../config";
import SysComJCDetails from "../SysComJC/SysComJCDetails";
import ChipDetails from "./ChipDetails";

const pageSize = config.pageSize;

class Chip extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible:false
    }
  }

  componentDidMount() {
    let wrapList = document.getElementsByClassName('wrap-minor');
    console.log("wrapList:", wrapList);
    for(let i=0;i<4;i++){
      wrapList[i].addEventListener("mouseover",this.beMajor);
    }
  }

  //变长
  beMajor=()=>{
    console.log("1:", 1);
  };

  //显示详情框
  showModal=()=>{
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
        <div className="wrap" >
          <ul>
            <li className='wrap-minor'>
              <div className="text" onClick={this.showModal}>
                <p>尼尔机械纪元</p>
              </div>
            </li>
            <li className='wrap-minor'>
              <div className="text">
                <p>尼尔机械纪元2</p>
              </div>
            </li>
            <li className='wrap-minor'>
              <div className="text">
                <p>尼尔机械纪元3</p>
              </div>
            </li>
            <li className="wrap-minor curr">
              <div className="text">
                <p>尼尔机械纪元4</p>
              </div>
            </li>
          </ul>
        </div>
        <div style={{height:'50px',marginLeft:'50%',transform:'translateX(-50%)'}}>
          <Pagination
            onChange={this.changePage}
            defaultCurrent={1}
            pageSize={pageSize}
            total={100}
          />
        </div>
        {
          visible &&
          <ChipDetails
            closeDetails={this.closeDetails}
          />
        }
      </div>
    );
  }
}

export default Chip;