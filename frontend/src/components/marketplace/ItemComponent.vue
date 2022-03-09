<template>
  <div class="item__wrap">
    <a :href="link()">
    <div :class="'item ' + ( nodata ? 'nodata' :'' )">
      <div class="image__wrap">
        <div class="image" v-if="item.image">
          <img :src="item.image.replace('https://ipfs.infura.io/ipfs','https://zenxhub.zenithx.co/mirror/ipfs')" @load="imageLoad">
        </div>
      </div>
      <p class="owned" v-html="owner"></p>
      <div class="name__wrap">
        <p class="name">{{ name }}</p>
        <span :class="'badge ' + badge()"></span>
      </div>
      <p class="price">{{price}}<i>{{usd}}</i></p>
    </div>
    </a>
  </div>
</template>

<script>
export default {
  mounted(){

  },
  props:{
    item:Object
  },
  data () {
    return {
      nodata:true,
      name:null,
      owner:null,
      price:null,
      usd:null,
    }
  },
  watch:{
    item(){
      if( this.item.image === undefined ){
        this.nodata = true
        this.name = null
        this.owner = null
        this.price = null
        this.usd = null
      }
    },
    toUsd(val){
      if( this.usd != null && this.usd.length > 1 ){
        if( this.$store.state.currency.ethusd ){
          this.usd = `($${this.toDallors(this.item.price)})`
        }
      }else{
        this.usd = this.$store.state.currency.ethusd ? `($${this.toDallors(this.item.price)})` : ''
      }
    }
  },
  methods:{
    link(){
      if( this.item && this.item.itemaddress != null && this.item.itemid != null ){
        return '/item/' + this.item.itemaddress + '/'  + this.item.itemid
      }else{
        return null
      }
    },
    badge(){
      if( this.item && this.item.auctiontype != null ){
        if( this.item.auctiontype === 1 ){
          return "bidding"
        }
      }
    },
    imageLoad(){
      this.nodata = false
      this.name = this.item.name
      this.owner = `Owned by <b>${this.item.sellerName}</b>`
      this.price = `${this.$utils.fromWei(this.item.price)} ETH`
      this.usd = this.$store.state.currency.ethusd ? `($${this.toDallors(this.item.price)})` : ''
    },
    toDallors( price ){
        var priceToDallor = ( parseFloat( this.$utils.fromWei(price, 18) )*parseFloat(this.$store.state.currency.ethusd)).toFixed(2)
        var num_parts = priceToDallor.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }
  },
  computed:{
    toUsd(){
      return this.$store.state.currency.ethusd
    }
  },
  components: {
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
  display: flex;
  flex-direction: column;

  .image__wrap{
    overflow: hidden;
    width: 100%;
    padding-top: 100%;
    position: relative;
    border-radius: 36px;
    border: solid 1px #d8d8d8;

    .image{
      background-color: white;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      // background-size: cover;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      img{
        width: calc( 100% + 4px );
        height: calc( 100% + 4px );
        margin-left: -2px;
        margin-top: -2px;
        object-fit: cover;
        border: 0;
      }
    }
  }

  .owned{
    margin-top: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #8a8a8a;
    position: relative;

    b{
      font-weight: 500;
      color: #0061ff;
    }

  }

  .name__wrap{
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .name{
      display: flex;
      flex: 1;
      min-height: 36px;
      font-weight: 600;
      color: #222222;
      font-size: 0.9375rem;
    }

    .badge{
      color: white;
      width: 73px;
      height: 28px;
      border-radius: 15.5px;
      display: none;

      &::before{
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        font-weight: normal;
        font-size: 0.75rem;
      }

      &.bidding{
        display: flex;
        background-color: #ff8282;
        &::before{
          content:'Bidding';
        }
      }

      &.listed{
        display: flex;
        background-color: #666666;
        &::before{
          content:'Listed';
        }
      }
    }
  }

  .price{
    margin-top: 13px;
    font-weight: 600;
    color: #222222;
    font-size: 1.125rem;
    display: flex;
    align-items: center;

    i{
      margin-left: 8px;
      font-style: normal;
      font-size: 1rem;
      font-weight: normal;
      color:#666666;
    }
  }


  &.nodata{

    .image__wrap{
      border: none;
      .image{
        background-color: #f2f2f2;

        overflow: hidden;
        &::after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255, .5), transparent);
          animation: loading 1.5s infinite;
        }

        img{
          display: none;
        }
      }
    }

    .owned{
      width: 30%;
      height: 22px;
      border-radius: 36px;
      background-color: #f2f2f2;
      color: #f2f2f2;

      position: relative;
      overflow: hidden;
      &::after {
        top: 0;
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

    .name__wrap{
      .name{
        width: 70%;
        flex: 0.7;
        height: 36px;
        border-radius: 36px;
        background-color: #f2f2f2;

        position: relative;
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

    .price{
      width: 40%;
      height: 24px;
      border-radius: 36px;
      background-color: #f2f2f2;
      color: #f2f2f2;

      i{
        color: #f2f2f2;
      }

      position: relative;
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

@media screen and ( max-width: 768px ) {


.item{

  .image__wrap{
    border-radius: 24px;

    .image{
      background-size: cover;
    }
  }

  .owned{
    font-size: 0.75rem;
  }

  .name__wrap{
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;

    .badge{
      display: none;

      &::before{
        display: none;
      }

      &.bidding{
        display: none;
      }

      &.listed{
        display: none;
      }
    }
  }

  .price{
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 8px;

      i{
        margin-left: 0;
        font-size:0.75rem;
      }
    }
  }
}
</style>
