import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getCurrentContextReadmarkFromState,
    getCurrentContextReadmarkStatusFromState,
    getCurrentUrlFromState,
} from './reducer';
import {
    getCurrentUrlComplete,
    getCurrentContextReadmarkComplete
} from './actions';

/**
 * Fetches the current URL and the readmark for the corresponding context, and passes them through to a child component.
 */
class CurrentReadmark extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { readmarksApi, dispatch } = this.props;

        return readmarksApi.getCurrentUrl()
            .then(url => {
                dispatch(getCurrentUrlComplete(url));
                return readmarksApi.getCurrentContextReadmark();
            })
            .then(readmark => {
                dispatch(getCurrentContextReadmarkComplete(readmark));
            });
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
        getCurrentContextReadmark: PropTypes.func,
    }),
};

function mapStateToProps(state) {
    return {
        contextReadmark: getCurrentContextReadmarkFromState(state),
        currentUrl: getCurrentUrlFromState(state),
        loading: getCurrentContextReadmarkStatusFromState(state) === "UNRESOLVED",
    };
}

export default connect(mapStateToProps)(CurrentReadmark);
