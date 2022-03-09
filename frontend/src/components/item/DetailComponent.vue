<template>
<div>
  <section class="item">
    <div class="wrap">
      <div class="product">
        <div :class="'image__wrap ' + ( image ? '':'nodata' )">
          <div class="image" :style="{backgroundImage:`url(${image})`}">
          </div>
        </div>
      </div>

      <div class="description">
        <a class="cancel" @click="onClick('cancel')" v-if="this.$store.state.userInfo.isSet && this.seller == this.$store.state.userInfo.address">Cancel list</a>
        <div class="owner">
          <p>Owned by <b>{{ sellerName }}</b></p>
        </div>
        <h1 class="name">{{ name }}</h1>
        <div :class="'box__warp ' + ( $store.state.userInfo.isSet ? 'connected' : '' )">
          <div class="box">

            <div class="not-listed" v-if="state =='not-listed'">
              <p v-if="auctiontype != null">Please register for your list item</p>
            </div>

            <div class="bid" v-if="state =='bid'">
              <p>Starting Price</p>
              <div class="top">
                <div class="price">{{ fromWei(startPrice) }} ETH</div>
                <i class="currency" v-if="startPrice && store().state.currency.ethusd">(${{ toDallors(startPrice) }})</i>
              </div>
              <hr>
              <div class="bottom">
                <div>
                  <p class="current-bid">Current Bid</p>
                  <p class="nickname">by @FF143 | 5 mins ago</p>
                </div>
                <div>
                  <div class="price">{{ fromWei(currentPrice) }} ETH</div>
                  <i class="currency" v-if="currentPrice && store().state.currency.ethusd">(${{ toDallors(currentPrice) }})</i>
                </div>
              </div>
            </div>

            <div class="fixed" v-if="state =='fixed'">
              <p>Listed as</p>
              <div class="top">
                <div class="price">{{ fromWei(currentPrice) }} ETH</div>
                <i class="currency" v-if="currentPrice && store().state.currency.ethusd">(${{ toDallors(currentPrice) }})</i>
              </div>
              <p class="fees">Fees {{ fromWei(fee) }} ETH</p>
              <hr>
              <div class="bottom">
                <div>
                  <p class="total">Total</p>
                </div>
                <div>
                  <div class="price">{{ fromWei(total) }} ETH</div>
                  <i class="currency" v-if="currentPrice && store().state.currency.ethusd">(${{ toDallors(currentPrice) }})</i>
                </div>
              </div>
            </div>

            <button class="btn" @click="onClick('action')" v-if="auctiontype != null && !forceDisable" :disabled="( !enableList && 0 > auctionid )">{{ buttonTitle() }}</button>
            <p class="notification" v-if="auctiontype != null">2.5% of final price will be charged for Trade Fee</p>
          </div>
        </div>
      </div>

    </div>
    <div class="wrap">
      <div class="detail">
        <h1>Description</h1>
        <p>{{description}}</p>
      </div>
      <div class="bid__history">
        <h1 v-show="auctiontype == 1">Bid History</h1>
        <ul :class="'list ' + ( bidHistory.length == 0 ? 'no-history' : '' )" v-show="auctiontype == 1">
          <li v-for="(item, index) in bidHistory" :key="index">
            <span class="price">{{ fromWei(item.price) }} ETH</span>
            <span class="address">by <b>{{ shorten(item.by) }}</b></span>
            <span class="time">{{ dateFormat(item.date) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>

</div>
</template>

<script>
import Web3 from 'web3'
export default {
  created(){

  },
  props:{
    info:Object,
    callback:Function,
    enableList:{
      Type:Boolean,
      default:false
    },
  },
  data () {
    return {
      forceDisable:false,
      state:"not-listed",
      test:false,
      auctionid: null,
      auctiontype: null,
      description: null,
      image: null,
      itemaddress: null,
      itemid: null,
      name: null,
      startPrice:0,
      currentPrice:0,
      seller: null,
      sellerName: null,
      bidHistory:[],
      total:null,
      fee:null
    }
  },
  watch:{
    enableList(){

    },
    info(){
      if( this.info != null && this.info.auctionid != null ){

        this.auctionid = this.info.auctionid
        this.auctiontype = this.info.auctiontype
        this.description = this.info.description
        this.image = this.info.image
        this.itemaddress = this.info.itemaddress
        this.itemid = this.info.itemid
        this.name = this.info.name
        this.startPrice = this.info.startPrice
        this.currentPrice = this.info.currentPrice
        this.seller = this.info.seller
        this.sellerName = this.info.sellerName

        if( this.currentPrice == 0 || this.currentPrice == "0" ){
          this.currentPrice = this.startPrice
        }

        this.checkState()

        this.$axios.post( '/v1/auction', {method:"GetBidHistoryByAuctionID", param:{id:this.info.auctionid}} )
        .then( (res)=>{
          this.bidHistory = res.data
        }).catch(()=>{})

        this.$wallet.calcFee( window.ethereum, this.currentPrice ).then( (fee)=>{
          console.log("Fee", fee)
          this.fee = fee
          this.total = Web3.utils.toBN(this.currentPrice).add( Web3.utils.toBN( this.fee ) )
        }).catch( ()=>{

        } )
      }
    }
  },
  methods:{
    store(){
      return this.$store
    },
    onClick( id ){
      if( this.callback != null && typeof(this.callback) == 'function' ){
        this.callback( id, this.state )
      }
    },
    checkState(){
      if( this.auctiontype == '1' || this.auctiontype == 1 ){
        this.state = 'bid'
      }else if( this.auctiontype == '0' || this.auctiontype == 0 ){
        this.state = 'fixed'
      }else{
        this.state = 'not-listed'
      }
    },
    fromWei( a, b ){
      return this.$utils.fromWei(a, b)
    },
    shorten( a, b ){
      return this.$utils.shorten(a, b)
    },
    dateFormat( a ){
      return this.$utils.dateFormat(a)
    },
    buttonTitle(){
      if( this.auctiontype == 1 ){
        if( this.seller == this.$store.state.userInfo.address ){
          return "Accept"
        }else{
          return "Bid Now"
        }
      }else if( this.auctiontype == 0 ){
        if( this.seller == this.$store.state.userInfo.address ){
          this.forceDisable = true
        }else{
          return "Buy Now"
        }
      }else if( this.auctiontype == -1 ){
        return "List Now"
      }
    },
    toDallors( price ){
        var priceToDallor = ( parseFloat( this.fromWei(price, 18) )*parseFloat(this.store().state.currency.ethusd)).toFixed(2)
        var num_parts = priceToDallor.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }
  },
  components:{

  }
}
</script>

<style lang="scss" scoped>
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}

.item{
  margin-top: 160px;

  .wrap{
    flex-direction: row;

    .product{
      flex: 6;

      .image__wrap{
        width: 100%;
        padding-top: 100%; /* 1:1 Aspect Ratio */
        position: relative; /* If you want text inside of it */
        border-radius: 36px;
        border:1px solid #d8d8d8;
        overflow: hidden;

        .image{
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        &.nodata{

          .image{
            background-color: #f2f2f2;

            overflow: hidden;
            &::after {
              display: block;
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              transform: translateX(-100%);
              background: linear-gradient(90deg, transparent, rgba(255,255,255, .5), transparent);
              animation: loading 1.5s infinite;
            }
          }
        }
      }
    }

    .description{
      flex: 6;
      position: relative;

      .cancel{
        color: #666666;
        font-size: 0.875rem;
        font-weight: normal;
        display: flex;
        position: absolute;
        right: 8.33%;
        border-bottom: 1px solid #666666;
        cursor: pointer;
      }

      .owner{
        margin-left: 8.33%;
        p{
          font-size:1.125rem;
          font-weight: 600;
          color:#8a8a8a;
          b{
            font-size:1.125rem;
            font-weight: 600;
            color: #0061ff;
          }
        }
      }

      .name{
        margin-top: 12px;
        margin-left: 8.33%;
        font-size:1.875rem;
        line-height: 2.625rem;
        font-weight: 600;
        color: #222222;
        padding-right: 80px;
      }

      .box__warp{
        margin-top: 64px;
        margin-left: 8.33%;
        width: 83.3333%;
        // padding-top: 55%;
        position: relative;
        border: 1px solid #e1e1e1;
        border-radius: 20px;

         .box{
          // position: absolute;
          // top: 0;
          // left: 0;
          // bottom: 0;
          // right: 0;
          padding: 34px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          // Common
          p{
            color: #888888;
            font-size: 1rem;
            font-weight: normal;
          }

          hr{
            border: none;
            height: 1px;
            background: #d7d7d7;
            margin: 24px 0 30px 0;
          }

          .price{
            font-size:1.875rem;
            font-weight: bold;
            color: #222222;
            text-align: right;
          }

          .currency{
            display: flex;
            justify-content: flex-end;
            color: #666666;
            font-size: 1rem;
            font-weight: normal;
            font-style: normal;
          }

          // Not listed
          .not-listed{
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            p{
              padding: 52px 0;
            }
          }

          // Bid
          .bid{
            .top{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }
            .bottom{
              display: flex;
              flex: 1;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;

              .current-bid{
                font-size: 1.25rem;
                color: #222222;
              }
              .nickname{
                font-size: 0.875rem;
              }
              .price{
                font-size: 2rem;
                color: #0564ff;
              }
            }
          }

          // Fixed
          .fixed{
            .top{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }
            .fees{
              font-size: 0.875rem;
            }
            .bottom{
              display: flex;
              flex: 1;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;

              .total{
                font-size: 1.25rem;
                color: #222222;
              }
              .nickname{
                font-size: 0.875rem;
              }
              .price{
                font-size: 2rem;
                color: #0564ff;
              }
            }
          }

          .btn{
            display: flex;
            width: 100%;
            height: 52px;
            line-height: 52px;
            margin-top: 20px;
            color: white;
            font-size: 1.125rem;
            font-weight: 400;
            justify-content: center;
            box-shadow: none;
            border: none;
            outline: none;
            border-radius: 16px;
            background-color: #092148;
            cursor: pointer;

            &:disabled{
              background-color: #eaeaea;
              color: #adaaaa;
              cursor: not-allowed;
            }
          }

          .notification{
            // display: none;
            margin-top: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #888888;
            font-size: 0.875rem;
            font-weight: normal;
          }
        }

        &.connected{

            .box{
              padding-bottom: 24px;
            }

            .notification{
              margin-top: 12px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #888888;
              font-size: 0.875rem;
              font-weight: normal;
            }
          }
      }

    }
  }

  .detail{
    width: 50%;
    border-top: solid 1px #d7d7d7;
    margin-top: 50px;
    padding: 50px 0;

    h1{
      font-size: 1.125rem;
      color: #222222;
      margin-bottom: 12px;
    }

    p{
      font-size:0.9375rem;
      color: #222222;
      margin-right: 20px;
    }
  }

  .bid__history{
    border-top: solid 1px #d7d7d7;
    margin-top: 50px;
    padding: 50px 0;
    width: 50%;

    h1{
      font-size: 1.125rem;
      color: #222222;
      margin-bottom: 12px;
    }

    .list{
        border: 1px solid #e1e1e1;
        border-radius: 20px;
        padding: 16px 32px;
        height: 190px;
        overflow-y: auto;

        &.no-history{
          display: flex;
          justify-content: center;
          align-items: center;

          &::before{
            content: 'No Bid History';
            display: flex;
          }
        }

        li{
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 22px;
          margin: 8px;

          .price{
            flex:1;
            font-size:0.875rem;
            color: #222222;
          }
          .address{
            flex:1;
            font-size:0.875rem;
            color: #222222;
            text-align: center;
          }
          .time{
            flex:1;
            font-size:0.875rem;
            color:#888888;
            text-align: right;
          }

          &:nth-child(1){
            .price{color:#0564ff;}
          }
        }
    }

  }
}

@media screen and ( max-width: 768px ) {

.item{
  margin-top: 90px;

  .wrap{
    flex-direction: column;

    .product{
      flex: 1;
      .image__wrap{
        border-radius: 24px;
      }
    }

    .description{
      flex: 1;

      .cancel{
        //
        margin-top: 26px;
        right: 0;
      }

      .owner{
        margin-left: 0%;
        margin-top: 24px;
        font-size:1rem;
      }

      .name{
        margin-top: 8px;
        margin-left: 0;
        padding: 0;
        font-size:1.5rem;
        line-height: 2rem;
        min-height: 64px;
      }

      .box__warp{
        margin-top: 24px;
        margin-left: 0;
        width: 100%;

        .box{
          padding: 20px;

          // Common
          p{
            font-size: 0.875rem;
          }

          .price{
            font-size:1.5rem;
          }

          .currency{
            font-size: 0.875rem;
          }

          // Not listed
          .not-listed{
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            p{
              padding: 52px 0;
            }
          }

          // Bid
          .bid{
            .bottom{
              .current-bid{
                font-size: 1rem;
                color: #222222;
              }
              .nickname{
                margin-top: 8px;
                font-size: 0.75rem;
              }
              .price{
                font-size: 1.75rem;
              }
            }
          }

          // Fixed
          .fixed{
            .fees{
              font-size: 0.75rem;
            }
            .bottom{
              .total{
                font-size: 1.75rem;
              }
              .nickname{
                margin-top: 8px;
                font-size: 0.75rem;
              }
              .price{
                font-size: 1.75rem;
              }
            }
          }

          .btn{
            display: flex;
            width: 100%;
            height: 52px;
            line-height: 52px;
            margin-top: 20px;
            color: white;
            font-size: 1.125rem;
            font-weight: 400;
            justify-content: center;
            box-shadow: none;
            border: none;
            outline: none;
            border-radius: 16px;
            background-color: #092148;
            cursor: pointer;

            &:disabled{
              background-color: #eaeaea;
              color: #adaaaa;
              cursor: not-allowed;
            }
          }

          .notification{
              font-size: 0.725rem;
            }

        }

        &.connected{

            .box{
              padding-bottom: 24px;
            }

          }
      }

    }
  }

  .detail{
    width: 100%;
    border-top: none;
    margin-top: 0;
    padding: 50px 0;

    h1{
      font-size: 1.125rem;
      margin-bottom: 12px;
    }

    p{
      font-size:0.9375rem;
    }
  }

  .bid__history{
    border-top:none;
    margin-top: 0px;
    padding: 50px 0;
    width: 100%;

    h1{
      font-size: 1.125rem;
      color: #222222;
      margin-bottom: 12px;
    }

    .list{
        border: 1px solid #e1e1e1;
        border-radius: 20px;
        padding: 16px 12px;
        height: 190px;
        overflow-y: auto;

        li{
          height: 22px;
          margin: 0px;

          .price{
            flex:auto;
            width: 25%;
          }
          .address{
            flex:auto;
            width: 45%;
          }
          .time{
            flex:auto;
            width: 30%;
          }

          &:nth-child(1){
            .price{color:#0564ff;}
          }
        }
    }

  }
}
}

</style>
