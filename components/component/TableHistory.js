import { parseUnits } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { contractLinkProvider, contractSigner } from '../contract/contract/contract';
import { addTimeStamper } from '../store/ticketSlice';
import { TOASTS } from '../utils/constants';
import toastFunction from '../utils/spinners.js/ToastShow';
import CardTickets from './utils/CardTickets';

function TableHistory() {

    const dispatch = useDispatch();
    const { screen } = useSelector((state) => state.utils);
    const { AllTICKETS, timeStamper } = useSelector((state) => state.tickets);
    const { provider, address } = useSelector((state) => state.auth);

    useEffect(() => {
        setTimeStampsData();
    }, [])

    const setTimeStampsData = async () => {
        const timerContract = await contractLinkProvider();
        await timerContract.getTimeStamp().then(
            (time) => {
                dispatch(addTimeStamper(time.toString()));
            }
        );
    }


    const Heading = ({ children }) => {
        return <div style={{
            color: "hsl(0, 0 %, 50 %)"
        }}>{children}</div>

    }

    const Title = ({ children
    }) => {
        return <div style={{
            color: "hsl(47, 57%, 47%)"
        }}>{children}</div>
    }


    const TrTicket = ({ ticket, times }) => {
     
      

        return <tr>
            <td>
                <Title>
                    {ticket.senderAddr.slice(0, 6)}...
                </Title>
            </td>
            <td>
                <Title>
                    {ticket.senderBalance}
                </Title>
            </td>
            <td>
                <Title>
                    {ticket.receiverAddr.slice(0, 6)}...
                </Title>
            </td>
            <td>
                <Title>
                    {ticket.receiverBalance}
                </Title>
            </td>
            <td>
                <Title>
                    

                </Title>
            </td>

        </tr>
    }



    return (

        <div style={{
            display: screen == "sm" ? "block" : "flex",
            flexWrap: "wrap"
        }}>
            {timeStamper && AllTICKETS && AllTICKETS.AllTICKETS &&
                AllTICKETS.AllTICKETS.map((ticket) => {
                    const show = (address == ticket.sender || address == ticket.receiver) ? true : false;
                    if (provider) {
                        if (show) {
                            return <CardTickets times={timeStamper
                            } ticket={ticket
                            } />
                        }
                    } else {
                        return <CardTickets times={timeStamper
                        } ticket={ticket} />
                    }
                })
            }
        </div>
    );
}

export default TableHistory;