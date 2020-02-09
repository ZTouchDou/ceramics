import React from 'react';
import './index.css'
import MenuButton from "../../components/MenuButton";

//陶瓷页
class CeramicsShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return (
      <div className='box'>
        <MenuButton/>
        <div className='box-left'>

        </div>
        <div className='box-right'>

        </div>
      </div>
    )
  }
}

export default CeramicsShow;