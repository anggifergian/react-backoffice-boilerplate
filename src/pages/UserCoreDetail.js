import React from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../layout/BaseLayout';

const UserCoreDetail = () => {
  const { id } = useParams();

  return (
    <Layout>
        <h1>UserCoreDetail {id}</h1>
    </Layout>
  )
}

export default UserCoreDetail