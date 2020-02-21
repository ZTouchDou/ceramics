import React from 'react';
import {Divider} from 'antd';
import {withRouter} from "react-router-dom";
import './index.css'
import MenuTab from "../../components/MenuTab";
import image1 from '../../Image/MenuTabQY.jpg';
import image2 from '../../Image/MenuTabTC.jpg';
import image3 from '../../Image/MenuTabGF.jpg';
import image4 from '../../Image/MenuTabGY.jpg';
import config from '../../config.js';

let fontName = config.fontName;
//菜单页

const pStyle = {
  fontSize: '8vmin',
  fontFamily:fontName,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '2vh',
  display: 'block',
  marginBottom: '4vh',

};

class MenuPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  //跳转页面
  gotoTab = (type)=>{
    if(type==='QY'){
      this.props.history.push('/Origin');
    }else if(type==='TC'){
      this.props.history.push('/CeramicsShow');
    }else if(type==='GX'){
      this.props.history.push('/Technology');
    }else if(type==='GF'){
      this.props.history.push('/Workshop');
    }
  };

  render() {
    return (
      <div>
        <p style={{ ...pStyle, marginBottom: 24 }}>菜单</p>
        <Divider/>
        <MenuTab
          title='起源'
          content='介绍了陶瓷的起源。'
          gotoTab={this.gotoTab.bind(this,'QY')}
          imgUrl={image1}
          bottomContent='欲买桂花同载酒。终不似，少年游。'
          divider={true}
        />
        <MenuTab
          title='陶瓷'
          content='观看陶瓷，了解陶瓷。'
          gotoTab={this.gotoTab.bind(this,'TC')}
          imgUrl={image2}
          bottomContent='为君持酒劝斜阳，且向花间留晚照。'
          divider={true}
        />
        <MenuTab
          title='工序'
          content='了解陶瓷的制作工序。'
          gotoTab={this.gotoTab.bind(this,'GX')}
          imgUrl={image3}
          bottomContent='秋阴不散霜飞晚，留得枯荷听雨声。'
          divider={true}
        />
        <MenuTab
          title='工坊'
          content='介绍了目前各地的工坊情况，历史成就。'
          gotoTab={this.gotoTab.bind(this,'GF')}
          imgUrl={image4}
          bottomContent='桃李春风一杯酒，江湖夜雨十年灯。'
          divider={false}
        />
      </div>
    )
  }
}

export default withRouter(MenuPage);