import React, {Component} from 'react';
import '../styles/Dashboard.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addUserInfo} from '../actions/userInfo';
import {addMatches} from '../actions/matches';
import {Navbar, Nav, MenuItem, NavDropdown, NavItem} from 'react-bootstrap';
import axios from 'axios';
import Loader from "./Loader";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import router from '../Router';
import {API_URL} from "../config";
import AlertContainer from 'react-alert'
import ToggleDisplay from 'react-toggle-display';
import RaisedButton from 'material-ui/RaisedButton';


axios.interceptors.response.use(function (response) {
    if (response.data.message === 'no_user_found') {
        router.stateService.go('signUp');
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};
        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
        this.logout = this.logout.bind(this);
        this.goToMatches = this.goToMatches.bind(this);
    }
    componentWillMount() {
        let jwt = localStorage.getItem('tinder');
        if (jwt) {
            axios.get(API_URL + '/users', {headers: {'Authorization': jwt}}).then((response) => {
                this.props.addUserInfo(response.data);
                axios.get(API_URL + '/matches', {headers: {'Authorization': jwt}}).then((response) => {
                    let newMatches = [];
                    for (let i = 0; i < response.data.length; i++) {
                        let found = false;
                        for(let j = 0; j < this.props.matches.matches.length; j++) {
                            if (this.props.matches.matches[j].id === response.data[i].id) {
                                found = true;break;
                            }
                        }
                        if (!found) {
                            newMatches.push(response.data[i]);
                        }
                    }
                    this.props.addMatches(newMatches);
                    axios.get(API_URL + '/users/fetch', {headers: {Authorization: jwt}}).then((response) => {
                        this.setState({profiles: response.data});
                        this.setState({index: 0});
                        let profilePic = null;
                        let name = null;
                        if (this.state.profiles.length > 0) {
                            profilePic = this.state.profiles[0].avatar.url || '/default.jpg';
                            name = this.state.profiles[0].name;
                            this.setState({likes: [], dislikes: []});
                        }
                        this.setState({profilePic: profilePic, name: name, loading: false});
                    });
                });
            });
        }
        else {
            router.stateService.go('signUp');
        }
    }
    handleLike() {
        this.setState({likes: [...this.state.likes, this.state.profiles[this.state.index].id]}, () => {
            let newIndex = this.state.index + 1;
            if (newIndex >= this.state.profiles.length) {
                this.setState({loading: true});
                axios.post(API_URL + '/users/batch', {likes: this.state.likes, dislikes: this.state.dislikes}, {headers: {Authorization: localStorage.getItem('tinder')}}).then((response) => {
                    if (response.data.message === 'success') {
                        axios.get(API_URL + '/users/fetch', {headers: {Authorization: localStorage.getItem('tinder')}}).then((response) => {
                            this.setState({index: 0});
                            if (response.data.length > 0) {
                                this.setState({profiles: response.data}, () => {
                                    this.setState({profilePic: this.state.profiles[0].avatar.url || '/default.jpg',
                                        name: this.state.profiles[0].name, loading: false});
                                    this.setState({likes: [], dislikes: []});
                                });
                            }
                            else {
                                this.setState({profiles:  [], likes: [], dislikes: []});
                            }
                            this.setState({loading: false});
                        }).catch((error) => {
                            alert(error);
                        })
                    }
                    else {
                        alert(response.data);
                    }
                }).catch((error) => {
                    alert(error);
                });
            }
            else {
                this.setState({index: newIndex}, () => {
                    this.setState({profilePic: this.state.profiles[this.state.index].avatar.url || '/default.jpg',
                        name: this.state.profiles[this.state.index].name, loading: false});
                });
            }
        });
    }
    handleDislike() {
        this.setState({dislikes: [...this.state.dislikes, this.state.profiles[this.state.index].id]}, () => {
            let newIndex = this.state.index + 1;
            if (newIndex >= this.state.profiles.length) {
                this.setState({loading: true});
                axios.post(API_URL + '/users/batch', {likes: this.state.likes, dislikes: this.state.dislikes}, {headers: {Authorization: localStorage.getItem('tinder')}})
                    .then((response) => {
                    if (response.data.message === 'success') {
                        axios.get(API_URL + '/users/fetch', {headers: {Authorization: localStorage.getItem('tinder')}}).then((response) => {
                            this.setState({index: 0});
                            if (response.data.length > 0) {
                                this.setState({profiles: response.data}, () => {
                                    this.setState({
                                        profilePic: this.state.profiles[0].avatar.url || '/default.jpg',
                                        name: this.state.profiles[0].name, loading: false
                                    });
                                    this.setState({likes: [], dislikes: []});
                                });
                            }
                            else {
                                this.setState({profiles:  [], likes: [], dislikes: []});
                            }
                            this.setState({loading: false});
                        }).catch((error) => {
                            alert(error);
                        })
                    }
                    else {
                        alert(response.data);
                    }
                }).catch((error) => {
                    alert(error);
                });
            }
            else {
                this.setState({index: newIndex}, () => {
                    this.setState({profilePic: this.state.profiles[this.state.index].avatar.url || '/default.jpg',
                        name: this.state.profiles[this.state.index].name, loading: false});
                });
            }
        });
    }
    logout() {
        localStorage.removeItem('tinder');
        clearInterval(this.state.interval);
        router.stateService.go('signUp');
    }
    componentDidMount() {
        let interval = setInterval(()=>{
            this.pollMatches();
        },  10000);
        this.setState({interval: interval});
    }
    pollMatches() {
        let afterId = this.props.matches.matches.length > 0 ? this.props.matches.matches[this.props.matches.matches.length - 1].id : -1;
        axios.get(API_URL + 'matches/' + afterId,
            {headers: {Authorization: localStorage.getItem('tinder')}}).then((response) => {
            if (response.data.length > 0) {
                this.showAlert('You have new match');
                this.props.addMatches(response.data);
            }
        }).catch((error) => {
            alert(error);
        })
    }
    showAlert (msg) {
        this.msg.show(msg, {
            time: 2000,
            type: 'success'
        })
    }
    goToMatches() {
        clearInterval(this.state.interval);
        router.stateService.go('matches');
    }
    render() {
        const alertOptions = {
            offset: 14,
            position: 'bottom left',
            theme: 'dark',
            time: 15000,
            transition: 'scale'
        };

        return (
            this.state.loading ?
                <MuiThemeProvider>
                    <Loader />
                </MuiThemeProvider>
                :
                <MuiThemeProvider>
                    <div className="DashboardContainer">
                        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                        <Navbar>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="#">Friend Finder</a>
                                </Navbar.Brand>
                            </Navbar.Header>
                            <Nav>
                                <NavItem eventKey={1} onClick={this.goToMatches} >Matches</NavItem>
                                <NavDropdown eventKey={3} title="Options" id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.3}>Update Profile</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey={3.4} onClick={this.logout}>Logout</MenuItem>
                                </NavDropdown>
                            </Nav>
                        </Navbar>
                        <div className="profile">
                            <ToggleDisplay if={this.state.profiles.length > 0}>
                                <div className="text-center">
                                    <img src={this.state.profilePic} alt=""/>
                                    <p className="text-center">{this.state.name}</p>
                                </div>
                                <div className="text-center">
                                    <RaisedButton onClick={this.handleLike} label="Like" secondary={true}/>
                                    <RaisedButton onClick={this.handleDislike} label="DisLike" primary={true} />
                                </div>
                            </ToggleDisplay>
                            <ToggleDisplay if={this.state.profiles.length === 0}>
                                <p className="text-center">No profiles to show. Try again later.</p>
                            </ToggleDisplay>
                        </div>
                    </div>
                </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.userInfo,
        matches: state.matches

    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addUserInfo, addMatches}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);