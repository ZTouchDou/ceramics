import React from 'react';
import { Tree, Icon, Button, notification,Row,Col} from 'antd';
import request from "../../../utils/request";
import SysPageBgl from '../../../Image/SysPageBgl.jpg';
import SysPageBgr from '../../../Image/SysPageBgr.jpg';

const { TreeNode } = Tree;

class SysPageManagement extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      checkedApplication:[],
      checkedResult:[],
      treeData:[]
    }
  }

  //取得权限树
  getTree=()=>{
    request({url:'/getTreeData',method:'GET'}).then((res)=>{
      if(res && res.code){
        this.setState({
          treeData:res.data
        },()=>{
          this.pushSelectedKeys(this.state.treeData);
        })
      }
    })
  };

  componentDidMount() {
    this.getTree();
  }

  //生成勾选树数组
  pushSelectedKeys = (treeData)=>{
    let {checkedApplication} = this.state;
    treeData.map((item)=>{
      if(item.children.length>0){
        this.pushSelectedKeys(item.children);
      }else{
        if(item.checked){
          checkedApplication.push(item.id);
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
            key={item.id}
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
  onCheck=(checkedKeys,e)=>{
    console.log("checkedApplication:", checkedKeys);
    let checkedKeysResult=[...checkedKeys,...e.halfCheckedKeys]
    console.log("checkedKeysResult:", checkedKeysResult);
    this.setState({
      checkedApplication:checkedKeys,
      checkedResult:checkedKeysResult
    })
  };

  //点击确定
  submitTree=()=>{
    let {checkedResult} = this.state;
    let data={
      arr:checkedResult
    };
    console.log("data:", data);
    request({url:'/updateTreeData',method:'POST',data:data}).then((res)=>{
      if(res && res.code){
        notification['success']({
          message: '成功',
          description:
            '修改权限成功 ♪（＾∀＾●）ﾉｼ',
          duration: 0,
        });
        this.getTree();
      }else{
        notification['error']({
          message: '失败',
          description:
            '修改权限失败  ╮(๑•́ ₃•̀๑)╭',
          duration: 0,
        });
      }
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
                            disabled={!this.state.checkedResult.length}
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