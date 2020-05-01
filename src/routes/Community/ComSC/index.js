import React from 'react';
import GoBackButton from "../../../components/GoBackButton";
import SC from '../../../JSON/SC/SC.json';
import request from "../../../utils/request";
import './index.css';
import config from "../../../config";

//赏瓷游览
const uploadUrl = config.poxzy.imgUrl;

class ComSC extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      scData:[],
      total:10
    }
  }

  //取得赏瓷的信息
  getInvitationSC=(id)=>{
    request({url:'/getInvitationSC',method:'GET',params:{id:id}}).then((res)=>{
      if(res && res.code){
        this.setState({
          scData:res.data,
          total:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getInvitationSC(0);
  }

  gotoBack=()=>{
    this.props.history.push('/Community');
  };

  render() {
    return (
      <div className='ComSC-box'>
        <GoBackButton
          gotoBack={this.gotoBack}
        />
        {
          this.state.scData.map((item,index)=>{
            return(
              <div className='ComSC-tab' key={index}>
                {
                  item.imgUrl?
                    <img
                      style={{width:'100vw',minHeight:'40vh'}}
                      alt='配图'
                      src={uploadUrl+item.imgUrl}
                    />
                    :
                    <img
                      style={{width:'100vw',minHeight:'40vh'}}
                      alt='配图'
                      src={require('../../../Image/noSC.jpg')}
                    />
                }
                <div className='ComSC-nameplate'>
                  <div style={{width:'100%',height:'80%'}}>
                    <div style={{width:'100%',height:'2vh'}}/>
                    <div className='ComSC-head'>
                      <img
                        alt='用户头像'
                        style={{width:'100%',maxHeight:'100%',borderRadius:'50%'}}
                        src={uploadUrl+item.userImg}
                      />
                    </div>
                    <div className='ComSC-name'>
                      {item.userName}
                    </div>
                    <div className='ComSC-description'>
                      {item.content}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default ComSC;