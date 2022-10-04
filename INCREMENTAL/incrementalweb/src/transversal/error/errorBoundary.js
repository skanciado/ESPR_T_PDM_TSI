import React from "react";
import ErrorPage from "./errorPage";
import {errorMessage} from "./errorController";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
    this.state = {error: undefined, errorInfo: undefined, hasError: false};
  }
  /* static getDerivedStateFromError(error) {
        // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
        return { hasError: true };
    } */
  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    errorMessage("ErrorBoundary", error + " errorInfo: " + JSON.stringify(errorInfo));
    this.setState({
      error: error,
      errorInfo: errorInfo,
      hasError: true,
    });
  }
  render() {
    if (this.state.hasError === true) {
      //return <h2>{this.state.error?.message}</h2>
      // Render error message or component
      return <ErrorPage error={this.state.error?.message} errorInfo={this.state.errorInfo} />;
    }
    return this.props.children;
  }
}
