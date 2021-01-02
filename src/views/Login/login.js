import React, { useState } from "react";
import { Col, CardImg, Fade } from "shards-react";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import { PUBLIC_API } from '../../utils/API';
import "./login.css";


export default function LoginPage (props) {
  const {history} = props;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, setState] = React.useState({
    visible: false,
    time: false,
    error: false,
    url: PUBLIC_API
  });

  setTimeout(() => {
    setState({
      ...state,
      time: true,
      visible: true
    })
  }, 2000)

  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      let payload = {
        username,
        password,
        email
      }
      let dataToken = await axios.post(`${state.url}/api/v1/auth/login`, payload);
      if (dataToken) {
        await localStorage.setItem("token", JSON.stringify(dataToken.data));
        Swal.fire(
          'Success Login!',
          `Selamat datang di dashboard wirio ${payload.username} !`,
          'success'
        )
        history.push("/dashboard")
        setState({
          ...state,
          loading: false
        })
      }
    } catch (e) {
      setLoading(false)
      Swal.fire(
        'Error Login!',
        `${e.message}`,
        'error'
      )
    }
  ;}

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className="main">
      <div className="blogin">
        <Fade in={state.visible}>Selamat Datang di Aplikasi Wiriosoe v.1</Fade>
      </div>
      <div className="containerLogin">
        <Col md={6}>
          <CardImg top src={require("../../assets/img/wirio.png")} className="imgLogin" />
          <h5>Login</h5>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" className="input" onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              type="password"
              placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="btnLogin" block loading={loading}>
                <span>Masuk</span>
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </div>
    </section>
  )
}