import React from "react";
export default class ErrorPage extends React.Component {
  render() {
    return (
      <>
        <div>
          <h1>ErrorPage</h1>
          <p>Error: {this.props.error}</p>
          <p>ErrorInfo: {JSON.stringify(this.props.errorInfo)}</p>
        </div>
      </>
    );
  }
}
