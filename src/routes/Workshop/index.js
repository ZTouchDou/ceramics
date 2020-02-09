import React from 'react';
import {Divider, Col, Row} from 'antd';
import GF from '../../JSON/GF/GF.json';
import Texty from 'rc-texty';
import MenuButton from "../../components/MenuButton";
import './index.css';

//工坊页面

const pStyle = {
  width:'100vw',
  height:'10vh',
  fontSize:'9vmin',
  fontFamily:'楷体',
  paddingLeft:'5vw',
  paddingTop:'2vh',
  lineHeight:'10vh',
  color: 'rgba(255,255,255,0.85)',
};


class Workshop extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div style={{backgroundColor:'#555555',width:'100vw'}}>
        <div className='WorkshopTabMenuTitle'>
        <MenuButton color='white'/>
        <p style={{...pStyle}}>
          工坊
        </p>
        <Divider className='ant-divider-horizontal-workshop'/>
        </div>
        <div style={{marginTop:'15vh'}}>
          {
            GF.map((item,index)=>(
              <div className='WorkshopTabBox' key = {index}>
                <div className='WorkshopTabTitle'>
                  <Texty type='alpha' mode='sync' duration='4000'>
                    {item.name}
                  </Texty>
                </div>
                <div style={{width:'100vw',height:'3vh'}}></div>

                {/*下面的代码不写成组件的形式，是因为Texty在组件形式下会出错，因此牺牲了代码的优越性，此处代码重复度较高，现在未找到解决办法。 (～￣(OO)￣)ブ */}

                <div className='WorkshopTabContent'>
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

                  <div className='WorkshopTabContent-div'>
                    <div className='WorkshopTabContent-div-title'>
                      <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                        详情：
                      </Texty>
                    </div>
                    <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                      {item.details}
                    </Texty>
                  </div>

                  <div className='WorkshopTabContent-div'>
                    <div className='WorkshopTabContent-div-title'>
                      <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                        成就：
                      </Texty>
                    </div>
                    <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
                      {item.achi}
                    </Texty>
                  </div>
                </div>
                <div style={{width:'100vw',height:'3vh'}}></div>
                <div className='WorkshopTabImage'>
                  {
                    item.url?
                      <img src={require('../../JSON/GF/Images/'+item.url)} alt="工坊配图"/> : ''
                  }
                </div>
              </div>
              ))
          }
        </div>
      </div>
    );
  }
}

export default Workshop;