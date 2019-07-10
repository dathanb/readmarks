import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { ReadmarkComponent, CurrentReadmark, Readmark } from './readmark';

/**
 * The main App.
 * It is required to inject a ReadmarksApi into the props.
 */
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { readmarksApi } = this.props;

        return (
            <div className="App">
                <CurrentReadmark
                    readmarksApi={readmarksApi}
                    render={ReadmarkComponent}
                />
            </div>
        );
    }
}

App.propTypes = {
    readmarksApi: PropTypes.object.isRequired,
};

export default App;
