<template>
  <div :class="'collection ' + ( isLoaded ? '' :'nodata' )">
    <div class="image__wrap">
      <div class="image">
        <img :src="item.image.replace('https://ipfs.infura.io/ipfs','https://zenxhub.zenithx.co/mirror/ipfs')" @load="onLoad">
      </div>
    </div>
    <h2 class="title">{{ title }}</h2>
    <p class="description">{{ description }}</p>
    <a :href="'/brand/'+(item.id)">More</a>
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
      isLoaded:false,
      title:null,
      description:null
    }
  },
  methods:{
    onLoad(){
      this.isLoaded = true
      this.title = this.item.title
      this.description = this.item.description
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

.collection{
  width: 100%;
  margin-bottom: 84px;

  .image__wrap{
    position: relative;
    width: 100%;
    padding-top: 54%;

    .image{
      position: absolute;
      padding-top: 54%;
      top: 0;
      left: 0;
      right: 0;
      height: 0;

      img{
        border-radius: 20px;
        position: absolute;
        width: calc(100% + 4px);
        height: calc( 100% + 4px );
        top: -2px;
        left: -2px;
        object-fit: cover;
      }
    }
  }

  h2{
    margin-top: 22px;
    font-size: 1.5rem;
    color: #222222;
  }

  p{
    margin-top: 4px;
    font-size: 1.125rem;
    color: #222222;
    word-break: break-all;
  }

  a{
    display: inline-flex;
    position: relative;
    margin-top: 24px;
    color: #0564ff;
    text-decoration: none;
    font-size: 1.125rem;

    &:visited{
      color: #0564ff;
    }

    &::before{
      content: '';
      display: block;
      position: absolute;
      width: 31px;
      height: 1px;
      right: -39px;
      bottom: 11px;
      z-index: -1;
      background: #0564ff;
      transition: all 0.2s ease-out;
    }

    &::after{
      content: '';
      display: block;
      position: absolute;
      width: 10px;
      height: 1px;
      right: -40px;
      bottom: 14px;
      z-index: -1;
      background: #0564ff;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      transition: all 0.2s ease-out;
    }

    &:hover{
      transition: all 0.2s ease-out;

      &::before{
        width: 79px;
        right: -87px;
        transition: all 0.2s ease-out;
      }

      &::after{
        right: -88px;
        transition: all 0.2s ease-out;
      }
    }
  }

  &.nodata{

    .image__wrap{

      .image{
        border: none;
        background-color: #f2f2f2;
        border-radius: 18px;

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

    .title{
      width: 50%;
      height: 2rem;
      background: #f2f2f2;
      border-radius: 1rem;

      position: relative;
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
    }

    .description{
      margin-top: 12px;
      width: 70%;
      height: 1.6rem;
      background: #f2f2f2;
      border-radius: 0.8rem;

      position: relative;
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
    }

    a{
      display: none;
    }

  }

}
@media screen and ( max-width: 768px ) {
  .collection{
    margin-bottom: 48px;

    .image__wrap{
      padding-top: 64%;
      .image{
        padding-top: 64%;
      }
    }

    h2{
      margin-top: 16px;
      font-size: 1.25rem;
    }

    p{
      margin-top: 4px;
      font-size: 0.9375rem;
    }

    a{
      margin-top: 16px;
      font-size: 0.9375rem;
    }
  }
}

</style>
