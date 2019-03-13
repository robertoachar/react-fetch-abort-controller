import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
      data: null,
      error: null
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.handleAbort = this.handleAbort.bind(this);
  }

  handleFetch() {
    this.controller = new AbortController();
    this.signal = this.controller.signal;

    this.setState({ status: 'loading...' });

    fetch('https://swapi.co/api/people/1', { signal: this.signal })
      .then((response) => response.json())
      .then((data) => this.setState({ status: 'loaded', error: null, data }))
      .catch((error) => this.setState({ error: error.name }));
  }

  handleAbort() {
    this.controller.abort();
    this.setState({ status: 'aborted' });
  }

  render() {
    const { data, status, error } = this.state;

    return (
      <div>
        <h1>React + fetch + Abort Controller</h1>

        <button type="button" onClick={this.handleFetch}>
          Fetch data
        </button>
        <button type="button" onClick={this.handleAbort}>
          Abort
        </button>

        <p>{`Status: ${status}`}</p>
        <p>{`Error: ${error}`}</p>

        <p>Data</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
