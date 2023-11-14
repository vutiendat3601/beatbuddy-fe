import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './components/global-style/GlobalStyle';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/main-layout/MainLayout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
  {
    element: (
      <MainLayout>
        <p>Lorem ipsum dolor sit amet.</p>
      </MainLayout>
    ),
    path: '/',
  },
]);
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <RouterProvider router={router} />
    </GlobalStyle>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
