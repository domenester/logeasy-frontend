import React from 'react'
import './App.css';
import { SocketServiceProvider } from './service/socket.sevice'
import LogPanel from './components/log-panel';
import { Sidebar } from './components/sidebar';
import { Header } from './components/header';
import { SidebarStateProvider } from './shared/state-handler';

function App() {
  return (
    <SocketServiceProvider>
      <Header/>
      <SidebarStateProvider>
        <Sidebar/>
        <LogPanel/>
      </SidebarStateProvider>
    </SocketServiceProvider>
  );
}

export default App;
