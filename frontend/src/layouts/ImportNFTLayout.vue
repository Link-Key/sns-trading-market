<template>
  <div class="import">
      <div class="wrap">
        <h1>Import NFT from another source</h1>
        <div class="input__group">
          <h2>Enter your contract address</h2>
          <p>*Currently we only support ERC721 contract on the main Ethereum Network</p>
          <input :class="error?'error':''" type="text" placeholder="Contract Address" v-model="address">
          <small>{{error}}</small>
          <a>You have any problem for importing process?</a>
        </div>
        <div class="input__group">
          <button class="submit" @click="importNft" :disabled="checkInvalidAddress()">Import NFT</button>
        </div>
      </div>
      <Popup title="Success" confirm="OK" :singleButton="true" :contents="contents" :callback="onPopupClick" v-if="popup"></Popup>
  </div>
</template>

<script>
import Popup from '@/components/popups/PopupComponent.vue'
export default {
  created(){
    
  },
  mounted(){
  },
  data () {
    return {
      address:null,
      error:null,
      popup:false
    }
  },
  methods:{
    onPopupClick( id, confirm){
      this.popup = false
      if( this.$store.state.userInfo.isSet ){
        location.href = '/wallet'
      }
    },
    checkInvalidAddress(){
      // address
      var invalid = !( this.address != null && (( this.address.indexOf("0x") > -1 && this.address.length == 42 ) || ( this.address.indexOf("0x") == -1 && this.address.length == 40 ) ) )
      if( invalid ){
        if( this.address == null || this.address.length == 0 ){
          this.error = null
        }else{
          this.error = "Invalid Address"
        }
        
      }else{
        this.error = null
      }
      return invalid
    },
    importNft(){
      this.$axios.post( '/v1/account', {method:"RegisterNFT", param:{address:this.address}} )
        .then( (res)=>{
          if( res.data ){
            if( res.data.status == 500 ){
              this.error = "Invalide Address"
              return
            }
            switch( res.data.ret ){
              case -1:
                this.error = "Invalide Contract"
                break
              case 0:
                this.contents = "Registration was successful. It takes about 3 days to complete synchronization."
                this.popup.show = true
                break
              case 1:
                this.contents = "Registration was successful. It takes about 3 days to complete synchronization."
                this.popup.show = true
                break
              case 2:
                this.contents = "Is Already Contract Address"
                this.popup.show = true
                // location.href = '/wallet'
                break
            }
          }
        }).catch(()=>{})
    }
  },
  components:{
    Popup
  }
}
</script>

<style lang="scss" scoped>
.import{
  min-height: calc( 100vh - 65px );

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
      margin-bottom: 4px;
    }

    p{
      font-size: 0.75rem;
      color: #222222;
      margin-bottom: 12px;
    }

    small{
      display: flex;
      height: 24px;
      font-size: 0.75rem;
      color: #ff6666;
      padding-top: 8px;
    }

    a{
      display: inline-flex;
      margin: 38px 0 82px 0;
      font-size: 0.75rem;
      color: #888888;
      text-decoration: underline;
    }

    input[type=text], textarea, select{
      display: flex;
      height: 48px;
      min-width:300px;
      width: 40%;
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

      &.error{
        border: solid 1px #ff6666;
      }
    }

    textarea{
      resize: vertical;
      min-width:500px;
      width: 55%;
      min-height: 110px;
    }

    select {
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
  .submit{
    justify-content: center;
    align-items: center;
    height: 54px;
    padding: 0 124px;
    margin-top: 13px;
    border-radius: 16px;
    background-color: #092148;
    color: white;
    z-index: 2;
    font-size: 1.125rem;

    &:disabled{
      background-color: #eaeaea;
      color: #adaaaa;
    }
  }
}

@media screen and ( max-width: 768px ) {
.import{
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

    p{
      font-size: 0.75rem;
      color: #222222;
      margin-bottom: 12px;
    }

    small{
      display: flex;
      height: 24px;
      font-size: 0.75rem;
      color: #ff6666;
      padding-top: 8px;
    }

    a{
      display: inline-flex;
      margin: 38px 0 82px 0;
      font-size: 0.75rem;
      color: #888888;
      text-decoration: underline;
    }

    input[type=text], textarea, select{
      display: flex;
      height: 48px;
      min-width:0;
      width: calc( 100% - 40px );
    }

    textarea{
      resize: vertical;
      min-width:0;
      width: calc( 100% - 40px );
      min-height: 110px;
    }

    select {
      width: 100%;
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
      margin-bottom: 60px;
    }
  }
}
</style>