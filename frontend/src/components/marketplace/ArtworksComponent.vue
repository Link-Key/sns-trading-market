<template>
  <div>
    <section class="banner">
      <Carousel :per-page="1" :pagination-enabled="false" @page-change="onPageChanged" :value="position" :paginationEnabled="false" :autoplay="true" :loop="true" :autoplayTimeout="15000">
          <Slide v-for="(item, index) in items" :key="index">
            <div class="image__wrap">
              <div class="image" :style="{backgroundImage:item.image ? `url(${item.image})` : require('@/assets/images/image_banner_sample.png')}"></div>
            </div>
          </Slide>
      </Carousel>

      <div class="item__wrap">
        <div class="wrap">
          <div class="banner-title">{{ items[position].title }}</div>
          <p>{{ items[position].description }}</p>
          <a :href="items[position].href ? `${items[position].href}`:'#'">View</a>

          <div class="indicator__wrap">
            <button class="prev" @click="onPrevClick"></button>
            <span class="indicator"><b>{{ position + 1 }}</b>/{{bannerSize}}</span>
            <button class="next" @click="onNextClick"></button>
          </div>
        </div>
      </div>

    </section>
    <section class="artworks">
      <div class="wrap">
        <h1>{{items[position].name}}</h1>
        <Carousel :per-page="perPage" :scroll-per-page="true" :navigation-enabled="true" :navigation-next-label="''" :navigation-prev-label="''" :pagination-enabled="false">
          <Slide v-for="(item, index) in items[position].items" :key="index">
            <ItemComponent :item="item"></ItemComponent>
          </Slide>
        </Carousel>
      </div>
    </section>
  </div>
</template>

<script>
import ItemComponent from './ItemComponent'
import Axios from 'axios'
import Web3 from 'web3'
import { Carousel, Slide } from 'vue-carousel';

export default {
  mounted(){
    window.addEventListener("resize", this.onResize);
    this.onResize()
  },
  props:{
    items:Array
  },
  data () {
    return {
      position:0,
      perPage:3,
      bannerSize:0
    }
  },
  watch:{
    items(){
      console.log("Items!!")
      this.bannerSize = this.items.length
    }
  },
  methods:{
    onPageChanged( position ){
      this.position = position
    },
    onResize(){
      if( window.innerWidth < 768 ){
        this.perPage = 1
      }else{
        this.perPage = 3
      }
    },
    onPrevClick(){
      if( this.position > 0 ){
        this.position = this.position - 1
      }
    },
    onNextClick(){
      if( this.position + 1 < this.bannerSize ){
        this.position = this.position + 1
      }
    },
  },
  components: {
    Carousel,
    Slide,
    ItemComponent
  }
}
</script>

<style lang="scss" scoped>
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}

.banner-title{
  text-align: center;
  color: #fff;
  font-size: 52px;
}

.indicator__wrap{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 40px;
  right: 0;
  @media screen and ( max-width: 768px ) {
    bottom: 32px;
    right: 20px;
  }
}

.prev{
  width: 32px;
  height: 32px;
  border: 1px solid #ffffff;
  background: transparent;
  position: relative;
  &::before{
    content: '';
    position: absolute;
    border-left: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    width: 33%;
    height: 33%;
    top: 33%;
    right: 25%;
    transform: rotate(45deg);
  }

  &:hover{
    border: none;
    background: white;
    &::before{
      border-left-color: #222222;
      border-bottom-color: #222222;
    }
  }

  @media screen and ( max-width: 768px ) {
    width: 24px;
    height: 24px;
  }
}

.indicator{
  color: white;
  font-size: 1.5rem;
  padding: 0 20px;

  @media screen and ( max-width: 768px ) {
    font-size: 1.25rem;
  }
}

.next{
  width: 32px;
  height: 32px;
  border: 1px solid #ffffff;
  background: transparent;
  position: relative;
  &::before{
    content: '';
    position: absolute;
    border-right: 1px solid #ffffff;
    border-top: 1px solid #ffffff;
    width: 33%;
    height: 33%;
    top: 33%;
    left: 25%;
    transform: rotate(45deg);
  }

  &:hover{
    border: none;
    background: white;
    &::before{
      border-right-color: #222222;
      border-top-color: #222222;
    }
  }

  @media screen and ( max-width: 768px ) {
    width: 24px;
    height: 24px;
  }
}

.banner{
  margin-top: 80px;
  position: relative;

  .item__wrap{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;

    .wrap{
      height: 100%;
      justify-content: center;
      display: flex;
      z-index: 2;
      position: relative;

      h1{
        font-size: 5rem;
        width: 60%;
        font-weight: bold;
        color: white;
        z-index: 2;
      }

      p{
        font-size:1.125rem;
        font-weight: normal;
        color: white;
        z-index: 2;
        display: none;
      }

      a{
        color: white;
        font-size: 0.875rem;
        height: 42px;
        width: 170px;
        border-radius: 8px;
        margin: 20px auto;
        display: inline-flex;
        border: 1px solid white;
        justify-content: center;
        align-items: center;

        &:visited{
          color: white;
        }

        &:hover{
          color: #0564ff;
          background-color: #FFFFFF;
        }
      }
    }
  }

  .image__wrap{
    max-height: 1024px;
    height: 54vw;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .image{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        &::after{
          content: '';
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(3, 15, 33, 0.5);
        }
    }
  }

}

.artworks{
  margin-bottom: 40px;
  background: #eff7ff;
  padding-bottom: 60px;

  h1{
    margin-top: 80px;
    margin-bottom: 24px;
    font-size:1.5rem;
    font-weight: 600;
    color: #222222;
  }

  .item__wrap{
    width: calc( 100% - 30px );
  }

  .item{
    display: flex;
    flex-direction: column;

    .image__wrap{
        overflow: hidden;
        padding-top: 100%; /* 1:1 Aspect Ratio */
        position: relative; /* If you want text inside of it */
        border-radius: 36px;
        border: solid 1px #d8d8d8;

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
        border: none;
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

    .name{
      margin-top: 28px;
      margin-bottom: 20px;
      font-weight: 600;
      color: #222222;
      font-size: 0.9375rem;
      padding: 0 24px;

      &.nodata{
        width: 60%;
        height: 24px;
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
      font-weight: 600;
      color: #222222;
      font-size: 1.125rem;
      display: flex;
      align-items: center;
      padding: 0 24px;

      &.nodata{
        width: 40%;
        height: 24px;
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

      i{
        margin-left: 1rem;
        font-style: normal;
        font-size: 1.125rem;
        font-weight: normal;
        color:#666666;
      }
    }
  }
}

@media screen and ( max-width: 768px ) {

  .banner{
    margin-top: 72px;

    .item__wrap{

      .wrap{
        justify-content: flex-start;

        h1{
          font-size: 2.5rem;
          width: 100%;
        }

        a{
          margin-top: 44px;
        }
      }
    }

    .image__wrap{
      max-height: 70vh;
      height: 133vw;
    }

  }

  .artworks{
    padding:40px 0;
    margin-bottom: 24px;
    padding-bottom: 60px;

    .item__wrap{
      margin-left: 5px;
      width:calc( 100% - 10px );
    }
    h1{
      margin-top: 31px;
      margin-bottom: 24px;
      font-size: 1.325rem;
    }
  }

}

</style>
