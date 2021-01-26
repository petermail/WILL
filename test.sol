
import "./IERC20.sol";

contract Test {
	WILLContract private _will;
	
	address private constants KOVAN_DAI = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;
	uint256 private _fee = 5e14; // Fee per 1 
	uint256 private _totalSupply = 1e27;
	uint256 private _prevFees = 0;
	
	constructor(sender) public {
		_will = new WillContract();
		assert(_will._msgSender() == address(this));
		assert(_will.totalSupply() == _totalSupply);
		
		IERC20(KOVAN_DAI).transferFrom(sender, address(this), 1e20);
	}
	
	function createWithdrawPostpone() public {
		assert(_will.getAmounts(address(this), KOVAN_DAI) == 0);
		
		uint256 deadline = now + 30 seconds;
		_will.create(address(this), KOVAN_DAI, 1e18, deadline);
		
		assert(_will.getAmounts(address(this), KOVAN_DAI) == 1e18 - _fee);
		assert(_will.getDeadline(address(this) == deadline);
		WillItem willItem = _will.getWills(address(this))[0];
		assert(willItem._receiver == address(this));
		assert(willItem._token == KOVAN_DAI);
		assert(willItem._perc == 1e6);
		
		_will.withdrawTokenUnsafe(KOVAN_DAI, 1e16);
		
		assert(_will.getAmounts(address(this), KOVAN_DAI) == ((1e18 - 1e16) - _fee));
		assert(_will.getFeeOf(KOVAN_DAI) == _fee);
		_prevFees = _fee;
		
		_will.postponeFinish(120 seconds);
	}
	
	function finalizeAfterCreate() public {
		_will.finalize();
		assert(_will.getAmounts(address(this), KOVAN_DAI) == ((1e18 - 1e16) - _fee); // Amount is same since it is send back here after finilization
		assert(_will.getDeadline(address(this)) == 0);
		WillItem willItem = _will.getWills(address(this))[0];
		assert(willItem._receiver == address(this));
		assert(willItem._token == KOVAN_DAI);
		assert(willItem._perc = 1e6);
	}
	function failedFinalized() public {
		bool success = checkRequire("finalize");
		assert(!success);
	}
	
	function createAndFinish() public {
		address addr = "0x0123";
		uint256 deadline = now;
		_will.create(addr, KOVAN_DAI, 1e20, deadline);
		assertCreated(addr, 1e20, deadline, KOVAN_DAI, 1e6);
		uint256 afterFee = (1e20 * (1e15 - _fee)) / 1e15;
		_will.withdrawTokenUnsafe(KOVAN_DAI, afterFee);
		assertAfterWithdraw(addr, KOVAN_DAI, 1e20 - afterFee);
		
		_will.finalize();
	}
	function assertCreated(address addr, uint256 amount, uint256 deadline, address token, uint256 perc) private {
		assert(_will.getAmounts(addr, KOVAN_DAI) == amount - _fee);
		assert(_will.getDeadline(addr == deadline);
		WillItem willItem = _will.getWills(addr)[0];
		assert(willItem._receiver == addr);
		assert(willItem._token == token);
		assert(willItem._perc == perc);
	}
	function assertAfterWithdraw(address addr, address token, uint256 fee) private {
		assert(_will.getAmounts(addr, token) == 0);
		assert(_will.getFeeOf(token) == _prevFees + fee);
		_prevFees += fee;
	}
	
	
	function checkRequire(string functionName) public returns (bool) {
		bool result = address(_will).call(bytes4(bytes32(sha3(functionName + "()"))));
		return result;
	}
}