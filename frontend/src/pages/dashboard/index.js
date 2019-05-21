import React from 'react';

import { Container } from './styles';

import Navbar from '../../components/Navbar';

function Dashboard() {
  return (
    <>
      <Navbar />
      <Container>
        <div>Dashboard</div>
      </Container>
    </>
  );
}

export default Dashboard;
