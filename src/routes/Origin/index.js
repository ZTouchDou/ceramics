import React from 'react';
import { Carousel, Modal } from 'antd';
import MenuButton from "../../components/MenuButton";
import request from "../../utils/request";
import QY from '../../JSON/QY/QY.json';
import './index.css';
import config from '../../config.js';

const fontName = config.fontName;
const pageSize = config.pageSize;
const uploadUrl = config.poxzy.imgUrl;

const font = {
  fontFamily:fontName
};

class Origin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      contentLength:0,
      isShow:false,
      imgUrl:'1_1.jpg',
      qyData:[],
      page:1,
    };
  }

  //获取起源数据
  getOriginData=(page)=>{
    let data = {};
    data.page = page;
    data.pageSize = pageSize;
    request({url:'/getOrigin',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          qyData:res.data,
          contentLength:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getOriginData(this.state.page);
  }

  //上一页
  goLastPage= ()=>{
    this.slider.slick.slickPrev();
  };

  //下一页
  goNextPage = ()=>{
    this.slider.slick.slickNext();
  };

  //显示弹框
  modalShow = (url)=>{
    this.setState({
      imgUrl:url,
      isShow:true
    })
  };

  //关闭弹框
  modalCancel = ()=>{
    this.setState({
      isShow:false
    })
  };

  render() {
    let {contentLength, isShow, imgUrl} = this.state;
    return (
      <div className='Origin-box'>
        <MenuButton color='white'/>
        <Carousel
          className='ant-carousel-origin'
          ref={el => (this.slider = el)}
          autoplay={false}
          dots={false}
          lazyLoad={true}
          effect="fade"
        >
          {
            this.state.qyData.map((item,index)=>{
              return(
                <div className='Origin-body' key={index}>
                  <div className='Origin-body-content1'>
                    <div className='Origin-body-image1'>
                      {
                        item.pic2?
                          <img alt='起源配图' src={uploadUrl+item.pic2} className='O_image1' onClick={this.modalShow.bind(this,item.pic2)}/>:''
                      }
                    </div>
                    <div className='Origin-body-image2'>
                      {
                        item.pic1?
                          <img alt='起源配图' src={uploadUrl+item.pic1} className='O_image2' onClick={this.modalShow.bind(this,item.pic1)}/>:''
                      }
                    </div>
                    <div className='Origin-body-image3'>
                      {
                        item.pic3?
                          <img alt='起源配图' src={uploadUrl+item.pic3} className='O_image3' onClick={this.modalShow.bind(this,item.pic3)}/>:''
                      }
                    </div>
                  </div>
                  <div className='Origin-body-content2'>
                    <div className='Origin-title'style={{...font}}>
                      {item.title}
                    </div>
                    <div className='Origin-content' style={{...font}}>
                      {item.content}
                    </div>
                    <div className='Origin-button'>
                      {
                        index!==0?
                          <div className='Origin-lastpage' onClick={this.goLastPage}>
                          上一页
                          </div>
                          :
                          <div className='Origin-lastpage'>

                          </div>
                      }
                      {
                        index!==contentLength-1?
                          <div className='Origin-nextpage' onClick={this.goNextPage}>
                            下一页
                          </div>
                          :
                          <div className='Origin-nextpage'>

                          </div>
                      }

                    </div>
                  </div>
                </div>
              )
            })
          }
        </Carousel>
        <Modal
          visible={isShow}
          onCancel={this.modalCancel}
          footer={null}
        >
          <div>
            <img src={uploadUrl+imgUrl} style={{width:'100%',height:'100%'}} alt="配图"/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Origin;