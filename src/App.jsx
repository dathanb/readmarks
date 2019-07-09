import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ReadmarkComponent, CurrentReadmark, Readmark } from './readmark';

const Hello = ({ name }) => {
    return <div>{`hello from ${name}`}</div>;
};

const Foo = ({ render: View }) => {
    return <View name="foo" />;
};

class App extends React.Component {
  render() {
      return (
          <div className="App">
              <Foo render={Hello} />
              <CurrentReadmark render={ReadmarkComponent} />
              <header className="App-header">
                  TODO:
                  <ul>
                      <li>Load the current readmark</li>
                      <li>Display it</li>
                  </ul>
                  <Foo render={Hello} />
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                      Edit <code>src/App.js</code> and save to reload.
                  </p>
                  <p>No readmark</p>
                  <ReadmarkComponent
                      readmark={null}
                      currentUrl={'http://www.example.com'}
                    />
                  <p>Mismatched readmark</p>
                  <ReadmarkComponent
                      readmark={new Readmark("http://www.example.com/1")}
                      currentUrl={"http://www.example.com/2"}
                      />
                  <p>Matched readmark</p>
                  <ReadmarkComponent
                      readmark={new Readmark("http://www.example.com/1")}
                      currentUrl={"http://www.example.com/1"}
                  />
              </header>
          </div>
      );
  }
}

export default App;
