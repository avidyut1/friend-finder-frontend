import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Loader from './Loader';
import '../styles/Home.css';
import router from '../Router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addUserInfo} from "../actions/userInfo"

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
const mapStateToProps = (state) => {
    return {
        user: state.user.userInfo

    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addUserInfo}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);