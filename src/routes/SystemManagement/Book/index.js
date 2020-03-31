import React from 'react';
import {Table, Divider,Popconfirm,message} from 'antd';
import request from "../../../utils/request";
import BookDetails from "./BookDetails";
import SysAddButton from "../SysAddButton";
import MyModal from "../../../components/MyModal";
import config from "../../../config";

class Book extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      modalShow:false,
      bookData:[],
      bookDetails:'',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://img3.doubanio.com/view/subject/l/public/s29230941.jpg',
        }
      ]
    }
  }

  //取得书籍列表信息
  getBookData=()=>{
    request({url:'/getBookData',method:'GET'}).then((res)=>{
      if(res && res.code){
        this.setState({
          bookData:res.data
        })
      }
    })
  };

  componentDidMount() {
    this.getBookData();
  }

  //显示书籍详情
  showDetails=(record)=>{
    this.setState({
      bookDetails:record,
      visible:true
    })
  };

  //关闭详情页
  closeDetails=()=>{
    this.setState({
      visible:false
    })
  };

  //新增书籍弹框
  showModal=()=>{
    this.setState({
      modalShow:true
    })
  };

  //确认新增书籍
  handleOk=(values)=>{
    request({url:'/insertBook',method:'POST',data:values}).then((res)=>{
      if(res && res.code){
        message.success("新增成功");
        this.getBookData();
      }else{
        message.error("操作失败");
      }
    });
    this.setState({
      modalShow:false
    })
  };

  //取消新增书籍
  handleCancel=()=>{
    this.setState({
      modalShow:false
    })
  };

  //确认删除书籍
  confirmDelete=(id)=>{
    request({url:'/deleteBookById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success('删除成功');
        this.getBookData();
      }
    });
  };

  //设置图片
  setFileList=(fileList)=>{
    this.setState({
      fileList
    })
  };

  render() {
    let {visible} = this.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '作者',
        dataIndex: 'article',
        key: 'article',
      },
      {
        title: '出版社',
        key: 'publishing',
        dataIndex: 'publishing'
      },
      {
        title: '描述',
        key: 'details',
        dataIndex: 'details',
        render:(text)=>{
          return(
            <div>
              {text.length>10?(text.slice(0,10)+'...'):text}
            </div>
          )
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={this.showDetails.bind(this,record)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除吗？"
              onConfirm={this.confirmDelete.bind(this,record.id)}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    const resource =[
      {
        title:'配图',
        label:'imgUrl',
        type:'Upload',
        rules: '',
        initialValue:'',
        fileList:this.state.fileList,
        picNumber:1
      },
      {
        title:'书名',
        label:'name',
        type:'input',
        rules: config.reg.required,
        initialValue:''
      },
      {
        title:'作者',
        label:'article',
        type:'input',
        rules: config.reg.required,
        initialValue:'',
      },
      {
        title:'出版社',
        label:'publishing',
        type:'input',
        rules: config.reg.required,
        initialValue:''
      },
      {
        title:'描述',
        label:'details',
        type:'textarea',
        rules: config.reg.required,
        initialValue:''
      }
    ];

    // const data = [
    //   {
    //     id: '1',
    //     name: '陶瓷之路',
    //     article: 'xxx',
    //     publishing: 'New York No. 1 Lake Park',
    //     details:'上看到我i打击了解滴蜡设计单位'
    //   },
    //   {
    //     id: '2',
    //     name: '中国色彩',
    //     article: 'aaaa',
    //     publishing: 'New York No. 1 Lake Park',
    //     details:'上看到我i打击了解滴蜡设计单位'
    //   },
    //   {
    //     id: '3',
    //     name: '陶瓷变迁',
    //     article: 'sdd',
    //     publishing: 'New York No. 1 Lake Park',
    //     details:'上看到我i打击了解滴蜡设计单位'
    //   },
    // ];

    return (
      <div style={{display:'flex'}}>
        <Table
          style={{width:'100%'}}
          columns={columns}
          dataSource={this.state.bookData}
        />
        {
          visible &&
            <BookDetails
              bookDetails={this.state.bookDetails}
              fileList={this.state.fileList}
              closeDetails={this.closeDetails}
              setFileList={this.setFileList}
              updateBookInfo={this.getBookData}
            />
        }
        <SysAddButton color='#aaa' showModal={this.showModal}/>
        <MyModal
          modalTitle='新增'
          visible={this.state.modalShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          resource={resource}
        />
      </div>
    );
  }
}

export default Book;