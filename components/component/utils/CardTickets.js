import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import { contractSigner } from '../../contract/contract/contract'
import { TOASTS } from '../../utils/constants'
import toastFunction from '../../utils/spinners.js/ToastShow'

const CardTickets = ({ticket, times}) => {
    const { screen } = useSelector((state) => state.utils);
    const [refunding, setRefunding] = useState(false);
    const [status, setStatus] = useState(ticket.expired == true ? (ticket.receiver == "0x0000000000000000000000000000000000000000") ? "refunded" : "completed" : parseInt(times) > parseInt(ticket.expireDate) ? "Refund" : "waiting");

    

    const { provider, address } = useSelector((state) => state.auth);


    const RefundData = async () => {
        if (status && status ==  "Refund") {
        if (provider) {
            try {
                setRefunding(true);
                const contract = await contractSigner(provider[0]);
                const refunds = await contract.Refund(ticket.Id);
                toastFunction(TOASTS.INFO, "Please wait.....");
                await refunds.wait();
                toastFunction(TOASTS.SUCCESS, "Refunded");
                setRefunding(false);
                setStatus("refunded")
            } catch (error) {
                console.log(" re : ", error.message)
                toastFunction(TOASTS.ERROR, error.message);
                toastFunction(TOASTS.INFO, "Add Some Balance for gas fee in wallet");
                setRefunding(false);
            }

        } else {
            toastFunction(TOASTS.INFO, "Connect To Wallet First");
        }
        }
    }
    const CopyIt = () => {
        if (ticket.Id) {
            navigator.clipboard.writeText(ticket.Id)
            toastFunction(TOASTS.SUCCESS, "Copied");
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
      <div className='rounded-5 p-1 bg-warning' style={{
          marginTop: screen == "sm" ? "30px" : "50px",
          marginBottom: screen == "sm" ? "30px" : "50px",
          marginLeft: screen == "sm" ? "0px" : "50px",
          marginRight: screen == "sm" ? "0px" : "50px",
          width: screen == "sm" ? "100%" : "500px",
      }}>

          <div className='rounded-5 p-5 bg-dark' style={{
              display: "flex",
              flexDirection: 'column',
              justifyContent: "center",
              alignItems: 'center',
              width: "100%",
          }}>

              {ticket && <>


                  <div className='btn bg-warning text-white' onClick={CopyIt} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: "space-between",
                      gap: "20px",
                      width: "100%",
                      margin: "10px"
                  }} >
                      <span className='fw-normal'>Ticket ID </span>
                      <span className='btn bg-dark text-white'>{`${ticket.Id.slice(0, 6)}...${ticket.Id.slice(-6,)}`}</span>
                  </div>

                
                  <ButtonDiv title={"Sender Address"} value={`${ticket.sender.slice(0, 6)}...${ticket.sender.slice(-6,)}`} />
                  <ButtonDiv title={" Sender Contract"} value={`${ticket.senderAddr.slice(0, 6)}...${ticket.senderAddr.slice(-6,)}`} />
                  <ButtonDiv title={"Sender Balance"} value={`${ticket.senderBalance} TOKENS`} />
                  <ButtonDiv title={"Receiver Contract"} value={`${ticket.receiverAddr.slice(0, 6)}...${ticket.receiverAddr.slice(-6,)}`} />
                  <ButtonDiv title={"Receiver Balance"} value={`${ticket.receiverBalance} TOKENS`} />
                  <ButtonDiv title={"Receiver Address"} value={`${ticket.receiver.slice(0, 6)}...${ticket.receiver.slice(-6,)}`} />



                  <Button onClick={RefundData} variant={status == "refunded" ? "danger" : status == "completed" ? "success" : status == "Refund" ? "warning" : "info"} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: "center",
                      gap: "20px",
                      width: "100%",
                      margin: "10px"
                  }} >
                      {
                          !refunding ?
                              <>{status}</> : <ClipLoader color={"#ffffff"} loading={true} size={15} cssOverride={{
                                  background: 'transparent'
                              }} />
                      }
                  </Button>

              </>

              }


          </div>
      </div>
  )
}

export default CardTickets
