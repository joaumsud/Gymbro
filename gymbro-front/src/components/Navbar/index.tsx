import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Logo</div>
      <button className={styles.button}>Cadastrar</button>
    </nav>
  );
};

export default Navbar;