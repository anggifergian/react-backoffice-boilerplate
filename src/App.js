import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import Login from './pages/Login';

import { privateRoutes } from './routes';

function App() {
  return (
    <Routes>
      <Route path='/*' element={<Navigate replace to='/login' />} />
      <Route path='/login' element={<Login />} />
      {privateRoutes.map(route1 => (
        route1.submenu ? (
          route1.submenu.map(route2 => (
            route2.submenu ? (
              route2.submenu.map(route3 => (
                <Route
                  key={route3.key}
                  path={route3.path}
                  element={route3.element}
                />
              ))
            ) : (
              <Route
                key={route2.key}
                path={route2.path}
                element={route2.element}
              />
            )
          ))
        ) : (
          <Route
            key={route1.key}
            path={route1.path}
            element={route1.element}
          />
        )
      ))}
    </Routes>
  );
}

export default App;
