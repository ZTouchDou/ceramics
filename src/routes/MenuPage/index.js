import React from 'react';
import {Divider} from 'antd';
import {withRouter} from "react-router-dom";
import './index.css'
import MenuTab from "../../components/MenuTab";
import image1 from '../../Image/7.jpg';
import image2 from '../../Image/6.jpg';
import image3 from '../../Image/8.jpg';
import image4 from '../../Image/10.jpg';
import image5 from '../../Image/1.jpg';
// import config from '../../config.js';

// let fontName = config.fontName;
//菜单页

// const pStyle = {
//   fontSize: '8vmin',
//   fontFamily:fontName,
//   color: 'rgba(0,0,0,0.85)',
//   lineHeight: '1vh',
//   display: 'block',
//   marginBottom: '0vh',
//
// };

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
    }else if(type==='SQ'){
      this.props.history.push('/Community');
    }else if(type==='XT'){
      this.props.history.push('/SystemManagement');
    }
  };

  render() {
    return (
      <div>
        <Divider/>
        <MenuTab
          title='起源'
          gotoTab={this.gotoTab.bind(this,'QY')}
          imgUrl={image1}
          divider={true}
        />
        <MenuTab
          title='陶瓷'
          gotoTab={this.gotoTab.bind(this,'TC')}
          imgUrl={image2}
          divider={true}
        />
        <MenuTab
          title='工序'
          gotoTab={this.gotoTab.bind(this,'GX')}
          imgUrl={image3}
          divider={true}
        />
        <MenuTab
          title='工坊'
          gotoTab={this.gotoTab.bind(this,'GF')}
          imgUrl={image4}
          divider={true}
        />
        <MenuTab
          title='社区'
          gotoTab={this.gotoTab.bind(this,'SQ')}
          imgUrl={image5}

          divider={true}
        />
        <MenuTab
          title='管理'
          gotoTab={this.gotoTab.bind(this,'XT')}
          imgUrl={image5}
          divider={false}
        />
      </div>
    )
  }
}
export default withRouter(MenuPage);