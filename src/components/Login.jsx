import React from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Layout } from 'antd';
import PropTypes from 'prop-types';

import { auth } from '../services/auth.service';

import LoginForm from './LoginForm';

const { Content } = Layout;

function Login(props) {
  const { location, history } = props;
  const { from } = location.state || { from: { pathname: '/' } };

  console.log(auth().uid);

  if (auth().uid) {
    return <Redirect to={from} />;
  }

  return (
    <Content style={{ minHeight: '92vh' }}>
      <Row type="flex" justify="center" align="middle">
        <Col lg={6} md={8} sm={12}>
          {auth().uid}
          <LoginForm history={history} />
        </Col>
      </Row>
    </Content>
  );
}

Login.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default Login;
