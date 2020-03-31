import React from 'react';
import {Pagination, Modal, message} from 'antd';
import './index.css';
import config from "../../../config";
import request from "../../../utils/request";
import SysComJCDetails from "../SysComJC/SysComJCDetails";
import ChipDetails from "./ChipDetails";

const pageSize = config.pageSize;

class Chip extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      page:1,
      chipData:[],
      total:10,
      chipDetails:{},
      modalShow:false,
      chipId:''//要删除的陶片的id
    }
  }

  //取得陶片信息
  getChip=(page)=>{
    let data = {};
    data.page = page;
    data.pageSize = 4;
    request({url:'/getChip',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          chipData:res.data,
          total:res.total
        },()=>{
          let wrapList = document.getElementsByClassName('wrapli');
          if(wrapList.length){
            for(let i=0;i<this.state.chipData.length;i++){
              wrapList[i].addEventListener("mouseover",this.beMajor.bind(this,wrapList[i],i));
            }
          }
        })
      }
    })
  };

  componentDidMount() {
    this.getChip(this.state.page);
  }

  //变化
  beMajor=(wrapli,i)=>{
    let cssstyle = wrapli.getAttribute('class');
    if(cssstyle !== 'wrapli curr'){
      //li 长度变化
      let currLi = document.getElementsByClassName('wrapli curr');
      for(let j=0;j<currLi.length;j++){
        console.log("currLi[j]:", currLi[j]);
        currLi[j].setAttribute('class','wrapli minor');
      }
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

  //添加这个点击事件是为了阻止事件冒泡
  topPropagationClick=(e)=>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  //删除弹框
  showDeleteModal = (id) => {
    this.setState({
      chipId:id,
      modalShow: true,
    });
  };

  //删除弹框确认删除
  handleOk = () => {
    let {chipId} = this.state;
    request({url:'/deleteChipByIdInChip/'+chipId,method:"GET"}).then((res)=>{
      if(res && res.code){
        message.success("删除成功");
        this.setState({
          chipData:[],
        });
        this.getChip(this.state.page);
      }else{
        message.error("操作失败")
      }
    });
    this.setState({
      modalShow: false,
    });
  };

  //删除弹框关闭
  handleCancel = e => {
    this.setState({
      modalShow: false,
    });
  };

  //显示详情框
  showModal=(item)=>{
    this.setState({
      chipDetails:item,
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
  changePage=(page)=>{
    this.setState({
      chipData:[],
      page
    });
    this.getChip(page);
  };

  render() {
    let {visible,chipData} = this.state;
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
              {
                chipData.map((item,index)=>{
                  return(
                    <li key={index} className={chipData.length===index+1?"wrapli curr":"wrapli minor"}>
                      <div className="text" onClick={this.showModal.bind(this,item)}>
                        <div className="chipTitle">{item.title}</div>
                        <div onClick={this.topPropagationClick}>
                          <div className="deleteChipData" onClick={this.showDeleteModal.bind(this,item.id)}>X</div>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div style={{width:'100%',textAlign:'center',height:'50px',marginLeft:'50%',transform:'translateX(-50%)'}}>
            <Pagination
              onChange={this.changePage}
              defaultCurrent={1}
              pageSize={4}
              total={this.state.total}
            />
          </div>
        </div>
        {
          visible &&
          <ChipDetails
            closeDetails={this.closeDetails}
            chipDetails={this.state.chipDetails}
          />
        }
        <Modal
          title="删除"
          visible={this.state.modalShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确定"
        >
          <div>确认删除吗？</div>
        </Modal>
      </div>
    );
  }
}

export default Chip;