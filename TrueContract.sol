// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// 0xbF21C40CE1B84fd9Fc45067B058AF3EDc3a8D58a,1,0xACc41777c64434D6e0b6A69257481fD626819EDb,1,360000

contract TrueContract {
    address public owner;
    mapping(uint256 => ticket) public Tickets;
    uint256[] public Ids;
    uint256 private randNonce = 0;
    mapping(address => uint256) public reward;
    address public rewardContract;
    uint256 public rewardAmount;
    uint256 private TrueTokens;
    

    event TicketCreated(
        uint256 indexed Id,
        uint256 timestamp,
        uint256 expireDate,
        address indexed sender,
        uint256 senderBalance,
        address senderAddr,
        uint256 receiverBalance,
        address receiverAddr
    );
    
    event TransactionProccessed(
        uint256 indexed Id,
        uint256 timestamp,
        address indexed receiver
    );

    event Refunded(
        uint256 indexed Id,
        uint256 timestamp,
        address indexed sender
    );

    event Rewarded(
        uint256 indexed Id,
        uint256 timestamp,
        uint256 reward,
        address indexed sender,
        address indexed receiver
    );

    event RewardGetted(
        uint256 timestamp,
        address indexed sender,
        uint256 amount
    );

    struct ticket {
        uint256 Id;
        uint256 timestamp;
        uint256 expireDate;
        address sender;
        uint256 senderBalance;
        address senderAddr;
        address receiver;
        uint256 receiverBalance;
        address receiverAddr;
        bool exist;
        bool expired;
    }

    constructor(address con, uint256 amount) {
        owner = msg.sender;
        rewardContract = con;
        rewardAmount = amount;
    }

    modifier ownerRequire() {
        require(msg.sender == owner);
        _;
    }

    // 60* m*h* d
    function createTicket(
        address senderAddr,
        uint256 senderBalance,
        address receiverAddr,
        uint256 receiverBalance,
        uint256 _expireDate
    ) public payable {
        require(msg.sender != address(0));
        uint256 rnum = randMod();
        ticket storage tk = Tickets[rnum];
        tk.Id = rnum;
        tk.sender = msg.sender;
        tk.timestamp = block.timestamp;
        tk.senderAddr = senderAddr;
        tk.senderBalance = senderBalance;
        tk.receiverAddr = receiverAddr;
        tk.receiverBalance = receiverBalance;
        tk.expireDate = _expireDate + block.timestamp;

        // token deposite
        IERC20(senderAddr).transferFrom(
            msg.sender,
            address(this),
            senderBalance
        );
        tk.exist = true;
        Ids.push(rnum);

        emit TicketCreated(
            tk.Id,
            tk.timestamp,
            tk.expireDate,
            tk.sender,
            tk.senderBalance,
            tk.senderAddr,
            tk.receiverBalance,
            tk.receiverAddr
        );
    }

    function TransactionProccess(uint256 _id) public payable {
        ticket storage tk = Tickets[_id];
        require(msg.sender != address(0));
        require(tk.exist, "Please Check Your IdNumber");
        require(
            (block.timestamp < tk.expireDate),
            "Contract IdNumber is Expired"
        );
        require(!tk.expired, "IdNumber is expired");
        // token deposite
        IERC20(tk.receiverAddr).transferFrom(
            msg.sender,
            address(this),
            tk.receiverBalance
        );
        IERC20(tk.receiverAddr).transfer(tk.sender, tk.receiverBalance);
        IERC20(tk.senderAddr).transfer(msg.sender, tk.senderBalance);
        tk.receiver = msg.sender;
        tk.expired = true;
        reward[msg.sender] += rewardAmount;
        reward[tk.sender] += rewardAmount;
        TrueTokens -= 2 * rewardAmount;
        emit TransactionProccessed(_id, block.timestamp, msg.sender);

        emit Rewarded(
            _id,
            block.timestamp,
            rewardAmount,
            tk.sender,
            msg.sender
        );
    }

    function Refund(uint256 _id) public payable {
        ticket storage tk = Tickets[_id];
        require(
            (block.timestamp > tk.expireDate),
            "Please wait untill Contract is not  Expiring"
        );
        require(msg.sender == tk.sender, "Only Creator can refund Tokens");
        require(tk.receiver == address(0), "It is already completed");
        require(!tk.expired, "It is already refunded");
        IERC20(tk.senderAddr).transfer(tk.sender, tk.senderBalance);
        tk.expired = true;

        emit Refunded(_id, block.timestamp, msg.sender);
    }

    // a random number
    function randMod() internal returns (uint256) {
        // increase nonce
        randNonce++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            );
    }

    function withdrawReward(uint256 amount) public payable {
        require(reward[msg.sender] >= amount, " you have not any reward");
        IERC20(rewardContract).transfer(msg.sender, amount);
        reward[msg.sender] -= amount;
        emit RewardGetted(block.timestamp, msg.sender, amount);
    }

    function addReward(uint256 amount) public payable ownerRequire {
        IERC20(rewardContract).transferFrom(msg.sender, address(this), amount);
        TrueTokens += amount;
    }

    function checkTokens() public view ownerRequire returns (uint256) {
        return TrueTokens;
    }

    function checkReward() public view returns (uint256) {
        uint256 rewards = reward[msg.sender];
        return rewards;
    }

    function changeRewardAmount(uint256 amount) public ownerRequire {
        rewardAmount = amount;
    }

    function getAllIds() public view returns (uint256[] memory) {
        uint256[] memory ticketIds;
        for (uint256 i = 0; i < Ids.length; i++) {
            ticketIds[i] = Ids[i];
        }
        return ticketIds;
    }

    function getMyAllTickets() public view returns (ticket[] memory) {
        ticket[] memory tks = new ticket[](Ids.length);
        uint256 k = 0;
        for (uint256 i = 0; i < Ids.length; i++) {
            if (
                msg.sender == Tickets[Ids[i]].sender ||
                msg.sender == Tickets[Ids[i]].receiver
            ) {
                ticket storage tk = Tickets[Ids[i]];
                tks[k] = tk;
                k++;
            }
        }
        return tks;
    }

    function getAllTickets() public view returns (ticket[] memory) {
        ticket[] memory tks = new ticket[](Ids.length);
        for (uint256 i = 0; i < Ids.length; i++) {
            ticket storage tk = Tickets[Ids[i]];
            tks[i] = tk;
        }
        return tks;
    }

    function getTimeStamp() public view returns (uint256) {
        return block.timestamp;
    }
}
