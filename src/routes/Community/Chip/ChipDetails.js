import React from 'react';
import './ChipDetails.css';
import GoBackButton from "../../../components/GoBackButton";

class ChipDetails extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    let {name} = this.props;
    return (
      <div className='ChipDetails-box'>
        <GoBackButton
          color='black'
          gotoBack={this.props.closeDetails}
        />
        <div className='ChipDetails-header'>

        </div>
        <div className='ChipDetails-body'>
          <div className='ChipDetails-name'>
            {name}
          </div>
          <div className='ChipDetails-content'>
            <div className='ChipDetails-text'>
              深沉谷响含疏磬，片段岚光落画屏。是宋 张先 《河满子》词：“片段落霞明水底，风纹时动妆光。” 邹韬奋 《叙利亚的民族解放运动》：“但即就这么零星片段的新闻看来
            </div>
            <div className='ChipDetails-text'>
              深沉谷响含疏磬，片段岚光落画屏。是宋 张先 《河满子》词：“片段落霞明水底，风纹时动妆光。” 邹韬奋 《叙利亚的民族解放运动》：“但即就这么零星片段的新闻看来
            </div>
            <div className='ChipDetails-text'>
              深沉谷响含疏磬，片段岚光落画屏。是宋 张先 《河满子》词：“片段落霞明水底，风纹时动妆光。” 邹韬奋 《叙利亚的民族解放运动》：“但即就这么零星片段的新闻看来
            </div>
            <div className='ChipDetails-text'>
              深沉谷响含疏磬，片段岚光落画屏。是宋 张先 《河满子》词：“片段落霞明水底，风纹时动妆光。” 邹韬奋 《叙利亚的民族解放运动》：“但即就这么零星片段的新闻看来
            </div>
            <div className='ChipDetails-text'>
              深沉谷响含疏磬，片段岚光落画屏。是宋 张先 《河满子》词：“片段落霞明水底，风纹时动妆光。” 邹韬奋 《叙利亚的民族解放运动》：“但即就这么零星片段的新闻看来
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChipDetails;