import Axios from 'axios'
import Web3 from 'web3'

import ERC721_CONTRACT_ABI from '@/assets/json/nft_erc721_abi.json'
import MARKET_CONTRACT_ABI from '@/assets/json/nft_market_abi.json'

class WalletManager{

    constructor( store ){
        this.store = store
        this.listeners = []
    }

    // Listener for checkConnected
    addListener( listener ){
        if( listener != null && typeof(listener) == 'function'  ){
            this.listeners.push( listener )
        }
    }

    removeListener( listener ){
        if( listener != null && typeof(listener) == 'function' && this.listeners.indexOf(listener) > -1 ){
            this.listeners.splice(  this.listeners.indexOf(listener) ,1 )
        }
    }

    // Connected Check
    checkConnectedWithGetUserInfo( window ){
        if( window.ethereum ){
            window.ethereum.request({ method: 'eth_accounts' }).then( (addresses)=>{
                if( addresses != null && addresses.length > 0 ){
                    const address = Web3.utils.toChecksumAddress( addresses[0] )

                    if( this.store.state.userInfo.isSet && this.store.state.userInfo.address == address ){
                        console.log(this.listeners)
                        this.listeners.forEach( (listener)=>{
                            listener( true, this.store.state.userInfo )
                        })
                    }else{

                        Axios.post( '/v1/account', {method:"GetUserInfo", param:{account:address} } ).then((res)=>{
                            try{
                                if( res.data.registered == 0 ){
                                    this.setNoBody()
                                    this.listeners.forEach( (listener)=>{
                                        listener( false, ["result data catch error", res.data] )
                                    })
                                }else{
                                    if( res.data != null && res.data.status == 500 ){
                                        this.listeners.forEach( (listener)=>{
                                            listener( false, ["result data catch error", res.data] )
                                        })
                                    }else{
                                        this.setUserInfo(res.data)
                                        this.listeners.forEach( (listener)=>{
                                            listener( true, this.store.state.userInfo )
                                        })
                                    }
                                }
                            }catch(e){
                                this.setNoBody()
                                this.listeners.forEach( (listener)=>{
                                    listener( false, ["result data catch error", res.data] )
                                })
                            }
                        }).catch((e)=>{
                            this.setNoBody()
                            this.listeners.forEach( (listener)=>{
                                listener( false, ["not signed server"] )
                            })
                        })
                    }
                }else{
                    this.setNoBody()
                    this.listeners.forEach( (listener)=>{
                        listener( false, ["eth_accounts size is zero"] )
                    })
                }
            }).catch((e)=>{
                this.setNoBody()
                this.listeners.forEach( (listener)=>{
                    listener( false, ["not support metamask"] )
                })
            })
        }else{
            this.setNoBody()
            this.listeners.forEach( (listener)=>{
                listener( false, ["not support metamask"] )
            })
        }
    }

    setNoBody(){
        this.store.commit('setNoBody')
    }

    setUserInfo( info ){
        this.store.commit('setUserInfo', {
            isSet:true,
            address:info.account ? info.account : "",
            account:info.account ? info.account : "",
            name:info.name ? info.name:"",
            email:info.email ? info.email: "",
            isadmin:info.isadmin ? info.isadmin: "",
            introduction:info.introduction ? info.introduction : ""
        })
    }

    // On Chain Functions
    getBalance( provider ,address ){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    web3.eth.getBalance( address, web3.eth.defaultBlock, (error, result) => {
                        if(!error) resolve(web3.utils.fromWei(result, 'ether'))
                        else reject()
                    })
                }catch(e){
                    console.log(e)
                    reject()
                }
            }else{
                reject()
            }
        })
    }

    createCollection( provider ,options ){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    const myContract = new web3.eth.Contract(ERC721_CONTRACT_ABI);
                    myContract.deploy({
                        data: '' //合约的字节码
                    }).send({from:address}).then( (res)=>{
                        resolve( res )
                    } ).catch(reject)
                }catch(e){
                    console.log(e)
                    reject()
                }
            }else{
                reject()
            }
        })
    }

    createNft( provider, address ,url ){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    const nft = new web3.eth.Contract(ERC721_CONTRACT_ABI, process.env.ERC721_CONTRACT_ADDRESS);
                    nft.methods.mint( address, url ).send({from:address}).then( (res)=>{
                        resolve( res )
                    } ).catch(reject)
                }catch(e){
                    console.log(e)
                    reject()
                }
            }else{
                reject()
            }
        })
    }

    getMarketPlace(provider){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    const market = new web3.eth.Contract(MARKET_CONTRACT_ABI, process.env.MARKET_CONTRACT_ADDRESS);
                    resolve(market)
                }catch(e){
                    reject()
                }
            }else{
                reject()
            }
        })
    }

    calcFee( provider, amount ){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    const market = new web3.eth.Contract(MARKET_CONTRACT_ABI, process.env.MARKET_CONTRACT_ADDRESS);
                    market.methods.calcFee( 3, amount ).call().then( (res)=>{
                        resolve( res )
                    })
                }catch(e){
                    reject()
                }
            }else{
                reject()
            }
        })
    }

    getHighBid( provider, autcionId ){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    const market = new web3.eth.Contract(MARKET_CONTRACT_ABI, process.env.MARKET_CONTRACT_ADDRESS);
                    market.methods.getHighBid( autcionId ).call().then( (res)=>{
                        resolve(res)
                    })
                }catch(e){
                    reject()
                }
            }else{
                reject()
            }
        })
    }

    bid( provider, autcionId ,address , amount, calcFee ){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    const market = new web3.eth.Contract(MARKET_CONTRACT_ABI, process.env.MARKET_CONTRACT_ADDRESS);
                    market.methods.bid( autcionId, amount ).send( {from:address, value:web3.utils.toBN(calcFee).add( web3.utils.toBN(amount) ).toString() } ).then( (res)=>{
                        resolve(res)
                    })
                }catch(e){
                    reject()
                }
            }else{
                reject()
            }
        })
    }

    accept( provider, auctionId ){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    const market = new web3.eth.Contract(MARKET_CONTRACT_ABI, process.env.MARKET_CONTRACT_ADDRESS);
                    market.methods.accept( auctionId ).send( {from:this.store.state.userInfo.address } ).then( (res)=>{
                        resolve(res)
                    }).catch( ()=>{
                        reject()
                    } )
                }catch(e){
                    console.log(e)
                    reject()
                }
            }else{
                reject()
            }
        })
    }

    cancelAuction( provider, auctionId ){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    const market = new web3.eth.Contract(MARKET_CONTRACT_ABI, process.env.MARKET_CONTRACT_ADDRESS);
                    market.methods.cancelAuction( auctionId ).send( {from:this.store.state.userInfo.address } ).then( (res)=>{
                        resolve(res)
                    }).catch( ()=>{
                        reject()
                    } )

                }catch(e){
                    console.log(e)
                    reject()
                }
            }else{
                reject()
            }
        })
    }

    isApprovedForAll( provider, address,owner ){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    const nft = new web3.eth.Contract(ERC721_CONTRACT_ABI, address);
                    nft.methods.isApprovedForAll( owner, process.env.MARKET_CONTRACT_ADDRESS ).call().then( (res)=>{
                        console.log(res)
                        resolve( res )
                    } ).catch(reject)
                }catch(e){
                    console.log(e)
                    reject()
                }
            }else{
                reject()
            }
        })
    }


    setApprovalForAll( provider, address ,open ){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    const nft = new web3.eth.Contract(ERC721_CONTRACT_ABI, address);
                    nft.methods.setApprovalForAll( process.env.MARKET_CONTRACT_ADDRESS, open ).send({from:this.store.state.userInfo.address}).then( (res)=>{
                        resolve( res )
                    } ).catch(reject)
                }catch(e){
                    console.log(e)
                    reject()
                }
            }else{
                reject()
            }
        })
    }

    listing( provider, auctionType/* 0 or 1 */, nftAddress, tokenId, startPrice ){
        return new Promise( (resolve, reject)=>{
            if( provider != null ){
                try{
                    const web3 = new Web3( provider )
                    const market = new web3.eth.Contract(MARKET_CONTRACT_ABI, process.env.MARKET_CONTRACT_ADDRESS);

                    console.log(market.methods);

                    market.methods.getMarketData().call().then((info)=>{

                      console.log(info)

                      market.methods.create( auctionType, nftAddress, parseInt(tokenId), startPrice )
                      .send({from:this.store.state.userInfo.address, value: info.listingDeposit})
                      .then( (res)=>{
                          resolve( res )
                      }).catch(reject)

                    }).catch(reject);

                }catch(e){
                    console.log(e)
                    reject()
                }
            }else{
                reject()
            }
        })
    }



}

export default WalletManager
