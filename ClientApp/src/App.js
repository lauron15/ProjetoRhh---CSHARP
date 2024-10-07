import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        {/* Rotas do aplicativo */}
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>

        {/* Adicionando o ToastContainer para exibir os toasts em qualquer parte da aplicação */}
        <ToastContainer
          position="top-right"  // Posição da notificação
          autoClose={3000}      // Tempo de fechamento automático (em milissegundos)
          hideProgressBar={false}  // Exibe a barra de progresso
          newestOnTop={false}    // As notificações mais novas não aparecem no topo
          closeOnClick           // Fecha ao clicar na notificação
          rtl={false}            // Modo da direita para a esquerda
          pauseOnFocusLoss       // Pausa a notificação se a janela perder o foco
          draggable              // Notificação arrastável
          pauseOnHover           // Pausa ao passar o mouse sobre a notificação
        />
      </Layout>
    );
  }
}
