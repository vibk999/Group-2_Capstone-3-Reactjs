// import React from "react";
// import { Route } from "react-router";
// import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
// const createRoute = (condition) => {
//   return ({ path, component: RouteComponent, redirectPath, ...rest }) => {
//     return (
//       <Route
//         path={path}
//         {...rest}
//         render={(routeProps) =>
//           condition() ? (
//             <RouteComponent {...routeProps} />
//           ) : (
//             <Redirect to={redirectPath} />
//           )
//         }
//       />
//     );
//   };
// };

// export const AuthRoute = createRoute(
//   () => !localStorage.getItem("tokenSignIn")
// );
// export const PrivateRoute = createRoute(() =>
//   localStorage.getItem("tokenSignIn")
// );
// export const NormalRoute = createRoute(() =>
//   localStorage.getItem("tokenSignIn")
// );
