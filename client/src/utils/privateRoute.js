import React from "react";
import { Route, Redirect } from "react-router-dom";

// export const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         localStorage.getItem('token')
//         ? (
//           <Component {...props} />)
//         : (
//           <Redirect to='/' />
//         )
//       }
//     />
//   );
// };


export function PrivateRoute(props) {
  const { children, ...rest  } = props
  return (
      <Route {...rest} render={() => {
         return ( localStorage.getItem('token') ? (
              children ) :
              <Redirect to ='/' />
         )
      }} />
  )
}