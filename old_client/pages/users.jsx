import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import styles from '../styles/Home.module.css';

const Users = () => {
  const [name, setName] = useState('');

  const getAll = async (uname) => {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/?username=${uname}`);
    setName(result.data[0].username);
  };

  useEffect(() => {
    getAll('davidsan');
  }, []);

  return (
    <div>
      <h1>Hello there, {name}.</h1>
    </div>
  );
};

export default Users;
