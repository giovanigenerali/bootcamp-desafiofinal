import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../styles/components/Logo';
import Form from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';
import Input from '../../../styles/components/Input';
import { Container } from '../styles';

function Signup() {
  return (
    <Container>
      <Logo type="default" alt="Logo Meetapp" />

      <Form onSubmit={() => {}}>
        <span>Email</span>
        <Input type="email" name="email" placeholder="Digite seu e-mail" autoComplete="email" />

        <span>Senha</span>
        <Input
          type="password"
          name="password"
          placeholder="Suga senha secreta"
          autoComplete="new-password"
        />

        <Button type="submit">Entrar</Button>
      </Form>

      <Link to="/signup">Criar conta grátis</Link>
    </Container>
  );
}

export default Signup;
