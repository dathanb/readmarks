import React from 'react';
import { Readmark } from './types';

class CurrentReadmark extends React.Component {
    render() {
        const { render: Children } = this.props;

        return <Children currentUrl={"https://www.example.com"}
                         readmark={new Readmark("https://www.example.com")}
        />
    }
}

export default CurrentReadmark;
