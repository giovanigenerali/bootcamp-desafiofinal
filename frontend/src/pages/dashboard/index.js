import React, { Fragment } from 'react';

import { Container } from './styles';

import Navbar from '../../components/Navbar';

function Dashboard() {
  return (
    <Fragment>
      <Navbar />
      <Container>
        <div>Dashboard</div>
      </Container>
    </Fragment>
  );
}

export default Dashboard;
