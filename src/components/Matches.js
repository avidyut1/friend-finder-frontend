import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMatches} from '../actions/matches';
import {Navbar, Nav, MenuItem, NavDropdown, NavItem} from 'react-bootstrap';
import Profile from './Profile';
import {API_URL} from "../config";
import axios from 'axios';
import router from '../Router';

class Matches extends Component {
    constructor(props){
        super(props);
        this.goToDashboard = this.goToDashboard.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentWillMount() {
        if (this.props.matches.matches.length === 0) {
            axios.get(API_URL + '/matches', {headers: {Authorization: localStorage.getItem('tinder')}})
                .then((response) => {
                    this.props.addMatches(response.data);
                }).catch((error) => {
                    alert(error);
                })
        }
    }
    logout() {
        localStorage.removeItem('tinder');
        router.stateService.go('signUp');
    }
    goToDashboard() {
        router.stateService.go('dashboard');
    }
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#" onClick={this.goToDashboard}>Friend Finder</a>
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
                <div className="text-center profile">
                    {this.props.matches.matches.map((match, index) => {
                        return <Profile key={index} match={match}/>
                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        matches: state.matches

    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addMatches}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
