import React from 'react';
import './index.css';
import CommentInfoTab from "./CommentInfoTab";

class Comment extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='Comment-box'>
        <CommentInfoTab/>
      </div>
    );
  }
}

export default Comment;