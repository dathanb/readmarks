import React from 'react';
import PropTypes from 'prop-types';
import { Readmark } from './types';

/**
 * Fetches the current URL and the readmark for the corresponding context, and passes them through to a child component.
 */
class CurrentReadmark extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loading: true };
    }

    componentDidMount() {
        const { readmarksApi } = this.props;

        const urlPromise = readmarksApi.getCurrentUrl()
            .then(url => this.setState({currentUrl: url}));
        const readmarkPromise = readmarksApi.getReadmarkForCurrentContext()
            .then(readmark => this.setState({readmark}));

        return Promise.all([urlPromise, readmarkPromise]);
    }

    render() {
        const {
            render: Children,
            currentUrl,
            readmark,
        } = this.props;

        return <Children loading={this.state.loading }
                         currentUrl={currentUrl}
                         readmark={readmark}
        />
    }
}

CurrentReadmark.propTypes = {
    readmarksApi: PropTypes.shape({
        getCurrentUrl: PropTypes.func,
        getReadmarkForCurrentContext: PropTypes.func,
    }),
};

export default CurrentReadmark;
