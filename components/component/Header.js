import React, { useEffect, useState } from 'react'
import Router from 'next/router';
import { ethers } from 'ethers';
import connectToWallet from '../utils/connectToWallet';
import { useDispatch, useSelector } from 'react-redux';
import { changed } from '../store/authSlice';
import { TOASTS } from '../utils/constants';
import ClipLoader from "react-spinners/ClipLoader";
import toastFunction from '../utils/spinners.js/ToastShow';
import { Button, Stack, Form, Modal } from 'react-bootstrap';
import { addMyReward } from '../store/ticketSlice';
import { contractSigner } from '../contract/contract/contract';
import noExponents from '../utils/noExponents';


const Header = () => {
    const dispatch = useDispatch();

    const { screen } = useSelector((state) => state.utils);
    const { myReward } = useSelector((state) => state.tickets);
    const [show, setShow] = useState(false);
    const [EnteredPriceReward, setEnteredPriceReward] = useState(false);
    const [withdrawPending, setWithdrawPending] = useState(false);

   
    const { provider, address, balance
    } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false)
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

    const onWithdrawRewardChange = (e)=>{
        e.preventDefault();
        setEnteredPriceReward(e.target.value)
    }

    // msg.sender require
    const checkRewardData = async (_provider) => {
        if (_provider) {
            try {
                const contract = await contractSigner(_provider);
                const rewards = await contract.checkReward();
                const red = noExponents(parseInt(rewards.toString()) / 1000000000000000000);
                dispatch(addMyReward(red));

            } catch (error) {
                toastFunction(TOASTS.ERROR, error.message);
                toastFunction(TOASTS.INFO, "Add Some Balance for gas fee in wallet");
            }

        } else {
            toastFunction(TOASTS.INFO, "Connect To Wallet First");
        }
       
    }
 

    const AccountChanged = async () => {
        toastFunction(TOASTS.INFO, "Wallet changed");
        await connectWallet();
    }


    const WithdrawRewardAmount = async(e)=>{
        e.preventDefault();
            if (provider) {

                if (EnteredPriceReward && parseInt(EnteredPriceReward) > 0 && parseInt(myReward) >= parseInt(EnteredPriceReward)) {
                    setWithdrawPending(true);

                try {
               
                
                        const contract = await contractSigner(provider[0]);
                        const rewardTransfer = await contract.withdrawReward(ethers.utils.parseEther(EnteredPriceReward));
                        toastFunction(TOASTS.INFO, "it is pending .......");
                        await rewardTransfer.wait();
                        toastFunction(TOASTS.SUCCESS, "Rewarded");
                        const red = noExponents(parseInt(myReward) - parseInt(EnteredPriceReward));
                        dispatch(addMyReward(red));
                        setWithdrawPending(false);
                        handleClose();
                   
                    
                    
                } catch (error) {
                    toastFunction(TOASTS.INFO, "Something went wrong");
                    setWithdrawPending(false);

                }

                } else {
                    toastFunction(TOASTS.INFO, "Enter the correct amount");
                }

            } else {
                setLoading(false);
            }
    }



    const connectWallet = async (e) => {
        if (e) {
            e.preventDefault();
        }

        setLoading(true)

        //  
        let provider;
        try {
            provider = await connectToWallet();
            setLoading(false);
        } catch (error) {
            toastFunction(TOASTS.WARNING, error.message);
            setLoading(false);

        }
        try {

            if (provider) {
                const wallet = provider.getSigner();
                let address = await wallet.getAddress();
                let balance = await wallet.getBalance();
                setLoading(false);
                await checkRewardData(provider);
                dispatch(changed({
                    provider: [provider], address: address, balance
                        : ethers.utils.formatEther(balance)
                }));
                toastFunction(TOASTS.SUCCESS, "Successfully Connected");

            } else {
                setLoading(false);
            }
        } catch (error) {
            toastFunction(TOASTS.WARNING, error.message);
            setLoading(false);
        }


        
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
      <div>

          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Withdraw Rewards</Modal.Title>
              </Modal.Header>
              <Modal.Body>

    <div><strong>Step 1 : </strong> Add Token in Wallet</div>
    <div className="p-3">

                  <div>
                       - contract address : <strong> 0x2e2D6c08688353397D941520bFd40e37a0f7b77b </strong> 
                  </div>

                  <br />

                  <div>
                       - Network : <strong>Mumbai Polygon Testnet</strong>
                  </div>

                      <br />

                      <div>
                          - Token Name : <strong>True Token</strong> (trueToken)
                      </div>
    </div>
                  <br />
                          <div><strong>Step 2 : </strong> withdraw your Reward</div>
                  <br />

                  <Form className="p-3">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Control
                              type="email"
                              placeholder="How many tokens you want to withdraw ?"
                              autoFocus
                              onChange={onWithdrawRewardChange}
                          />
                      </Form.Group>
                      {withdrawPending ? <Button>
                          <ClipLoader color={"#ffffff"} loading={true} size={20} cssOverride={{
                              background: 'transparent'
                          }} /> </Button>
                          :
                          <Button onClick={WithdrawRewardAmount}>Withdraw</Button>
                      }
                  </Form>
                  <br />
                          <div><strong>Step 3 : </strong>Sell Tokens</div>
                  <div className="p-3">

                      <div>
                          - Go To  <strong> UNISWIPE app </strong>
                      </div>

                      <br />

                      <div>
                          - Choose Network : <strong>Mumbai Polygon Testnet</strong>
                      </div>

                      <br />

                      <div>
                          - Swipe Token : <strong> True Tokens</strong>
                      </div>
                  </div>
                  <br />
                 
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                     Close
                  </Button>
              </Modal.Footer>
          </Modal>

          



          <Stack direction={screen == 'sm' ? "vertical" :"horizontal"} gap={3}>
              <Stack direction="horizontal" onClick={() => { Router.push("/") }} className="font-monospace" style={{
                  fontSize: "38px"
}}>True<span style={{
                      color: "hsl(42, 99%, 46%)"
                  }}>Contract</span>
                      </Stack>
                  <div className="ms-auto">
                  {provider && <><Button onClick={handleShow} variant="warning">
                          <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: "20px"
                          }} >
                          <Button variant="dark">{myReward} TOKENS</Button>
                          <span className='fw-700'> WITHDRAW </span>

                          </div>
                      </Button></>
                      }
                  </div>
                  <div>
                      {!loading ? <>
                          {provider ? <Button  variant="secondary">
                          <>
                              <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: "20px"
                              }} >
                                  <Button variant="dark">{balance.slice(0, 4)} MATIC</Button>
                                  {`${address.slice(0, 4)} ... ${address.slice(-4)}`}

                              </div>
                  </>
                      </Button> : <Button onClick={connectWallet} className="py-2 px-4 fw-700 fs-5"  variant="warning"> Wallet </Button> }
                  </>:<><button className="btn btn-primary">
                                  <ClipLoader color={"#ffffff"} loading={true} size={30} cssOverride={{
                                      background: 'transparent'
                                  }} />
                              </button>
                          </>

                      }
                  </div>
              </Stack>
   


    </div>
  )
}

export default Header
