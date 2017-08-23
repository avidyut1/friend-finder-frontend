import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Row, Col} from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';

class SignUpLogin extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Grid>
                    <Row className="text-center">
                        <Col xs={9} md={6}>
                            <AppBar title={"SignUp"} showMenuIconButton={false}/>
                        </Col>
                        <Col xs={9} md={6}>
                            <AppBar title={"Login"} showMenuIconButton={false}/>
                        </Col>
                    </Row>
                </Grid>
            </MuiThemeProvider>
        );
    }
}

export default SignUpLogin;