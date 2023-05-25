import React from 'react';
import './sign_up_modal_window.scss';
import ModalWindow from '../ModalWindow';
import { useForm } from 'react-hook-form';

const SignUpModalWindow = ({ onClose }) => {
  const [isSignInTab, setIsSignInTab] = React.useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const setIsSignInTabTrue = () => {
    if (!isSignInTab) reset();
    setIsSignInTab(true);
  };

  const setIsSignInTabFalse = () => {
    if (isSignInTab) reset();
    setIsSignInTab(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <ModalWindow onClose={onClose}>
      <div className="sign_up_modal_window">
        <div alt="close" onClick={onClose} className="close_window"></div>
        <div className="sign_up_header">
          <div
            className={`sign_in ${isSignInTab ? 'active_tab' : ''}`}
            onClick={setIsSignInTabTrue}>
            Вход
          </div>
          <div
            className={`registr ${isSignInTab ? '' : 'active_tab'}`}
            onClick={setIsSignInTabFalse}>
            Регистрация
          </div>
        </div>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <div className="email">
              <p>Почта:</p>
              <input type="email" {...register('email', { required: 'Вы не ввели почту' })} />
              {errors?.email && (
                <p className="error_message">{errors?.email.message || 'Ошибка'}</p>
              )}
            </div>
            <div className="password">
              <p>Пароль:</p>
              <input
                type="password"
                {...register('password', {
                  required: 'Вы не ввели пароль',
                  minLength: { value: 8, message: 'Минимум 8 символов' },
                })}
              />
              {errors?.password && (
                <p className="error_message">{errors?.password.message || 'Ошибка'}</p>
              )}
            </div>
          </div>
          {isSignInTab ? (
            <button
              className={`sign_in_button ${isValid ? '' : 'invalid_button'}`}
              type="submit"
              disabled={!isValid}>
              Войти
            </button>
          ) : (
            <button
              className={`registr_button ${isValid ? '' : 'invalid_button'}`}
              type="submit"
              disabled={!isValid}>
              {' '}
              Зарегистрироваться
            </button>
          )}
        </form>
      </div>
    </ModalWindow>
  );
};

export default SignUpModalWindow;
