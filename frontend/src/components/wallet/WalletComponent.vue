<template>
  <section class="top">
    <div class="wrap">
      <a class="create__profile" @click="editProfile">Edit my profile</a>
      <div class="wallet__wrap">
        <div class="profile">
          <p :style="{backgroundImage:`url(${profileData()})`}"></p>
        </div>
        <div class="wallet">
          <h1>{{ info.name ? info.name : "Unnamed" }}<a class="address" @click="copyAddress">{{ $utils.shorten(info.address, 22) }}...</a></h1>
          <p class="m-none">{{ info.introduction }}</p>
          <div class="nft m-none">
            <a href="/create" class="create">Create NFT</a>
            <a href="/import" class="import">Import NFT</a>
            <a href="/createCollection" class="create-collection">Create Collection</a>
          </div>
        </div>
        <p class="introduction pc-none">My name is Jay. I use a variety of digital mediums to craft unique vibrant artworks with great understanding of composition and minimalism.</p>
        <div class="balance">{{ this.$utils.shorten( ""+ balance , 8 ) ? this.$utils.shorten( ""+ balance , 8 ) : "0" }} <span>ETH</span></div>
        <div class="nft pc-none">
            <a href="/create" class="create">Create NFT</a>
            <a href="/import" class="import">Import NFT</a>
            <a href="/createCollection" class="create-collection">Create Collection</a>
          </div>
      </div>
    </div>
    <Popup :title="popup.title" :singleButton="true" :callback="onPopupClick" :contents="popup.contents" v-if="popup.show"></Popup>
  </section>
</template>

<script>
import Web3 from 'web3'
import Blokies from '@/libs/Blokies.js'
import Popup from '@/components/popups/PopupComponent.vue'

export default {
  mounted(){

  },
  props:{
    info:{
      type:Object,
      default:{
        address:"0x",
        name:"",
      }
    },
    balance:String,
    callback:Function
  },
  data () {
    return {
      popup:{
        show:false,
        title:"Success",
        contents:"Copy To Clipboard Address"
      }
    }
  },
  methods:{
    onPopupClick(){
      this.popup.show = false
    },
    copyAddress(){
      let copyText = document.createElement("input");
      document.body.appendChild(copyText);
      copyText.value = this.info.address;
      copyText.select();
      document.execCommand("copy");
      document.body.removeChild(copyText);
      this.popup.show = true
    },
    profileData(){
      const data = Blokies({
        seed: this.info.address,
        size: 8,
        scale: 16
      })
      return data.toDataURL()
    },
    editProfile(){
      if( this.callback != null && typeof(this.callback) == 'function' ){
        this.callback()
      }
    }
  },
  components:{
    Popup
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.top{
  padding-top: 196px;
  margin-bottom: 52px;

  .create__profile{
    display: flex;
    position: relative;
    padding-right: 24px;
    align-self: flex-end;
    color: #222222;
    font-weight: 600;
    cursor: pointer;

    &::after{
      content: '';
      display: flex;
      position: absolute;
      width: 24px;
      height: 24px;
      top: 0;
      right: 0;
      bottom: 0;
      background-image: url("~@/assets/images/icon_right_arrow.svg");
      background-size: 20px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  .wallet__wrap{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #0564ff;
    margin-top: 16px;
    border-radius: 20px;
    padding: 38px 0px 34px 0px;
    color: white;

    .profile{
      display: flex;
      justify-content: center;
      align-items: center;

      p{
        width: 110px;
        height: 110px;
        margin: 56px;
        border-radius: 50%;
        border: solid 1px #fff;
        background-size: 100%;
        background-position: center;
      }
    }

    .wallet{
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;

      h1{
        display: flex;
        align-items: center;
        // flex-wrap: wrap;
        font-size: 2rem;
        font-weight: 400;

         .address{
          display: inline-flex;
          align-items: center;
          position: relative;
          font-size: 0.75rem;
          height: 24px;
          margin-left: 13px;
          border-radius: 12px;
          background: rgba(255,255,255,.4);
          padding: 0 32px 0 12px;

          &::after{
            content: '';
            display: flex;
            position: absolute;
            width: 24px;
            height: 24px;
            top: 0;
            right: 4px;
            bottom: 0;
            background-image: url("~@/assets/images/layouts/wallet/icon_copy.svg");
            background-size: 18px;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }

      p{
        margin-top: 12px;
        font-weight: normal;
        font-size: 0.875rem;

      }

      .nft{
        margin-top: 24px;
        display: flex;
        flex-direction: row;

        .create, .import, .create-collection{
          display: flex;
          height: 32px;
          align-items: center;
          padding: 0 21px 0 22px;
          border-radius: 8px;
          background-color: #ffffff;
          color: #0564ff;
          font-size: 0.875rem;
          font-weight: 600;
          margin-right: 16px;
        }

        .create:hover, .import:hover, .create-collection:hover{
          opacity: .8;
        }

        .import{
          display: flex;
          height: 32px;
          align-items: center;
          padding: 0 21px 0 22px;
          border-radius: 8px;
          border: 1px solid#ffffff;
          background: #0564ff;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 600;
          // margin-left: 16px;
        }

        .create-collection{
          display: flex;
          height: 32px;
          align-items: center;
          padding: 0 21px 0 22px;
          border-radius: 8px;
          border: 1px solid#ffffff;
          background: #ec008c;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 600;
        }
      }
    }

    .balance{
      display: flex;
      flex: 1;
      align-self: center;
      justify-content: flex-end;
      font-size: 2.5rem;
      font-weight: bold;
      align-items: baseline;
      padding-right: 52px;

      span{
        display: flex;
        margin-left: 14px;
        font-size: 2rem;
      }
    }
  }
}


@media screen and ( max-width: 768px ) {
.top{
  padding-top: 108px;
  margin-bottom: 52px;

  .wallet__wrap{
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    margin-top: 8px;
    padding: 20px;

    .profile{
      width: 59px;
      align-items: flex-start;
      margin-top: 28px;

      p{
        width: 44px;
        height: 44px;
        margin: 8px 15px 0 0;
      }
    }

    .wallet{
      margin-top: 28px;
      width: calc( 100% - 59px );
      flex: auto;
      justify-content: flex-start;

      h1{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        font-size: 1.125rem;

        .address{
          font-size: 0.75rem;
          height: 24px;
          margin-left: 0;
          margin-top: 4px;
        }
      }

      p{
        margin-top: 12px;
        font-weight: normal;
        font-size: 0.875rem;

      }
    }


    .introduction{
      display: flex;
      width: 100%;
      margin-top: 18px;
      font-weight: 300;
      font-size: 0.875rem;
    }

    .nft{
      &.pc-none{
          width: 100%;
          margin-top: 24px;
          margin-bottom: 19px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .create, .import{
            display: flex;
            flex: 1;
            height: 32px;
            align-items: center;
            border-radius: 8px;
            background-color: #ffffff;
            color: #0564ff;
            font-size: 0.875rem;
            font-weight: 600;
            justify-content: center;
            margin-right: 9px;
          }

          .import{
            display: flex;
            height: 32px;
            align-items: center;
            border-radius: 8px;
            border: 1px solid#ffffff;
            background: #0564ff;
            color: #ffffff;
            font-size: 0.875rem;
            font-weight: 600;
            justify-content: center;
            margin-left: 9px;
            margin-right: 0;
          }
        }
      }

    .balance{
      display: flex;
      flex: 1;
      font-size: 1.25rem;
      font-weight: bold;
      align-items: baseline;
      justify-content: flex-start;
      padding: 0;
      margin-top: 20px;

      span{
        display: flex;
        margin-left: 14px;
        font-size: 1.25rem;
      }
    }
  }
}

}

</style>
