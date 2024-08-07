import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import FormPersonalInfo from './components/FormPersonalInfo';
import FormAddressWork from './components/FormAddressWork';
import FormLoanDetails from './components/FormLoanDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routePaths } from './router/routes';
import { Navigate } from 'react-router-dom';
import FormForLoan from './components/FormForLoan';

// Route file for all navigation

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App wrapper that contains project wide wrappers */}
        <Route path="/" element={<App />}> 
          {/* Make sure we're always landing on PERSONAL INFO route */}
          <Route path={"/"} element={<Navigate to={routePaths.PERSONAL_INFO} />} />
          {/* Rendering the Form and it's children. The form wrapper is necessary to separate from the rest of the app and to add the "form" block */}
          <Route path="/" element={<FormForLoan />}>
            <Route path={routePaths.PERSONAL_INFO} element={<FormPersonalInfo />} />
            <Route path={routePaths.ADDRESS_WORK} element={<FormAddressWork />} />
            <Route path={routePaths.LOAN_DETAILS} element={<FormLoanDetails />} />
          </Route>
        </Route>
        {/* Make sure all routes other the valid ones lead to the form */}
        <Route path="*" element={<Navigate to={routePaths.PERSONAL_INFO} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);