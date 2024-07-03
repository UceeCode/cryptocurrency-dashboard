import React from 'react'
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './AppProvider';
import Settings from '../Settings';
import Content from '../Shared/Content';
import DashBoard from '../DashBoard';

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <Content>
          <Settings/>
          <DashBoard/>  
        </Content>
      </AppProvider>
    </AppLayout>
  );
}

export default App;
