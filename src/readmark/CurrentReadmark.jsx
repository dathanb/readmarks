import React from 'react';
import { Readmark } from './types';

/**
 * Fetches the current URL and the readmark for the corresponding context, and passes them through to a child component.
 */
class CurrentReadmark extends React.Component {
    constructor(props) {
        super(props)

        this.state = { loading: true };
    }

    componentDidMount() {
        new Promise(resolve => setTimeout(resolve, 5000)).
            then(() => this.setState({loading: false}));
    }

    render() {
        const { render: Children } = this.props;

        return <Children loading={this.state.loading }
                         currentUrl={"https://www.example.com"}
                         readmark={new Readmark("https://www.example.com")}
        />
    }
}

export default CurrentReadmark;
