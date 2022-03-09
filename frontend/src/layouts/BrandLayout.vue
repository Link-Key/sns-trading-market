<template>
  <div id="brand">
    <section class="banner">
      <div class="image" :style="{backgroundImage:`url(${image})`}"></div>
      <div class="wrap">
        <h1>{{ title }}</h1>
      </div>
    </section>

    <section class="description">
      <div class="wrap" v-html="contentsToHtml(contents)">
      </div>
    </section>

    <section class="artworks">
      <div class="wrap">
        <h1>NFTs</h1>
        <Carousel :per-page="perPage" :scroll-per-page="true" :navigation-enabled="true" :navigation-next-label="''" :navigation-prev-label="''" :pagination-enabled="false">
          <Slide v-for="(item, index) in items" :key="index">
            <ItemComponent :item="item"></ItemComponent>
          </Slide>
        </Carousel>
      </div>
    </section>
  </div>
</template>

<script>
import ItemComponent from '@/components/marketplace/ItemComponent'
import Axios from 'axios'
import Web3 from 'web3'
import { Carousel, Slide } from 'vue-carousel';

export default {
  mounted(){
    window.document.title = "NFT Brand"
    this.$axios.post( '/v1/auction', {method:"GetDetailedBrandPage", param:{id:this.$route.params.brand}} )
    .then((res)=>{
      // this.items = res.data
      if( res.data.status && res.data.status == 500  ){
        location.href = "/collection"
      }

      this.image = res.data.image
      this.title = res.data.title
      this.description = res.data.description
      this.contents = res.data.contents
      this.items = res.data.items
    })
    .catch((e)=>{})

  },
  data () {
    return {
      perPage:3,
      image:null,
      title:null,
      description:null,
      contents:[],
      items:[{},{},{}]
    }
  },
  methods:{
    setDatas(){
    },
    contentsToHtml( contents ){
      if( contents ){
        var contentsObject = [];
        var htmlText = ""
        try{
          contentsObject = JSON.parse(String(contents))
          contentsObject.forEach(element => {
            if( element.type == 'header' ){
              htmlText += `<h2>${element.value}</h2>\n`
            }else if( element.type == 'text' ){
              htmlText += `<p>${element.value}</p>\n`
            }else if( element.type == 'image' ){
              htmlText += `<img src="${element.value.replace('https://ipfs.infura.io/ipfs','https://zenxhub.zenithx.co/mirror/ipfs')}">\n`
            }
          });
          return htmlText
        }catch(e){
          console.log(e)
        }
      }
      return null;
    }
  },
  components:{
    Carousel,
    Slide,
    ItemComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#brand{
  min-height: calc( 100vh - 65px );
  margin-top: 80px;

  .wrap{
    display: flex;
    z-index: 2;

    h1{
      color: white;
      font-weight: bold;
      font-size: 3.75rem;
    }
  }

  .banner{
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
        background-position: center;
        background-size: cover;
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

  .description{
    margin: 20px 0;
    display: flex;

    .wrap{
      h2{
        font-size: 2rem;
        font-weight: 600;
        color: #222222;
        margin-top: 60px;
      }

      p{
        font-size: 1.5rem;
        color: #222222;
        margin-top: 24px;
      }

      img{
        margin-top: 60px;
        min-height: 340px;
        max-width:80%;
        justify-self: center;
        align-self: center;
        background-color: #f2f2f2;
      }
    }

  }

.artworks{
  margin-bottom: 40px;
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
  }
}



@media screen and ( max-width: 768px ) {
  #brand{
    min-height: calc( 100vh - 65px );
  }
}
</style>
