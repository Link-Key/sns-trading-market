<template>
  <section class="auction">
      <div class="wrap">
        <h1>{{title}}</h1>
          <Carousel :per-page="perPage" :scroll-per-page="true" :navigation-enabled="true" :navigation-next-label="''" :navigation-prev-label="''" :pagination-enabled="false" v-if="type=='carousel'">
            <Slide v-for="(item, index) in items" :key="index">
              <ItemComponent :item="item"></ItemComponent>
            </Slide>
          </Carousel>
          <div class="gallery" v-if="type==='gallery'">
            <div class="gallery__item" v-for="(item, index) in items" :key="index">
              <ItemComponent :item="item"></ItemComponent>
              </div>
          </div>
      </div>
    </section>
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
    this.dataPerPage = this.perPage
  },
  props:{
    items:Array,
    title:String,
    type:{
      type:String,
      default:"carousel"
    },
    perPage:{
      type:Number,
      default:4
    }
  },
  data () {
    return {
      dataPerPage:4
    }
  },
  watch:{
    perPage(){
      this.dataPerPage = this.perPage
    }
  },
  methods:{
    onResize(){
      if( window.innerWidth < 768 ){
        this.dataPerPage = 1
      }else{
        this.dataPerPage = 4
      }
    }
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

.auction{
  padding-top: 44px;
  padding-bottom: 44px;

  h1{
    margin-top: 40px;
    margin-bottom: 24px;
    font-size:1.5rem;
    font-weight: 600;
    color: #222222;
  }

  .item__wrap{
    width: calc( 100% - 30px );
  }

  .gallery{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .gallery__item{
      width: 25%;
      margin-bottom: 44px;
    }
  }
}

@media screen and ( max-width: 768px ) {

  .auction{
    padding-top: 24px;
    padding-bottom: 24px;

    h1{
      margin-top: 12px;
      margin-bottom: 24px;
      font-size:1.5rem;
      font-weight: 600;
      color: #222222;
    }

    .item__wrap{
      margin-left: 5px;
      width: calc( 100% - 10px );
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
