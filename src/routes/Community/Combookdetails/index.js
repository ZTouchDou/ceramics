import React from 'react';
import './index.css';
import GoBackButton from '../../../components/GoBackButton';
import config from '../../../config.js';
import Img from '../../../Image/19.jpg';
import BookTab from '../../../components/BookTab/index';
import image1 from '../../../Image/20.jpg';
import image2 from '../../../Image/21.jpg';
import image3 from '../../../Image/22.jpg';
import image4 from '../../../Image/23.jpg';
import request from "../../../utils/request";

const fontName = config.fontName;
const uploadUrl = config.poxzy.imgUrl;

const font = {
  fontFamily:fontName
};

const pstyle={
  width:'100vw',
  height:'10vh',
  fontSize:'6vmin',
  fontFamily:fontName,
  paddingLeft:'41vw',
  paddingTop:'5vh',
  color: 'rgba(0,0,0,1)'
};

const imgstyle={
  width:'100%',
  height:'100%',
};

class Combk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList:[]
    };
  }

  getBookList=()=>{
    request({url:'/getBookData',method:'GET'}).then((res)=>{
      if(res && res.code){
        this.setState({
          bookList:res.data
        })
      }
    })
  };

  componentDidMount() {
    this.getBookList();
  }

  gotoBack=()=>{
    this.props.history.push('/Community');
  };

  render() {
    let {bookList} = this.state;
    return(
      <div className='Combk-bg' >
        <GoBackButton
          color='BlackGrey'
          gotoBack={this.gotoBack}
        />
        <div className='Combk-title'>
          <p style={{...pstyle}}>
            ——推荐书单 Top50
          </p>
          <div className='cover'>
            <img src={Img} alt="" style={{...imgstyle}}/>
          </div>
        </div>
        <div className='Combk-body'>
          <div>
            {
              bookList.map((item,index)=>{
                return(
                  <BookTab
                    key={index}
                    title={`Top${index+1} ${item.name}` }
                    imgUrl={uploadUrl+item.imgUrl}
                    leftContent={`${item.article} 著  / ${item.publishing}`}
                    bottomContent={item.details}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
export default Combk;