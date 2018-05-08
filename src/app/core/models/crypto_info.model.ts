export interface CryptoInfo {
    id: number, 
    name: string, 
    symbol: string, 
    website_slug: string, 
    rank: number, 
    circulating_supply: number, 
    total_supply: number, 
    max_supply: number, 
    quotes: {
        USD:{
            market_cap:number,
        percent_change_1h:number,
        percent_change_7d:number,
        percent_change_24h:number,
        price:number,
        volume_24h:number,
        }
        BTC:{
            market_cap:number,
        percent_change_1h:number,
        percent_change_7d:number,
        percent_change_24h:number,
        price:number,
        volume_24h:number,
        }
        ETH:{
            market_cap:number,
        percent_change_1h:number,
        percent_change_7d:number,
        percent_change_24h:number,
        price:number,
        volume_24h:number,
        }
        XRP:{
            market_cap:number,
        percent_change_1h:number,
        percent_change_7d:number,
        percent_change_24h:number,
        price:number,
        volume_24h:number,
        }
        BCH:{
            market_cap:number,
        percent_change_1h:number,
        percent_change_7d:number,
        percent_change_24h:number,
        price:number,
        volume_24h:number,
        }
        LTC:{
            market_cap:number,
        percent_change_1h:number,
        percent_change_7d:number,
        percent_change_24h:number,
        price:number,
        volume_24h:number,
        }
    },
    last_updated: number
  }