import React from 'react';
import InfoTab from "../../../components/InfoTab";
import QY from '../../../JSON/QY/QY.json';
import { Menu} from 'antd';

class SysOrigin extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    return (
      <div>
        {
          QY.map((item,index)=>{
            return (
              <InfoTab
                title={item.title}
                content={item.content}
                key={index}/>
            )
          })
        }
      </div>
    );
  }
}

export default SysOrigin;