import React from 'react';
import {Row, Col,Icon,Tooltip,Divider} from 'antd';
import './ChipDetails.css';
import MenuTitle from "../../../components/MenuTitle";

class ChipDetails extends React.Component{
  constructor(props) {
    super(props);

  }

  //关闭详情页
  closeDetails=()=>{
    this.props.closeDetails();
  };


  render() {
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
                  乡俗
                </div>
                <div className='ChipDetails-text'>
                  陶瓷是陶器和瓷器的总称。早在约8000年前的新石器时代，人们就发明了陶器。九千多年前的中国先民在从事渔猎、农业生产活动的同时，开始进行最原始的建筑活动，随着火的发明和使用，在改造大自然的长期劳动实践中，伴随着无数次实践，开始制造和使用成为中国古文化之一的艺术创造物——陶器
                </div>
                <div className='ChipDetails-pageInfo'>
                  1
                </div>
                <div className='ChipDetails-text'>
                  陶瓷是陶器和瓷器的总称。早在约8000年前的新石器时代，人们就发明了陶器。九千多年前的中国先民在从事渔猎、农业生产活动的同时，开始进行最原始的建筑活动，随着火的发明和使用，在改造大自然的长期劳动实践中，伴随着无数次实践，开始制造和使用成为中国古文化之一的艺术创造物——陶器
                </div>
                <div className='ChipDetails-pageInfo'>
                  3
                </div>
                <div className='ChipDetails-text'>
                  陶瓷是陶器和瓷器的总称。早在约8000年前的新石器时代，人们就发明了陶器。九千多年前的中国先民在从事渔猎、农业生产活动的同时，开始进行最原始的建筑活动，随着火的发明和使用，在改造大自然的长期劳动实践中，伴随着无数次实践，开始制造和使用成为中国古文化之一的艺术创造物——陶器
                </div>
                <div className='ChipDetails-pageInfo'>
                  4
                </div>
                <div className='ChipDetails-text'>
                  陶瓷是陶器和瓷器的总称。早在约8000年前的新石器时代，人们就发明了陶器。九千多年前的中国先民在从事渔猎、农业生产活动的同时，开始进行最原始的建筑活动，随着火的发明和使用，在改造大自然的长期劳动实践中，伴随着无数次实践，开始制造和使用成为中国古文化之一的艺术创造物——陶器
                </div>
                <div className='ChipDetails-pageInfo'>
                  5
                </div>
                <div className='ChipDetails-text'>
                  陶瓷是陶器和瓷器的总称。早在约8000年前的新石器时代，人们就发明了陶器。九千多年前的中国先民在从事渔猎、农业生产活动的同时，开始进行最原始的建筑活动，随着火的发明和使用，在改造大自然的长期劳动实践中，伴随着无数次实践，开始制造和使用成为中国古文化之一的艺术创造物——陶器
                </div>
                <div className='ChipDetails-pageInfo'>
                  7
                </div>
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
                <div>
                  <div>
                    <Row>
                      <Col span={6}>
                        <div className='ChipDetails-index'>
                          索引：<span style={{color:'#FF9E00'}}>第1条</span>
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className='ChipDetails-index'>
                          状态：<span style={{color:'#008bff'}}>可见</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className='ChipDetails-time'>
                    2020/3/3
                  </div>
                  <div className='ChipDetails-content'>
                    <Row>
                      <Col span={21}>
                        <div>
                          陶瓷是陶器和瓷器的总称。早在约8000年前的新石器时代，人们就发明了陶器。九千多年前的中国先民在从事渔猎、农业生产活动的同时，开始进行最原始的建筑活动，随着火的发明和使用，在改造大自然的长期劳动实践中，伴随着无数次实践，开始制造和使用成为中国古文化之一的艺术创造物——陶器
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className='ChipDetails-changeButton'>
                          <div>
                            <Tooltip placement="top" title="上升">
                              <Icon type="up-circle" theme="filled" />
                            </Tooltip>
                          </div>
                          <div>
                            <Tooltip placement="top" title="隐藏">
                              <Icon type="eye-invisible" theme="filled" />
                            </Tooltip>
                          </div>
                          <div>
                            <Tooltip placement="bottom" title="下降">
                              <Icon type="down-circle" theme="filled" />
                            </Tooltip>
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

                <div>
                  <div>
                    <Row>
                      <Col span={6}>
                        <div className='ChipDetails-index'>
                          索引：<span style={{color:'#FF9E00'}}>第2条</span>
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className='ChipDetails-index'>
                          状态：<span style={{color:'red'}}>不可见</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className='ChipDetails-time'>
                    2020/3/3
                  </div>
                  <div className='ChipDetails-content'>
                    <Row>
                      <Col span={21}>
                        <div>
                          陶瓷是陶器和瓷器的总称。早在约8000年前的新石器时代，人们就发明了陶器。九千多年前的中国先民在从事渔猎、农业生产活动的同时，开始进行最原始的建筑活动，随着火的发明和使用，在改造大自然的长期劳动实践中，伴随着无数次实践，开始制造和使用成为中国古文化之一的艺术创造物——陶器
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className='ChipDetails-changeButton'>
                          <div>
                            <Tooltip placement="top" title="上升">
                              <Icon type="up-circle" theme="filled" />
                            </Tooltip>
                          </div>
                          <div>
                            <Tooltip placement="top" title="显示">
                              <Icon type="eye" theme="filled" />
                            </Tooltip>
                          </div>
                          <div>
                            <Tooltip placement="bottom" title="下降">
                              <Icon type="down-circle" theme="filled" />
                            </Tooltip>
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
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChipDetails;