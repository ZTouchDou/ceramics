import React from 'react';
import {Row,Col,Timeline,Icon} from 'antd';
import request from "../../../utils/request";
import moment from 'moment'
import echarts from 'echarts';
import './index.css';

class DataScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      echartData1:[],
      echartData2:[],
      comNumber:'',
      journalInfo:[]
    }
  }

  //取得基本数据
  getBaseData=()=>{
    request({url:'/getBaseData',method:'GET'}).then((res)=>{
      if(res && res.code){
        let leftData = [];
        let rightData = [];
        leftData.push(res.data[0].originData);
        leftData.push(res.data[0].ceramicsData);
        leftData.push(res.data[0].technologyData);
        leftData.push(res.data[0].workshopData);
        rightData.push(res.data[0].invJCData);
        rightData.push(res.data[0].invSCData);
        rightData.push(res.data[0].chipData);
        rightData.push(res.data[0].userData);
        this.setState({
          echartData1:leftData,
          echartData2:rightData,
          comNumber:res.data[0].comData
        },()=>{
          this.initECharts();
        })
      }
    });
  };

  //初始化图表
  initECharts=()=>{
    let topLeftChart = echarts.init(document.getElementById('Data-top-left'));
    let option1 = {
      title: {
        text: '陶瓷相关'
      },
      tooltip: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: 10,
        containLabel: true,
        width:580,
        height: 220,
      },
      legend: {
        data:['数量']
      },
      xAxis: {
        data: ["起源","陶瓷","工序","工坊"]
      },
      yAxis: {},
      series: [{
        name: '数量',
        type: 'bar',
        color:['#73b9bc'],
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 1, 0, 0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 1 0 0则代表渐变色从正下方开始
              [
                {offset: 0, color: '#00bc9b'},
                {offset: 0.5, color: '#24bca9'},
                {offset: 1, color: '#4bbcbb'},
              ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示柱状图的位置
            )
          }
        },
        data: this.state.echartData1
      }]
    };
    topLeftChart.setOption(option1);
    let topRightChart = echarts.init(document.getElementById('Data-top-right'));
    let option2 = {
      title: {
        text: '各项数据',
      },
      legend: {
        orient: 'vertical',
        top: 40,
        right: 100,
        data: ['鉴瓷数量','赏瓷数量','陶片数量','用户数量']
      },
      tooltip : {
        trigger: 'item',
        //提示框浮层内容格式器，支持字符串模板和回调函数形式。
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series:[
        {
          name: '数量',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],//设置饼图位置
          color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
          data:[
            {value:this.state.echartData2[0], name:'鉴瓷数量'},
            {value:this.state.echartData2[1], name:'赏瓷数量'},
            {value:this.state.echartData2[2], name:'陶片数量'},
            {value:this.state.echartData2[3], name:'用户数量'}
          ]
        }
      ]
    };
    topRightChart.setOption(option2);
  };

  //取得日志信息
  getJournal = ()=>{
    request({url:'/getJournal',method:'GET'}).then((res)=>{
      if(res && res.code){
        this.setState({
          journalInfo:res.data
        })
      }
    })
  };

  componentDidMount() {
    this.getBaseData();
    this.getJournal();
  }

  render() {
    let {journalInfo} = this.state;
    return (
      <div style={{overflowX:'hidden'}}>
        <div>
          <Row>
            <Col span={12}>
              <div id='Data-top-left' className='Data-top'>

              </div>
            </Col>
            <Col span={12}>
              <div id='Data-top-right' className='Data-top'>

              </div>
            </Col>
          </Row>
        </div>
        <div className='Data-center'>
          <Row>
            <Col span={8}>
              <div style={{padding:'10px 10px',textAlign:'right'}}>
                <div style={{fontSize:'30px',fontWeight:'bold'}}>
                  {this.state.comNumber}
                </div>
                <div>
                  评论数量
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div style={{padding:'10px 10px',textAlign:'right'}}>
                <div style={{fontSize:'30px',fontWeight:'bold'}}>
                  10245
                </div>
                <div>
                  图片数量
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div style={{padding:'10px 10px',textAlign:'right'}}>
                <div style={{fontSize:'30px',fontWeight:'bold'}}>
                  + 2%
                </div>
                <div>
                  活跃度
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='Data-bottom'>
          <div style={{fontWeight:'bold'}}>
             日志
          </div>
          <div style={{height:'500px',fontWeight:'bold',paddingTop:'10px',overflow:'auto'}}>
            <Timeline mode="alternate" reverse={true}>
              {
                journalInfo.map((item,index)=>{
                  return(
                    <Timeline.Item
                      key={index}
                      color={index%2===0?'green':'#1890FF'}
                      dot={index%3===0?(<Icon type="clock-circle-o" style={{ fontSize: '16px' }}/>):''}
                    >
                      {item.content} —— <span style={{color:'#FA7F00'}}>{moment(Number(item.time)).format("YYYY-MM-DD")}</span>
                    </Timeline.Item>
                  )
                })
              }
            </Timeline>
          </div>
        </div>
      </div>
    );
  }
}

export default DataScreen;