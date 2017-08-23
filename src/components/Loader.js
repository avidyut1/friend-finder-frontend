import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import '../styles/Loader.css';

class Loader extends Component {
    render() {
        return (
            <div className="LoaderContainer">
                <CircularProgress size={80} thickness={5} />
            </div>
        )
    }
}
export default Loader;