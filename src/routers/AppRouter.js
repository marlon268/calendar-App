import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { Loading } from '../components/ui/Loading';
import { startChecking } from '../redux/actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
   const dispatch = useDispatch();
   const { checking, uid } = useSelector((state) => state.auth);

   useEffect(() => {
      setTimeout(() => {
         dispatch(startChecking());
      }, 1000);
   }, [dispatch]);

   if (checking) {
      return (
         <div className="loading-pacman">
            <Loading />
         </div>
      );
   }

   return (
      <Router>
         <div>
            <Switch>
               <PublicRoute
                  exact
                  path="/auth/login"
                  component={LoginScreen}
                  isAuthenticated={!!uid}
               />
               <PrivateRoute
                  exact
                  path="/"
                  component={CalendarScreen}
                  isAuthenticated={!!uid}
               />

               <Redirect to="/auth/login" />
            </Switch>
         </div>
      </Router>
   );
};
