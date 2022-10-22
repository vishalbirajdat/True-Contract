import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import { ToastContainer } from 'react-toastify';
import Header from '../component/Header';
import Hidden from '../component/hidden';

const Layout = ({children}) => {



  return (
          <Provider store={store}>
        <div style={
          {
        color: "white",
        background: "#000015",
        width:"100%",
        minHeight:"100vh"
          }
        }>

        <Hidden />

              <div style={
        {
         
          padding:"20px 22px",
          maxWidth: "1300px",
          margin:"auto"
        }
              }>
        <Header />
          {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          newestOnTop
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
              </div>
              </div>
          </Provider>
  )
}

export default Layout
