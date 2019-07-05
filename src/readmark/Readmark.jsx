import React from "react";
import PropTypes from 'prop-types';

class ReadmarkComponent extends React.Component {
    render() {
        const {
            readmark,
            currentUrl
        } = this.props;
        const hasReadmark = typeof(readmark) !== 'undefined' && readmark !== null;
        const url = hasReadmark ? readmark.url : null;

        let style;

        if (!hasReadmark) {
            style = {
                background: 'red'
            }
        } else if (hasReadmark && currentUrl !== url) {
            style = {
                background: 'yellow'
            }
        } else {
            style = {
                background: 'green'
            }
        }

        return <p style={style}>{currentUrl}</p>;
    }
}

ReadmarkComponent.propTypes = {
    readmark: PropTypes.shape({url: PropTypes.string}),
    currentUrl: PropTypes.string.isRequired,
};

export {
    ReadmarkComponent,
};

