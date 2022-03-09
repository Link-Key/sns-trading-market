<template>
  <div id="marketplace">
    <IndexAdComponent></IndexAdComponent>
    <ItemsComponent :items="autionItems" title="Hot Items"></ItemsComponent>
    <div class="wrap">
      <h1>Recently Added Items</h1>
      <div class="orders">
        <div class="category">
          <button :class="selectCategory == 0 ? 'select':''" @click="onClick(0)">All</button>
          <button :class="selectCategory == 1 ? 'select':''" @click="onClick(1)">Art</button>
          <button :class="selectCategory == 2 ? 'select':''" @click="onClick(2)">Digital Goods</button>
          <button :class="selectCategory == 3 ? 'select':''" @click="onClick(3)">Collectibles</button>
          <button :class="selectCategory == 4 ? 'select':''" @click="onClick(4)">Game Item</button>
          <button :class="selectCategory == 5 ? 'select':''" @click="onClick(5)">Antiques</button>
          <button :class="selectCategory == 6 ? 'select':''" @click="onClick(6)">Luxury Goods</button>
          <button :class="selectCategory == 7 ? 'select':''" @click="onClick(7)">Soundtrack</button>
          <button :class="selectCategory == 8 ? 'select':''" @click="onClick(8)">Video</button>
        </div>
        <div class="order">
          <select v-model="orderType" @change="onSelect">
            <option value="0">All</option>
            <option value="1">Buy now</option>
            <option value="2">Bidding</option>
          </select>
          <select v-model="orderDate" @change="onSelect">
            <option value="0">Latest</option>
            <option value="1">Oldest</option>
            <option value="2">Highest First</option>
            <option value="3">Lowest First</option>
          </select>
        </div>
      </div>
    </div>
    <ItemsComponent :items="newItems" type="gallery"></ItemsComponent>
  </div>
</template>

<script>
import ArtworksComponent from '@/components/marketplace/ArtworksComponent.vue'
import ItemsComponent from '@/components/marketplace/ItemsComponent.vue'
import CollectionLayout from '@/layouts/CollectionLayout.vue'
import IndexAdComponent from '@/components/collection/IndexAdComponent.vue'

export default {
  mounted(){
    window.document.title = "NFT MarketPlace"

    this.$axios.post( '/v1/auction', {method:"GetOldestOrders", param:{}} )
    .then((res)=>{
      this.autionItems = res.data
    })
    .catch((e)=>{})

    this.getLists()

  },
  data () {
    return {
      autionItems:[{},{},{},{},{}],
      newItems:[{},{},{},{},{},{},{},{},{},{},{},{}],
      selectCategory:0,
      orderType:0,
      orderDate:0,
    }
  },
  methods:{
    getLists(){
      this.newItems = [{},{},{},{},{},{},{},{},{},{},{},{}]
      this.$axios.post( '/v1/auction', {method:"GetItemsByCatetory", param:{category:this.selectCategory, sellType:this.orderType, orderBy:this.orderDate}} ).then((res)=>{
        if( res.data != null ){
          this.newItems = res.data
        }
      }).catch((e)=>{})
    },
    onSelect(){
      this.getLists()
    },
    onClick( index ){
      this.selectCategory = index
      this.getLists()
    }
  },
  components:{
    ArtworksComponent,
    ItemsComponent,
    CollectionLayout,
    IndexAdComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#marketplace{
  padding-bottom: 124px;

  h1{
    margin-top: 40px;
    font-size:1.5rem;
    font-weight: 600;
    color: #222222;
    flex:1
  }

  .orders{
    margin-top: 8px;
    .category{

      button{
        height: 32px;
        padding: 0 20px;
        border-radius: 36px;
        border: solid 1px #b5b5b5;
        background: white;
        color: #626262;
        font-size: 0.875rem;
        margin-right: 12px;
        margin-top: 12px;

        &.select{
          border: solid 1px #0564ff;
          color: #0564ff;
        }
      }
    }

    .order{
      margin-top: 20px;
      display: flex;
      flex-direction: row;

      select{
        border-radius: 16px;
        height: 34px;
        border: solid 1px #dadada;
        background-color: #ffffff;
        margin-right: 14px;
        color: #222222;
        padding: 0 16px;
        font-size: 0.875rem;
      }
    }
  }

  #collection{
    .wrap{
      h1{
        display: none;
      }
    }
  }
}

@media screen and ( max-width: 768px ) {
  #marketplace{
    .orders{
      margin-top: 40px;
      flex-direction: column;
      align-items: flex-start;

      h1{
        font-size:1.5rem;
        font-weight: 600;
        color: #222222;
        flex:1
      }

      .category{
        display: flex;
        width: 100%;
        overflow-x: scroll;
        margin-top: 20px;

        button{
          margin-right: 12px;
          margin-left: 0;
        }
      }

      .order{
        display: flex;
        margin-top: 24px;
        flex-direction: row;
        justify-content: space-between;

        select{
          width: calc( 50vw - 32px );
          margin-left: 0;
          margin-right: 16px;
          padding-left: 16px;
        }
      }
    }
  }
}
</style>
