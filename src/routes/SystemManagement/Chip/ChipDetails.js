import React from 'react';
import {Row, Col,Icon,Tooltip,Divider,message} from 'antd';
import './ChipDetails.css';
import moment from "moment";
import request from "../../../utils/request";
import MenuTitle from "../../../components/MenuTitle";

class ChipDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      chipContent:[]
    }
  }

  //取得陶片的详情
  getChipComment=()=>{
    let data={
      id:this.props.chipDetails.id
    };
    request({url:"/getChipContent",method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          chipContent:res.data
        })
      }
    })
  };

  componentDidMount() {
    this.getChipComment();
  };

  //关闭详情页
  closeDetails=()=>{
    this.props.closeDetails();
  };

  //改变显隐性
  changeChipCommentVisible=(id,visible)=>{
    let data={
      id:id,
      chipId:this.props.chipDetails.id,
      visible:visible
    };
    request({url:'/changeChipCommentVisible',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        message.success("操作成功");
        this.getChipComment();
      }
    })
  };

  //改变顺序
  changeChipCommentOrder=(id,order)=>{
    let data={
      id:id,
      chipId:this.props.chipDetails.id,
      theOrder:order
    };
    request({url:'/changeChipCommentOrder',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        message.success("操作成功");
        this.getChipComment();
      }
    })
  };

  render() {
    let {chipContent} = this.state;
    let {chipDetails} = this.props;
    return (
      <div className='ChipDetails-box' style={{width:`${this.props.width?this.props.width:'85%'}`}}>
        <Row style={{width:'100%',height:'100%'}}>
          <Col span={12} style={{height:'100%'}}>
            <div style={{height:'100%'}}>
              <MenuTitle
                color='#FF0000'
                content='全文内容'
              />
              <div style={{overflow:'auto',height:'90%'}}>
                <div className='ChipDetails-title'>
                  {chipDetails.title}
                </div>
                {
                  chipContent.map((item,index)=>{
                    return(
                      <div>
                        {
                          item.visible?
                            <div key={index}>
                              <div className='ChipDetails-text'>
                                {item.content}
                              </div>
                              <div className='ChipDetails-pageInfo'>
                                {item.theOrder}
                              </div>
                            </div>
                            :
                            ""
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </Col>
          <Col span={12} style={{height:'100%'}}>
            <div style={{height:'100%'}}>
              <MenuTitle
                color='#FF9E00'
                content='语录'
                closeDetails={this.closeDetails}
                closeable={true}
              />
              <div style={{overflow:'auto',height:'90%',padding:'0 20px'}}>
                {
                  chipContent.map((item,index)=>{
                    return(
                      <div>
                        <div>
                          <div>
                            <Row>
                              <Col span={6}>
                                <div className='ChipDetails-index'>
                                  索引：<span style={{color:'#FF9E00'}}>第{item.theOrder}条</span>
                                </div>
                              </Col>
                              <Col span={6}>
                                <div className='ChipDetails-index'>
                                  状态：<span style={{color:`${item.visible?'#008bff':"red"}`}}>{item.visible?"可见":"不可见"}</span>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div className='ChipDetails-time'>
                            {moment(Number(item.time)).format("YYYY/MM/DD HH:mm")}
                          </div>
                          <div className='ChipDetails-content'>
                            <Row>
                              <Col span={21}>
                                <div>
                                  {item.content}
                                </div>
                              </Col>
                              <Col span={3}>
                                <div className='ChipDetails-changeButton'>
                                  <div>
                                    {
                                      index===0?
                                        <Tooltip placement="top" title="上升">
                                          <Icon
                                            type="up-circle"
                                            theme="filled"
                                            onClick={()=>{message.warn("已经是第一条了，无法上升")}}
                                          />
                                        </Tooltip>
                                        :
                                        <Tooltip placement="top" title="上升">
                                          <Icon
                                            type="up-circle"
                                            theme="filled"
                                            onClick={this.changeChipCommentOrder.bind(this,item.id,1)}
                                          />
                                        </Tooltip>
                                    }
                                  </div>
                                  <div>
                                    {
                                      item.visible?
                                        <Tooltip placement="top" title="隐藏">
                                          <Icon type="eye-invisible" theme="filled" onClick={this.changeChipCommentVisible.bind(this,item.id,0)}/>
                                        </Tooltip>
                                        :
                                        <Tooltip placement="top" title="显示">
                                          <Icon type="eye" theme="filled" onClick={this.changeChipCommentVisible.bind(this,item.id,1)}/>
                                        </Tooltip>
                                    }
                                  </div>
                                  <div>
                                    {
                                      (index+1)===chipContent.length?
                                        <Tooltip placement="bottom" title="下降">
                                          <Icon
                                            type="down-circle"
                                            theme="filled"
                                            onClick={()=>{message.warn("已经是第最后一条了，无法下降")}}
                                          />
                                        </Tooltip>
                                        :
                                        <Tooltip placement="bottom" title="下降">
                                          <Icon
                                            type="down-circle"
                                            theme="filled"
                                            onClick={this.changeChipCommentOrder.bind(this,item.id,0)}
                                          />
                                        </Tooltip>
                                    }
                                  </div>
                                  <div>
                                    <Tooltip placement="bottom" title="删除">
                                      <Icon type="delete" theme="filled" />
                                    </Tooltip>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                        <Divider/>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChipDetails;