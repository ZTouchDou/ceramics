import React from 'react';
import InfoTab from "../../../components/InfoTab";
import GF from '../../../JSON/GF/GF.json';

class SysWorkshop extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    return (
      <div>
        {
          GF.map((item,index)=>{
            return (
              <InfoTab
                item={item}
                key={index}/>
            )
          })
        }
      </div>
    );
  }
}

export default SysWorkshop;