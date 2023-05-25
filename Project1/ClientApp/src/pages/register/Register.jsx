import React from 'react';
import './../login/Login.scss';
import './Register.scss';
import Icon, { ArrowLeftOutlined, FontColorsOutlined, SendOutlined } from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authRegister } from '../../store/api-actions';

// warning block on register: only urfu email

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    const data = await dispatch(authRegister({ email, password }));
    if (data?.error) {
      // to do alert
    } else {
      // alert
      navigate('/login');
    }
  };

  const [password, setPassword] = React.useState();

  const handleChangePassword = (_, value) => {
    setPassword(value);
    return Promise.resolve();
  };

  const validatePasswordRepeat = (rule, value) =>
    value === password ? Promise.resolve() : Promise.reject(new Error('Пароли не совпадают'));

  return (
    <div className="login-container register-container">
      <Link to="/" className="a-back-button">
        <div className="back-button">
          <ArrowLeftOutlined />
          <p>На главную</p>
        </div>
      </Link>
      <div className="login-block">
        <Form name="login" onFinish={onSubmit}>
          <p className="login_title register-title">Регистрация</p>
          <div className="email-block">
            <p className="email-title">Email</p>
            <Alert
              message="Для подтверждения того, что вы обучаетесь в УРФУ, необходимо ввести корпоративную почту. Она должна заканчиваться на @urfu.me"
              type="warning"
              showIcon
              closable
              className="alert-urfu-email"
            />
            <Form.Item
              name="email"
              rules={[
                {
                  validator: (_, value) =>
                    value?.endsWith('@urfu.me')
                      ? Promise.resolve()
                      : Promise.reject(new Error('Укажите почту в формате @urfu.me')),
                },
              ]}
              className="form-item">
              <Input size="large" placeholder="Введите email" prefix={<UserOutlined />} />
            </Form.Item>
          </div>

          <div className="password-block">
            <p className="password-title">Пароль</p>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Укажите пароль' },
                { validator: handleChangePassword },
              ]}
              className="form-item">
              <Input.Password size="large" placeholder="Введите пароль" prefix={<LockOutlined />} />
            </Form.Item>
          </div>
          <div className="password-block password-block-repeat">
            <p className="password-title">Пароль еще раз</p>
            <Form.Item
              name="password-repeat"
              rules={[{ validator: validatePasswordRepeat }]}
              className="form-item">
              <Input.Password
                size="large"
                placeholder="Введите пароль еще раз"
                prefix={<LockOutlined />}
              />
            </Form.Item>
          </div>

          <button className="register-button">Зарегистрироваться</button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
