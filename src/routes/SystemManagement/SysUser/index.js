import React from 'react';
import { message,Table, Divider, Tag, Avatar, Modal, Tree,Icon } from 'antd';
import request from "../../../utils/request";
import UserDetails from "./UserDetails";
import SearchTab from "../../../components/SearchTab";
import config from "../../../config";

const { TreeNode } = Tree;
const uploadUrl = config.poxzy.imgUrl;

class SysUser extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      deleteWarn:false,
      modalTitle:'',
      modalContent:'',
      showTree:false,
      userDetails:false,
      checkedApplication:[],
      treeData:[
        {
          title: '所有界面',
          value: '所有',
          key: '0-0',
          checked:true,
          disabled:false,
          children:[
            {
              title: '起源',
              value: '所有',
              key: '0-0-0',
              checked:true,
              disabled:false,
              children:[]
            },
            {
              title: '陶瓷',
              value: '所有',
              key: '0-0-1',
              checked:true,
              disabled:false,
              children:[
                {
                  title: '主页',
                  value: '所有',
                  key: '0-0-1-0',
                  checked:true,
                  disabled:false,
                  children:[]
                },
                {
                  title: '详情',
                  value: '所有',
                  key: '0-0-1-1',
                  checked:true,
                  disabled:false,
                  children:[]
                },
                {
                  title: '店铺',
                  value: '所有',
                  key: '0-0-1-2',
                  checked:false,
                  disabled:false,
                  children:[]
                }
              ]
            },
            {
              title: '工序',
              value: '所有',
              key: '0-0-2',
              checked:true,
              disabled:false,
              children:[
                {
                  title: '详细信息',
                  value: '所有',
                  key: '0-0-2-0',
                  checked:true,
                  disabled:false,
                  children:[]
                }
              ]
            },
            {
              title: '工坊',
              value: '所有',
              key: '0-0-3',
              checked:true,
              disabled:false,
              children:[]
            },
            {
              title: '社区',
              value: '所有',
              key: '0-0-4',
              checked:true,
              disabled:false,
              children:[]
            },
            {
              title: '系统',
              value: '所有',
              key: '0-0-5',
              checked:false,
              disabled:true,
              children:[]
            }
          ]
        }
      ],
      userData:[],
      userInfo:{},
      userId:'',

      searchId:'',
      searchName:'',
      searchAccount:''
    }
  }

  //取得用户列表
  getUser=()=>{
    let data={};
    data.id = this.state.searchId?this.state.searchId:null;
    data.name = this.state.searchName?this.state.searchName:null;
    data.account = this.state.searchAccount?this.state.searchAccount:null;
    request({url:'/getUser',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          userData:res.data
        })
      }
    })
  };

  componentDidMount() {
    this.getUser();
  }

  //搜索
  searchData=(values)=>{
    this.setState({
      searchId:values.id,
      searchName:values.name,
      searchAccount:values.account
    },()=>{
      this.getUser();
    })
  };

  //关闭确认删除弹框
  closeDelete=()=>{
    this.setState({
      deleteWarn:false
    })
  };

  //打开确认删除弹框
  showDeleteWarn=(record)=>{
    if(record.status){
      this.setState({
        modalTitle:'删除操作',
        modalContent:'确定删除该用户吗？删除之后可点击恢复找回用户账号。',
        userId:record.id,
        deleteWarn:true
      })
    }else{
      this.setState({
        modalTitle:'恢复操作',
        modalContent:'确定恢复该用户吗？',
        userId:record.id,
        deleteWarn:true
      })
    }
  };

  //改变用户状态
  onOk=()=>{
    let {modalTitle,userId} = this.state;
    let status='';
    let mes = '';
    if(modalTitle === '删除操作'){
      status=0;
      mes="删除成功";
    }else{
      status=1;
      mes="恢复成功";
    }
    let data={};
    data.id=userId;
    data.status=status;
    request({url:'/updateUserStatus',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        message.success(mes);
        this.getUser();
      }
    });
    this.setState({
      deleteWarn:false
    })
  };

  //生成勾选树数组
  pushSelectedKeys = (treeData)=>{
    let {checkedApplication} = this.state;
    treeData.map((item)=>{
      if(item.children.length>0){
        if(item.checked){
          checkedApplication.push(item.key);
        }
        this.pushSelectedKeys(item.children);
      }else{
        if(item.checked){
          checkedApplication.push(item.key);
        }
      }
    });
    this.setState({
      checkedApplication
    })
  };

  //打开权限选择
  showPowerTree=()=>{
    let {treeData} = this.state;
    this.pushSelectedKeys(treeData);
    this.setState({
      showTree:true
    })
  };

  //确认权限选择
  powerOk=()=>{
    this.setState({
      showTree:false
    })
  };

  //取消权限选择
  powerCancel=()=>{
    this.setState({
      showTree:false
    })
  };

  //生成树
  createTree=(treeData)=>{
    return treeData.map((item)=>{
      return (
        <TreeNode
          icon={({ checked }) => <Icon type={checked ? 'smile-o' : 'frown-o'}/>}
          title={item.title}
          key={item.key}
          disabled={item.disabled}
        >
          {
            item.children.length>0?this.createTree(item.children):''
          }
        </TreeNode>
      )
    });
  };

  //选择树
  onCheck=(checkedKeys)=>{
    console.log("checkedKeys:", checkedKeys);
    this.setState({
      checkedApplication:checkedKeys
    })
  };

  //显示用户详情
  showUserDetails=(record)=>{
    console.log("record:", record);
    this.setState({
      userInfo:record,
      userDetails:true
    })
  };

  //关闭用户详情
  closeUserDetails=()=>{
    this.setState({
      userDetails:false
    })
  };

  render() {
    let {deleteWarn, modalTitle, modalContent, showTree,treeData, userDetails } = this.state;

    const searchMenu=[
      {
        title:'昵称',
        label:'name',
        type:'input',
        rules: '',
        initialValue:''
      },
      {
        title:'ID',
        label:'id',
        type:'input',
        rules: '',
        initialValue:''
      },
      {
        title:'账号',
        label:'account',
        type:'input',
        rules: '',
        initialValue:''
      }
    ];

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
        render: (text,record) => <a className='userHome' onClick={this.showUserDetails.bind(this,record)}>{text}</a>,
      },
      {
        title: '头像',
        dataIndex: 'imgUrl',
        key: 'imgUrl',
        render: imgUrl => <Avatar src={uploadUrl+imgUrl} />
      },
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
      },
      {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
      },
      {
        title: '权限',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            <Tag color={tags==='超级管理员'?'magenta':tags==='普通用户'?'green':'volcano'} key={tags}>
              {tags.toUpperCase()}
            </Tag>
          </span>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={this.showPowerTree}>权限管理</a>
            <Divider type="vertical" />
            {
              record.status?
                <a className='deleteUser' onClick={this.showDeleteWarn.bind(this,record)}>删除用户</a>
                :
                <a className='resaveUser' onClick={this.showDeleteWarn.bind(this,record)}>恢复用户</a>
            }
          </span>
        ),
      },
    ];

    return (
      <div style={{display:'flex'}}>
        <SearchTab
          resource = {searchMenu}
          onOk={this.searchData}
        />
        <Table style={{width:'100%'}} columns={columns} dataSource={this.state.userData} />
        <Modal
          okText='确定'
          cancelText='取消'
          title={modalTitle}
          visible={deleteWarn}
          onOk={this.onOk}
          onCancel={this.closeDelete}
        >
          {modalContent}
        </Modal>
        <Modal
          okText='确定'
          cancelText='取消'
          title='权限管理'
          visible={showTree}
          onOk={this.powerOk}
          onCancel={this.powerCancel}
        >
          <Tree
            style={{fontWeight:'bold'}}
            onCheck={this.onCheck}
            showIcon
            checkable
            defaultExpandAll
            checkedKeys={this.state.checkedApplication}
            switcherIcon={<Icon type="down" />}
          >
            {
              this.createTree(treeData)
            }
          </Tree>
        </Modal>
        {
          userDetails &&
            <UserDetails
              closeDetails={this.closeUserDetails}
              userInfo={this.state.userInfo}
            />
        }
      </div>
    );
  }
}

export default SysUser;