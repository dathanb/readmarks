import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ReadmarkComponent, Readmark } from './readmark';

class App extends React.Component {
  render() {
      return (
          <div className="App">

              <header className="App-header">
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
                  <a
                      className="App-link"
                      href="https://reactjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      Learn React
                  </a>
              </header>
          </div>
      );
  }
}

export default App;
