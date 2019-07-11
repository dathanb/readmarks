import React from 'react';
import PropTypes from 'prop-types';

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

        const urlPromise = readmarksApi.getCurrentUrl();
        const readmarkPromise = readmarksApi.getContextReadmark()
            .catch(() => null);

        return Promise.all([urlPromise, readmarkPromise])
            .then(results => {
                return this.setState(() => ({
                    loading: false,
                    currentUrl: results[0],
                    readmark: results[1],
                }));
            });
    }

    render() {
        const { render: Children } = this.props;
        const {
            currentUrl,
            readmark,
            loading,
        } = this.state;

        return <Children loading={loading}
                         currentUrl={currentUrl}
                         readmark={readmark}
        />
    }
}

CurrentReadmark.propTypes = {
    readmarksApi: PropTypes.shape({
        getCurrentUrl: PropTypes.func,
        getContextReadmark: PropTypes.func,
    }),
};

export default CurrentReadmark;
