import React from "react";
import { connect } from "react-redux";
import SearchPage from "../components/SearchPage.js";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    !isAuthenticated ? (
      <div>
        <SearchPage />
      </div>
      ) : 
    (
      <Redirect to="/dashboard" />
      )
    )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);