import React from 'react';
import {Row, Col} from 'antd';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import './index.css';
import MenuButton from "../../components/MenuButton";
import TechnologyStep from "../../components/TechnologyStep";
import CloudModal from "../../components/CloudModal";
import GY from '../../JSON/GY/GY.json';
import config from '../../config.js';

const fontName = config.fontName;

const font = {
  fontFamily:fontName
};


class Technology extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showTextLength:60,//显示的字数，建议不大于72
      modalshow:false,
      dataItem:'',
      menuShow:true
    }
  }

  componentDidMount() {
    let swiper = new Swiper('.swiper-container',{
      parallax: true,
      speed: 600,
      autoplay:false,
      loop:false,
      noSwiping : true,
    });

    //获取屏幕宽度和高度
    let windowWidth = document.querySelector('body').offsetWidth;
    let showTextLength = (windowWidth>992)?40:(windowWidth<=992&&windowWidth>=768)?45:60;
    this.setState({
      swiper,
      showTextLength
    })
  }

  componentWillUnmount() {
    let {timer} = this.state;
    if(timer){
      clearTimeout(timer);
    }
  }

  //跳转到制定页
  slideTo = (index)=>{
    let {swiper} = this.state;
    swiper.slideTo(index-1);
  };

  //详情
  showDetails = (item)=>{
    document.getElementById('swiper').setAttribute('class','swiper-container fullscreen swiper-no-swiping');
    this.setState({
      modalShow:true,
      menuShow:false,
      dataItem:item
    })
  };

  //关闭详情
  closeDetails = ()=>{
    let timer = setTimeout(this.closed,2000);
    this.setState({
      timer
    })
  };

  closed = ()=>{
    this.setState({
      modalShow:false,
      menuShow:true
    },()=>{
      document.getElementById('swiper').setAttribute('class','swiper-container fullscreen');
    })
  }

  render() {
    let {showTextLength,modalShow,dataItem,menuShow} = this.state;
    return (
      <div className='Technology-box'>
        {
          menuShow &&
          <MenuButton direction='top'/>
        }
        <div className='swiper-container fullscreen' id='swiper'>
          {
            modalShow &&
            <CloudModal
              dataItem = {dataItem}
              closeDetails = {this.closeDetails}
            />
          }
          <div className='bg' data-swiper-parallax="-23%" data-swiper-parallax-duration="3000"></div>
          <div className='swiper-wrapper fullscreen'>
            {
              GY.map((item,index)=>{
                return(
                  <div className='swiper-slide' key={index}>
                    <div className='Technology-top' data-swiper-parallax="0" data-swiper-parallax-opacity="0.3">
                      <img src={require('../../JSON/GY/Images/'+item.imgUrl)} alt="工序插图" className='Technology-img' data-swiper-parallax-scale="0.15"/>
                    </div>
                    <div className='Technology-bottom'>
                      <Row style={{height:'100%'}}>
                        <Col span={12} style={{height:'80%'}}>
                          <div className='Technology-step' data-swiper-parallax="0" data-swiper-parallax-opacity="0">
                            <TechnologyStep
                              keyNumber={index+1}
                              slideTo={this.slideTo}
                            />
                          </div>
                        </Col>
                        <Col span={12} style={{height:'65%'}}>
                          <div className='Technology-content'>
                            <div className="title" data-swiper-parallax="-100" style={{...font}}>{item.title}</div>
                            <div className="subtitle" data-swiper-parallax="-200" style={{...font}}>—— {item.subtitle}</div>
                            <div className="content" data-swiper-parallax="-300" data-swiper-parallax-duration="600" style={{...font}}>
                              <div>
                                {item.content?item.content.slice(0,showTextLength):''}
                                <div style={{color:'black',display:'inline'}} onClick={this.showDetails.bind(this,item)}>
                                  {(item.content&&item.content.length>showTextLength)?'...详情>>':''}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

      </div>
    );
  }
}

export default Technology;