import React, { Component } from 'react'
import './App.css';
import WelcomeMessage from './WelcomeMessage';
import styled from 'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar';


function App() {
  return (
    <AppLayout>
      <AppBar />
      <WelcomeMessage/>
    </AppLayout>
  );
}

export default App;
