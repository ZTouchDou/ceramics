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

  handleClick = ()=>{
    this.props.history.push('/Login');
  };

  render() {
    return (
      <div className="App">
        <Animate
          transitionName="fade"
          transitionAppear
        >
          <header className="App-In">
            <div style={{fontFamily:fontName,fontSize:'9vmin',color:'white' ,top:'4vh'}}>
              <Texty type='alpha' mode='sync' duration='3000'>
                釉见
              </Texty>
            </div>
            <div className="MenuTab">
              <Button style={{height:'100%',width:'100%',fontSize:'3vmin',color:'white',fontFamily:fontName,fontWeight:'bold',border:'0.5vmin solid'}}
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
