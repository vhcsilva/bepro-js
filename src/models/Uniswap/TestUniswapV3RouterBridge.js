import { uniswapRouterBridge } from '../../interfaces';
import Numbers from '../../utils/Numbers';
import IContract from '../IContract';

/** @typedef {Object} TestUniswapV3RouterBridge~Options
* @property {address} _swapRouter
* @property {Boolean} test
* @property {Boolean} localtest
* @property {Web3Connection} [web3Connection=Web3Connection]
* @property {address} [contractAddress]
*/

/**
 * TestUniswapV3RouterBridge Object
 * @class TestUniswapV3RouterBridge
 * @param {TestUniswapV3RouterBridge~Options} options
 */
export default class TestUniswapV3RouterBridge extends IContract {
  constructor(params) {
    super({ abi: uniswapRouterBridge, ...params });

    if (!params.swapRouterAddress) {
      throw new Error('Please provide an SwapRouter contract address');
    }

    this.params.swapRouterAddress = params.swapRouterAddress; // swapRouter exchange contract address
  }

  /**
   * @returns {Promise<address>}
   */
  async swapRouter() {
    return await this.getContract().methods.swapRouter().call();
  }

  /**
   * @param {Object} params
   * @param {address} params.tokenIn
   * @param {address} params.tokenOut
   * @param {uint24} params.poolFee
   * @param {uint256} params.amountIn
   * @param {uint256} params.amountOutMinimum
   * @returns {Promise<uint256>} amountOut
   */
  async swapExactInputSingleEx({
    tokenIn, tokenOut, poolFee, amountIn, amountOutMinimum,
  }, options) {
    return await this.__sendTx(
      this.getContract().methods.swapExactInputSingleEx(tokenIn, tokenOut, poolFee, amountIn, amountOutMinimum),
      options,
    );
  }

  /**
   * @param {Object} params
   * @param {address} params.tokenIn
   * @param {address} params.tokenOut
   * @param {uint24} params.poolFee
   * @param {uint256} params.amountOut
   * @param {uint256} params.amountInMaximum
   * @returns {Promise<uint256>} amountIn
   */
  async swapExactOutputSingleEx({
    tokenIn, tokenOut, poolFee, amountOut, amountInMaximum,
  }, options) {
    return await this.__sendTx(
      this.getContract().methods.swapExactOutputSingleEx(tokenIn, tokenOut, poolFee, amountOut, amountInMaximum),
      options,
    );
  }

  /**
   * Deploy the TestUniswapV3RouterBridge Contract
   * @function
   * @param {Object} params Parameters
   * @param {function():void} params.callback
   * @return {Promise<*|undefined>}
   * @throws {Error} No Token Address Provided
   */
  deploy = async ({
    callback,
  } = {}) => {
    const params = [this.params.swapRouterAddress];

    const res = await this.__deploy(params, callback);
    this.params.contractAddress = res.contractAddress;
    /* Call to Backend API */
    await this.__assert();
    return res;
  };
}
