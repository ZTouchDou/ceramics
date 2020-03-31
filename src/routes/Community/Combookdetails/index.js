import React from 'react';
import './index.css';
import GoBackButton from '../../../components/GoBackButton';
import config from '../../../config.js';
import MenuButton from "../../../components/MenuButton";
import Img from '../../../Image/19.jpg';
import {Divider} from 'antd';
import {withRouter} from "react-router-dom";
import BookTab from '../../../components/BookTab/index';
import image1 from '../../../Image/20.jpg';
import image2 from '../../../Image/21.jpg';
import image3 from '../../../Image/22.jpg';
import image4 from '../../../Image/23.jpg';

import MenuTab from "../../../components/MenuTab";
const fontName = config.fontName;

const font = {
  fontFamily:fontName
};

const pstyle={
  width:'109vw',
  height:'10vh',
  fontSize:'6vmin',
  fontFamily:fontName,
  paddingLeft:'41vw',
  paddingTop:'5vh',
  color: 'rgba(0,0,0,1)'
};

const imgstyle={
  width:'106%',
  height:'62%',
  marginLeft: '-6vw',
  paddingTop: '0vw',
};

class Combk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  gotoBack=()=>{
    this.props.history.push('/Community');
  };

  render() {

    return(
      <div className='Combk-bg' >
        <GoBackButton
          color='BlackGrey'
          gotoBack={this.gotoBack}
        />
        <div className='Combk-title'>
          <p style={{...pstyle}}>
            ——推荐书单 Top50
          </p>
          <div className='cover'>
            <img src={Img} alt="" style={{...imgstyle}}/>
          </div>
        </div>
        <div className='Combk-body'>
          <div>
  <BookTab
    title='Top1 静静的顿河'
    imgUrl={image1}
    leftContent='[苏] 肖洛霍夫 著 / 人民文学出版社 /出版时间：2015-8>'
    bottomContent='一部杰出的社会主义现实主义作品。以第一次世界大战到1922年苏联国内战争为背景，描写哥萨克人在这十年间的动荡生活.'
  />
  <BookTab
    title='Top2 活着'
    imgUrl={image2}
    leftContent='[中] 余华 著 / 作家出版社 /出版时间：2012-8>'
    bottomContent='简述了农村人富贵悲惨的一生，福贵本是富家少爷，可他嗜赌如命，输了家业，此后更加悲惨的命运一次又一次降临到他头上...'
  />
  <BookTab
    title='Top3 百年孤独'
    imgUrl={image3}
    leftContent='[哥伦比亚] 马尔克斯 著 / 南海出版社/出版时间：2011-6>'
    bottomContent='魔幻现实主义文学的代表作，描写了布恩迪亚家族七代人的传奇故事，也反映了拉丁美洲一个世纪以来风云变幻的历史......'
  />
  <BookTab
    title='Top4 1984'
    imgUrl={image4}
    leftContent='[英] 奥威尔 著 / 北京十月文艺出版社 /出版时间：2010-4>'
    bottomContent='一部杰出的政治寓言小说，也是一部幻想小说。作品刻画了人类在极权主义社会的生存状态，警醒世人提防这种预想中的黑暗成为现实。'
  />
</div>

        </div>

      </div>
    );
  }
}
export default Combk;