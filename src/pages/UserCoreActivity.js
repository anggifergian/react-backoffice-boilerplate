import React from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../layout/BaseLayout';

const UserCoreActivity = () => {
  const { id } = useParams();

  return (
    <Layout>
      <h1>UserCoreActivity {id}</h1>
    </Layout>
  )
}

export default UserCoreActivity