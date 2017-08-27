import React, {Component} from 'react';
import '../styles/Dashboard.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addUserInfo} from '../actions/userInfo';
import {Navbar, Nav, MenuItem, NavDropdown, NavItem} from 'react-bootstrap';
import axios from 'axios';
import Loader from "./Loader";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import router from '../Router';
import {API_URL} from "../config";

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
                    this.setState({loading: false});
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
    render() {
        return (
            this.state.loading ?
                <MuiThemeProvider>
                    <Loader />
                </MuiThemeProvider>
                :
                <div className="DashboardContainer">
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
        user: state.user.userInfo

    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addUserInfo}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);