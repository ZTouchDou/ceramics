import React from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import './index.css';
import MenuButton from "../../components/MenuButton";
import TC from '../../JSON/TC/TC.json';
import MenuTab from "../../components/MenuTab";

//陶瓷页
class CeramicsShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name:'',
      bgimg:'',
      timer:'',
      dataItem:{}
    }
  }

 //跳转页面
  gotoTab2 = (name,dataItem)=>{
    console.log("dataItem:", dataItem);
    sessionStorage.setItem('dataItem',JSON.stringify(dataItem));
      this.props.history.push('/CeramicsShow/details',{name:name});
  };


  componentDidMount() {
    let t = this;
    new Swiper('.swiper-container',{
      autoplay:false,
      loop:false,
      direction: 'vertical',//竖向轮播

      effect : 'coverflow',//设置切换效果
      slidesPerView: 3,
      centeredSlides: true,

      offsetSlidesBefore:2,
      on:{
        transitionEnd:t.onChange,
      }
    });

  }

  componentWillUnmount() {
    let {timer} = this.state;
    if(timer){
      clearTimeout(timer)
    }
  }

  onChange = ()=>{
    let bgimg = document.getElementsByClassName('swiper-slide-active')[0].getAttribute('data-bgimg');
    let name = document.getElementsByClassName('swiper-slide-active')[0].getAttribute('data-name');
    let dataItem = document.getElementsByClassName('swiper-slide-active')[0].getAttribute('data-item');
    document.getElementById('bgimage').setAttribute('class','bgimgchange');
    let timer = setTimeout(function(){
      document.getElementById('bgimage').setAttribute('class','bgimg');
    },10);
    this.setState({
      bgimg,
      timer,
      name,
      dataItem:JSON.parse(dataItem)
    });
  };

  render(){
    let {name,details,bgimg,dataItem} = this.state;
    return (
      <div className='box'>
        <div  onClick={this.gotoTab2.bind(this,name,dataItem)}  id='bgimage' className='bgimg' style={{backgroundImage:`url(${bgimg?require("../../JSON/TC/Images/"+bgimg):''})`}}>
        </div>
        <MenuButton/>
        <div  className='box-left'>
          <div   style={{width:'90%',fontSize:'12vmin',paddingLeft:'15%',marginTop:'50%',color:'#FAB735',fontWeight:'bold'}} >>
            {name}
          </div>
        </div>
        <div className='box-right'>
          <div className='swiper-container'>
            <div className='swiper-wrapper'>
              {
                TC.map((item,index)=>{
                  return(
                    <div className='swiper-slide' key={index} data-bgimg={item.imgUrl} data-name={item.title} data-item={JSON.stringify(item)}>
                      <div className='swiperTitle'>{item.title}</div>
                      <div className='swiperContent'>{item.content.slice(0,40)}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CeramicsShow;