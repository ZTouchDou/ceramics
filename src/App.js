import React from 'react';
import {Button} from 'antd';
import logo from './logo.svg';
import './App.css';
import MenuButton from "./components/MenuButton";

// 此App代码目前只做演示,各布局可能错乱
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title:'起源',
      content:'陶瓷是陶器和瓷器的总称。' +
      '人们早在约8000年前的新石器时代就发明了陶器。' +
      ' 远在九千多年前,中国先民在从事渔猎、农业生产活动的同时,' +
      '不但开始可最原始的建筑活动,并且随着火的发明和使用,在改造大自然的长期劳动实践中,' +
      '伴随着无数次时间与成功的体验,开始制造和使用成为中国古文化之一的艺术……'
    }
  }

  hanleClick = (type)=>{
    let {title,content} = this.state;
    if(type==='QY'){
      title='起源';
      content='陶瓷是陶器和瓷器的总称。' +
        '人们早在约8000年前的新石器时代就发明了陶器。' +
        ' 远在九千多年前,中国先民在从事渔猎、农业生产活动的同时,' +
        '不但开始可最原始的建筑活动,并且随着火的发明和使用,在改造大自然的长期劳动实践中,' +
        '伴随着无数次时间与成功的体验,开始制造和使用成为中国古文化之一的艺术……';
    }else if(type==='GX'){
      title='工序';
      content=
        '成型工序：分为滚压成型和注浆成型。然后干燥、修坯，备用。\n' +
        '烧成工序：在取得白坯后，入窑素烧，经过精修、施釉，进行釉烧，对出窑后的白瓷检选，得到合格白瓷。' +
        '彩烤工序：对合格白瓷进行贴花、镶金等步骤后，入烤花窑烧烤，开窑后进行花瓷的检选，得到合格花瓷成品。' +
        '包装工序：对花瓷按照不同的配套方法进行包装，即形成最终产品，发货或者入库。';
    }else if(type==='GF'){
      title='工坊';
      content='话说，有没有极度清晰的背景图，网上找了半天，都是如此模糊的图片，' +
        '这个花都变成马赛克花了。';
    }else{
      title='花灯';
      content='';
    }
    this.setState({
      title,
      content
    })
  };

  render() {
    let {title,content} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div style={{position:'absolute',width:'50vw',height:'50vh',top:'20vh',left:'10vw'}}>
            <div className="testContent">{content}</div>
            <div className="testTitle">{title}</div>
          </div>

          <div>
            <div className="MenuTab" style={{position:'absolute',left:'10vw',top:'60vh'}}>
              <MenuButton text='起源' handleClick={this.hanleClick.bind(this,'QY')}/>
            </div>
            <div className="MenuTab" style={{position:'absolute',left:'30vw',top:'72vh'}}>
              <MenuButton text='工序' handleClick={this.hanleClick.bind(this,'GX')}/>
            </div>
            <div className="MenuTab" style={{position:'absolute',left:'53vw',top:'81vh'}}>
              <MenuButton text='工坊' handleClick={this.hanleClick.bind(this,'GF')}/>
            </div>
            <div className="MenuTab" style={{position:'absolute',left:'77vw',top:'85vh'}}>
              <MenuButton text='花灯' handleClick={this.hanleClick.bind(this,'HD')} disable={true} />
            </div>
          </div>
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
        </header>
      </div>
    );
  }
}

export default App;
