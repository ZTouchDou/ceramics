import React from 'react';
import './ChipInfoTab.css';
import ChipDetails from "./ChipDetails";

class ChipInfoTab extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    let {item, imgUrl} = this.props;
    const mask={
      "WebkitMask":`url(${require('../../../Image/'+imgUrl)})`,
      "WebkitMaskSize":"100% 100%"
    };
    return (
      <div className='ChipInfoTab-box' onClick={this.props.gotoDetails}>
        <div className='ChipInfoTab-name'>
          {item.title}
        </div>
        <div className='ChipInfoTab-pic' style={{...mask}}/>
      </div>
    );
  }
}

export default ChipInfoTab;