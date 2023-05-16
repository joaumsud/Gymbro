import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import logoNav from '../../img/halter-sf.png';
import { Button } from '@mui/material';
import SignUpForm from '../FormSignUp';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoNav}>
        <img src={logoNav}  />
      </div>
      <Button className={styles.button}
        onClick={()=>{
          setOpen(true)
        }}
      >
        Cadastrar
      </Button>
      <SignUpForm
        open={open}
        handleClose={handleClose}
      />
    </nav>
  );
};

export default Navbar;