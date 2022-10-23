// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TrueContractToken is ERC20 {
  constructor() ERC20('TrueToken', 'True Token') {
    _mint(msg.sender, 1000000000000000 * 10**18);
  }

    // total suppy 1Q

}
