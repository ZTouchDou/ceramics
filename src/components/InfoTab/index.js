import React from 'react';
import {Icon} from 'antd';

import './index.css';

class InfoTab extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    let {title, content,subtitle} = this.props;
    return (
      <div>
        <div  className='InfoTab-box'>
          <div className='InfoTab-title'>
            {title.length>9?(title.slice(0,9)+'...'):title}
          </div>
          {
            subtitle &&
            <div className='InfoTab-subtitle'>
              ——{subtitle.length>9?(subtitle.slice(0,9)+'...'):subtitle}
            </div>
          }
          <div className='InfoTab-content' style={{height:`${subtitle?'50%':'60%'}`}}>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoTab;