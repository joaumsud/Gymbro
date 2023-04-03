import React from 'react';
import styles from './LoginCard.module.scss';

const LoginCard = () => {
  return (
    <div className={styles.card}>
      <h2>Faça login</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" />
        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginCard;