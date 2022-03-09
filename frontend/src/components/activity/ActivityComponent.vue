<template>
  <div :class="'activity ' + ( loaded ? '' : 'nodata' )">

    <img :src="item.image.replace('https://ipfs.infura.io/ipfs','https://zenxhub.zenithx.co/mirror/ipfs')" @load="onLoad">

    <div class="texts m-none">
      <h2>{{ item.name }}</h2>
      <div>
        <span>Unit Price</span>
        <span><b>{{ $utils.fromWei(item.price, 7) }}</b></span>
        <span>From</span>
        <span><b>{{ item.sellerName }}</b></span>
        <span>To</span>
        <span><b>{{ item.buyerName }}</b></span>
      </div>
      <a :href="`https://etherscan.io/tx/${item.tx}`">View Tx</a>
    </div>

    <h2 class="name__mobile">{{ item.name }}</h2>

    <div class="texts__mobile">
      <div>
        <span>Unit Price</span>
        <span><b>{{ $utils.fromWei(item.price, 7) }}</b></span>
      </div>
      <div>
        <span>From</span>
        <span><b>{{ item.sellerName }}</b></span>
      </div>
      <div>
        <span>To</span>
        <span><b>{{ item.buyerName }}</b></span>
      </div>
      <a target="_blank" :href="`https://etherscan.io/tx/${item.tx}`">View Tx</a>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    item:{
      type:Object,
    }
  },
  data () {
    return {
      loaded:false
    }
  },
  methods:{
    onLoad(){
      this.loaded = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}

.activity{
  border: 1px solid #dadada;
  border-radius: 18px;
  padding: 33px;
  margin: 0 88px 20px 88px;
  display: flex;
  flex-direction: row;

  &.nodata{
    position: relative;
    border: 1px solid #f2f2f2;
    overflow: hidden;

    &::before{
      content: '';
      position: absolute;
      background: #f2f2f2;
      width: 100%;
      height: 100%;
      margin-top: -33px;
      margin-left: -33px;
      border-radius: 18px;
      z-index: 1;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      transform: translateX(-100%);
      background: linear-gradient(90deg, transparent, rgba(255,255,255, .5), transparent);
      animation: loading 1.5s infinite;
    }
  }

  .name__mobile{
    display: none;
  }

  .texts__mobile{
    display: none;
  }

  img{
    display: flex;
    position: relative;
    width: 132px;
    height: 132px;
    border-radius: 18px;
    object-fit: cover;
    border: 1px solid #dadada;
  }

  .texts{
    display: flex;
    flex: 1;
    padding-left: 54px;
    flex-direction: column;

    h2{
      margin-top: 12px;
      font-size: 1.125rem;
      color: #222222;
      font-weight: 600;
    }

    div{
      margin-top: 12px;
      span{
        font-size: 0.9375rem;
        color: #666666;
        margin-right: 16px;
        b{
          font-weight: 600;
          color: #222222;
        }

        &:nth-child(3){
          margin-right: 24px;
        }

        &:nth-child(5){
          margin-left: 24px;
          margin-right: 24px;
        }
      }
    }
  }

  a{
    margin-top: 24px;
    color: #0564ff;
    text-decoration: underline;
    font-size: 0.9375rem;

    &:visited{
      color: #0564ff;
    }
  }

}

@media screen and ( max-width: 768px ) {
  .activity{
    padding: 20px;
    margin: 0 0 20px 0;
    flex-wrap: wrap;

    .name__mobile{
      display: flex;
      width: calc( 53% - 16px );
      padding-left: 16px;
      margin-top: 50px;
      font-size: 1rem;
      color: #222222;
      font-weight: 600;
    }

    .image__wrap{
      margin-top: 28px;
      width: 47%;
    }

    .texts__mobile{
      display: flex;
      width: 100%;
      margin-top: 12px;
      flex-direction: row;
      flex-wrap: wrap;

      div{
        width: 50%;
        display: flex;
        flex-direction: column;
        margin-top: 12px;

        span{
          width: 50%;
          font-size: 0.9375rem;
          color: #666666;

          b{
            font-weight: 600;
            color: #222222;
          }
        }
      }
    }

    a{
      width: 100%;
      margin-top: 24px;
      color: #0564ff;
      font-size: 0.9375rem;
      text-decoration: underline;

      &:visited{
        color: #0564ff;
      }
    }

  }
}
</style>
