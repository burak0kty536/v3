import { EventEmitter } from 'events';
import { TradingEngine } from '../trading/TradingEngine';
import { SecurityChecker } from '../security/SecurityChecker';
import { PriceMonitor } from './PriceMonitor';

export class TradingStrategy extends EventEmitter {
  private engine: TradingEngine;
  private security: SecurityChecker;
  private priceMonitor: PriceMonitor;
  private active: boolean = false;

  constructor() {
    super();
    this.engine = new TradingEngine();
    this.security = new SecurityChecker();
    this.priceMonitor = new PriceMonitor();
  }

  async startAutoTrading(params: AutoTradeParams) {
    this.active = true;
    
    while (this.active) {
      try {
        const price = await this.priceMonitor.getCurrentPrice(params.chain, params.tokenAddress);
        
        if (this.shouldBuy(price, params)) {
          await this.executeBuy(params);
        } else if (this.shouldSell(price, params)) {
          await this.executeSell(params);
        }
        
        await new Promise(resolve => setTimeout(resolve, params.interval));
      } catch (error) {
        this.emit('error', error);
      }
    }
  }

  private shouldBuy(currentPrice: number, params: AutoTradeParams): boolean {
    return currentPrice <= params.buyPrice;
  }

  private shouldSell(currentPrice: number, params: AutoTradeParams): boolean {
    return currentPrice >= params.sellPrice || currentPrice <= params.stopLoss;
  }

  private async executeBuy(params: AutoTradeParams) {
    const security = await this.security.checkHoneypot(params.chain, params.tokenAddress);
    if (!security.safe) {
      this.emit('security-warning', 'Token güvenli değil');
      return;
    }

    await this.engine.executeTrade({
      chain: params.chain,
      tokenAddress: params.tokenAddress,
      amount: params.amount,
      slippage: params.slippage,
      walletKey: params.walletKey
    });
  }

  stop() {
    this.active = false;
  }
}

interface AutoTradeParams {
  chain: string;
  tokenAddress: string;
  amount: number;
  buyPrice: number;
  sellPrice: number;
  stopLoss: number;
  slippage: number;
  interval: number;
  walletKey: string;
}