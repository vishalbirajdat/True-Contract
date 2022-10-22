import { ethers } from 'ethers';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { changed } from '../store/authSlice';
import { fetchAll } from '../store/ticketSlice';
import { changedScreen, fetchScreen } from '../store/utilsSlice';
import connectToWallet from '../utils/connectToWallet';
import { STATUSES, TOASTS } from '../utils/constants';
import toastFunction from '../utils/spinners.js/ToastShow';

function Hidden() {
    const dispatch = useDispatch();

    const { screen } = useSelector((state) => state.utils);
    let windowsScreen = typeof window !== 'undefined' && window.innerWidth;
    let hasWindow = typeof window !== 'undefined';


    const { AllTICKETS } = useSelector((state) => state.tickets);
    const { provider } = useSelector((state) => state.auth);
    const loading = AllTICKETS.status != STATUSES.IDLE ? AllTICKETS.AllTICKETS && AllTICKETS.AllTICKETS.length && AllTICKETS.AllTICKETS.length > 0 ? false : true : false;

    useEffect(() => {
        dispatch(fetchAll());
    }, [provider])

    useEffect(() => {
        dispatch(fetchScreen());
    }, [])

    useEffect(() => {
        try {
            ethereum?.on("accountsChanged", AccountChanged);
            return () => {
                ethereum?.removeListener("accountsChanged", AccountChanged);
            };
        } catch (e) {
            console.log(e.message)
        }
    });


    const AccountChanged = async () => {
        await connectWallet();
    }



    const connectWallet = async (e) => {
        if (e) {
            e.preventDefault();
        }

        //  
        let providerWallet;
        try {
            providerWallet = await connectToWallet();
        } catch (error) {
            toastFunction(TOASTS.WARNING, error.message);
        }
        try {

            if (providerWallet) {
                const wallet = providerWallet.getSigner();
                let address = await wallet.getAddress();
                let balance = await wallet.getBalance();
                dispatch(changed({
                    provider: [providerWallet], address: address, balance
                        : ethers.utils.formatEther(balance)
                }));
            }
        } catch (error) {
            toastFunction(TOASTS.WARNING, error.message);
        }
    }



    useEffect(() => {



        if (!loading) {
            if (AllTICKETS.status == STATUSES.ERROR) {
                toastFunction(TOASTS.ERROR, "Something went wrong");
            }
            if (AllTICKETS.status == STATUSES.IDLE) {
                toastFunction(TOASTS.SUCCESS, "Successfully Collected All Data");
            }
            if (AllTICKETS.status == STATUSES.LOADING) {
                toastFunction(TOASTS.INFO, "Collecting Data ...");
            }

        } else {
            if (AllTICKETS.status == STATUSES.LOADING) {
                toastFunction(TOASTS.INFO, "Collecting Data ...");
            }
        }

    }, [loading])

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                const width = hasWindow ? window.innerWidth : null;
                dispatch(changedScreen(width))
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow])


  return (
    <div style={{
          display: loading ? "block": "none"
    }}>
          {loading &&
              <div style={{
                  width: "100%",
                  height: "100vh",
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 999,
                  backgroundColor: "hsl(0,0%,10%, 0.8)",
                  pointerEvents: 'none'
              }}>
                  <PacmanLoader color={"#ffffff"} loading={true} size={90} cssOverride={{
                      background: 'transparent',
                      display: 'inline'
                  }} />
              </div>
          }
    </div>
  )
}

export default Hidden