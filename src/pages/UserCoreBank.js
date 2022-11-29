import React from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../layout/BaseLayout';

const UserCoreBank = () => {
  const { id } = useParams();

  return (
    <Layout>
        <h1>UserCoreBank {id}</h1>
    </Layout>
  )
}

export default UserCoreBank