<template>
  <div id="wallet">
    <ConnectComponent :callback="selectWallet" :enable-metamask="enableMetamask"></ConnectComponent>
    <Popup :title="popup.title" :singleButton="true" :loading="popup.loading" :callback="popup.callback" :contents="popup.contents" v-if="popup.show"></Popup>
  </div>
</template>

<script>
import ConnectComponent from '@/components/connect/ConnectComponent.vue'
import Popup from '@/components/popups/PopupComponent.vue'
import Web3 from 'web3'

export default {
  mounted(){
    window.document.title = "Wallet Connect"
    if (window.ethereum) {
        this.enableMetamask = true
    }else{
      this.enableMetamask = false
    }

    this.$wallet.addListener( (success, params)=>{
      if( success ){
        location.href = '/wallet'
      }
    })
  },
  data () {
    return {
      enableMetamask:false,
      popup:{
        show:false,
        title:"Error",
        contents:"Connect to server failed",
        callback:null,
        loading:false
      }
    }
  },
  methods:{
    selectWallet( wallet ){
      switch( wallet ){
        case 'metamask':
          if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then( (addresses)=>{
              // Login 시점
              if( addresses != null && addresses.length > 0 ){

                // Sign Signature
                // const web3 = new Web3( window.ethereum )
                // var message = "Some string"
                // var hash = web3.utils.sha3(message)
                // web3.eth.personal.sign(hash, addresses[0]).then((signature)=>{
                // }).catch(()=>{})

                // Recover Signature
                // var hash = web3.utils.sha3(message)
                // var signing_address = await web3.eth.personal.ecRecover(hash, signature)
                this.$axios.post( '/v1/account', {method:"RegisterUser", param:{account:addresses[0], name:"Noname", email:"", introduction:"",signature:""}} ).then((res)=>{
                  if( res.data != null ){
                    this.$wallet.checkConnectedWithGetUserInfo(window)
                  }
                }).catch((e)=>{
                  
                  if( e.response && e.response.data ){
                    this.$wallet.checkConnectedWithGetUserInfo(window)
                  }else{
                    this.popup.callback = ()=>{
                      this.popup.show = false
                      location.href = '/'
                    }
                    this.popup.show=true
                  }
                  
                })
              }
            }).catch( (e)=>{
              this.popup.callback = ()=>{
                this.popup.show = false
              }
              this.popup.show=true
            })
          }
          break
      }
    },
  },
  components:{
    ConnectComponent,
    Popup
  }
}
</script>