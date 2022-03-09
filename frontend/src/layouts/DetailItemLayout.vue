<template>
  <div>
    <DetailComponent :info="info" :callback="onClick" :enableList="enableList"></DetailComponent>
    <TradingHistoryComponent :items="tradingHistory"></TradingHistoryComponent>
    <BuyPopup :callback="onPopupClick" :item="info"  :show="buyPopup.show"></BuyPopup>
    <BidPopup :callback="onPopupClick" :item="info" :show="bidPopup.show"></BidPopup>
    <Popup :callback="onPopupClick" :item="info" :title="popup.title" :contents="popup.contents" v-if="popup.show"></Popup>
    <Popup :title="alert.title" :singleButton="true" :loading="alert.loading" :callback="alert.callback" :contents="alert.contents" v-if="alert.show"></Popup>
  </div>
</template>

<script>
import DetailComponent from '@/components/item/DetailComponent.vue'
import TradingHistoryComponent from '@/components/item/TradingHistoryComponent.vue'

import Popup from '@/components/popups/PopupComponent.vue'
import BuyPopup from '@/components/item/popups/BuyPopupComponent.vue'
import BidPopup from '@/components/item/popups/BidPopupComponent.vue'


import Axios from 'axios'
import Web3 from 'web3'

export default {
  mounted(){
    this.setDatas()
    setInterval( ()=>{
      this.setDatas()
    }, 10000 )
  },
  data () {
    return {
      info:{
        auctionid: null,
        auctiontype: null,
        description: null,
        image: null,
        itemaddress: null,
        itemid: null,
        name: null,
        price: 0,
        seller: null,
        sellerName: null,
        bidHistory:[],
      },
      enableList:false,
      tradingHistory:[],
      popup:{
        show:false,
        title:"Confirmation",
        contents:"Are you sure that you want to accept this bid price?"
      },
      bidPopup:{
        show:false
      },
      buyPopup:{
        show:false
      },
      defaultPopup:null,
      alert:{
        show:false,
        title:"Create NFT",
        contents:"",
        callback:null,
        loading:false
      }
    }
  },
  methods:{
    setDatas(){
      this.$axios.post( '/v1/auction', {method:"GetSellerInfo", param:{address:this.$route.params.address, id:this.$route.params.id}} )
      .then((res)=>{
        if( res.data && res.data.status != 500 ){
          this.info = res.data
          window.document.title = this.info.name

          this.$wallet.addListener( ()=>{
            if( this.info.auctionid == -1 ){
              this.$axios.post( '/v1/auction', {method:"GetUserOrders", param:{address:this.$store.state.userInfo.address}} ).then((res)=>{
                var enableList = false
                if( res.data != null ){
                  res.data.forEach(element => {
                    if( element.itemaddress == this.$route.params.address && element.itemid == this.$route.params.id ){
                      enableList = true
                    }
                  });
                }
                this.enableList = enableList
              }).catch(()=>{})
            }
          })
          this.$wallet.checkConnectedWithGetUserInfo(window)

        }
        
      })
      .catch((e)=>{})

      this.$axios.post( '/v1/auction', {method:"GetHistoryByNftId", param:{address:this.$route.params.address, id:this.$route.params.id}} )
      .then( (res)=>{
        console.log("tradingHistory", this.tradingHistory, res.data)
        if( typeof(res.data) == 'array' ){
          this.tradingHistory = res.data
          console.log("tradingHistory", this.tradingHistory)
        }
      })
    },
    onClick( id, state ){
      if( id == 'action' ){

        if( state == 'bid' ){
          if( this.info.seller == this.$store.state.userInfo.address ){
            
            this.defaultPopup = "accept"
            this.popup.contents = "Are you sure that you want to accept this bid price?"
            this.popup.show = true

          }else{
            this.bidPopup.show = true
          }

        }else if( state == 'fixed' ){
          this.buyPopup.show = true

        }else if( state == 'not-listed' ){
          location.href = "/listing/" + this.info.itemaddress + "/" + this.info.itemid
        }

      }else if( id == 'cancel' ){
        this.defaultPopup = "cancel"
        this.popup.contents = "Are you sure that you want to cancel this listing?"
        this.popup.show = true
      }
    },
    onPopupClick( id, confirm, params ){
      if( id == 'buy' ){
        if( confirm ){
          this.$wallet.bid( window.ethereum, this.info.auctionid , this.$store.state.userInfo.address, params[0], params[1] ).then(()=>{
            this.buyPopup.show = false
            location.href = "/wallet"
          }).catch(console.log)
        }else{
          this.buyPopup.show = false
        }
      }else if( id == 'bid' ){
        if( confirm ){
          this.$wallet.bid( window.ethereum, this.info.auctionid , this.$store.state.userInfo.address, params[0], params[1] ).then(()=>{
            this.bidPopup.show = false
          }).catch(console.log)
        }else{
          this.bidPopup.show = false
        }
      }else{
        if( this.defaultPopup == 'cancel' ){
          if( confirm ){
            this.$wallet.cancelAuction( window.ethereum, this.info.auctionid ).then((res)=>{
              location.href = "/wallet"
            }).catch(()=>{
              this.alert.title = "Cancel Auction"
              this.alert.contents = "Failed Cancel Actuon"
              this.alert.show = true
              this.alert.callback = ()=>{
                this.alert.show = false
              }
            })
          }
        }else if( this.defaultPopup == 'accept' ){
          if( confirm ){
            this.$wallet.accept( window.ethereum, this.info.auctionid ).then((res)=>{
              location.href = "/wallet"
            }).catch(()=>{
              this.alert.title = "Accept Auction"
              this.alert.contents = "Failed Accept Actuon"
              this.alert.show = true
              this.alert.callback = ()=>{
                this.alert.show = false
              }
            })
          }
        }
        this.defaultPopup = null
        this.popup.show = false

      }
    }
  },
  components:{
    DetailComponent,
    TradingHistoryComponent,
    BuyPopup,
    BidPopup,
    Popup
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
