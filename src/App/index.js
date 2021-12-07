import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import '../assets/scss/style.scss'
import { dataUser } from '../helpers/common';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});
const role=localStorage.getItem('role')
// console.log(role)
class App extends Component {
    render() {
        const menu = routes.map((route, index) => {
          return (route.component) ? (
              <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                      <route.component {...props} />
                  )} />
          ) : (null);
        });

        return (
            <Aux>
                <ScrollToTop>
                 
                    <Suspense fallback={<Loader/>}>
                        <Switch>
                            {menu}
                            {localStorage.getItem('role')==1 &&<Route path="/" component={AdminLayout} />}
                            <Redirect to="/auth/signin" />
                        </Switch>
                      
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
}

export default App;
