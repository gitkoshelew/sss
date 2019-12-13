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
// import TestIntro from './pages/TestIntro';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
      {
        ...AdminsListPage,
        path: '/admins',
      },
      {
        ...UsersListPage,
        path: '/users',
      },
      {
        ...AuthPage,
        path: '/log',
      },
      {
        ...About,
        path: '/about',
      },
      {
        ...Contacts,
        path: '/contacts',
      },
      {
        ...ContactForm,
        path: '/contact_us',
      },
      {
        ...Reviews,
        path: '/reviews',
      },
      {
        ...Rings,
        path: '/rings',
      },
      {
        ...RingDescription,
        path: '/ringdescription/:id',
      },
      {
        ...Test,
        path: '/test',
      },
      // {
      //   ...TestIntro,
      //   path: '/test_intro',
      // },
      {
        path: '/',
        ...NotFoundPage,
      },
    ],
  },
];
