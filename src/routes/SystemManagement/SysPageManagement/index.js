import React from 'react';
import { Tree, Icon, Button, notification,Row,Col} from 'antd';
import SysPageBgl from '../../../Image/SysPageBgl.jpg';
import SysPageBgr from '../../../Image/SysPageBgr.jpg';

const { TreeNode } = Tree;

class SysPageManagement extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      checkedApplication:[],
      treeData:[
        {
          title: '超级管理员',
          value: '所有',
          key: '0-0',
          checked:true,
          children:[
            {
              title: '起源',
              value: '所有',
              key: '0-0-0',
              checked:true,
              children:[]
            },
            {
              title: '陶瓷',
              value: '所有',
              key: '0-0-1',
              checked:true,
              children:[
                {
                  title: '主页',
                  value: '所有',
                  key: '0-0-1-0',
                  checked:true,
                  children:[]
                },
                {
                  title: '详情',
                  value: '所有',
                  key: '0-0-1-1',
                  checked:true,
                  children:[]
                },
                {
                  title: '店铺',
                  value: '所有',
                  key: '0-0-1-2',
                  checked:true,
                  children:[]
                }
              ]
            },
            {
              title: '工序',
              value: '所有',
              key: '0-0-2',
              checked:true,
              children:[
                {
                  title: '详细信息',
                  value: '所有',
                  key: '0-0-2-0',
                  checked:true,
                  children:[]
                }
              ]
            },
            {
              title: '工坊',
              value: '所有',
              key: '0-0-3',
              checked:true,
              children:[]
            },
            {
              title: '社区',
              value: '所有',
              key: '0-0-4',
              checked:true,
              children:[]
            },
            {
              title: '系统',
              value: '所有',
              key: '0-0-5',
              checked:true,
              children:[]
            }
          ]
        },
        {
          title: '普通用户',
          value: '所有',
          key: '0-1',
          checked:false,
          children:[
            {
              title: '起源',
              value: '所有',
              key: '0-1-0',
              checked:true,
              children:[]
            },
            {
              title: '陶瓷',
              value: '所有',
              key: '0-1-1',
              checked:false,
              children:[
                {
                  title: '主页',
                  value: '所有',
                  key: '0-1-1-0',
                  checked:true,
                  children:[]
                },
                {
                  title: '详情',
                  value: '所有',
                  key: '0-1-1-1',
                  checked:false,
                  children:[]
                },
                {
                  title: '店铺',
                  value: '所有',
                  key: '0-1-1-2',
                  checked:false,
                  children:[]
                }
              ]
            },
            {
              title: '工序',
              value: '所有',
              key: '0-1-2',
              checked:true,
              children:[
                {
                  title: '详细信息',
                  value: '所有',
                  key: '0-1-2-0',
                  checked:true,
                  children:[]
                }
              ]
            },
            {
              title: '工坊',
              value: '所有',
              key: '0-1-3',
              checked:true,
              children:[]
            },
            {
              title: '社区',
              value: '所有',
              key: '0-1-4',
              checked:false,
              children:[]
            },
            {
              title: '系统',
              value: '所有',
              key: '0-1-5',
              checked:false,
              children:[]
            }
          ]
        }
      ]
    }
  }

  componentDidMount() {
    let {treeData} = this.state;
    this.pushSelectedKeys(treeData);
  }

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

  //生成树
  createTree=(treeData)=>{
    return treeData.map((item)=>{
        return (
          <TreeNode
            icon={({ checked }) => <Icon type={checked ? 'smile-o' : 'frown-o'}/>}
            title={item.title}
            key={item.key}
            disabled={item.key==='0-1-5'}
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

  //点击确定
  submitTree=()=>{
    let {checkedApplication} = this.state;
    console.log("checkedApplication:", checkedApplication);
    notification['success']({
      message: '成功',
      description:
        '修改权限成功 ( ‘-ωก̀ )',
      duration: 0,
    });
  };

  render() {
    let {treeData} = this.state;
    // this.createTree(treeData);
    return (
      <div style={{color:'#001529',height:'100%'}}>
        <Row>
          <Col span={12}>
            <div style={{paddingLeft:'30px',backgroundImage:`url(${SysPageBgl})`,height:'600px',overflow:'auto',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}}>
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
            </div>
          </Col>
          <Col span={12}>
            <div style={{height:'600px',backgroundImage:`url(${SysPageBgr})`,backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}}>
              <div style={{height:'40vh',paddingTop:'5vh',display:'flex'}}>
                <div style={{width:'50%',height:'100%'}}>
                  <div style={{marginLeft:'40%'}}>
                    <Button shape="circle" style={{width:'15vmin',height:'15vmin',backgroundColor:'#FEFDF9',color:'#8F8044'}}
                            onClick={this.submitTree}
                    >
                      确定
                    </Button>
                  </div>
                  <div style={{height:'50%',width:'50%',marginLeft:'15%'}}>
                    <Button shape="circle" style={{width:'12vmin',height:'12vmin',backgroundColor:'#FEFDF9',color:'#8F8044'}}
                    >
                      取消
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SysPageManagement;