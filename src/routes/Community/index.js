import React from 'react';
import {Divider,Layout, Menu,Col,Row,Carousel,Button,Drawer,Upload,Icon,Modal,Input,message} from 'antd';
import './index.css';
import userimg from '../../Image/5.jpg'
import request from "../../utils/request";
import config from "../../config";
import MenuButton from "../../components/MenuButton";
import Invitation from "./Invitation";
import CeramicsPicture from "./CeramicesPicture";
import Comment from "./Comment";
import Chip from "./Chip";

const { Header, Content } = Layout;
const pageSize = 10;
const uploadUrl = config.poxzy.imgUrl;
const uploadAction = config.poxzy.uploadUrl+"/upload";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MyTab: 1,
      bookList:[],
      editModalShow:false,
      previewVisible: false,
      previewImage: '',
      fileList:[]
    }
  }

  //关闭图片详情框
  modalCancel = () => this.setState({ previewVisible: false });
  //查看图片
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  //图片列表改变
  handleChange = ({ fileList }) => {
      this.setState({
        fileList
      })
  };

  //取得书籍
  getBookList=(id)=>{
    request({url:'/getBookData',method:"GET",params:{id:id}}).then((res)=>{
      if(res && res.code){
        this.setState({
          bookList:res.data
        })
      }
    })
  };

  componentDidMount() {
    this.getBookList(0);
  }

  //游览
  gotoVisit = (type) => {
    if (type === 'SC') {
      this.props.history.push('/Community/ComSC');
    } else if (type === 'JC') {
      sessionStorage.setItem("invJCId",0);
      this.props.history.push('/Community/ComJC');
    }
  };

  //切换
  changeTab = (type) => {
    this.setState({
      MyTab: type
    })
  };

  //发布
  gotoAdd = (type) => {
    sessionStorage.setItem('AddType', type);
    this.props.history.push('/Community/ComAdd');
  };

  handleClick = () => {
    this.props.history.push('/Community/Combookdetails');
  };

  //编辑资料
  editUserInfo=()=>{
    let img=[];
    if(sessionStorage.getItem("userimg")){
      img.push({
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: uploadUrl+sessionStorage.getItem("userimg")
      })
    }
    this.setState({
      editModalShow:true,
      fileList:img
    })
  };

  editClose=()=>{
    this.setState({
      editModalShow:false
    })
  };

  //更改头像
  changeAvator=()=>{
    let id=sessionStorage.getItem("userId");
    let {fileList} = this.state;
    let imgUrl=fileList.length>0?fileList[0].url?("ceramics"+fileList[0].url.split("ceramics")[1]):fileList[0].response.filePath:'';
    request({url:"/changeAvator",method:'GET',params:{id:id,imgUrl:imgUrl}}).then((res)=>{
      if(res && res.code){
        message.success("头像更换成功");
        sessionStorage.setItem('userimg', imgUrl);
      }else{
        message.error("头像更换失败");
      }
    })
  };

  //更改昵称
  changeNickName=()=>{
    let nickName=document.getElementById("nickName").value;
    if(!nickName){
      message.error("请输入昵称");
      return;
    }
    let id=sessionStorage.getItem("userId");
    let data={
      id,
      nickName
    }
    request({url:'/changeNickName',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        message.success("昵称修改成功");
        sessionStorage.setItem('nickName', nickName);

      }else if(res){
        message.error(res.message);
      }else{
        message.error("昵称修改失败，服务器出错");
      }
    })
  };

  //更改密码
  changePassword=()=>{
    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    console.log("oldPassword:", oldPassword);
    if(!oldPassword){
      message.error("请输入原密码");
      return;
    }
    if(!newPassword){
      message.error("请输入新密码");
      return;
    }
    if(!confirmPassword){
      message.error("请再次输入密码");
      return;
    }
    let data={
      id:sessionStorage.getItem("userId"),
      oldPassword,
      newPassword,
      confirmPassword
    };
    request({url:'/changeUserPassword',method:"POST",data:data}).then((res)=>{
      if(res && res.code){
        message.success("密码更换成功");
      }else if(res){
        message.error(res.message);
      }else{
        message.error("密码更换失败，服务器出错");
      }
    })
  };

  render() {
    let {MyTab,editModalShow,previewVisible, previewImage,fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className='Community-box'>
        <MenuButton/>
        <div className='Community-header'>
          社区
        </div>
        <div className='Community-body'>
          <div className='Community-content'>
            <div className='Community-title'>
              鉴赏
            </div>
            <Row style={{width: '100%', height: '80%'}}>
              <Col span={12} style={{height: '100%'}}>
                <div className='Community-body-tab gradient1'>
                  <div className='tab-img'>
                    <img
                      style={{width: '100%', height: '100%'}}
                      src={require("../../Image/JC.jpg")}
                      alt="example"
                    />
                  </div>
                  <div className='tab-body'>
                    <div style={{fontSize: '4vmin', fontWeight: '500'}}>
                      鉴瓷
                    </div>
                    <div style={{fontSize: '3.5vmin'}}>
                      工人莫献天机巧，此器能输郡国材。
                    </div>
                  </div>
                  <div className='tab-action'>
                    <Row style={{height: '100%'}}>
                      <Col span={11} style={{height: '100%'}}>
                        <div
                          style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}
                          onClick={this.gotoAdd.bind(this, 'JC')}
                        >
                          发布
                        </div>
                      </Col>
                      <Col span={2} style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}>
                        |
                      </Col>
                      <Col span={11} style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}>
                        <div
                          style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}
                          onClick={this.gotoVisit.bind(this, 'JC')}
                        >
                          游览
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col span={12} style={{height: '100%'}}>
                <div className='Community-body-tab gradient2'>
                  <div className='tab-img'>
                    <img
                      style={{width: '100%', height: '100%'}}
                      src={require("../../Image/noSC.jpg")}
                      alt="example"
                    />
                  </div>
                  <div className='tab-body'>
                    <div style={{fontSize: '4vmin', fontWeight: '500'}}>
                      赏瓷
                    </div>
                    <div style={{fontSize: '3.5vmin'}}>
                      玲珑剔透万般好，静中见动青山来。
                    </div>
                  </div>
                  <div className='tab-action'>
                    <Row style={{height: '100%'}}>
                      <Col span={11} style={{height: '100%'}}>
                        <div
                          style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}
                          onClick={this.gotoAdd.bind(this, 'SC')}
                        >
                          发布
                        </div>
                      </Col>
                      <Col span={2} style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}>
                        <div style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}>
                          |
                        </div>
                      </Col>
                      <Col span={11} style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}>
                        <div
                          style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}
                          onClick={this.gotoVisit.bind(this, 'SC')}
                        >
                          游览
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <Divider/>
          <div className='Community-title'>
            推荐书籍
          </div>
          <div className='Community-book' onClick={this.handleClick}>
            <Carousel
              className='ant-carousel-Community'
              ref={el => (this.slider = el)}
              autoplay={true}
              dots={true}
              dotPosition='bottom'
              lazyLoad={true}
            >
              {
                this.state.bookList.map((item,index)=>{
                  return(
                    <div key={index} style={{width: '100%', height: '25vh'}}>
                      <img
                        src={uploadUrl+item.imgUrl}
                        style={{width: '100%', height: '25vh'}}
                        alt="书籍配图"
                      />
                    </div>
                  )
                })
              }
            </Carousel>
          </div>
          <Divider/>
          <div className='Community-MyHome'>
            <div className='Community-title'>
              我的家
            </div>
            <div className='Community-MyHome-baseInfo'>
              <Row>
                <Col span={8}>
                  <div className='Community-user'>
                    <img src={uploadUrl+sessionStorage.getItem("userimg")} alt='你的头像阵亡了' className='Community-user-image'/>
                  </div>
                </Col>
                <Col span={10}>
                  <div className='Community-user-Info'>
                    <div className='Community-user-name'>
                      {sessionStorage.getItem("nickName")}
                    </div>
                    <div className='Community-user-id'>
                      ID:{sessionStorage.getItem("userId")}
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <Button ghost size="small" onClick={this.editUserInfo}>
                    编辑资料
                  </Button>
                </Col>
              </Row>
            </div>
            <div className='Community-MyHome-invInfo'>
              <Layout className='ant-c-layout'>
                <Header className="header">
                  <div className="logo"/>
                  <Menu
                    className='ant-c-menu'
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '10vh'}}
                  >
                    <Menu.Item className='ant-c-submenu' key="1" onClick={this.changeTab.bind(this, 1)}>帖子</Menu.Item>
                    <Menu.Item className='ant-c-submenu' key="2" onClick={this.changeTab.bind(this, 2)}>晒瓷</Menu.Item>
                    <Menu.Item className='ant-c-submenu' key="3" onClick={this.changeTab.bind(this, 3)}>评论</Menu.Item>
                    <Menu.Item className='ant-c-submenu' key="4" onClick={this.changeTab.bind(this, 4)}>瓷片</Menu.Item>
                  </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                  <Layout className="site-layout-background " style={{height: '54.5vh', padding: '4vh 0'}}>
                    <Content style={{overflow: 'auto'}}>
                      {
                        MyTab === 1 && <Invitation history={this.props.history}/>
                      }
                      {
                        MyTab === 2 && <CeramicsPicture/>
                      }
                      {
                        MyTab === 3 && <Comment/>
                      }
                      {
                        MyTab === 4 && <Chip/>
                      }
                    </Content>
                  </Layout>
                </Content>
              </Layout>
            </div>
          </div>
        </div>
        <Drawer
          placement="right"
          closable={true}
          destroyOnClose={true}
          onClose={this.editClose}
          visible={editModalShow}
          width='100vw'
          height='100vh'
        >
          <div>
            <div>
              <div style={{height:'7vh',fontWeight:'bold'}}>
                用户头像
              </div>
              <div>
                <Upload
                  action={uploadAction}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >=1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.modalCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
              <Button
                type="primary"
                disabled={!fileList.length}
                onClick={this.changeAvator}
              >
                确认修改
              </Button>
            </div>
            <Divider/>
            <div>
              <div style={{height:'7vh',fontWeight:'bold'}}>
                用户昵称
              </div>
              <div style={{height:'7vh'}}>
                <Input
                  id="nickName"
                  disabled={sessionStorage.getItem("nickName")?sessionStorage.getItem("nickName")==="admin"?true:false:false} defaultValue={sessionStorage.getItem("nickName")?sessionStorage.getItem("nickName"):''}
                />
              </div>
              <Button
                onClick={this.changeNickName}
                disabled={sessionStorage.getItem("nickName")?sessionStorage.getItem("nickName")==="admin"?true:false:false}
                type="primary"
              >
                确认修改
              </Button>
            </div>
            <Divider/>
            <div>
              <div style={{height:'7vh',fontWeight:'bold'}}>
                修改密码
              </div>
              <div style={{height:'12vh'}}>
                <div>
                  原密码：
                </div>
                <Input.Password id="oldPassword"/>
              </div>
              <div style={{height:'12vh'}}>
                <div>
                  新密码：
                </div>
                <Input.Password id="newPassword"/>
              </div>
              <div style={{height:'12vh'}}>
                <div>
                  确认密码：
                </div>
                <Input.Password id="confirmPassword"/>
              </div>
              <Button
                onClick={this.changePassword}
                type="primary"
              >
                确认修改
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}
  export default Community;