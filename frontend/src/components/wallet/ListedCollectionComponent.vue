<template>
  <section class="items">
    <div class="wrap">
      <h1 class="title" v-if="buttons&&buttons.length>0">List Collection</h1>
      <div class="buttons" v-if="buttons&&buttons.length>0">
        <button :class="position === index ? 'active':''" @click="selectItems(index)" v-for="(item, index) in buttons" :key="index">{{item}}</button>
      </div>

      <div class="no-items" v-if="data.length === 0">
        <h1>No Collection</h1>
      </div>

      <div class="gallery">
          <div class="gallery__item" v-for="(item, index) in data" :key="index">
            <div class="item__wrap">
            <div class="item">
<!--              <a :href="'//127.0.0.1:8081/homePage?id=' + item.shorturi" target="_blank" :title="'[describe] '+item.description">-->
              <a :href="'https://zenxhub.zenithx.co/u/' + item.shorturi" target="_blank" :title="'[describe] '+item.description">
                <template v-if="position===0">
                  <span class="pending" v-if="item.status===0">Pending</span>
                  <span class="approved" v-else-if="item.status===1">Approved</span>
                  <span class="no-passwd" v-else>No passed</span>
                </template>
                <div class="image__wrap">
                  <div :class="'image ' + ( item.uri ? '' : 'nodata' )" :style="{backgroundImage:`url(${item.uri.replace('https://ipfs.infura.io/ipfs','https://zenxhub.zenithx.co/mirror/ipfs')})`}"></div>
                </div>
                <div class="bottom">
                  <h3 :class="'name ' + ( item.title ? '' : 'nodata' )">{{ item.title }}</h3>
  <!--                <div :class="'type ' + getType(item.auctiontype)"></div>-->
                </div>
                <div class="handle" v-if="isAdminPage">
                  <button class="btn-approved" type="button" @click="updateCollection(item.id,1)" v-if="item.status!==1">Set Approved</button>
                  <button class="btn-approved" type="button" @click="updateCollection(item.id,0)" v-if="item.status!==0">Set Pending</button>
                  <button class="btn-approved" type="button" @click="updateCollection(item.id,-1)" v-if="item.status!==-1">Set No Passed</button>
                </div>
              </a>
            </div>
            </div>
          </div>
      </div>

    </div>
  </section>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  props:{
    buttons:Array,
    data:Array,
    callback:Function,
    callback2:Function
  },
  data () {
    return {
      isAdminPage:false,
      position:0,
    }
  },
  mounted(){
    this.getAdminPage()
  },
  methods:{
    selectItems( position ){
      if( this.callback != null && typeof(this.callback) == 'function' ){
        this.position = position
        this.callback( position )
      }
    },
    getType( type ){
      if( type === 0 ){
        return "Pending"
      }else if( type === 1 ){
        return "Approved"
      }else{
        return ""
      }
    },
    updateCollection(id,status){
      event.preventDefault()
      event.stopPropagation()
      this.callback2( id,status )
    },
    getAdminPage(){
      // console.log("window.location.pathname=====",window.location.pathname)
      this.isAdminPage = window.location.pathname.indexOf('/admin')>=0
    },
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
  padding-bottom: 20px;
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

  .gallery__item{
    .handle{
      display: none;
    }
  }
  .gallery__item:hover {
    .handle {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 3;
      font-size: 0;
      background: rgba(0, 0, 0, .3);

      button {
        display: inline-block;
        width: 50%;
        font-size: 14px;
        -webkit-appearance: none;
        line-height: 44px;
        height: 44px;
        border: 0;
        color: #fff;
        cursor: pointer;
        position: absolute;
        bottom: 0;
        z-index: 2;

        &:hover {
          opacity: .9;
        }
        &:first-child{
          left: 0;
          background-color: #0e56c1;
        }
        &:last-child{
          right: 0;
          background-color: #c40404;
        }
      }
    }
  }

  .item{
    display: flex;
    flex-direction: column;
    position: relative;

    a{
      display: block;
      &:hover{
        opacity: .95;
      }
    }

    .approved,
    .pending,
    .no-passwd{
      background: rgba(0,0,0,.8);
      border-radius: 12px;
      padding: 2px 10px;
      font-size: 12px;
      color: #fff;
      position: absolute;
      right: 10px;
      top: 8px;
      z-index: 1;
    }

    .approved{
      background: #0863ff;
    }
    .pending{
      background: #7b1b52;
    }
    .no-passwd{
      background: #ec008c;
    }

    .image__wrap{
      overflow: hidden;
      padding-top: 50%; /* 1:1 Aspect Ratio */
      position: relative; /* If you want text inside of it */
      border: solid 1px #d8d8d8;
      border-radius: 24px;

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
      padding: 0 2px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 10px;

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

        &.approved{
          display: flex;
          background-color: #ff8282;
          &::before{
            content:'Bidding';
          }
        }

        &.pending{
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

#collection{
  .item__wrap{
    .item{
      .approved,
      .no-passwd,
      .pending{
        display: none;
      }
    }
  }
}

@media screen and ( max-width: 768px ) {
.items{
  padding-bottom: 20px;

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

        &.approved{
          display: none;
        }

        &.pending{
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
