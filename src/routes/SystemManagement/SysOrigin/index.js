import React from 'react';
import InfoTab from "../../../components/InfoTab";
import QY from '../../../JSON/QY/QY.json';
import config from "../../../config";

class SysOrigin extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    const resource =[
      {
        title:'标题',
        label:'title',
        type:'input',
        rules: config.reg.required
      },
      {
        title:'内容',
        label:'content',
        type:'textarea',
        rules: config.reg.required
      }
    ];

    return (
      <div>
        {
          QY.map((item,index)=>{
            return (
              <InfoTab
                item={item}
                key={index}
                resource={resource}
              />
            )
          })
        }
      </div>
    );
  }
}

export default SysOrigin;