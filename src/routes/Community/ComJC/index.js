import React from 'react';
import {Row, Col,Carousel,Drawer,Divider,Icon,Input} from 'antd';
import GoBackButton from "../../../components/GoBackButton";
import './index.css';

const UserInfoTab = ({imgUrl, name, time, title, content})=>{
  return(
    <div>
      <div className='ComJC-user'>
        <Row style={{width:'100%',height:'100%'}}>
          <Col span={4} style={{height:'100%'}}>
            <img
              style={{borderRadius:'50%',width:'100%',height:'100%'}}
              src={imgUrl}
              alt='用户头像'
            />
          </Col>
          <Col span={16} style={{height:'100%'}}>
            <div className='ComJC-user-name'>
              {name}
            </div>
            <div className='ComJC-user-time'>
              {time}
            </div>
          </Col>
        </Row>
      </div>
      {
        title &&
        <div className='ComJC-title'>
          {title}
        </div>
      }
      {
        content &&
        <div className='ComJC-text'>
          {content}
        </div>
      }
    </div>
  )
};

class ComJC extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      commentShow:false
    }
  }

  componentDidMount() {
    this.changeHeight();
  }

  //返回
  gotoBack=()=>{
    this.props.history.go(-1);
  };

  //显示评论
  showComment=()=>{
    this.setState({
      commentShow:true
    })
  };

  //关闭评论
  closeComment=()=>{
    this.setState({
      commentShow:false
    })
  };

  //改变高度
  changeHeight=()=>{
    let h = document.getElementsByClassName('slick-active')[0].offsetHeight;
    document.getElementById('ComJC-image').setAttribute('style',`height:${h}px;transition:height 1s`);
  };

  render() {
    let {commentShow}=this.state;
    return (
      <div className='ComJC-box'>
        <GoBackButton
          gotoBack={this.gotoBack}
          color='black'
        />
        <div className='ComJC-Affix'>
          <div className='ComJC-Affix-next'>
            <Icon type="right-circle" theme="filled" />
          </div>
          <div className='ComJC-Affix-comment' onClick={this.showComment}>
            <Icon type="edit" theme="filled" />
          </div>
        </div>
        <div className='ComJC-header'>
          鉴瓷
        </div>
        <div className='ComJC-body'>
          <div className='ComJC-image' id='ComJC-image'>
            <Carousel
              afterChange={this.changeHeight}
              className='ant-carousel-ComJC'
              ref={el => (this.slider = el)}
              autoplay={false}
              dots={true}
              dotPosition='bottom'
              lazyLoad={false}
            >
              <img
                src='http://img4.imgtn.bdimg.com/it/u=3361834593,3506772911&fm=15&gp=0.jpg'
                style={{width:'100%',height:'100%'}}
                alt='陶瓷配图'
              />
              <img
                src='http://img0.imgtn.bdimg.com/it/u=1693297773,2198454285&fm=15&gp=0.jpg'
                style={{width:'100%',height:'100%'}}
                alt='陶瓷配图'
              />
              <img
                src='http://5b0988e595225.cdn.sohucs.com/images/20190706/547db99ae644417ba7e3da37731a6a66.jpeg'
                style={{width:'100%',height:'100%'}}
                alt='陶瓷配图'
              />
            </Carousel>
          </div>
          <Row>
            <Col span={24}>
              <div className='ComJC-content'>
                <UserInfoTab
                  imgUrl='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1564199267,720190006&fm=26&gp=0.jpg'
                  name='洛洛大方'
                  time='2020/3/3'
                />
                <div className='ComJC-title'>
                  观型
                </div>
                <div className='ComJC-text'>
                  瓷之型代表和展现着历史、人文、政治、经济乃至形制和生产力发展的传承脉络。
                  是一个时段政治经济发展演绎过程最直接的体现。
                  因而，我们研究认识瓷之型的演绎过程也便于了解社会的进程与发展。
                  如果我们对某一类的器物，从起源到发展的全过程有一番系统的了解，
                  如瓷壶类，那么我们从器型，全然可以粗略地以型断代，
                  然后依据同时代的取材、用料、配方工艺、人文历史等进行全方位的核实论证，就完全有可能准确的断其年代。
                  假如说年代确立不了，那就容易张冠李戴，形成老虎吃天，无法下爪。
                  由此可说，鉴定瓷器，观型断代是坚定的第一要素。
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Drawer
          style={{borderTopLeftRadius:'5%'}}
          placement="bottom"
          closable={true}
          onClose={this.closeComment}
          visible={commentShow}
          title='评论'
          width='100vw'
          height='90vh'
        >
          <div className='ComJC-com-box'>
            <div className='ComJC-com-input'>
              <Input placeholder='写个评论吧'/>
            </div>
            <UserInfoTab
              imgUrl='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1564199267,720190006&fm=26&gp=0.jpg'
              name='无衣'
              time='2020/3/3 15:34'
              content='所以古玩行人都极其认真钻研鉴定方法，苦练鉴定基本功。各个时期的古瓷都有不同的特征，下面，我们通过这二十个要点一起来学习。'
            />
            <Divider/>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default ComJC;