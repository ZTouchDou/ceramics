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
    let wrapList = document.getElementsByClassName('wrapli');
    for(let i=0;i<4;i++){
      wrapList[i].addEventListener("mouseover",this.beMajor.bind(this,wrapList[i],i));
    }
  }

  //变化
  beMajor=(wrapli,i)=>{
    let cssstyle = wrapli.getAttribute('class');
    if(cssstyle !== 'wrapli curr'){
      //li 长度变化
      let currLi = document.getElementsByClassName('curr')[0];
      currLi.setAttribute('class','wrapli minor');
      wrapli.setAttribute('class','wrapli curr');
      //背景图片变化
      let img = document.getElementById('ChipImg');
      img.setAttribute('class','ChipBgimg fadeout');
      let timer = setTimeout(()=>{
        img.setAttribute('src',`${require('../../../Image/Chip'+(i+1)+'.jpg')}`);
        img.setAttribute('class','ChipBgimg fadein');
        clearTimeout(timer);
        timer = null;
      },300);
    }
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
      <div className='Chip-box'>
        <img
          id='ChipImg'
          className='ChipBgimg'
          src={require('../../../Image/Chip4.jpg')}
        />
        <div className='Chip-bg'>
          <div className="wrap" >
            <ul>
              <li className='wrapli minor'>
                <div className="text" onClick={this.showModal}>
                  <p>乡俗</p>
                </div>
              </li>
              <li className='wrapli minor'>
                <div className="text">
                  <p>诗词</p>
                </div>
              </li>
              <li className='wrapli minor'>
                <div className="text">
                  <p>茶道</p>
                </div>
              </li>
              <li className="wrapli curr">
                <div className="text">
                  <p>杂论</p>
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