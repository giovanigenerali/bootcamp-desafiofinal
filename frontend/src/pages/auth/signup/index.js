import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '../../../store/ducks/auth';

import Logo from '../../../styles/components/Logo';
import Form from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';
import Input from '../../../styles/components/Input';
import { Container } from '../styles';

class Signup extends Component {
  static propTypes = {
    signUpRequest: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    email: '',
    password: '',
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, password } = this.state;
    const { signUpRequest } = this.props;

    signUpRequest(name, email, password);
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <Container>
        <Logo type="default" alt="Logo Meetapp" />

        <Form onSubmit={this.handleSubmit}>
          <span>Nome</span>
          <Input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            autoComplete="name"
            required
            value={name}
            onChange={this.handleInputChange}
          />

          <span>Email</span>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            autoComplete="email"
            required
            value={email}
            onChange={this.handleInputChange}
          />

          <span>Senha</span>
          <Input
            type="password"
            name="password"
            placeholder="Sua senha secreta"
            autoComplete="new-password"
            required
            value={password}
            onChange={this.handleInputChange}
          />

          <Button type="submit">Criar conta</Button>
        </Form>

        <Link to="/signin">Já tenho conta</Link>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Signup);
