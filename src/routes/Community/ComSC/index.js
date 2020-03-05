import React from 'react';
import GoBackButton from "../../../components/GoBackButton";
import SC from '../../../JSON/SC/SC.json';
import './index.css';

//社区游览

class ComSC extends React.Component{
  constructor(props) {
    super(props);
  }

  gotoBack=()=>{
    this.props.history.push('/Community');
  };

  render() {
    return (
      <div className='ComSC-box'>
        <GoBackButton
          gotoBack={this.gotoBack}
        />
        {
          SC.map((item,index)=>{
            return(
              <div className='ComSC-tab' key={index}>
                <img
                  style={{width:'100vw',minHeight:'40vh'}}
                  alt='配图'
                  src={`${require('../../../JSON/SC/Images/'+item.imgUrl)}`}
                />
                <div className='ComSC-nameplate'>
                  <div style={{width:'100%',height:'80%'}}>
                    <div style={{width:'100%',height:'2vh'}}></div>
                    <div className='ComSC-head'>
                      <img
                        alt='用户头像'
                        style={{width:'100%',maxHeight:'100%',borderRadius:'50%'}}
                        src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1564199267,720190006&fm=26&gp=0.jpg'
                      />
                    </div>
                    <div className='ComSC-name'>
                      洛洛大方
                    </div>
                    <div className='ComSC-description'>
                      一二三四五六七八九十一二三四五六七八九十一二三四五六七八
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>
    );
  }
}

export default ComSC;