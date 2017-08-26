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
import Modal from 'react-modal';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';

class SignUpLogin extends Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.login = this.login.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.state = {user: {sex: 'M'}};
    }
    login() {
        this.setState({isModalOpen: true, message: 'LoggingIn ...', completed: 66});
        axios.post(API_URL + 'users/login', {email: this.state.user.email, password: this.state.user.password})
            .then((response) => {
                if(response.data.message === 'success') {
                    console.log(response.data);
                    this.setState({completed: 100, message: 'Redirecting to Dashboard'});
                    window.localStorage.setItem('tinder', response.data.token);
                    //TODO redirect to dashboard
                    //TODO store user info
                }
                else {
                    alert(response.data.message);
                    this.setState({isModalOpen: false});
                }
            }).catch((error) => {
                console.log(error);
                this.setState({isModalOpen: false});
            });
    }
    signUp(){
        this.setState({isModalOpen: true, message: 'SigningUp ...', completed: 0});
        axios.post(API_URL + 'users/', this.state.user).then((response) => {
            let user = response.data;
            if (user.message === 'success') {
                let data = new FormData();
                data.append('file', this.state.user.avatar);
                this.setState({message: 'Uploading Picture ...', completed: 33});
                axios.post(API_URL + `users/${user.id}/uploadavatar`, data, {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    }
                }).then((response) => {
                    if (response.data.message === 'success') {
                        this.login();
                    }
                    else {
                        alert('Profile Picture Upload error');
                        this.setState({isModalOpen: false});
                    }
                }).catch((error) => {
                    this.setState({isModalOpen: false});
                });
            }
            else {
                alert('Signup error ' + user.reason);
                this.setState({isModalOpen: false});
            }
        }).catch((error) => {
            alert(error);
            this.setState({isModalOpen: false});
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
                <div>
                    <Modal  isOpen={this.state.isModalOpen}
                            contentLabel="Progress"
                            className={{
                                base: 'modalBox',
                                afterOpen: 'modalBox_after-open',
                                beforeClose: 'modalBox_before-close'
                            }}>
                        <LinearProgress mode="determinate" value={this.state.completed} />
                        <div>
                            <CircularProgress />
                        </div>
                        <p>
                            {this.state.message}
                        </p>
                    </Modal>
                    <Grid>
                        <Row className="text-center">
                            <Col xs={9} md={6}>
                                <AppBar title={"SignUp"} showMenuIconButton={false}/>
                                <TextField className="width-100 text-left"
                                           floatingLabelText='Name'
                                           onChange={(event, newValue) => this.setState({'user': { ...this.state.user, name: newValue}})}
                                /><br />
                                <TextField className='width-100 text-left' floatingLabelText="Email"
                                           onChange={(event, newValue) => this.setState({'user': {...this.state.user, email: newValue}})}
                                /><br />
                                <TextField className='width-100 text-left'
                                           floatingLabelText='Age'
                                           onChange={(event, newValue) => this.setState({'user': {...this.state.user, age: newValue}})}
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
                                           onChange={(event, newValue) => this.setState({'user': {...this.state.user, password: newValue}})}
                                /><br />
                                <RadioGroup className='sign-up-form-field' onChange={(value) => this.setState({'user': {...this.state.user, sex: value}})}>
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
                                <TextField className='width-100 text-left' floatingLabelText="Email"
                                           onChange={(event, newValue) => this.setState({'user': {...this.state.user, email: newValue}})}
                                /><br />
                                <TextField className='width-100 text-left'
                                           hintText="Password Field"
                                           floatingLabelText="Password"
                                           type="password"
                                           onChange={(event, newValue) => this.setState({'user': {...this.state.user, password: newValue}})}
                                /><br />
                                <RaisedButton onClick={this.login} label="Login" primary={true} style={style} />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default SignUpLogin;