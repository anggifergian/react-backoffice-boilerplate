import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import { privateRoutes, publicRoutes } from './routes';
import { RootRoute } from './utils/RootRoute';

function App() {
  const App = useSelector(state => state.App);

  const renderRouter = (route) => {
    if (route.submenu) {
      return route.submenu.map(subroute => renderRouter(subroute));
    }
  
    return (
      <Route
        key={route.key}
        path={route.path}
        element={route.element}
      />
    )
  }

  return (
    <Routes>
      <Route element={(
        <RootRoute isLoggedIn={App.isLoggedIn} />
      )}>
        {publicRoutes.map(route => renderRouter(route))}
      </Route>
      <Route element={(
        <RootRoute 
          isProtected 
          isLoggedIn={App.isLoggedIn} 
        />
      )}>
        {privateRoutes.map(route => renderRouter(route))}
      </Route>
    </Routes>
  );
}

export default App;
