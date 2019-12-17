import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';
import AuthPage from './pages/AuthPage';
import About from './pages/About';
import Contacts from './pages/Contacts';
import ContactForm from './pages/ContactForm';
// import FourOhFour from './pages/FourOhFour';
import Reviews from './pages/Reviews';
import RingDescription from './pages/RingDescription';
import Rings from './pages/Rings';
import Test from './pages/Test';
import TestIntro from './pages/TestIntro';

export default [
  {
    ...App,
    path: '/',
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
      {
        ...AdminsListPage,
        path: '/admins',
        exact: true,
      },
      {
        ...UsersListPage,
        path: '/users',
        exact: true,
      },
      {
        ...AuthPage,
        path: '/log',
        exact: true,
      },
      {
        ...About,
        path: '/about',
        exact: true,
      },
      {
        ...Contacts,
        path: '/contacts',
        exact: true,
      },
      {
        ...ContactForm,
        path: '/contact_us',
        exact: true,
      },
      {
        ...Reviews,
        path: '/reviews',
        exact: true,
      },
      {
        ...Rings,
        path: '/rings',
        exact: true,
      },
      {
        ...RingDescription,
        path: '/ring/:id',
        exact: true,
      },
      {
        ...Test,
        path: '/test',
        exact: true,
      },
      {
        ...TestIntro,
        path: '/test_intro',
        exact: true,
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
