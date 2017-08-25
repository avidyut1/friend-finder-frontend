import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Row, Col} from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import '../styles/SignUpLogin.css';
import RaisedButton from 'material-ui/RaisedButton';
import FileInput from 'react-file-input';
import axios from 'axios';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import {API_URL} from "../config";

class SignUpLogin extends Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.state = {sex: 'M'};
    }
    signUp(){
        axios.post(API_URL + 'users/', this.state).then((response) => {
            let user = response.data;
            let data = new FormData();
            data.append('file', this.state.avatar);
            axios.post(API_URL + `users/${user.id}/uploadavatar`, data, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }).then(function (response){
                console.log(response);
            });
        }).catch(function (error){
            alert(error);
        });
    }
    handleFileChange(event) {
        this.setState({'avatar': event.target.files[0]})
    }
    render() {
        const style = {
            margin: 12,
        };
        return (
            <MuiThemeProvider>
                <Grid>
                    <Row className="text-center">
                        <Col xs={9} md={6}>
                            <AppBar title={"SignUp"} showMenuIconButton={false}/>
                            <TextField className="width-100 text-left"
                                floatingLabelText='Name'
                                onChange={(event, newValue) => this.setState({'name': newValue})}
                            /><br />
                            <TextField className='width-100 text-left' floatingLabelText="Email"
                                onChange={(event, newValue) => this.setState({'email': newValue})}
                            /><br />
                            <TextField className='width-100 text-left'
                                       floatingLabelText='Age'
                                       onChange={(event, newValue) => this.setState({'age': newValue})}
                            /><br />
                            <Row className='text-left sign-up-form-field'>
                                <Col xs={9} md={6}>
                                    <FileInput  name="avatar" accept=".png,.gif,.jpeg"
                                                placeholder="Profile Picture"
                                                onChange={this.handleFileChange} />
                                </Col>
                            </Row>
                            <TextField className='width-100 text-left'
                                hintText="Password Field"
                                floatingLabelText="Password"
                                type="password"
                                onChange={(event, newValue) => this.setState({'password': newValue})}
                            /><br />
                            <RadioGroup className='sign-up-form-field' onChange={(value) => this.setState({'sex': value})}>
                                <RadioButton value="M">
                                    Male
                                </RadioButton>
                                <RadioButton value="F">
                                    Female
                                </RadioButton>
                            </RadioGroup>
                            <p className="sign-up-form-info text-left sign-up-form-field">** All fields are required</p>
                            <RaisedButton onClick={this.signUp} label="SignUp" primary={true} style={style} />
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