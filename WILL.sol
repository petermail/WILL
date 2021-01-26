pragma solidity >=0.6.0 <0.8.0;

import "./ERC20.sol";
import "./IERC20.sol";

contract WILLContract is ERC20, WithFees {
    using SafeMath for uint256;
	
	//WithFees private _withFees;
	//ERC20 private _willContract;
	
	event LogDepositReceived(address sender);
	
	struct WillItem {
		address _receiver;
		address _token;
		uint64 _perc;
	}

    // Number of tokens of a specific token for a user
	// (User address => token address => number of tokens inside the contract by the user
	// (Address 0x0 is used for ETH)
    mapping (address => mapping (address => uint256)) private _amounts;
	// Time when the tokens should be unlocked for distribution
	mapping (address => uint256) private _deadlines;
	// _wills._perc is 5 decimal points percentage of receiving reward (1e6 = 1.000 = 100%)
	// (User address => will)
	mapping (address => WillItem[]) private _wills;
	
	constructor() public WithFees(), ERC20("Wile I Live Lot", "WILL") {
		_mint(msg.sender, 1e27);
    }
	
	function getAmounts(address user, address token) external view {
		return _amounts[user][token];
	}
	function getDeadline(address user) external view {
		return _deadlines[user];
	}
	function getWills(address user) external view {
		return _wills[user];
	}
	
	
	function() payable { require(msg.data.length == 0); emit LogDepositReceived(msg.sender); }
	
	function create(uint256 deadline) external {
		address sender = _msgSender();
		require(_deadlines[sender] == 0, "There is already will for this address, use method: add");
		_deadlines[sender] = deadline;
	}
	function create(address receiver, address token, uint256 amount, uint256 deadline) external {
		address sender = _msgSender();
		require(_deadlines[sender] == 0, "There is already will for this address, use method: add");
		add(receiver, token, amount);
		_deadlines[sender] = deadline;
    }
	function addFeeAmountPrivate(address sender, address token, uint256 afterFee, uint256 fee) private {
		_amounts[sender][token] = _amounts[sender][token].add(afterFee);
		_fees[token] = _fees[token].add(fee);
	}
	function calculateFeePrivate(uint256 amount) private returns (uint256, uint256) {
		uint256 fee = amount.div(_feeDenominator);
		uint256 afterFee = msg.value.sub(fee);
		return (fee, afterFee);
	}
	function addEth(address receiver) external payable {
		require(_dadlines[sender] != 0, "There is no deadline. Create deadline first.");
		(uint256 fee, uint256 afterFee) = calculateFeePrivate(msg.value);
		addFeeAmountPrivate(sender, 0x0, afterFee, fee);
		_wills[sender].push(WillItem(receiver, 0x0, 1e6));
	}
	function addEthTwoReceivers(address receiver1, address receiver2, uint64 firstPerc) external payable {
		require(_dadlines[sender] != 0, "There is no deadline. Create deadline first.");
		require(firstPerc <= 1e6, "Percentage to receive for the first person is too large.");
		(uint256 fee, uint256 afterFee) = calculateFeePrivate(msg.value);
		addFeeAmountPrivate(sender, 0x0, afterFee, fee);
		_wills[sender].push(WillItem(receiver1, token, firstPerc));
		otherPerc = sub(1e6, firstPerc);
		_wills[sender].push(WillItem(receiver2, token, otherPerc));
	}
	function addEthMoreReceivers(address[] memory receivers, uint64[] memory percents) external payable {
		require(_dadlines[sender] != 0, "There is no deadline. Create deadline first.");
		require(receivers.length == percents.length, "Wrong number of receivers and percentages.");
		uint64 sumPerc = 0;
		(uint256 fee, uint256 afterFee) = calculateFeePrivate(msg.value);
		addFeeAmountPrivate(sender, 0x0, afterFee, fee);
		for (uint256 i = 0; i < receivers.length; ++i){
			sumPerc = sumPerc.add(percents[i]);
			_wills[sender].push(WillItem(receiver1, token, percents[i]));
		}
		require(sumPerc == 1e6, "Percentage to receive for all is wrong. It should sum to 1e6.");
	}
	function add(address receiver, address token, uint256 amount) public {
		require(_dadlines[sender] != 0, "There is no deadline. Create deadline first.");
		IERC20(token).transferFrom(receiver, address(this), amount);
		(uint256 fee, uint256 afterFee) = calculateFeePrivate(amount);
		addFeeAmountPrivate(sender, token, afterFee, fee);
		_wills[sender].push(WillItem(receiver, token, 1e6));
	}
	function updateOneToken(uint64 index, uint64[] memory percs) public {
		require(_wills.length > 0, "No will to be removed.");
		require(index < _wills.length, "No will has so high index.");
		uint64 redistribute = _wills[index]._perc;
		uint64 sumPerc = 0;
		bool isRemove = false;
		for (uint256 i = 0; i < percs.length; ++i){
			if (percs[i] > 0){
				require(_wills[i]._token == _wills[index]._token], "Updating wrong token. Other tokens should be zero.");
				sumPerc = sumPerc.add(percs[i]);
			} else if (i == index && percs[i] == 0) { 
				isRemove = true; 
			}
		}
		require(sumPerc == redistribute);
		if (isRemove){
			_wills[index] = _wills[_wills.length - 1];
			delete _wills[index];
		}
	}
	function addTwoReceivers(address receiver1, address receiver2, uint64 firstPerc, address token, uint256 amount) external {
		require(_dadlines[sender] != 0, "There is no deadline. Create deadline first.");
		require(firstPerc <= 1e6, "Percentage to receive for the first person is too large.");
		(uint256 fee, uint256 afterFee) = calculateFeePrivate(msg.value);
		addFeeAmountPrivate(sender, token, afterFee, fee);
		_wills[sender].push(WillItem(receiver1, token, firstPerc));
		otherPerc = sub(1e6, firstPerc);
		_wills[sender].push(WillItem(receiver2, token, otherPerc));
	}
	function addMoreReceivers(address[] memory receivers, uint64[] memory percents, address[] memory tokens, uint256 memory amount) external {
		require(_dadlines[sender] != 0, "There is no deadline. Create deadline first.");
		require(receivers.length == percents.length, "Wrong length of receivers and percentages.");
		require(receivers.length == tokens.length, "Wrong length of receivers and tokens.");
		uint64 sumPerc = 0;
		(uint256 fee, uint256 afterFee) = calculateFeePrivate(amount);
		addFeeAmountPrivate(sender, tokens[i], afterFee, fee);
		for (uint256 i = 0; i < tokens.length; ++i){
			sumPerc = sumPerc.add(percents[i]);
			_wills[sender].push(willItem(receivers[i], tokens[i], percents[i]));
		}
		require(sumPerc == 1e6, "Percentage to receive for all is wrong. It should sum to 1e6.");
	}
	function addTwoTokens(address receiver1, address token1, uint256 amount1, address receiver2, address token2, uint256 amount2) external {
		add(receiver1, token1, amount1);
		add(receiver2, token2, amount2);
	}
	function addThreeTokens(address receiver1, address token1, uint256 amount1, address receiver2, address token2, uint256 amount2, 
		address receiver3, address token3, uint256 amount3) external {
		add(receiver1, token1, amount1);
		add(receiver2, token2, amount2);
		add(receiver3, token3, amount3);
	}
	function addTokensAndEth(address[] memory receivers, address[] memory tokens, uint256[] memory amounts, address receiverEth) external payable {
		require(_dadlines[sender] != 0, "There is no deadline. Create deadline first.");
		require(receivers.length == tokens.length && receivers.length == amounts.length, "Wrong length of supplied arrays.");
		for (uint256 i = 0; i < receivers.length; ++i){
			add(receivers[i], tokens[i], amounts[i]);
		}
		if (msg.value > 0){
			addEth(receiverEth);
		}
	}
	
	function verifyPercentages(uint64[] memory percents) external pure view returns (bool) {
		uint64 sumPerc = 0;
		for (uint256 i = 0; i < percents.length; ++i){
			sumPerc = sumPerc.add(percents[i]);
		}
		require(sumPerc == 1e6, "Percentage to receive for all is wrong. It should sum to 1e6.");
		return true;
	}
	
	function withdrawTokenUnsafe(address token, uint256 amount) external {
		address sender = _msgSender();
		privateTransferTokenUnsafe(sender, sender, token, amount);
	}
	function withdraw(uint256 amount) external {
		address sender = _msgSender();
		privateTransfer(sender, sender, amount);
	}
	function withdrawEth(uint256 amount) external {
		adddress sender = _msgSender();
		privateTransferEth(sender, sender, amount);
	}
	function postponeFinish(uint256 postponeSec) external returns (bool) {
		address sender = _msgSender();
		uint256 newDeadline = now.add(postponeSec);
		require(_deadlines[sender] < newDeadline);
		_deadlines[sender] = newDeadline;
	}
	function finalize() external returns (bool) {
		address sender = _msgSender();
		require(_deadlines[sender] < now, "The deadline didn't pass yet.");
		for (uint256 i = 0; i < _wills[sender].length; ++i){
			uint256 amount = _wills[sender][i]._perc == 1e6 ? _amounts[sender][_wills[sender][i]._token] : _amounts[sender][_wills[sender][i]._token].mul(_wills[sender][i]._perc).div(1e6);
			_amounts[sender][_wills[sender][i]._token] = 0;
			if (_wills[sender][i]._token == address(this)){
				privateTransfer(sender, _wills[sender][i]._receiver, amount);
			} else if (_wills[sender][i]._token == 0x0) {
				privateTransferEth(sender, _wills[sender][i]._receiver, amount);
			} else {
				privateTransferTokenUnsafe(sender, _wills[sender][i]._receiver, _wills[sender][i]._token, amount);
			}
		}
		_deadlines[sender] = 0;
		return true;
	}
	
	function privateTransferEth(address sender, address receiver, uint256 amount) private {
		_amounts[sender][0x0] = _amounts[sender][0x0].sub(amount);
		receiver.transfer(amount);
	}
	function privateTransfer(address sender, address receiver, uint256 amount) private {
		_amounts[sender][address(this)] = _amounts[sender][address(this)].sub(amount);
		transfer(receiver, amount);
		return true;
	}
	function privateTransferTokenUnsafe(address sender, address receiver, address token, uint256 amount) private {
		_amounts[sender][token] = _amounts[sender][token].sub(amount);
		IERC20(token).transfer(receiver, amount); // Unsafe potentionally
		return true;
	}
}