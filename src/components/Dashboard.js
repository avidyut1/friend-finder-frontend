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

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};
    }
    componentWillMount() {
        let jwt = localStorage.getItem('tinder');
        if (jwt) {
            if (!(this.props.user && this.props.user.name)) {
                axios.get(API_URL + '/users', {headers: {'Authorization': jwt}}).then((response) => {
                    this.props.addUserInfo(response.data);
                    axios.get(API_URL + '/matches', {headers: {'Authorization': jwt}}).then((response) => {
                        this.props.addMatches(response.data);
                        this.setState({loading: false});
                        console.log(response.data);
                    });
                });
            }
            else {
                this.setState({loading: false});
            }
        }
        else {
            router.stateService.go('signUp');
        }
    }
    componentDidMount() {
        setInterval(()=>{
            this.pollMatches();
        }, 1000);
    }
    pollMatches() {
        axios.get(API_URL + 'matches/' + this.props.matches.matches[this.props.matches.matches.length - 1].id,
            {headers: {Authorization: localStorage.getItem('tinder')}}).then((response) => {
            if (response.data.length > 0) {
                this.showAlert('You have new match');
                this.props.addMatches(response.data);
            }
            console.log(this.props.matches);
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
    render() {
        const alertOptions = {
            offset: 14,
            position: 'bottom left',
            theme: 'dark',
            time: 5000,
            transition: 'scale'
        }

        return (
            this.state.loading ?
                <MuiThemeProvider>
                    <Loader />
                </MuiThemeProvider>
                :
                <div className="DashboardContainer">
                    <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">Friend Finder</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav>
                            <NavItem eventKey={1} href="#">Matches</NavItem>
                            <NavDropdown eventKey={3} title="Options" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.3}>Update Profile</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.4}>Logout</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar>
                    {this.props.user.name}
                </div>
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