<template>
  <section class="items">
    <div class="wrap">
      <h1 class="title">List Nft</h1>
      <div class="buttons">
        <button :class="position === index ? 'active':''" @click="selectItems(index)" v-for="(item, index) in buttons" :key="index">{{item}}</button>
      </div>

      <div class="no-items" v-if="items.length === 0">
        <h1>No Items</h1>
      </div>

      <div class="gallery">
          <div class="gallery__item" v-for="(item, index) in items" :key="index">
            <div class="item__wrap">
            <a :href="'/item/' + item.itemaddress + '/'  +item.itemid">
            <div class="item">
              <div class="image__wrap">
                <div :class="'image ' + ( item.image ? '' : 'nodata' )" :style="{backgroundImage:`url(${item.image})`}"></div>
              </div>
              <div class="bottom">
                <h3 :class="'name ' + ( item.name ? '' : 'nodata' )">{{ item.name }}</h3>
                <div :class="'type ' + getType(item.auctiontype)"></div>
              </div>
            </div>
              </a>
            </div>
          </div>
      </div>

    </div>
  </section>
</template>

<script>
import Axios from 'axios'
import Web3 from 'web3'
import { Carousel, Slide } from 'vue-carousel';

export default {
  props:{
    buttons:Array,
    items:Array,
    callback:Function
  },
  data () {
    return {
      position:0,
    }
  },
  methods:{
    selectItems( position ){
      if( this.callback != null && typeof(this.callback) === 'function' ){
        this.position = position
        this.callback( position )
      }
    },
    getType( type ){
      if( type === 0 ){
        return "listed"
      }else if( type === 1 ){
        return "bidding"
      }else{
        return ""
      }
    }
  },
  components: {
    Carousel,
    Slide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.items{
  padding-bottom: 104px;
  .wrap{
    border-top: 1px solid #d7d7d7;

    .title{
      margin-top: 40px;
      font-size: 1.125rem;
    }

    .buttons{
      margin-top: 10px;
      margin-bottom: 30px;
      display: flex;
      flex-direction: row;

      button{
        width: 153px;
        height: 44px;
        margin: 0 16px 0 0;
        padding: 11px 23px 11px 24px;
        background: transparent;
        border-radius: 36px;
        color: #626262;
        border: solid 1px #b5b5b5;
        font-weight: 600;
        cursor: pointer;

        &:hover{
          color: #0564ff;
        }

        &.active{
          color: #0564ff;
          border: solid 1px #0564ff;
        }
      }
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
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        -webkit-transition: all 0ms linear;
        -ms-transition: all 0ms linear;
        transition: all 0ms linear;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        &.nodata{
          background-color: #f2f2f2;
        }
      }
    }

    .bottom{
      padding: 0 24px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      margin-bottom: 20px;

      .name{
        font-weight: 600;
        color: #222222;
        font-size: 0.9375rem;
        flex: 1;
        -webkit-transition: all 0ms linear;
        -ms-transition: all 0ms linear;
        transition: all 0ms linear;

        &.nodata{
          width: 60%;
          height: 24px;
          background-color: #f2f2f2;
        }
      }

      .type{
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

  }
  }

  .no-items{
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gallery{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .gallery__item{
      width: 33.33333%;
      margin-bottom: 44px;
    }
  }
}

@media screen and ( max-width: 768px ) {
.items{
  padding-bottom: 104px;

  .wrap{
    border-top: 1px solid #d7d7d7;

    .buttons{
      margin-top: 40px;
      margin-bottom: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      button{
        width: calc( 33.333% - 8px );
        height: 44px;
        margin: 0;
        padding: 0;
        border-radius: 22px;

        &.active{
          color: #0564ff;
          border: solid 1px #0564ff;
        }
      }
    }

  .item__wrap{
    margin-left: 5px;
    width: calc( 100% - 10px );
  }

  .item{
    display: flex;
    flex-direction: column;

    .bottom{
      padding: 0;
      margin-top: 12px;
      margin-bottom: 0;

      .name{
        font-size: 0.875rem;
        flex: auto;
        width: 100%;
      }

      .type{
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
  }
  }

  .no-items{
    min-height: 426px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gallery{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .gallery__item{
      width: 50%;
      margin-bottom: 24px;
    }
  }
}


}
</style>
