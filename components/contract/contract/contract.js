import { ethers } from "ethers";
import data from '../../utils/data.json'
import LinkProvider from '../LinkProvider'
const ABI = data.ABI


export const contractSigner = async (provider)=>{
    try {
        const signer = await provider.getSigner();
    const contract = await new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        ABI,
        signer // use link also for first event checks and work on it
    );


    return contract;

    } catch (error) { 
        console.log(error.message);
        return false;
    }
}

export const contractLinkProvider = async () => {
    try {

        const linkProvider = await LinkProvider();
    const contract = await new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        ABI,
        linkProvider
    );
    return contract;

} catch (error) {
    console.log(error.message);
    return false;
}
}


export const contractProvider = async (provider) => {
    try {

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        ABI,
        provider
    );
    return contract;

} catch (error) {
    return false;
}
}