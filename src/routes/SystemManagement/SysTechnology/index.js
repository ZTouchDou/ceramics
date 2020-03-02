import React from 'react';
import InfoTab from "../../../components/InfoTab";
import GY from '../../../JSON/GY/GY.json';

class SysTechnology extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    return (
      <div>
        {
          GY.map((item,index)=>{
            return (
              <InfoTab
                title={item.title}
                subtitle={item.subtitle}
                content={item.text}
                key={index}/>
            )
          })
        }
      </div>
    );
  }
}

export default SysTechnology;