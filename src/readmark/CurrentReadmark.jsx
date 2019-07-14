import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getContextReadmarkFromState,
    getContextReadmarkResolutionStatusFromState,
    getCurrentUrlFromState,
} from '../readmarksApi';

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

        return readmarksApi.getCurrentUrl()
            .then(() => readmarksApi.getContextReadmark())
            .catch(() => null);
    }

    render() {
        const {
            render: Children,
            contextReadmark,
            loading,
            currentUrl,
        } = this.props;

        return <Children loading={loading}
                         currentUrl={currentUrl}
                         readmark={contextReadmark}
        />
    }
}

CurrentReadmark.propTypes = {
    readmarksApi: PropTypes.shape({
        getCurrentUrl: PropTypes.func,
        getContextReadmark: PropTypes.func,
    }),
};

function mapStateToProps(state) {
    return {
        contextReadmark: getContextReadmarkFromState(state),
        currentUrl: getCurrentUrlFromState(state),
        loading: getContextReadmarkResolutionStatusFromState(state) === "UNRESOLVED",
    };
}

export default connect(mapStateToProps)(CurrentReadmark);
