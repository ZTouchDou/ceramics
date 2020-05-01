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
      menuTab:sessionStorage.getItem("resourceDTS")?JSON.parse(sessionStorage.getItem("resourceDTS")):{}
    }
  }

  componentDidMount() {
    console.log("this.state.menuTab:", this.state.menuTab);
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
    let {menuTab} = this.state;
    return (
      <div>
        <Divider/>
        {
          menuTab && menuTab.children && menuTab.children.length>=1 &&
          menuTab.children[0].checked===1 && menuTab.children[0].disabled===0 &&
          <MenuTab
            title={menuTab.children[0].title}
            gotoTab={this.gotoTab.bind(this,'QY')}
            imgUrl={image1}
            divider={true}
          />
        }
        {
          menuTab && menuTab.children && menuTab.children.length>=2 &&
          menuTab.children[1].checked===1 && menuTab.children[1].disabled===0 &&
          <MenuTab
            title={menuTab.children[1].title}
            gotoTab={this.gotoTab.bind(this,'TC')}
            imgUrl={image2}
            divider={true}
          />
        }
        {
          menuTab && menuTab.children && menuTab.children.length>=3 &&
          menuTab.children[2].checked===1 && menuTab.children[2].disabled===0 &&
          <MenuTab
            title={menuTab.children[2].title}
            gotoTab={this.gotoTab.bind(this,'GX')}
            imgUrl={image3}
            divider={true}
          />
        }
        {
          menuTab && menuTab.children && menuTab.children.length>=4 &&
          menuTab.children[3].checked===1 && menuTab.children[3].disabled===0 &&
          <MenuTab
            title={menuTab.children[3].title}
            gotoTab={this.gotoTab.bind(this,'GF')}
            imgUrl={image4}
            divider={true}
          />
        }
        {
          menuTab && menuTab.children && menuTab.children.length>=5 &&
          menuTab.children[4].checked===1 && menuTab.children[4].disabled===0 &&
          <MenuTab
            title={menuTab.children[4].title}
            gotoTab={this.gotoTab.bind(this,'SQ')}
            imgUrl={image5}
            divider={true}
          />
        }
        {
          menuTab && menuTab.children && menuTab.children.length>=6 &&
          menuTab.children[5].checked===1 && menuTab.children[5].disabled===0 &&
          <MenuTab
            title={menuTab.children[5].title}
            gotoTab={this.gotoTab.bind(this,'XT')}
            imgUrl={image5}
            divider={false}
          />
        }
      </div>
    )
  }
}
export default withRouter(MenuPage);