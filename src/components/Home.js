import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Loader from './Loader';
import '../styles/Home.css';
import router from '../Router';

class Home extends Component {
    componentDidMount() {
        const jwtToken = window.localStorage.getItem('tinder');
        if (jwtToken) {
            router.stateService.go('dashboard');
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