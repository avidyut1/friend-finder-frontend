import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Loader from './Loader';
import '../styles/Home.css';
import router from '../Router';
import axios from 'axios';
import {API_URL} from '../config';

class Home extends Component {
    componentDidMount() {
        const jwtToken = window.localStorage.getItem('tinder');
        if (jwtToken) {
            //fetching user from server
            axios.get(API_URL + 'user', {headers: {'Authorization': jwtToken}}).then((response) => {
                //TODO set user
                router.stateService.go('dashboard');
            }).catch((error) => {
                router.stateService.go('signUp');
            });
        }
        else {
            router.stateService.go('signUp');
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <div className="HomeContainer">
                    <Loader/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Home;