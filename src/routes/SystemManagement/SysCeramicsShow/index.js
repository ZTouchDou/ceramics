import React from 'react';
import InfoTab from "../../../components/InfoTab";
import TC from '../../../JSON/TC/TC.json';

class SysCeramicsShow extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    return (
      <div>
        {
          TC.map((item,index)=>{
            return (
              <InfoTab
                title={item.name}
                content={item.details}
                key={index}/>
            )
          })
        }
      </div>
    );
  }
}

export default SysCeramicsShow;