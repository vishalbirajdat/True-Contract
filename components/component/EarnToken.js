import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import React, { useEffect, useState } from 'react'
import { Button, Stack, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { contractSigner } from '../contract/contract/contract';
import { TokenContractSigner } from '../contract/contract/tokenContracts';
import { addMyReward, fetchAll } from '../store/ticketSlice';
import { TOASTS } from '../utils/constants';
import noExponents from '../utils/noExponents';
import toastFunction from '../utils/spinners.js/ToastShow';
import CardTickets from './utils/CardTickets';

function EarnToken() {
    const dispatch = useDispatch();
    const { screen } = useSelector((state) => state.utils);
    const [ticket, setTicket] = useState(null)
    const [loading, setLoading] = useState(false);

    const { AllTICKETS } = useSelector((state) => state.tickets);
    const { provider } = useSelector((state) => state.auth);

    // const tokenID = await linkContract.(id);
    // return tokenID;

    const allNull = ()=>{
        setTicket(null);
    }

   

    const CollectData = async (e) => {
            e.preventDefault();
            try {
               
                if (e.target.value.length == 77 )
                    {
                if (AllTICKETS.AllTICKETS.length > 0) {

                    const ticket = await AllTICKETS.AllTICKETS.filter((t) => t.Id == e.target.value);
                    if (ticket && ticket.length > 0) {
                        toastFunction(TOASTS.SUCCESS, "You Have Entered Correct ticket ID number");
                        setTicket(ticket[0]);
                    }else{
                        toastFunction(TOASTS.INFO, "Enter Correct ticket ID number");
                    }

                } else {
                    toastFunction(TOASTS.INFO, "Refresh and try again");
                }
                }

            } catch (error) {
                toastFunction(TOASTS.INFO, "Something went wrong");
            }
       
    }

    const EarnTokens = async () => {
        if (ticket && ticket.Id && !ticket.expired && !loading) {
        if (provider) {
            try {

                setLoading(true);
               

                const ticketticket = ticket;
                const contract = await contractSigner(provider[0]);
                const tokencontract = await TokenContractSigner(provider[0], ticketticket.receiverAddr);
                const expire = ticketticket.expired;
                const tokenid = ticketticket.Id;
               
                // 1664917578
                // 1665133578

                // 91843727638350951772496921706804106849059433674271508904965294364320602249021
                 


                const rbt = ethers.utils.parseEther(ticketticket.receiverBalance);
                await tokencontract.approve(contract.address, rbt.toString()).then(
                    async (app) => {
                        try {
                       
                            // const tickets = await contract.TransactionProccess(ticketticket.Id);
                            const tickets = await contract.TransactionProccess(tokenid);
                        // 60* m*h* d
                        toastFunction(TOASTS.INFO, "it is pending .......");
                        await tickets.wait();
                        toastFunction(TOASTS.SUCCESS, "Successfully Proccessed");
                         try {
                             const rewards = await contract.checkReward();
                             const red = noExponents(parseInt(rewards.toString()) / 1000000000000000000);
                             dispatch(addMyReward(red));
                         } catch (error) {
                             toastFunction(TOASTS.WARNING, "Reload page");
                         }
                        dispatch(fetchAll());
                            allNull();
                            setLoading(false);
                        } catch (error) {
                            console.log("error in approval : ", error.message)
                            // toastFunction(TOASTS.ERROR, error.message);
                            toastFunction(TOASTS.WARNING, error.message);
                            setLoading(false);
                }
                }
                )
            } catch (error) {
                console.log("error in approval : ",error.message)
                // toastFunction(TOASTS.ERROR, error.message);
                toastFunction(TOASTS.INFO, "Add Some Balance for gas fee in wallet");
                setLoading(false);
            }

        } else {
            toastFunction(TOASTS.INFO, "Connect To Wallet First");
        }
        }else{
            toastFunction(TOASTS.INFO, "First Choose Your Ticket");
        }
    }

    const ButtonDiv = ({ title, value }) => {
        return (
            <div className='btn bg-secondary text-white' style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-between",
                gap: "20px",
                width: "100%",
                margin: "10px"
            }} >
                <span className='fw-normal'>{title} </span>
                <span className='btn bg-dark text-white'>{value}</span>

            </div>
        )

    }
    return (
        <>


         

        <div className='rounded-5 p-1 bg-warning' style={{
            marginTop: screen == "sm" ? "30px" : "100px",
            marginBottom: screen == "sm" ? "30px" : "100px",
            width: screen == "sm" ? "100%" : "500px",
            marginLeft: "auto",
            marginRight: "auto"
        }}>

            <div className='rounded-5 p-5 bg-dark' style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: 'center',
                width: "100%",
            }}>


                <Form.Control onSubmit={CollectData} onChange={CollectData} type="email" placeholder="Enter ID" />

                {ticket && <>
                    <ButtonDiv title={"Ticket ID"} value={`${ticket.Id.slice(0, 6)}...${ticket.Id.slice(-6,)}`} />
                    <ButtonDiv title={"To Contract"} value={`${ticket.senderAddr.slice(0, 6)}...${ticket.senderAddr.slice(-6,)}`} />
                    <ButtonDiv title={"Receive Balance"} value={`${ticket.senderBalance} TOKENS`} />
                    <ButtonDiv title={"From Contract"} value={`${ticket.receiverAddr.slice(0, 6)}...${ticket.receiverAddr.slice(-6,)}`} />


                <div style=
                    {{ margin: "10px" }}>
                        <Button onClick={EarnTokens} variant={ticket.expired ?"dark" :"warning"}>
                       {!loading ?  <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: "space-between",
                            gap: "20px",
                            minWidth: screen == "sm" ? "100%" : "400px"
                        }} >
                                <span className='fw-normal'>{ticket.expired ? "Already Expired" : "Pay Balance"} </span>
                                <span className='btn bg-dark text-white'>{ticket.receiverBalance} TOKENS</span>
                        </div>
                                :
                            
                                    <ClipLoader color={"#ffffff"} loading={true} size={30} cssOverride={{
                                        background: 'transparent'
                                    }} />
                }
                    </Button>
                </div>

                </> 

                    }


            </div>
        </div>

        </>


    );
}

export default EarnToken;