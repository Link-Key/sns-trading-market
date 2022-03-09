<template>
  <div id="wallet">
    <WalletComponent :info="userInfo" :balance="balance" :callback="onClick" ></WalletComponent>
    <ListedCollectionComponent :buttons="buttonsCollect" :data="collects" :callback="selectCollection"></ListedCollectionComponent>
    <ListedItemsComponent :buttons="buttons" :items="items" :callback="selectItems"></ListedItemsComponent>
    <TradingHistoryComponent :items="tradingHistory"></TradingHistoryComponent>
    <EditProfilePopupComponent :callback="onPopupClick" :show="editPopup" :info="profile"></EditProfilePopupComponent>
    <Popup :title="popup.title" :singleButton="true" :loading="popup.loading" :callback="popup.callback" :contents="popup.contents" v-if="popup.show"></Popup>
  </div>
</template>

<script>
import WalletComponent from '@/components/wallet/WalletComponent.vue'
import ListedCollectionComponent from '@/components/wallet/ListedCollectionComponent.vue'
import ListedItemsComponent from '@/components/wallet/ListedItemsComponent.vue'
import TradingHistoryComponent from '@/components/item/TradingHistoryComponent.vue'
import EditProfilePopupComponent from '@/components/wallet/EditProfilePopupComponent.vue'
import Popup from '@/components/popups/PopupComponent.vue'

import Web3 from 'web3'

export default {
  mounted(){
    this.$wallet.addListener( ( success, params )=>{
      if( success ){
        this.setDatas()
      }else{
        location.href = '/connect'
      }
    })

    if( window.ethereum ){
      window.ethereum.on('accountsChanged', (accounts)=>{
        this.$wallet.checkConnectedWithGetUserInfo(window)
      })
    }
  },
  data () {
    return {
      userInfo:{},
      balance:"0",
      tradingHistory:[],
      editPopup:false,
      profile:{
        name:"",
        introduction:""
      },
      buttons:['All items','On sale now', 'Bidding'],
      buttonsCollect:['All Collections','Pending', 'Approved'],
      userOrders:[],
      collectsList:[],
      items:[],
      collects:[],
      position:0,
      popup:{
        show:false,
        title:"Create NFT",
        contents:"",
        callback:null,
        loading:false
      }
    }
  },
  methods:{
    selectItems( position ){
      this.position = position
      if( position === 0 ){
        this.items = this.userOrders
      }else if( position === 1 ){
        this.items = this.userOrders.filter( (element)=>{ return element.type === 0 } )
      }else if( position === 2 ){
        this.items = this.userOrders.filter( (element)=>{ return element.type === 1 } )
      }
    },
    selectCollection( position ){
      this.position = position
      if( position === 0 ){
        this.collects = this.collectsList
      }else if( position === 1 ){
        this.collects = this.collectsList.filter( (element)=>{ return element.status === 0 } )
      }else if( position === 2 ){
        this.collects = this.collectsList.filter( (element)=>{ return element.status === 1 } )
      }
    },
    setDatas(){
      window.document.title = ( this.$store.state.userInfo.name ? this.$store.state.userInfo.name : 'Unnamed' ) + "'s Wallet"
      this.userInfo = this.$store.state.userInfo
      this.$wallet.getBalance( window.ethereum, this.$store.state.userInfo.address ).then( (balance)=>{this.balance = balance} ).catch(()=>{this.balance = "0"})
      this.profile = {
        name:this.$store.state.userInfo.name,
        introduction:this.$store.state.userInfo.introduction,
      }
      this.getData()
      setInterval( ()=>{
        this.getData()
      }, 10000 )

    },
    onClick(){
      this.editPopup = true;
    },
    getData(){

      this.$axios.post( '/v1/collection', {method:"GetCollectionList", param:{owner:this.$store.state.userInfo.address}} ).then((res)=>{
        if( res.data != null ){
          console.log('res.data=====',res.data.data)
          this.collectsList = res.data.data
          this.selectCollection(this.position)
        }
      }).catch(()=>{})

      this.$axios.post( '/v1/auction', {method:"GetUserOrders", param:{address:this.$store.state.userInfo.address}} ).then((res)=>{
        if( res.data != null ){
          this.userOrders = res.data
          this.selectItems(this.position)
        }

      }).catch(()=>{})

      this.$axios.post( '/v1/auction', {method:"GetHistoryByUserAddress", param:{address:this.$store.state.userInfo.address}} ).then((res)=>{
        if( res.data != null ) this.tradingHistory = res.data
      }).catch(()=>{})
    },
    onPopupClick( id, confirm, params ){
      if( confirm ){
        // UpdateUserInfo
        if( this.$store.state.userInfo.registered == 0 ){
          this.$axios.post( '/v1/account', {method:"RegisterUser", param:{account:this.$store.state.userInfo.account, introduction:this.profile.introduction ,name:this.profile.name, email:"", signature:""}} ).then((res)=>{
            location.href = "/wallet"
          }).catch((e)=>{

            this.popup.title = "Error"
            this.popup.contents = "Failed Update User Info"
            this.popup.loading = false
            this.popup.show = true
            this.popup.callback = ()=>{
              this.popup.show = false
            }

          })
        }else{
          this.$axios.post( '/v1/account', {method:"UpdateUserInfo", param:{account:this.$store.state.userInfo.account, introduction:this.profile.introduction ,name:this.profile.name, email:"", signature:""}} ).then((res)=>{
          location.href = "/wallet"
        }).catch(()=>{})
        }
      }
      this.editPopup = false;
    }
  },
  components:{
    WalletComponent,
    ListedCollectionComponent,
    ListedItemsComponent,
    TradingHistoryComponent,
    EditProfilePopupComponent,
    Popup
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#wallet{
  min-height: calc( 100vh - 65px );
}
</style>
