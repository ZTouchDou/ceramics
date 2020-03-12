import React from 'react';
import { message,Table, Divider, Tag, Avatar, Modal, Tree,Icon } from 'antd';
import UserDetails from "./UserDetails";

const { TreeNode } = Tree;

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
      ]
    }
  }

  //关闭确认删除弹框
  closeDelete=()=>{
    this.setState({
      deleteWarn:false
    })
  };

  //打开确认删除弹框
  showDeleteWarn=(permit)=>{
    if(permit){
      this.setState({
        modalTitle:'删除操作',
        modalContent:'确定删除该用户吗？删除之后可点击恢复找回用户账号。注意：若三十天内未恢复，该账号将彻底删除。',
        deleteWarn:true
      })
    }else{
      this.setState({
        modalTitle:'恢复操作',
        modalContent:'确定恢复该用户吗？',
        deleteWarn:true
      })
    }
  };

  //删除用户
  onOk=()=>{
    let {modalTitle} = this.state;
    if(modalTitle === '删除操作'){
      message.success('删除成功');
    }else{
      message.success('恢复成功');
    }
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
  showUserDetails=()=>{
    this.setState({
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
        render: text => <a onClick={this.showUserDetails}>{text}</a>,
      },
      {
        title: '头像',
        dataIndex: 'imgUrl',
        key: 'imgUrl',
        render: imgUrl => <Avatar src={imgUrl} />
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
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === '超级管理员') {
            color = 'magenta';
          }else if(tag === '普通用户'){
            color = 'green';
          }else{
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
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
              record.permit?
                <a onClick={this.showDeleteWarn.bind(this,record.permit)}>删除用户</a>
                :
                <a onClick={this.showDeleteWarn.bind(this,record.permit)}>恢复用户</a>
            }
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        id:'1000',
        name: 'admin',
        imgUrl: 'http://img1.imgtn.bdimg.com/it/u=2492488577,388673270&fm=26&gp=0.jpg',
        account: 'admin',
        password:'123456',
        tags: ['超级管理员'],
        permit:true
      },
      {
        key: '2',
        id:'1001',
        name: '小果果',
        imgUrl: 'http://img1.imgtn.bdimg.com/it/u=3495633323,551723840&fm=26&gp=0.jpg',
        account: '1258234434@qq.com',
        password:'12589476',
        tags: ['无权限'],
        permit:false
      },
      {
        key: '3',
        id:'1002',
        name: '洛洛大方',
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1564199267,720190006&fm=26&gp=0.jpg',
        account: '332198434@qq.com',
        password:'10258.xialq14',
        tags: ['普通用户'],
        permit:true
      },
    ];

    return (
      <div style={{display:'flex'}}>
        <Table style={{width:'100%'}} columns={columns} dataSource={data} />
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
            />
        }
      </div>
    );
  }
}

export default SysUser;