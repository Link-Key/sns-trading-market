<template>
  <section class="connect">
    <div class="wrap">
      <h1>Please connect your wallet to use this service</h1>
      <ul>
        <li>
          <img src="@/assets/images/layouts/connect/image_metamask.png">
          <button class="btn" @click="connectMetamask" :disabled="!enableMetamask">Connect</button>
          <p v-show="!enableMetamask">Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!</p>
        </li>
      </ul>
      <p>
        Currently only Metamask wallet is available for our service. <br>We are planning to add more wallet services in near future.
      </p>

      <a ref="https://www.notion.so/Wallet-Connect-853939ad8daf44239531f183bfa7b71e">How to connect Metamask?</a>
    </div>
  </section>
</template>

<script>
export default {
  props:{
    callback:Function,
    enableMetamask:{
      type:Boolean,
      default:true
    }
  },
  data () {
    return {
    }
  },
  methods:{
    connectMetamask(){
      if( this.callback != null && typeof(this.callback) == 'function' ){
        this.callback('metamask')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.connect{
  min-height: calc( 100vh - 65px );

  .wrap{
    justify-content: center;
    align-items: center;
  }
  
  h1{
    margin-top: 240px;
    font-size: 1.5rem;
    font-weight: 600;
    color: #222222;
  }

  p{
    font-size: 0.75rem;
    color: #888888;
  }

  a{
    font-size: 0.75rem;
    color: #888888;
    margin-top: 32px;
    border-bottom: 1px solid #888888;
  }

  ul{
    margin: 42px 0;

    li{
      position: relative;
      display: flex;
      padding: 50px 72px;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 460px;
      height: 220px;
      border-radius: 16px;
      border: solid 1px #dadada;
      background-color: #ffffff;
      
      img{
        width: 382px;
        margin-top: 30px;
      }

      .btn{
        display: flex;
        width: 100%;
        height: 52px;
        font-size: 1.125rem;
        font-weight: 600;
        color: #ffffff;
        border-radius: 16px;
        background-color: #092148;
        justify-content: center;
        align-items: center;

        &:disabled{
          opacity: .7;
        }
      }

      p{
        font-size: 0.75rem;
        color: #222222;
        position: absolute;
        bottom: 16px;
      }
    }
  }
}

@media screen and ( max-width: 768px ) {
.connect{
  min-height: calc( 100vh - 65px );

  h1{
    margin-top: 120px;
    font-size: 1.375rem;
  }

  ul{
    margin: 42px 0;

    li{
      padding: 50px 20px;
      width: calc( 100% - 40px );
      height: auto;
      border-radius: 16px;
      border: solid 1px #dadada;
      background-color: #ffffff;
      
      img{
        width: 80%;
        margin-top: 30px;
      }

      .btn{
        margin-top: 56px;

        &:disabled{
          opacity: .7;
        }
      }

      p{
        font-size: 0.75rem;
        color: #222222;
        position: absolute;
        bottom: 16px;
      }
    }
  }
}

}

</style>
