import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'

const Users = () => {
  const [name, setName] = useState('')

  const getAll = async (name) => {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/?username=${name}`)
    setName(result.data[0].username)
  }

  useEffect(() => {
    getAll('davidsan')
  }, [])

  return (
    <div className={styles.container}>
      <h1>Hello there, {name}.</h1>
    </div>
  )
}

export default Users
