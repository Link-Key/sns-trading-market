<template>
    <div id="create">
      <div class="wrap">
        <h1>List your item</h1>
        <div class="input__group">
          <div :class="'preview ' + ( isVoice ? 'voice':'' )">
              <img :src="preview">
          </div>
        </div>
        <div class="input__group" v-if="isApprove">
          <h2>Price Setting</h2>
          <div class="radio__group">
            <input id="fiexd" name="type" type="radio" value="0" v-model="type" checked><label for="fiexd">Fixed price</label>
            <input id="bidding" name="type" type="radio" value="1" v-model="type"><label for="bidding">Bidding</label>
          </div>
          <div style="display:flex">
            <input type="number" placeholder="Amount" v-model="amount">
            <select>
              <option value="eth" selected>ETH</option>
              <option value="nft">NFT</option>
            </select>
          </div>
        </div>
        <div class="input__group">
          <button class="submit" :disabled="!isEnable()" @click="onClick">{{ isApprove ? "List Item" : "Unlock Item" }}</button>
        </div>
      </div>
      <Popup :title="popup.title" :singleButton="true" :loading="popup.loading" :callback="popup.callback" :contents="popup.contents" v-if="popup.show"></Popup>
  </div>
</template>

<script>
import Web3 from 'web3'
import Popup from '@/components/popups/PopupComponent.vue'

export default {
  mounted(){
    this.$axios.post( '/v1/auction', {method:"GetSellerInfo", param:{address:this.$route.params.address, id:this.$route.params.id}} )
    .then((res)=>{
      this.info = res.data
      window.document.title = this.info.name

      if( this.info.image ){
        this.preview = this.info.image
      }

      this.$wallet.addListener( ()=>{

      if( this.info.auctionid === -1 ){
         this.$axios.post( '/v1/auction', {method:"GetUserOrders", param:{address:this.$store.state.userInfo.address}} ).then((res)=>{
           var enableList = false
          if( res.data != null ){
            res.data.forEach(element => {
              if( element.itemaddress == this.$route.params.address && element.itemid == this.$route.params.id ){
                enableList = true
                this.$wallet.isApprovedForAll( window.ethereum, this.info.itemaddress ,this.$store.state.userInfo.address ).then( (res)=>{
                      this.isApprove = res
                } ).catch( console.log )
              }
            });
          }
          this.enableList = enableList
        }).catch(()=>{})
      }
    })
    this.$wallet.checkConnectedWithGetUserInfo(window)
    })
    .catch((e)=>{})
  },
  data () {
    return {
      isApprove:false,
      isVoice:false,
      type:0,
      amount:null,
      preview:null,
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
      popup:{
        show:false,
        title:"Listing NFT",
        contents:"",
        callback:null,
        loading:false
      }
    }
  },
  methods:{
    isEnable(){
      if( !this.isApprove ) return true
      if( !this.enableList ) return false
      try{
        return this.amount != null && this.amount.length > 0  && parseFloat(this.amount) > 0
      }catch(e){
        console.log(e)
        return false
      }
    },
    onClick(){
      if( this.isApprove ){


        this.popup.title = "Listing"
        this.popup.contents = "Please wait a minute..."
        this.popup.loading = true
        this.popup.show = true
        this.popup.callback = ()=>{
        }

        console.log('window.ethereum',window.ethereum)
        console.log('this.type',this.type)
        console.log('this.$route.params.address',this.$route.params.address)
        console.log('this.$route.params.id',this.$route.params.id)
        console.log('Web3.utils.toWei( this.amount, "ether" )',Web3.utils.toWei( this.amount, "ether" ))
        this.$wallet.listing( window.ethereum, this.type, this.$route.params.address, this.$route.params.id, Web3.utils.toWei( this.amount, "ether" ) )
        .then( (res)=>{
          console.log('res=',res)
            this.popup.title = "Listing"
            this.popup.contents = "Success Listing"
            this.popup.loading = false
            this.popup.show = true
            this.popup.callback = ()=>{
            this.popup.show = false
            location.href = "/wallet"
          }
         }).catch( (err)=>{
            console.log('err=', err)
            this.popup.title = "Error"
            this.popup.contents = "Failed Listing"
            this.popup.loading = false
            this.popup.show = true
            this.popup.callback = ()=>{
              this.popup.show = false
            }
         })

      }else{
        this.popup.title = "Unlock"
        this.popup.contents = "Please wait a minute..."
        this.popup.loading = true
        this.popup.show = true
        this.popup.callback = ()=>{
        }

        this.$wallet.setApprovalForAll( window.ethereum,  this.info.itemaddress ,true ).then( ()=>{
          this.popup.title = "Unlock"
          this.popup.contents = "Success Unlock"
          this.popup.loading = false
          this.popup.show = true
          this.popup.callback = ()=>{
            this.popup.show = false
            location.href = "/wallet"
          }
        }).catch(()=>{
           this.popup.title = "Unlock"
          this.popup.contents = "Failed Unlock"
          this.popup.loading = false
          this.popup.show = true
          this.popup.callback = ()=>{
            this.popup.show = false
          }
        })
      }
    }
  },
  components:{
    Popup
  }
}
</script>

<style lang="scss" scoped>
#create{
  min-height: calc( 100vh - 65px );
  padding-bottom: 100px;

  h1{
    width: 100%;
    margin-top: 160px;
    padding-bottom: 52px;
    margin-bottom: 28px;
    border-bottom: 1px solid #d7d7d7;
    font-size: 2rem;
    font-weight: bold;
    color: #222222;
  }

  .input__group{
    margin-top: 32px;

    h2{
      font-size: 1rem;
      font-weight: bold;
      color: #222222;
      margin-bottom: 12px;
    }

    .radio__group{
      margin-bottom: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;

      input[type=radio]{
        margin: 0 18px 0 36px;

        &:nth-child(1){
          margin-left: 0;
        }
      }

      label{
        font-size: 0.875rem;
        color: #222222;
      }
    }

    input[type=text],input[type=number]{
      height: 48px;
      min-width:180px;
      width: 30%;
      border-radius: 16px;
      padding: 0 20px;
      line-height: 48px;
      border: solid 1px #dadada;
      background-color: #ffffff;
      outline: none;
      font-size: 0.875rem;
      color: #222222;

      &::placeholder{
        color:#a8a8a8;
      }

      &:focus{
        border-color: #0564ff;
      }
    }

    select {
      background: transparent;
      font-family: 'Nunito Sans', sans-serif;
      padding-left: 14px;
      height: 48px;
      min-width: 60px;
      width: 30%;
      font-size: 0.875rem;
      color: #222222;
      outline: none;
      border: none;
      appearance: none;
      /* for Firefox */
      -moz-appearance: none;
      /* for Chrome */
      -webkit-appearance: none;
      /* For IE10 */
      &::-ms-expand {
        display: none;
      }
    }

  }
  .preview{
    position: relative;
    max-width: 550px;
    min-width: 250px;
    min-height: 200px;
    width: 60%;

    &.voice{
      width: 250px;
      height: 250px;
    }

    img{
      width: 100%;
      border-radius: 36px;
    }

    .close{
      position: absolute;
      right: 18px;
      top: 18px;
      width: 28px;
      height: 28px;
      background-color: transparent;
      background-image: url('~@/assets/images/icon_close.png');
      background-size: 100%;
      background-repeat: no-repeat;
      outline: none;
      border: none;
      z-index: 7;
    }
  }

  .submit{
    justify-content: center;
    align-items: center;
    height: 54px;
    padding: 0 124px;
    margin-top: 13px;
    border-radius: 16px;
    background-color: #092148;
    font-size: 1.125rem;
    color: white;
    z-index: 2;

    &:disabled{
      background-color: #eaeaea;
      color: #adaaaa;
    }
  }
}


@media screen and ( max-width: 768px ) {
#create{
  min-height: calc( 100vh - 65px );
  padding-bottom: 100px;

  h1{
    margin-top: 108px;
  }

  .input__group{
    margin-top: 32px;

    h2{
      font-size: 1rem;
      font-weight: bold;
      color: #222222;
      margin-bottom: 12px;
    }

    input[type=text], select{
      display: flex;
      height: 48px;
      min-width:0;
      width: calc( 60% - 40px );
    }

    select {
      font-family: 'Nunito Sans', sans-serif;
      padding-left: 14px;
      height: 48px;
      min-width: 60px;
      width: 25%;
      font-size: 0.875rem;
      color: #222222;
      outline: none;
      border: none;
      appearance: none;
      /* for Firefox */
      -moz-appearance: none;
      /* for Chrome */
      -webkit-appearance: none;
      /* For IE10 */
      &::-ms-expand {
        display: none;
      }
    }

    .file{
      min-width:0;
      width: 100%;

      p{
        font-size: 0.875rem;
      }

    }

  }
  .preview{
    max-width: 100%;
    min-width: 0;
    min-height: 200px;
    width: 100%;

    &.voice{
      width: 250px;
      height: 250px;
    }

    img{
      width: 100%;
      border-radius: 36px;
    }
  }

  .submit{
      width: 100%;
      padding: 0;
    }
  }
}

</style>
