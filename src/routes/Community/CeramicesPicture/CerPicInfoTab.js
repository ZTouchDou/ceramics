import React from 'react';
import './CerPicInfoTab.css'

class CerPicInfoTab extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='CerInfoTab-box'>
        <div className='CerInfoTab-header'>
          <img
            style={{width:'100%',minHeight:'10vh'}}
            src={this.props.imgUrl}
            alt='配图'
          />
        </div>
        <div className='CerInfoTab-body'>
          <div style={{width:'100%',height:'96%',overflow:'auto'}}>
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

export default CerPicInfoTab;