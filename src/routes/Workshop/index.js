import React from 'react';
import {Col, Row} from 'antd';
import LazyLoad from 'react-lazyload';
import GF from '../../JSON/GF/GF.json';
import Texty from 'rc-texty';
import MenuButton from "../../components/MenuButton";
import iags from '../../Image/WorkshopStart.jpg';
import iage from '../../Image/WorkshopEnd.jpg';
import './index.css';
import config from '../../config.js';

const fontName = config.fontName;
//工坊页面

let number_of_animation = 10;

const pStyle = {
  width:'100vw',
  height:'5vh',
  fontSize:'9vmin',
  fontFamily:fontName,
  paddingLeft:'5vw',
  lineHeight:'10vh',
  color: 'rgba(150,106,58,1)',
  textShadow:'1vmin 1vmin 1.5vmin rgba(150,106,58,1)'
};

const font = {
  fontFamily: fontName
}

class Workshop extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillUnmount() {
    let {time} = this.state;
    if(time){
      clearTimeout(time);
    }
  }

  showPicture = (evt)=>{
    let t = this;
    let theClass = evt.target.getAttribute('class');
    if(theClass.slice(0,-1)==='transition'){
      return;
    }
    let id=evt.target.getAttribute('id');
    let number = id.split('-')[1];
    evt.target.setAttribute('class','transition'+number%number_of_animation);
    let time = setTimeout(this.isOk.bind(t,id,theClass),4000);
    this.setState({
      time
    })
  };

  isOk = (id,theClass)=>{
    document.getElementById(id).setAttribute('class',theClass);
  };

  render() {
    return (
      <div style={{backgroundColor:'#555555',width:'100vw'}}>
        <div className='WorkshopTabMenuTitle'>
        <MenuButton color='#986C3D'/>
        <p style={{...pStyle}}>
          工坊
        </p>

        </div>
        <div style={{marginTop:'10vh', backgroundColor:'white'}}>
          <div style={{width:'100vw',height:'4vh',backgroundImage:`url(${iags})`,backgroundSize:'100% 100%'}}></div>
          {
            GF.map((item,index)=>(
              <LazyLoad height='50vh' key = {index}>
                <div className='WorkshopTabBox' key = {index}>
                  <div className='WorkshopTabTitle' style={{...font}}>
                    <Texty type='alpha' mode='sync' duration='4000'>
                      {item.title}
                    </Texty>
                  </div>
                  <div style={{width:'100vw',height:'3vh'}}></div>

                  {/*下面的代码不写成组件的形式，是因为Texty在组件形式下会出错，因此牺牲了代码的优越性，此处代码重复度较高，现在未找到解决办法。 (～￣(OO)￣)ブ */}

                  <Row type="flex" >
                    <Col span={12}>
                      <div className='WorkshopTabContent' style={{...font}}>
                        <div className='WorkshopTabContent-div'>
                          <div className='WorkshopTabContent-div-title'>
                            <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                              成立时间：
                            </Texty>
                          </div>
                          <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                            {item.time}
                          </Texty>
                        </div>

                        <div style={{width:'100%',height:'1vh'}}></div>

                        <div className='WorkshopTabContent-div'>
                          <div className='WorkshopTabContent-div-title'>
                            <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                              地点：
                            </Texty>
                          </div>
                          <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                            {item.location}
                          </Texty>
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className='WorkshopTabImage'>
                        {
                          item.imgUrl?
                            <img
                              id={`img-${index}`}
                              src={require('../../JSON/GF/Images/'+item.imgUrl)}
                              alt="工坊配图"
                              className={`WorkshopTabImage-img${index%number_of_animation}`}
                              onClick={this.showPicture}
                            /> : ''
                        }
                      </div>
                    </Col>
                  </Row>

                  <div className='WorkshopTabDetails' style={{...font}}>
                    <div className='WorkshopTabContent-div'>
                      <div className='WorkshopTabContent-div-title'>
                        <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                          详情：
                        </Texty>
                      </div>
                      <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                        {item.content}
                      </Texty>
                    </div>

                    <div style={{width:'100%',height:'3vh'}}></div>

                    <div className='WorkshopTabContent-div'>
                      <div className='WorkshopTabContent-div-title'>
                        <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                        </Texty>
                      </div>
                      <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                        {item.achi}
                      </Texty>
                    </div>
                  </div>
                  <div style={{width:'100vw',height:'3vh'}}></div>
                </div>
              </LazyLoad>
              ))
          }
          <div style={{width:'100vw',height:'5vh',backgroundImage:`url(${iage})`,backgroundSize:'100% 100%',marginTop:'-0.3vh'}}></div>
        </div>
      </div>
    );
  }
}

export default Workshop;