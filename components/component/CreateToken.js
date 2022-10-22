import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { Button, Stack, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { contractSigner } from '../contract/contract/contract';
import { TokenContractSigner } from '../contract/contract/tokenContracts';
import { fetchAll } from '../store/ticketSlice';
import { TOASTS } from '../utils/constants';
import toastFunction from '../utils/spinners.js/ToastShow';


function CreateToken() {
    const dispatch = useDispatch();
    const { screen } = useSelector((state) => state.utils);
    const [data, setdata] = useState(null); 
    const { provider } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);


    const allNulls = () => {
            setdata(null);
    }

    const CreateNewTicket = async ()=>{
        if (checkAllData()) {
        if (provider) {
        try {
            setLoading(true);
            
            const contract = await contractSigner(provider[0]);
            const tokencontract = await TokenContractSigner(provider[0], data.fromcontract);
            const expire = 60 * data.expireddate;

            await tokencontract.approve(contract.address, ethers.utils.parseEther(data.paybalance)).then(
                async () => {
                    const ticket = await contract.createTicket(data.fromcontract, ethers.utils.parseEther(data.paybalance), data.tocontract, ethers.utils.parseEther(data.receivebalance), expire);
                    // 60* m*h* d
                    toastFunction(TOASTS.INFO, "it is pending .......");
                    await ticket.wait();
                    toastFunction(TOASTS.SUCCESS, "Successfully Created Your Tickets");
                    dispatch(fetchAll());
                    allNulls();
                    setLoading(false);
                } 
            )

        } catch (error) {
            toastFunction(TOASTS.ERROR,error.message);
            toastFunction(TOASTS.INFO, "Add Some Balance for gas fee in wallet");
            setLoading(false);
        }

        }else{
            toastFunction(TOASTS.INFO, "Connect To Wallet First");

        }
        }

    }


    function checkAllData() {
        if (data && data.fromcontract && data.paybalance && data.tocontract && data.receivebalance && data.expireddate) {
            return true;
        }else{
            toastFunction(TOASTS.INFO, "Fill All Fields");
            return false;
        }
    }

    function ChangedData(e){
        setdata({...data,[e.target.name]:e.target.value} )
    }
    return (
        <div className=' rounded-5' style={{
                display: "flex",
            background: "hsl(42, 99%, 46%)",
                justifyContent: "center",
                alignItems:'center',
                flexDirection:'column',
                paddingBottom: screen == "sm" ? "5px" : "50px",
                paddingTop: screen == "sm" ? "30px" : "50px",
                paddingLeft: screen == "sm" ? "10px" : "50px",
                paddingRight: screen == "sm" ? "10px" : "50px",
                marginTop: screen == "sm" ? "30px" : "100px",
                marginBottom: screen == "sm" ? "30px" : "100px",
            }}>
 

            <Stack style={{ width: "99%", justifyContent: "center"}} direction={screen == 'sm' ? "vertical" : "horizontal"} gap={5}>

                <div className=' bg-dark rounded-5 p-5 ' style={{ width: "99%" }}>
                    <Form.Group className="mb-3 w-95"  controlId="formBasicEmail">
                        <Form.Label>From Contract</Form.Label>
                        <Form.Control type="text" onChange={ChangedData} name="fromcontract" placeholder="Enter Token Contract Address" />
                    </Form.Group>


                    <Form.Group className="mb-3 w-full" controlId="formBasicEmail">
                        <Form.Label>Pay Balance</Form.Label>
                        <Form.Control type="text" onChange={ChangedData} name="paybalance" placeholder="How many Toekns ?" />
                    </Form.Group>

                    </div>
                <div className='bg-secondary rounded-5 p-5 ' style={{ width: "99%"  }}>

                    <Form.Group className="mb-3 w-full" controlId="formBasicEmail">
                        <Form.Label>To Contract</Form.Label>
                        <Form.Control type="text" onChange={ChangedData} name="tocontract" placeholder="Enter Token Contract Address" />
                    </Form.Group>

                    <Form.Group className="mb-3 w-full" controlId="formBasicEmail">
                        <Form.Label>Receive Balance</Form.Label>
                        <Form.Control type="text" onChange={ChangedData} name="receivebalance" placeholder="How many Toekns ?" />
                    </Form.Group>

                    <Form.Group className="mb-3 w-full" controlId="formBasicEmail">
                        <Form.Label>Expire Minutes</Form.Label>
                        <Form.Control type="text" onChange={ChangedData} name="expireddate" placeholder="Enter Expire minutes" />
                    </Form.Group>
            </div>

                    </Stack>


{loading ? 
                <ClipLoader color={"#ffffff"} loading={true} size={30} cssOverride={{
                    background: 'transparent'
                }} />

:
            <Button variant="success" onClick={CreateNewTicket} style={{
                maxWidth: "400px",
                margin: "30px"
            }} >
                Pay & Earn Reward
            </Button>
}
</div>

    );
}

export default CreateToken;