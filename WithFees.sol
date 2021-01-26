import "./Ownable.sol";
import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router02.sol";

interface IWithFees {
	function convertFeesEthToWill(uint256 minAmount, uint256 deadline) external onlyOwner;
	function convertFeesTokenToWill(address token, uint256 minAmount, uint256 deadline) external onlyOwner;
	function convertFeesTokenToWill2(address token, uint256 minAmount, uint256 deadline) external onlyOwner;
	function getPathForEthToWill() external view returns (address[] memory);
	function getPathForTokenToWill(address token) external view returns (address[] memory);
	function getPathForTokenToWill2(address token) external view returns (address[] memory);
	
	function getFeeOf(address token) external view;
	function getFeeDenominator() external view;
}


contract WithFees is Ownable, IWithFees {
	
    address private constant UNISWAP_ROUTER_ADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    IUniswapV2Router02 public uniswapRouter;
	address private constant USDC_ADDRESS = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
	
    // Fee equivalent to 0.05%
	uint256 private _feeDenominator = 50000;
	
	// Fees per tokens
	// (Token address => number of tokens)
	mapping (address => uint256) internal _fees;
	
	event SetFeeDenominatorEvent(uint256 feeDenom);
	event ConvertFeesEthToWillEvent();
	event ConvertFeesTokenToWillEvent();
	event convertFeesTokenToWill2Event();
	
	constructor() public {
		uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
    }
	
	function getFeeDenominator() external view {
		return _feeDenominator;
	}
	function setFeeDenominator(uint256 feeDenom) external onlyOwner {
		_feeDenominator = feeDenom;
		emit SetFeeDenominatorEvent(feeDemon);
	}
	function getFeeOf(address token) external view {
		return _fees[token];
	}
	function setNewUniswapRouter(IUniswapV2Router02 newRouter) external onlyOwner {
		uniswapRouter = newRouter;
	}
	
	
	function convertFeesEthToWill(uint256 minAmount, uint256 deadline) external onlyOwner {
		uniswapRouter.swapExactETHForTokens{ value: _fees[0x0] }(minAmount, getPathForEthToWill(), address(this), deadline);
		_fees[0x0] = 0;
		emit ConvertFeesEthToWillEvent();
	}
	function convertFeesTokenToWill(address token, uint256 minAmount, uint256 deadline) external onlyOwner {
		uniswapRouter.swapExactTokensForTokens(_fees[token], minAmount, getPathForTokenToWill(token), address(this), deadline);
		_fees[token] = 0;
		emit ConvertFeesTokenToWillEvent();
	}
	function convertFeesTokenToWill2(address token, uint256 minAmount, uint256 deadline) external onlyOwner {
		uniswapRouter.swapExactTokensForTokens(_fees[token], minAmount, getPathForTokenToWill2(token), address(this), deadline);
		_fees[token] = 0;
		emit ConvertFeesTokenToWillEvent2();
	}
	function getPathForEthToWill() external view returns (address[] memory) {
		address[] memory path = new address[](2);
		path[0] = uniswapRouter.WETH();
		path[1] = address(this);
		return path;
	}
	function getPathForTokenToWill(address token) external view returns (address[] memory){
		address[] memory path = new address[](3);
		path[0] = token;
		path[1] = uniswapRouter.WETH();
		path[2] = address(this);
		return path;
	}
	function getPathForTokenToWill2(address token) external view returns (address[] memory){
		address[] memory path = new address[](4);
		path[0] = token;
		path[1] = USDC_ADDRESS;
		path[2] = uniswapRouter.WETH();
		path[3] = address(this);
		return path;
	}
	
	
}