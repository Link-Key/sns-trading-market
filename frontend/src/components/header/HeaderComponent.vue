<template>
  <header :class="'header ' + ( route == 'main' || route == 'brand' || route == 'marketplace' ? '':'border')  + (isActive ? ' active':'')" :style="{background:(route == 'main' ? backgroundColor:backgroundColor)}">

    <div class="logo__wrap">
      <a href="/"><img class="logo" src="@/assets/images/components/header/logo-v2.png" alt="logo"></a>
    </div>
    <div class="overlay" @click="toggleNav()"></div>
    <button class="btn__nav" @click="toggleNav()"></button>
    <nav class="nav__list">
      <a class="item" href="/marketplace">Marketplace</a>
      <a class="item" href="/collection">Collection</a>
      <a class="item" href="/activity">Activity</a>
      <a class="item" href="http://guide.zenithx.co">User Guide</a>
      <a class="item" href="http://www.zenithx.co">About Zenx</a>
      <a class="item" href="/connect"  v-if="!$store.state.userInfo.isSet">Wallet Connect</a>
      <a class="item" href="/wallet" v-if="$store.state.userInfo.isSet">My Wallet</a>
      <a class="item" href="/admin" v-if="$store.state.userInfo.isadmin==1">Admin</a>
    </nav>

    <!-- <div class="search__wrap">
      <div class="wrap">
        <div class="search">
          <input type="text" class="input">
          <button type="button" class="btn"></button>
        </div>
      </div>
    </div> -->
  </header>
</template>

<script>
import Web3 from 'web3'

export default {
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted(){
    if( this.route == 'main'  ){
      this.backgroundColor="rgba(255,255,255,0)"
    }

  },
  props:['route'],
  data(){
    return {
      isActive:false,
      backgroundColor:"rgba(255,255,255,1)",
    }
  },
  methods: {
    handleScroll (event) {
      if( this.route == 'main' ){
        let trigger = 140;
        if( window.scrollY > trigger ){
          this.backgroundColor="rgba(255,255,255,0.7)"
        }else{
          this.backgroundColor="rgba(255,255,255,"+( window.scrollY/trigger * 0.7 )+")"
        }
      }else{
        if( window.innerWidth < 768 ){
          this.backgroundColor = "rgba(255,255,255,0.7)"
        }else{
          this.backgroundColor="rgba(255,255,255,1)"
        }
      }
    },
    toggleNav(){
      this.isActive = !this.isActive
    }
  },
}
</script>

<style lang="scss" scoped>
.header{
  position: fixed;
  display: flex;
  width: 100%;
  height: 80px;
  top: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 9;

  &.border{
    box-shadow: 0 2px 4px 0 rgba(156, 156, 156, 0.5);
    background: #ffffff;
  }
  .overlay{
    display: none;
  }

  .btn__nav{
    display: none;
  }

  .logo__wrap{
    flex: 1;
    padding: 0 59px;
    height: 50px;

      img{
        //width: 50px;
        height: 50px;
      }
  }

  .search__wrap{
    position: absolute;
    width: 100%;
    pointer-events: none;

    .search{
      position: relative;
      height: 44px;
      flex: 1;
      min-width: 400px;
      max-width: 650px;

      .input{
        width: calc( 100% - 68px );
        height: 44px;
        padding: 0 52px 0 16px;
        line-height: 44px;
        border-radius: 22px;
        border: solid 1px #dadada;
        background-color: #ffffff;
        outline: none;
        font-size: 1rem;
        pointer-events: visible;
      }

      .btn{
        position: absolute;
        top: 1px;
        right: 0;
        width: 44px;
        height: 44px;
        outline: none;
        box-shadow: none;
        border: none;
        background-color: transparent;
        background-image: url("~@/assets/images/components/header/icon_search.png");
        background-position: center;
        background-size: 16px;
        background-repeat: no-repeat;
      }
    }
  }

  .nav__list{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 35px;
    height: 64px;

    .item{
      margin: 0 28px;
      color: #222222;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
    }

    .item:visited{
      color: #222222;
    }
  }
}


@media screen and ( max-width: 550px ) {
    .header{
      height: 72px;

      &.border{
        box-shadow: none;
        background: rgba(255,255,255,.3);
      }

      &.active{
        .overlay{
           display: block;
        }
        .nav__list{
            left: 30%;
        }
      }

      .logo__wrap{
        padding: 0 16px;
        height: 36px;

          img{
            //width: 36px;
            height: 36px;
          }
      }

      .btn__nav{
        display: block;
        width: 18px;
        height: 15px;
        margin-right: 20px;
        border: none;
        border-top: 1px solid #222222;
        border-bottom: 1px solid #222222;
        background: transparent;
        box-shadow: none;
        outline: none;

        &::before{
          content: '';
          display: block;
          width: 80%;
          float: right;
          height: 1px;
          background: #222222;
        }
      }

      .overlay{
        position: absolute;
        background: rgba(0,0,0,0.2);
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
      }

      .nav__list{
        position: absolute;
        height: 100vh;
        top: 0;
        bottom: 0;
        left: 100%;
        width: 70%;
        padding: 0;
        margin: 0;
        background: white !important;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;

        .item{
          margin: 28px 0;
          color: #767989;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1323rem;
        }

        .item:visited{
          color: #767989;
        }

      }
    }
    .index-content{
      width: 100%;
      box-sizing: border-box;
    }
}

</style>
