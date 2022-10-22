import { ethers } from 'ethers';
import React from 'react'


const LinkProvider = () => {
    try {
        
   
    const providerLink = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_PROVIDER_HTTP_URL
    );
    return providerLink;
    } catch (error) {
        console.log(error.message);
        return false
    }
}

export default LinkProvider
