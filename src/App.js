import React from 'react';
import {Button,Icon} from 'antd';
import {withRouter} from "react-router-dom";
import Animate from 'rc-animate';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import './App.css';
import config from './config';

//  Hi~ o(*￣▽￣*)ブ               Σ( ° △ °|||)︴
//               釉见︿(￣︶￣)︿釉见
//  o(*≧▽≦)ツ┏━┓           φ(≧ω≦*)♪

const fontName = config.fontName;

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      color:'#666',
    }
  }

  componentDidMount() {

  }

  handleClick = ()=>{
    this.props.history.push('/CeramicsShow');
    this.changeMusic();
  };

  //音乐播放与暂停
  changeMusic = ()=>{
    let audio = document.getElementById('audioOfBgm');
    if(audio!==null){
      if(audio.paused)                     {
        audio.play();//audio.play();// 这个就是播放
        this.setState({
          color:'#E74962'
        })
      }else{
        audio.pause();// 这个就是暂停
        this.setState({
          color:'#666'
        })
      }
    }else{
      return;
    }
  }

  render() {
    return (
      <div className="App">
        <Animate
          transitionName="fade"
          transitionAppear
        >
          <header className="App-In">
            <div style={{fontFamily:fontName,fontSize:'9vmin',color:'white',position:'absolute',top:'22vh'}}>
              <Texty type='alpha' mode='sync' duration='3000'>
                釉见
              </Texty>
            </div>
            <div className="MenuTab">
              <Button style={{height:'100%',width:'100%',fontSize:'3vmin',color:this.props.color,fontFamily:fontName,fontWeight:'bold',border:'0.5vmin solid'}}
                      shape="circle"
                      ghost
                      onClick={this.handleClick}
                      >
                <Texty type='alpha' mode='sync' duration='3000'>
                   点击进入
                </Texty>
              </Button>
            </div>
            <Icon type="stock" style={{fontSize: '5vmin'}}/>
            <br/>
            <div style={{fontFamily:fontName,fontSize:'3vmin',color:'white'}}>
              <Texty type='alpha' mode='sync' duration='3000'>
                大邑烧瓷轻且坚，扣如哀玉锦城传。
              </Texty>
            </div>
          </header>
        </Animate>
      </div>
    );
  }
}

export default withRouter(App);
