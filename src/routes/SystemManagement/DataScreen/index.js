import React from 'react';
import {Row,Col,Timeline,Icon} from 'antd';
import echarts from 'echarts';
import './index.css';

class DataScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  componentDidMount() {
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
        data: [3, 10, 9, 10]
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
          roseType: 'angle',
          color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
          data:[
            {value:235, name:'鉴瓷数量'},
            {value:274, name:'赏瓷数量'},
            {value:310, name:'陶片数量'},
            {value:335, name:'用户数量'}
          ]
        }
      ]
    };
    topRightChart.setOption(option2);
  }

  render() {
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
                  10245
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
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo.
              </Timeline.Item>
              <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                Technical testing 2015-09-01
              </Timeline.Item>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo.
              </Timeline.Item>
              <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                Technical testing 2015-09-01
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      </div>
    );
  }
}

export default DataScreen;