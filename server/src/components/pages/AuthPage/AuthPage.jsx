import React from 'react';
import { connect } from 'react-redux';
import { authFetchLogIn, authFetchRegister, authFormChange } from '../../../sagaStore/actions';
import './style.scss';
import googleIcon from '../../../assets/images/google-icon1.png';

const AuthPage = ({
  email,
  password,
  name,
  dispatchAuthFormChange,
  dispatchAuthFetchLogIn,
  dispatchAuthFetchRegister,
}) => {
  const onFieldChange = e => {
    dispatchAuthFormChange({
      name: e.target.name,
      value: e.target.value,
    });
  };

  const onLogin = e => {
    e.preventDefault();
    dispatchAuthFetchLogIn();
  };

  const onRegister = e => {
    e.preventDefault();
    dispatchAuthFetchRegister();
  };

  return (
    <section className="login-page">
      <div className="container">
        <div className="row">
          <div className="login_header col-12">
            <h1 className="title-login">Создать аккаунт:</h1>
          </div>
          <form onSubmit={e => e.preventDefault} className="login-form col-6 mx-auto">
            <div className="login-form__input col-6">
              <input
                type="text"
                name="name"
                value={name}
                placeholder="username"
                onChange={onFieldChange}
              />
            </div>

            <div className="login-form__input col-6">
              <input
                type="text"
                name="email"
                value={email}
                placeholder="email"
                onChange={onFieldChange}
              />
            </div>

            <div className="login-form__input col-6">
              <input
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={onFieldChange}
              />
            </div>

            <p className="login-form__description col-6 mx-auto px-0">
              пароль должен быть не менее 8 символов, содержать цифры и латинские буквы
            </p>

            <button
              type="submit"
              onClick={onLogin}
              className="login-form__button mx-auto my-5 d-block"
            >
              Login
            </button>
            <button
              type="submit"
              onClick={onRegister}
              className="login-form__button mx-auto my-5 d-block"
            >
              Register
            </button>

            <div className="login-form__google-veryfying d-flex col-6 mx-auto my-5 justify-content-around align-items-center ">
              <div className="mr-1">
                <a href="#">или быстрая регистрация с помощью Google</a>
              </div>
              <div>
                <a href="#">
                  <img className="" src={googleIcon} />
                </a>
              </div>
            </div>
            <div className="my-5">
              есть аккаунт?{' '}
              <a href="#" className="login-form__auth">
                войти
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    password: state.auth.form.password,
    email: state.auth.form.email,
    name: state.auth.form.name,
  };
}

const actionCreators = {
  dispatchAuthFetchLogIn: authFetchLogIn,
  dispatchAuthFetchRegister: authFetchRegister,
  dispatchAuthFormChange: authFormChange,
};

export default {
  component: connect(mapStateToProps, actionCreators)(AuthPage),
};
