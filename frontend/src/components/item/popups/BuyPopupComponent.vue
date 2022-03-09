<template>
<div>
  <Popup id="buy" title="Buy this items" confirm="Buy now" cancel="Cancel" :callback="onPopupClick" v-if="show">
    <div class="buy">
      <p class="description" v-if="false"></p>
      <div class="input__group">
        <div class="price">{{ $utils.fromWei(amount) }}</div>
        <select>
          <option value="ETH" selected>ETH</option>
          <option value="NFT" disabled>NFT</option>
        </select>
      </div>
      <p class="fees">Fee : <b>{{ fee }}</b> ETH</p>
      <p class="total">
        Total price <b>{{ total }} ETH</b> will be paid now
      </p>
      <p class="notification">Are you sure that you want to proceed this transaction?</p>
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
      amount:null,
      fee:0,
      total:0,
      feeOrigin:null
    }
  },
  watch:{
    item(){
      if( this.item.currentPrice != null ){
        if( String(this.item.currentPrice).indexOf( "E" ) > -1 || String(this.item.currentPrice).indexOf( "3" ) > -1  ){
          this.item.currentPrice = new Number( this.item.currentPrice ).toFixed();
        }
      }
      this.amount = this.item.currentPrice;
      this.$wallet.calcFee( window.ethereum, this.amount ).then( (fee)=>{
          if( fee ){
            this.feeOrigin = fee
            this.fee = Web3.utils.fromWei( String(fee) )
            this.total = Web3.utils.fromWei( Web3.utils.toBN(fee).add( Web3.utils.toBN( this.amount ) ) )
          }}
        ).catch(()=>{})
    }
  },
  methods:{
    onPopupClick( id, confirm, params ){
      this.callback( id, confirm, [ this.amount, String(this.feeOrigin) ] )
    }
  },
  components:{
    Popup
  }
}
</script>

<style lang="scss" scoped>
.buy{
  display: flex;
  flex-direction: column;
  padding: 30px 0;

  .description{
    font-weight: normal;
    font-size: 0.875rem;
    color: #222222;
    margin-bottom: 10px;
  }

  .input__group{
    display: flex;
    flex-direction: row;
    margin-bottom: 11px;
    border-bottom: 1px solid #d8d8d8;

    .price{
      height: 48px;
      border-radius: 16px;
      line-height: 48px;
      background-color: #ffffff;
      outline: none;
      font-size: 1.5rem;
      font-weight: bold;
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
