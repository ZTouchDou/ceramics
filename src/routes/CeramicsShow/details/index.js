import React from 'react';
import { Carousel } from 'antd';
import './index.css';
import config from '../../../config.js';
import GoBackButton from '../../../components/GoBackButton';
const fontName = config.fontName;

const font = {
  fontFamily:fontName
};

class details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem:{},
      arrStr:[]
    };
  }

  //取得父级传过来的数据
  componentDidMount() {
    let {arrStr} = this.state;
    let dataItem = JSON.parse(sessionStorage.getItem('dataItem'));
    let str = dataItem.content;//字符串
    let f = 70;//每一页是字数
    for(let i=0;i<str.length;i+=f){
      arrStr.push(str.slice(i,i+f));
    }
    // console.log("dataItem.content:", dataItem.content);
    this.setState({
      dataItem,
      arrStr
    })
  }

  gotoBack=()=>{
    this.props.history.push('/CeramicsShow');
  };

  render() {
    // 引入arrStr，你也可以下面直接this.state.arrStr，效果一样的
    let {arrStr} = this.state;
    return (
      <div className='details-bg'>
        <GoBackButton
          color='black'
          gotoBack={this.gotoBack}
        />
        <div className='details-top'>
          <Carousel
            className='ant-carousel-details'
            ref={el => (this.slider = el)}
            autoplay={false}
            dots={false}
            lazyLoad={true}
            effect="fade"
          >
            {
              arrStr.map((item,index)=>{
                return(
                  <div className='details-content' key={index} style={{...font}}>
                    {item}
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <div className='details-bottom'>
          
          {/*这里放陶瓷模型*/}
          </div>
        </div>

    );
  }
}
export default details;