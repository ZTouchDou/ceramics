import React from 'react';
import {Drawer} from 'antd';
import './index.css';
import ChipInfoTab from "./ChipInfoTab";
import ChipDetails from "./ChipDetails";

class Chip extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      detailShow:false,
      chipName:''
    }
  }

  //跳转详情页
  gotoDetails=(name)=>{
    this.setState({
      chipName:name,
      detailShow:true
    })
  };

  // 关闭详情页
  closeDetails=()=>{
    this.setState({
      detailShow:false
    })
  };

  render() {
    let {detailShow} = this.state;
    return (
      <div className='Chip-box'>
        <ChipInfoTab
          name='乡俗'
          gotoDetails={this.gotoDetails.bind(this,'乡俗')}
          imgUrl='CP3.png'
        />
        <ChipInfoTab
          name='关于李白的那些事'
          gotoDetails={this.gotoDetails.bind(this,'关于李白的那些事')}
          imgUrl='SysBg.png'
        />
        <ChipInfoTab
          name='渔夫'
          gotoDetails={this.gotoDetails.bind(this,'渔夫')}
          imgUrl='CP2.png'
        />
        <ChipInfoTab
          name='小九寨'
          gotoDetails={this.gotoDetails.bind(this,'小九寨')}
          imgUrl='CP4.png'
        />
        <ChipInfoTab
          name='罗生'
          gotoDetails={this.gotoDetails.bind(this,'罗生')}
          imgUrl='CP5.png'
        />
        <ChipInfoTab
          name='1935'
          gotoDetails={this.gotoDetails.bind(this,'1935')}
          imgUrl='CP6.png'
        />
        <ChipInfoTab
          name='清明传统'
          gotoDetails={this.gotoDetails.bind(this,'清明传统')}
          imgUrl='CP7.png'
        />
        <ChipInfoTab
          name='花旦'
          gotoDetails={this.gotoDetails.bind(this,'花旦')}
          imgUrl='CP8.png'
        />
        <Drawer
          className='ant-drawer-body-Chip'
          placement="right"
          closable={false}
          visible={detailShow}
          width='100vw'
          height='100vh'
        >
          <ChipDetails
            name={this.state.chipName}
            closeDetails={this.closeDetails}
          />
        </Drawer>
      </div>
    );
  }
}

export default Chip;