# WILL - While I Live Lot
Smart contract for wills - send tokens or eth to the contract and set up what should happen if you don't send IStillLive() method in X amount of time. 
E.g.: send 100 USDT to the smart contract, with two addresses and 1:1 split and time limit 1 month, send IStillLive() method in 2 days, don't call it for another month, send Finalize() method and the 2 addresses will receive 50 % of initial 100 USDT each.

## Use cases
 - will (send tokens to specified addresses after death)
 - lost keys (send tokens to new address if keys lost to previous address)

## Methods
 - Create
 - Withdraw
 - PostponeFinish
 - Finalize
 - ConvertFees
 - ERC20 methods


# Development notes
Run cmd: solidity-ide
