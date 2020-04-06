import React from 'react';
import {Row,Col,Pagination,Divider,Upload, Icon,Modal,Form,Input,Button,message} from 'antd';
import './BookDetails.css';
import request from "../../../utils/request";
import moment from "moment";
import MenuTitle from "../../../components/MenuTitle";
import UserInfoTab from "../../../components/UserInfoTab";
import config from "../../../config";

const pageSize = config.pageSize;
const uploadUrl = config.poxzy.imgUrl;
const uploadAction = config.poxzy.uploadUrl+"/upload";
const {TextArea} = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class BookDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      commentData:[],
      previewVisible: false,
      previewImage: '',
      page:1,
      total:10
    }
  }

  //取得该书的书评
  getBookComment=(page)=>{
    let data={
      id:this.props.bookDetails.id,
      page:page,
      pageSize: pageSize
    };
    request({url:'/getCommentFromBook',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          commentData:res.data,
          total:res.total
        })
      }else{
        message.error("请求评论失败");
      }
    })
  };

  componentDidMount() {
    this.getBookComment(this.state.page);
  }

  //关闭详情
  closeDetails=()=>{
    if(this.props.closeDetails){
      this.props.closeDetails();
    }
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  //改变图片
  handleChange = ({ fileList }) => {
    this.props.setFileList(fileList);
  };

  //提交对书籍的修改
  handleSubmit=(e)=>{
    e.preventDefault();
    let {fileList} = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.id=this.props.bookDetails.id;
        values.imgUrl=fileList.length>0?fileList[0].url?("ceramics"+fileList[0].url.split("ceramics")[1]):fileList[0].response.filePath:'';
        request({url:'/updateBookInfoById',method:'POST',data:values}).then((res)=>{
          if(res && res.code){
            message.success("修改成功");
            this.props.updateBookInfo();
          }else{
            message.error("操作失败");
          }
        })
      }
    });
  };

  //删除评论
  deleteComment=(id)=>{
    request({url:'/deleteCommentById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success('删除成功');
        this.getBookComment(this.state.page);
      }else{
        message.error("删除失败")
      }
    })
  };

  //换页
  changePage=(page)=>{
    this.setState({
      page
    });
    this.getBookComment(page);
  };

  render() {
    let {fileList,bookDetails} = this.props;
    let {previewVisible, previewImage, commentData} = this.state;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div className='BookDetails-box'>
        <Row>
          <Col span={12}>
            <MenuTitle
              content='基本信息'
              color='red'
            />
            <div className='BookDetails-baseInfo'>
              <div className='BookDetails-picture'>
                <Upload
                  action={uploadAction}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
              <Divider/>
              <div className='BookDetails-content'>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item label="书名">
                    {getFieldDecorator('name', {
                      rules: [
                        {
                          required: true,
                          message: '必填',
                        },
                      ],
                      initialValue:bookDetails.name?bookDetails.name:''
                    })(<Input style={{width:'60%'}}/>)}
                  </Form.Item>
                  <Form.Item label="作者">
                    {getFieldDecorator('article', {
                      rules: [
                        {
                          required: true,
                          message: '必填',
                        },
                      ],
                      initialValue:bookDetails.article?bookDetails.article:''
                    })(<Input style={{width:'60%'}}/>)}
                  </Form.Item>
                  <Form.Item label="出版社">
                    {getFieldDecorator('publishing', {
                      rules: [
                        {
                          required: true,
                          message: '必填',
                        },
                      ],
                      initialValue:bookDetails.publishing?bookDetails.publishing:''
                    })(<Input style={{width:'60%'}}/>)}
                  </Form.Item>
                  <Form.Item label="详情">
                    {getFieldDecorator('details', {
                      rules: [
                        {
                          required: true,
                          message: '必填',
                        },
                      ],
                      initialValue:bookDetails.details?bookDetails.details:''
                    })(<TextArea style={{width:'60%'}}/>)}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                      确定
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <MenuTitle
              content='书评'
              color='#FF9E00'
              closeDetails={this.closeDetails}
              closeable={true}
            />
            <div className='BookDetails-comment'>
              {
                commentData.map((item,index)=>{
                  return(
                    <div key={index}>
                      <UserInfoTab
                        deleteComment={this.deleteComment.bind(this,item.id)}
                        imgUrl={uploadUrl+item.userImg}
                        name={item.userName}
                        time={moment(Number(item.time)).format("YYYY/MM/DD HH:mm")}
                        content={item.content}
                      />
                      <Divider/>
                    </div>
                  )
                })
              }
              <div style={{height:'50px',marginTop:'20px'}}>
                <Pagination
                  onChange={this.changePage}
                  defaultCurrent={1}
                  pageSize={pageSize}
                  total={this.state.total}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(BookDetails);