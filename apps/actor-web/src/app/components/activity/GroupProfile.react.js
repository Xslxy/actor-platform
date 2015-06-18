import _ from 'lodash';

import React from 'react';
import { PureRenderMixin } from 'react/addons';

import DialogActionCreators from '../../actions/DialogActionCreators';

import LoginStore from '../../stores/LoginStore';
import InviteUserActions from '../../actions/InviteUserActions';

import AvatarItem from '../common/AvatarItem.react';
import InviteUser from '../modals/InviteUser.react';

class GroupProfile extends React.Component {
  static propTypes = {
    group: React.PropTypes.object.isRequired
  };

  constructor() {
    super();
  }

  _onAddMemberClick(group) {
    InviteUserActions.modalOpen(group);
  }

  _onLeaveGroupClick(groupId) {
    DialogActionCreators.leaveGroup(groupId);
  }

  render() {
    var group = this.props.group;
    var myId = LoginStore.getMyId();

    var adminControls;
    if (group.adminId === myId) {
      adminControls = <a className="button button--danger button--wide hide">Delete group</a>;
    }

    return (
      <div className="activity__body profile">
        <AvatarItem image={group.avatar}
                    placeholder={group.placeholder}
                    size="huge"
                    title={group.name}/>

        <h3 className="profile__name">{group.name}</h3>

        <GroupProfile.Members groupId={group.id} members={group.members}/>

        <footer className="profile__controls">
          <div className="profile__controls__notifications">
            Enable Notifications

            <div className="switch pull-right">
              <input id="notifications" type="checkbox"/>
              <label htmlFor="notifications"></label>
            </div>
          </div>

          <a className="button button--wide" onClick={this._onAddMemberClick.bind(this, group)}>Add member</a>
          <a className="button button--wide" onClick={this._onLeaveGroupClick.bind(this, group.id)}>Leave group</a>
          {adminControls}
        </footer>

        <InviteUser/>
      </div>
    );
  }
}

GroupProfile.Members = React.createClass({
  propTypes: {
    groupId: React.PropTypes.number,
    members: React.PropTypes.array.isRequired
  },

  mixins: [PureRenderMixin],


  _onClick(id) {
    DialogActionCreators.selectDialogPeerUser(id);
  },

  _onKickMemberClick(groupId, userId) {
    DialogActionCreators.kickMember(groupId, userId);
  },

  render() {
    let groupId = this.props.groupId;
    let members = this.props.members;
    let myId = LoginStore.getMyId();


    let membersList = _.map(members, (member, index) => {
      let controls;
      let canKick = member.canKick;

      if (canKick === true && member.peerInfo.peer.id !== myId) {
        controls = <a className="material-icons" onClick={this._onKickMemberClick.bind(this, groupId, member.peerInfo.peer.id)}>clear</a>;
      }

      return (
        <li className="profile__list__item row" key={index}>
          <a onClick={this._onClick.bind(this, member.peerInfo.peer.id)}>
            <AvatarItem image={member.peerInfo.avatar}
                        placeholder={member.peerInfo.placeholder}
                        size="tiny"
                        title={member.peerInfo.title}/>
          </a>

          <div className="col-xs">
            <a onClick={this._onClick.bind(this, member.peerInfo.peer.id)}>
              <span className="title">
                {member.peerInfo.title}
              </span>
            </a>
          </div>

          <div className="controls">
            {controls}
          </div>
        </li>
      );
    }, this);

    return (
      <ul className="profile__list profile__list--members">
        {membersList}
      </ul>
    );
  }
});

export default GroupProfile;
