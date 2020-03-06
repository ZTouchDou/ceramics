import React from 'react';
import './index.css';
import InvitationInfoTab from "./InvitationInfoTab";

class Invitation extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='Invitation-box'>
        <InvitationInfoTab/>
        <InvitationInfoTab/>
        <InvitationInfoTab/>
      </div>
    );
  }
}

export default Invitation;