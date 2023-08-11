import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import './App.css';
import Cadastro from './components/Cadastro/Cadastro';
import Listar from './components/Listar/Listar';

function App() {
  return (
    <Cadastro/>
  );
}

export default App;