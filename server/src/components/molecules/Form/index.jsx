import React, { Component } from 'react';
import './style.scss';
import Button from '../../atoms/Button';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      img: '',
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form className="consultant-form" onSubmit={this.onSubmitHandler}>
              <input
                onChange={this.onChangeHandler}
                type="text"
                name="name"
                value={this.state.name}
                className="form__input"
              />
              <input
                onChange={this.onChangeHandler}
                type="email"
                name="email"
                value={this.state.email}
                className="form__input"
              />
              <Button section="form" text="Send" clickHandler={this.sendData} />
            </form>

            {this.state.img && <img src={this.state.img} alt={this.state.name} />}

            <p>
              {' '}
              Name:{this.state.name}, Email: {this.state.email}{' '}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // onChangeNameHandler = (e) => {
  //     this.setState({
  //         name: e.target.value
  //     })
  // }

  // onChangeEmailHandler = (e) => {
  //     this.setState({
  //         email: e.target.value
  //     })
  // }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    console.log(this.state.name, this.state.email);
  };

  // sendData = () => {
  //     fetch('https://api.myjson.com/bins/yib9b')
  //     .then(data => data.json())
  //     .then(data => this.setState({
  //         ...data
  //     }))
  // }

  sendData = () => {
    fetch('https://api.github.com/users/' + this.state.name)
      .then(data => data.json())
      .then(data => {
        if (!data.avatar_url) {
          throw new Error('No user');
        }
        this.setState({
          img: data.avatar_url,
        });
      })
      .catch(e => alert(e));
  };
}

export default Form;
