import React from 'react';
import './index.css';
import CerPicInfoTab from "./CerPicInfoTab";

class CeramicsPicture extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='CerPic-box'>
        <CerPicInfoTab
          imgUrl='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2016551457,3277632260&fm=26&gp=0.jpg'
          content='立春 2月3-4日'
        />
        <CerPicInfoTab
          imgUrl='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=28463233,2696505373&fm=11&gp=0.jpg'
          content='立春 2月3-4日'
        />
        <CerPicInfoTab
          imgUrl='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=153995377,2161912859&fm=26&gp=0.jpg'
          content='立春 2月3-4日'
        />
        <CerPicInfoTab
          imgUrl='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2653335221,2108390734&fm=26&gp=0.jpg'
          content='立春 2月3-4日'
        />
        <CerPicInfoTab
          imgUrl='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3503268207,941710284&fm=26&gp=0.jpg'
          content='立春 2月3-4日'
        />
        <CerPicInfoTab
          imgUrl='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3503268207,941710284&fm=26&gp=0.jpg'
          content='立春 2月3-4日'
        />
      </div>
    );
  }
}

export default CeramicsPicture;