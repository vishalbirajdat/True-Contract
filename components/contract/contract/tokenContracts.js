import { ethers } from "ethers";
import data from '../../utils/data.json'
import LinkProvider from '../LinkProvider'
const ABI = data.TOKEN_ABI


export const TokenContractSigner = async (provider, address) => {
    try {
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(
            address,
            ABI,
            signer // use link also for first event checks and work on it
        );


        return contract;

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const TokenContractLinkProvider = async (address) => {
    try {
      
        const linkProvider = await LinkProvider();
        const contract = await new ethers.Contract(
            address,
            ABI,
            linkProvider
        );
        return contract;

    } catch (error) {
        console.log(error.message);
        return false;
    }
}


export const TokenContractProvider = async (provider, address) => {
    try {
       const contract = new ethers.Contract(
           address,
            ABI,
            provider
        );
        return contract;

    } catch (error) {
        return false;
    }
}