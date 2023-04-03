import React from 'react';
import { Navigate , Route } from 'react-router-dom';


const PrivateRoutes = ({ component: Component, ...rest  }) => {  
    const isAuthenticated = true;

    return (
        <Route
          {...rest}
          render={({ location }) =>
            isAuthenticated ? (
              <Component />
            ) : (
              <Navigate to={{ pathname: '/signin', state: { from: location } }} />
            )
          }
        />
      );
};


export default PrivateRoutes;