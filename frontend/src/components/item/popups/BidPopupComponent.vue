<template>
<div>
  <Popup id="bid" title="Place a Bid" confirm="Bid Now" cancel="Cancel" :callback="onPopupClick" v-if="show">
    <div class="bid">
      <p class="description">Please input the price to bid</p>
      <div class="input__group">
        <input type="number" v-model="amountEth">
        <select>
          <option value="ETH" selected>ETH</option>
          <option value="NFT" disabled>NFT</option>
        </select>
      </div>
      <p class="fees">Fee : <b>{{ fee }}</b> ETH</p>
      <p class="total">
        Total price <b>{{total}} ETH</b> will be paid if your bidding is succeeded
      </p>
      <p class="notification">The transaction is made when the seller accepts your bid. If your price fails to bid, the amount will be refunded.</p>
    </div>
  </Popup>
</div>
</template>

<script>
import Popup from '@/components/popups/PopupComponent.vue'
import Web3 from 'web3'
export default {
  created(){

  },
  props:{
    show:Boolean,
    callback:Function,
    item:Object
  },
  data () {
    return {
      amountEth:null,
      fee:0,
      total:0,
      feeOrigin:null
    }
  },
  watch:{
    item(){

    },
    amountEth(){
      if( this.amountEth != null && this.amountEth.length > 0 ){
        this.$wallet.calcFee( window.ethereum, Web3.utils.toWei( String(this.amountEth), "ether" ) ).then( (fee)=>{
        if( fee ){
          this.feeOrigin = fee
          this.fee = Web3.utils.fromWei( String(fee) )
          this.total = Web3.utils.fromWei( Web3.utils.toBN(fee).add( Web3.utils.toBN( Web3.utils.toWei( String(this.amountEth), "ether" ) ) ) )
          }
        })
      }
    },
  },
  methods:{
    onPopupClick( id, confirm, params ){
      if( confirm ){
        this.callback( id, confirm, [ Web3.utils.toWei( String(this.amountEth), "ether" ), String(this.feeOrigin) ] )
      }else{
        this.callback( id, confirm )
      }

    }
  },
  components:{
    Popup
  }
}
</script>

<style lang="scss" scoped>
.bid{
  display: flex;
  flex-direction: column;
  padding: 30px 0;

  .description{
    font-weight: 600;
    font-size: 0.875rem;
    color: #222222;
    margin-bottom: 10px;
  }

  .input__group{
    display: flex;
    flex-direction: row;
    margin-bottom: 6px;

    input{
      flex: 1;
      height: 48px;
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

  .fees{
    margin-bottom: 24px;
    font-weight: normal;
    color: #222222;
    font-size: 0.75rem;
  }

  .total{
    width: 70%;
    max-width: calc( 100% - 60px );
    margin-bottom: 16px;
    font-weight: normal;
    color: #222222;
    font-size: 0.875rem;

    b{
      color: #0564ff;
    }
  }

  .notification{
    font-size: 0.75rem;
    color: #888888;
  }

}
</style>
