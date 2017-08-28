import React, {Component} from 'react';
import '../styles/Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="profile">
                <img src={this.props.match.avatar.url || '/default.jpg'} alt=""/>
                <p>{this.props.match.name}</p>
                <p>{this.props.match.mobile}</p>
                <p>{this.props.match.email}</p>
            </div>
        )
    }
}
export default Profile;