import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '../../../store/ducks/auth';

import { ReactComponent as Logo } from '../../../assets/logo.svg';
import Button from '../../../styles/components/Button';
import { Container, SignForm } from '../styles';

class Signin extends Component {
  static propTypes = {
    signInRequest: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const { signInRequest } = this.props;

    signInRequest(email, password);
  };

  render() {
    const { email, password } = this.state;

    return (
      <Container>
        <Logo />

        <SignForm onSubmit={this.handleSubmit}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            autoComplete="email"
            required
            value={email}
            onChange={this.handleInputChange}
          />

          <span>Senha</span>
          <input
            type="password"
            name="password"
            placeholder="Suga senha secreta"
            autoComplete="new-password"
            required
            value={password}
            onChange={this.handleInputChange}
          />

          <Button type="submit">Entrar</Button>
        </SignForm>

        <Link to="/signup">Criar conta grátis</Link>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Signin);
