import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SignUp extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <p>Hi from signup</p>
            </MuiThemeProvider>
        );
    }
}

export default SignUp;