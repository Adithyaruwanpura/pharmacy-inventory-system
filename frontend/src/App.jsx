import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Medicines from './pages/Medicines';
import Suppliers from './pages/Suppliers';
import Purchases from './pages/Purchases';
import Sales from './pages/Sales';
import Alerts from './pages/Alerts';

import MainLayout from './layouts/MainLayout';

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD LAYOUT */}
        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/medicines"
            element={<Medicines />}
          />

          <Route
            path="/suppliers"
            element={<Suppliers />}
          />

          <Route
            path="/purchases"
            element={<Purchases />}
          />

          <Route
            path="/sales"
            element={<Sales />}
          />

          <Route
            path="/alerts"
            element={<Alerts />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;