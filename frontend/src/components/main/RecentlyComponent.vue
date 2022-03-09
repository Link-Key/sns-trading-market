<template>
  <section class="recently">
    <div class="background"></div>
    <div class="wrap">
      <h1>Recently listed items </h1>
      <p>Create, buy and sell your digital ownership for the best price at Zenx Hub</p>

      <ul>
        <li v-for="(item, index) in items.slice(0,4)" :key="index">
          <div class="item">
            <a :href="'/item/' + item.itemaddress + '/'  +item.itemid">
              <div class="image__wrap">
                <div class="image" :style="{backgroundImage:`url(${item.image})`}"></div>
              </div>
              <div class="name">{{ item.name }}</div>
              <div class="price">{{ utils().fromWei(item.price) }} ETH <i v-if="item.price && store().state.currency.ethusd">(${{ (parseFloat( utils().fromWei(item.price, 18) )*parseFloat(store().state.currency.ethusd)).toFixed(2) }})</i></div>
              <span class="go">go</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Axios from 'axios'
import Web3 from 'web3'

export default {
  props:{
    items:Array
  },
  data () {
    return {
    }
  },
  methods:{
    store(){
      return this.$store
    },
    utils(){
      return this.$utils
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.recently{
  margin-top: 82px;
  min-height: 72vw;
  position: relative;

  .background{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    &::before{
      content: '';
      position: absolute;
      display: block;
      height: 53vw;
      width: 53vw;
      border-radius: 50%;
      background: rgba(216,216,216,0.25);
      top: 292px;
      left:-20vw;
      z-index: -1;
    }

    &::after{
      content: '';
      position: absolute;
      display: block;
      height: 100%;
      width: 65vw;
      right: 0;
      top: 82px;
      background-image: url('~@/assets/images/layouts/main/background_recently_right.png');
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: top right;
      z-index: -1;
    }
  }

  .wrap{
    > h1{
      font-weight:bold;
      font-size: 2rem;
      color: #222222;
      text-align: center;
    }

    > p{
      font-size: 1.25rem;
      color: #222222;
      text-align: center;
    }
  }

  ul{
    margin-top: 63px;
    margin-bottom: 80px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    li{
      display: flex;
      width: 50%;

      .item{
        width: calc( 100% - 144px );
        min-width: 340px;
        padding: 58px 72px 0 72px;
        display: flex;
        flex-direction: column;
        border-radius: 36px;
        box-shadow: 0 7px 20px 0 rgba(166, 166, 166, 0.5);
        background-color: #ffffff;

        &:hover{
          background-color: #0061FF;
          -webkit-transition: all 300ms linear;
          -ms-transition: all 300ms linear;
          transition: all 300ms linear;

          .name{
            color: white;
            -webkit-transition: all 300ms linear;
            -ms-transition: all 300ms linear;
            transition: all 300ms linear;
          }
          .price{
            color: white;
            -webkit-transition: all 300ms linear;
            -ms-transition: all 300ms linear;
            transition: all 300ms linear;
            i{
              color: white;
              -webkit-transition: all 300ms linear;
              -ms-transition: all 300ms linear;
              transition: all 300ms linear;
            }
          }
        }

        .image__wrap{
          display: flex;
          padding-top: 100%; /* 1:1 Aspect Ratio */
          position: relative; /* If you want text inside of it */
          border-radius: 36px;

          .image{
            position: absolute;
            border-radius: 20px;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
        }

        .name{
          display: flex;
          margin: 28px 42px 20px 42px;
          font-weight: 600;
          color: #222222;
          font-size: 1.25rem;
        }

        .price{
          display: flex;
          margin: 0px 42px 0px 42px;
          font-weight: bold;
          color: #222222;
          font-size: 1.5rem;
          align-items: center;

          i{
            margin-left: 1rem;
            font-style: normal;
            font-size: 1.125rem;
            font-weight: normal;
            color:#666666;
          }
        }

        .go{
          display: flex;
          font-size: 0.875rem;
          margin-bottom: 38px;
          margin-right: 42px;
          color: white;
          justify-content: flex-end;
          align-items: baseline;

          &::after{
            content: '';
            display: block;
            width: 30px;
            height: 9px;
            margin-left:8px;
            background-image: url('~@/assets/images/layouts/main/icon_go.png');
            background-position: bottom;
            background-size: cover;
            background-repeat: no-repeat;

          }
        }

      }

      &:nth-of-type(odd){
        justify-content: flex-end;


        .item{
          margin-right: 16px;
          margin-bottom: 88px;
        }
      }

      &:nth-of-type(even){
        justify-content: flex-start;

        .item{
          margin-left: 16px;
          margin-top: 88px;
        }
      }

    }
  }
}

@media screen and ( max-width: 768px ) {
  .recently{
    margin-top: 78px;
    min-height: 300px;

    .background{
      overflow-x: hidden;

      &::before{
        height: 611px;
        width: 611px;
        top: 400px;
        left: -383px;
      }

      &::after{
        height: 150vw;
        width: 150vw;
        top: auto;
        right: -22vw;
        bottom: 400px;
        opacity: 0.7;
      }
    }

    .wrap{
      > h1{
        font-size: 1.5rem;
        margin-bottom: 16px;
      }

      > p{
        font-size: 1rem;
      }
    }

    ul{
      margin-top: 48px;
      margin-bottom: 0px;

      li{
        width: 100%;
        margin-bottom: 60px;

        .item{
          width: 100%;
          min-width: 0;
          padding: 12px 20px 0 20px;

          .image__wrap{
            display: flex;
            margin: 0;
            border-radius: 36px;

            .image{
              margin: 20px;
            }
          }

          .name{
            margin: 0 36px;
            font-size: 1rem;
          }

          .price{
            margin: 10px 36px;
            font-size: 1.25rem;

            i{
              margin-left: 10px;
              font-size: 0.875rem;
            }
          }

          .go{
            font-size: 1rem;
            margin-bottom: 17px;
            margin-right: 20px;
            color: white;
            justify-content: flex-end;
            align-items: baseline;

            &::after{
              content: '';
              display: block;
              width: 30px;
              height: 9px;
              margin-left:8px;
              background-image: url('~@/assets/images/layouts/main/icon_go.png');
              background-position: bottom;
              background-size: cover;
              background-repeat: no-repeat;

            }
          }

        }

        &:nth-of-type(odd){
          justify-content: center;

          .item{
            margin: 0;
          }
        }

        &:nth-of-type(even){
          justify-content: center;

          .item{
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
