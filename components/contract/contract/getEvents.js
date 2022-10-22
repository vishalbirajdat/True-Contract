import { ethers } from 'ethers';
import { contractLinkProvider } from './contract';



    // event TicketCreated(
    //     uint256 indexed Id,
    //     uint256 timestamp,
    //     uint256 expireDate,
    //     address indexed sender,
    //     uint256 senderBalance,
    //     address senderAddr,
    //     uint256 receiverBalance,
    //     address receiverAddr
    // );
    // event TransactionProccessed(
    //     uint256 indexed Id,
    //     uint256 timestamp,
    //     address indexed receiver
    // );

    // event Refunded(
    //     uint256 indexed Id,
    //     uint256 timestamp,
    //     address indexed sender
    // );
    
    // event Rewarded(
    //     uint256 indexed Id,
    //     uint256 timestamp,
    //     uint256 reward,
    //     address indexed sender,
    //     address indexed receiver
    // );

    // event RewardGetted(
    //     uint256 timestamp,
    //     address indexed sender,
    //     uint256 amount
    // );

const getEventContract = async (tokenId, title, nftURL,
    owner,
    price,
    currentlyListed
    ) => {
    // try {


    //     // const linkContract = contract;
    //     const linkContract = await contractLinkProvider();

       
    //     if (linkContract) {
    //         const newContractList = await linkContract.filters.TokenListedSuccess(
    //             tokenId, title, nftURL,
    //             owner,
    //             price,
    //             currentlyListed
    //         );

    //         // if (gameOwner || amount || contractAddress) {
    //         //     newContractList = await contract.filters.NewGameCreated(gameOwner, amount, contractAddress);
    //         // }


            
    //         const getFilter = await linkContract.queryFilter(newContractList);
    //         const getData = await getFilter.reverse().map((e) => {
    //             return {
    //                 tokenId: parseInt(e.args.tokenId._hex, 16),
    //                 title: e.args.title.toString(),
    //                 nftURL: e.args.nftURL.toString(),
    //                 owner:e.args.owner.toString(),
    //                 price :ethers.utils.formatEther(parseInt(e.args.price._hex, 16)),
    //                 currentlyListed:e.args.currentlyListed
    //             }
    //         });

        
    //         console.log("getData");
    //         return getData;
    //     }
    //     else {
    //         console.log("contract errror in getEventContract");
    //         return false;
    //     }
    // } catch (error) {
    //     console.log(error.message);
    //     return false;
    // }
}

export default getEventContract;

