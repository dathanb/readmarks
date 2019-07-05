import React from "react";
import PropTypes from 'prop-types';
import './Readmark.css';

class ReadmarkComponent extends React.Component {
    render() {
        const {
            readmark,
            currentUrl
        } = this.props;
        const hasReadmark = typeof(readmark) !== 'undefined' && readmark !== null;
        const url = hasReadmark ? readmark.url : null;

        let classNames = [];


        if (!hasReadmark) {
            classNames += 'missing';
        } else if (hasReadmark && currentUrl !== url) {
            classNames += 'mismatched';
        } else {
            classNames += 'matched';
        }

        return <p className={classNames}>{currentUrl}</p>;
    }
}

ReadmarkComponent.propTypes = {
    readmark: PropTypes.shape({url: PropTypes.string}),
    currentUrl: PropTypes.string.isRequired,
};

export {
    ReadmarkComponent,
};

