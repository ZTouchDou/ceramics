import React from 'react';
import {Row, Col, Icon, Modal, Divider, Pagination,Tooltip,Popconfirm,message} from 'antd';
import MenuTitle from "../../../components/MenuTitle";
import './SysComJCDetails.css';
import config from "../../../config";

const pageSize = config.pageSize;

//评论tab
const UserInfoTab = ({t,imgUrl, name, time, content})=>{
  return(
    <div className='SysJCDe-comTab'>
      <div className='SysJCDe-user'>
        <Row style={{width:'100%',height:'100%'}}>
          <Col span={2} style={{height:'100%'}}>
            <img
              style={{borderRadius:'50%',width:'100%',height:'100%'}}
              src={imgUrl}
              alt='用户头像'
            />
          </Col>
          <Col span={22} style={{height:'100%'}}>
            <div className='SysJCDe-user-name'>
              {name}
            </div>
            <div className='SysJCDe-user-time'>
              {time}
            </div>
          </Col>
        </Row>
      </div>
      <div className='ComJC-commentText'>
        {content?content:''}
      </div>
      <div style={{textAlign:'right',fontSize:'20px'}}>
        <Popconfirm
          title='确定删除吗？'
          okText="确定"
          cancelText="取消"
          placement="left"
          onConfirm={t.deleteInvitation}
        >
          <Tooltip placement="bottom" title="删除">
            <Icon type="delete" theme="filled" />
          </Tooltip>
        </Popconfirm>
      </div>
    </div>
  )
};

class SysComJCDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      ImageUrl:'',
      arr:['','','','',''],
      major:true
    }
  }

  componentDidMount() {
    //判断是从帖子详情页面进入还是点击的评论页面的帖子快捷跳转
    let type = sessionStorage.getItem('invitationType');
    if(type && type==='minor'){
      this.setState({
        arr:[''],
        major:false
      })
    }else{
      this.setState({
        arr:['','',''],
        major:true
      })
    }
  }

  //删除图片
  deleteImage=()=>{

  };

  //查看图片
  lookImage=(imgUrl)=>{
    this.setState({
      ImageUrl:imgUrl,
      visible: true,
    });
  };

  //点击取消关闭图片详情
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  //关闭详情页
  closeDetails=()=>{
    this.props.closeDetails();
  };

  //展示所有的评论
  showAllComment=()=>{
    this.setState({
      arr:['','',''],
      major:true
    })
  };

  //删除评论
  deleteInvitation=()=>{
    message.success('删除成功');
  };

  //换页
  changePage=(page,pageSize)=>{
    console.log("page,pageSize:", page,pageSize);
  };

  render() {
    let t = this;
    let {visible, ImageUrl, major} = this.state;
    return (
      <div className='SysJCDe-box' style={{width:`${this.props.width?this.props.width:'85%'}`}}>
        <Row style={{width:'100%',height:'100%'}}>
          <Col span={12} style={{height:'100%'}}>
            <div style={{height:'100%'}}>
              <MenuTitle
              color='#FF0000'
              content='基本信息'
            />
              <div>
                <Row>
                  <Col span={12}>
                    {/*左边创作者标题时间等信息*/}
                    <div className='SysJCDe-baseInfo'>
                      {/*创作者id*/}
                      <div className='DivHeight-40'>
                        <span style={{fontWeight:'bold'}}>用户id：</span>
                        <span> 1022628</span>
                      </div>
                      {/*创作者昵称*/}
                      <div className='DivHeight-40'>
                        <span style={{fontWeight:'bold'}}>用户昵称：</span>
                        <span> 小果果</span>
                      </div>
                      {/*帖子id*/}
                      <div className='DivHeight-40'>
                        <span style={{fontWeight:'bold'}}>帖子id：</span>
                        <span> 268952</span>
                      </div>
                      {/*帖子标题*/}
                      <div className='DivHeight-40'>
                        <span style={{fontWeight:'bold'}}>帖子标题：</span>
                        <span> 观形</span>
                      </div>
                      {/*帖子时间*/}
                      <div className='DivHeight-40'>
                        <span style={{fontWeight:'bold'}}>发贴时间：</span>
                        <span> 2020/3/3</span>
                      </div>
                    </div>
                  </Col>
                  <Col span={10}>
                    {/*右边用户头像*/}
                    <div
                      style={{height:'200px',boxShadow:'3px 3px 10px 3px #ccc'}}
                      onClick={this.lookImage.bind(this,'http://img5.imgtn.bdimg.com/it/u=3760864727,4049862538&fm=26&gp=0.jpg')}
                    >
                      <img
                        style={{width:'100%',height:'100%'}}
                        alt='用户头像'
                        src='http://img5.imgtn.bdimg.com/it/u=3760864727,4049862538&fm=26&gp=0.jpg'
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              {/*帖子配图*/}
              <div className='SysJCDe-invimage'>
                <div style={{fontWeight:'bold',marginBottom:'20px'}}>帖子配图：</div>
                <div className='SysJCDe-invimage-image'>
                  <Row>
                    <Col span={4}>
                      <div style={{height:'80px',padding:'2px 2px',display:'flex'}}>
                        <img
                          style={{width:'100%',height:'100%'}}
                          src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2421384544,2639699292&fm=26&gp=0.jpg'
                          alt='帖子配图'
                        />
                        <div className='SysJCDe-deleteImg'>
                          <Row style={{height:'100%'}}>
                            <Col span={12} style={{height:'100%'}}>
                              <Icon
                                onClick={this.lookImage.bind(this,'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2421384544,2639699292&fm=26&gp=0.jpg')}
                                className='SysJCDe-deleteImg-icon'
                                type="eye"
                                theme="filled"
                              />
                            </Col>
                            <Col span={12} style={{height:'100%'}}>
                              <Icon
                                onClick={this.deleteImage}
                                className='SysJCDe-deleteImg-icon'
                                type="delete"
                                theme="filled"
                              />
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              {/*内容*/}
              <div className='SysJCDe-content'>
                <div style={{fontWeight:'bold',marginBottom:'20px'}}>帖子内容：</div>
                <div style={{overflow:'auto',height:'150px'}}>
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
            </div>
          </Col>
          <Col span={12} style={{height:'100%'}}>
            <div style={{height:'100%'}}>
              <MenuTitle
                color='#FF9E00'
                content='评论'
                closeDetails={this.closeDetails}
                closeable={true}
              />
              <div className='SysJCDe-comment'>
                {
                  this.state.arr.map((item,index)=>{
                    return(
                      <div key={index}>
                        <UserInfoTab
                          t={t}
                          imgUrl='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1564199267,720190006&fm=26&gp=0.jpg'
                          name='无衣'
                          time='2020/3/3 15:34'
                          content='所以古玩行人都极其认真钻研鉴定方法，苦练鉴定基本功。各个时期的古瓷都有不同的特征，下面，我们通过这二十个要点一起来学习。'
                        />
                        <Divider/>
                      </div>
                    )
                  })
                }
                {
                  (!major) &&
                    <div
                      style={{textAlign:'center',color:'blue',cursor:'pointer'}}
                      onClick={this.showAllComment}
                    >
                      显示所有评论
                    </div>
                }
                <div style={{height:'50px',marginTop:'20px'}}>
                  <Pagination
                    onChange={this.changePage}
                    defaultCurrent={1}
                    pageSize={pageSize}
                    total={100}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Modal
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={ImageUrl} />
        </Modal>
      </div>
    );
  }
}

export default SysComJCDetails;