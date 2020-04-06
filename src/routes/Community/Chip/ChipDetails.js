import React from 'react';
import './ChipDetails.css';
import request from "../../../utils/request";
import GoBackButton from "../../../components/GoBackButton";

class ChipDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      chipContent:[]
    }
  }

//取得陶片的详情
  getChipComment=()=>{
    let data={
      id:this.props.chipDetails.id
    };
    request({url:"/getChipContent",method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          chipContent:res.data
        })
      }
    })
  };

  componentDidMount() {
    this.getChipComment();
  }

  render() {
    let {chipDetails} = this.props;
    return (
      <div className='ChipDetails-box'>
        <GoBackButton
          color='black'
          gotoBack={this.props.closeDetails}
        />
        <div className='ChipDetails-header'/>
        <div className='ChipDetails-body'>
          <div className='ChipDetails-name'>
            {chipDetails.title}
          </div>
          <div className='ChipDetails-content'>
            {
              this.state.chipContent.map((item,index)=>{
                return(
                  <div className='ChipDetails-text' key={index}>
                    {item.content}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ChipDetails;