import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import { Profile } from './profile'

export default function Home() {
  return (
    <div className={styles.container}>
      Hello welcome to my App
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
    </div>
  )
  // const { isAuthenticated } = useAuth0()
  // return isAuthenticated ? (
  //   <div className={styles.container}>
  //     <h1>Hello welcome to my app</h1>
  //     <Profile />
  //     <LogoutButton>Log Out</LogoutButton>
  //   </div>
  // ) : (
  //   <div className={styles.container}>
  //     <h1>Hello welcome, Guest.</h1>
  //     <LoginButton>Log In</LoginButton>
  //   </div>
  // )
}
