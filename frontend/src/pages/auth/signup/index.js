import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../../assets/logo.svg';
import Button from '../../../styles/components/Button';
import { Container, SignForm } from '../styles';

function Signup() {
  return (
    <Container>
      <Logo />

      <SignForm onSubmit={() => {}}>
        <span>Email</span>
        <input type="email" name="email" placeholder="Digite seu e-mail" autoComplete="email" />

        <span>Senha</span>
        <input
          type="password"
          name="password"
          placeholder="Suga senha secreta"
          autoComplete="new-password"
        />

        <Button type="submit">Entrar</Button>
      </SignForm>

      <Link to="/signup">Criar conta grátis</Link>
    </Container>
  );
}

export default Signup;
