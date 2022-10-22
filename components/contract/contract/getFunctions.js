import { ethers } from 'ethers';
import { contractLinkProvider,  contractSigner } from './contract';

export const getAllTicketsData = async () => {
    // const linkContract = contract;
    const linkContract = await contractLinkProvider();
    const data = await linkContract.getAllTickets();
    try {
    const getData = await data.map((item) => {
        const sb = noExponents(parseInt(item.senderBalance._hex, 16) / 1000000000000000000);
        const rb = noExponents(parseInt(item.receiverBalance._hex, 16) / 1000000000000000000);
        function noExponents(n) {
            var data = String(n).split(/[eE]/);
            if (data.length == 1) return data[0];

            var z = '',
                sign = this < 0 ? '-' : '',
                str = data[0].replace('.', ''),
                mag = Number(data[1]) + 1;

            if (mag < 0) {
                z = sign + '0.';
                while (mag++) z += '0';
                return z + str.replace(/^\-/, '');
            }
            mag -= str.length;
            while (mag--) z += '0';
            return str + z;
        }
      
        return {
            "Id": item.Id.toString(),
            "timestamp": item.timestamp.toString(),
            "expireDate": item.expireDate.toString(),
            "senderBalance": sb,
            "receiverBalance": rb,
            "exist": item.exist, 
            "expired": item.expired,
            "sender": item.sender,
            "senderAddr": item.senderAddr,
            "receiver": item.receiver,
            "receiverAddr": item.receiverAddr,
               }
    })  


        return getData.reverse();
    } catch (error) {
            console.log(error.message);
    }
}

// owner is required
export const checkTokensData = async () => {
    const linkContract = await contractLinkProvider();
    const usernamepromise = await linkContract.checkTokens();
    return usernamepromise
}

// msg.sender require
export const checkRewardData = async () => {
    const linkContract = await contractLinkProvider();
    const tokenID = await linkContract.checkReward();
    return tokenID;
}

// owner is required
export const changeRewardAmountData = async () => {
    const linkContract = await contractLinkProvider();
    const tokenID = await linkContract.changeRewardAmount();
    return tokenID;
}

// owner is required
export const addRewardData = async (amount) => {
    const linkContract = await contractLinkProvider();
    const tokenID = await linkContract.addReward(amount);
    return tokenID;
}

// msg.sender is required
export const withdrawRewardData = async (amount) => {
    const linkContract = await contractLinkProvider();
    const tokenID = await linkContract.withdrawReward(amount);
    return tokenID;
}

// msg.sender is required
export const RefundData = async (id) => {
    const linkContract = await contractLinkProvider();
    const tokenID = await linkContract.Refund(id);
    return tokenID;
}
// msg.sender is required
export const TransactionProccessData = async (id) => {
    const linkContract = await contractLinkProvider();
    const tokenID = await linkContract.TransactionProccess(id);
    return tokenID;
}
// msg.sender is required
export const createTicketData = async (senderAddr, senderBalance, receiverAddr, receiverBalance, expireDate) => {
    const linkContract = await contractLinkProvider();
    const tokenID = await linkContract.createTicket(senderAddr, senderBalance, receiverAddr, receiverBalance, expireDate);
    return tokenID;
}


export const getAllIdsData = async () => {
    const linkContract = await contractLinkProvider();
    const tokenID = await linkContract.getAllIds();
    return tokenID;
}



