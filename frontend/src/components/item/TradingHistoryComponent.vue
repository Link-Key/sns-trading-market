<template>
<div>
  <section class="history">
    <div class="wrap">
      <h1>Trading History</h1>
      <ul>
        <li class="header">
          <span>Event</span>
          <span>TxHash</span>
          <span>Price</span>
          <span>By</span>
          <span>To</span>
          <span>Date</span>
        </li>

        <li v-for="(item, index) in items" :key="index">
          <span>{{ item.event }}</span>
          <span><a :href="`https://etherscan.io/tx/${item.tx}`" target="_blank">{{ shorten(item.tx, 10) }}...</a></span>
          <span>{{ fromWei(item.price) }} ETH</span>
          <span>{{ shorten(item.by, 10) }}...</span>
          <span>{{ shorten(item.to, 10) }}...</span>
          <span>{{ dateFormat(item.date) }}</span>
        </li>

      </ul>
      <!-- <button class="more">More</button> -->
    </div>
  </section>
</div>
</template>

<script>

export default {
  mounted(){
    
  },
  props:{
    items:Array
  },
  watch:{
    items(){
      console.log("Items",this.items)
    }
  },
  methods:{
    fromWei( a, b ){
      return this.$utils.fromWei(a, b) 
    },
    shorten( a, b ){
      return this.$utils.shorten(a, b) 
    },
    dateFormat( a ){
      return this.$utils.dateFormat(a) 
    }
  }
}
</script>

<style lang="scss" scoped>
.history{
  margin-bottom: 100px;

  h1{
    font-size: 1.125rem;
    color: #222222;
    margin-bottom: 12px;
  }
  
  ul{
    
    li{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 48px;
      border-radius: 16px;
      margin-bottom: 10px;
      align-items: center;
      border: solid 1px #e1e1e1;

      &:nth-child(1){
        background: #e1e1e1;
        border: none;
      }

      span{
        flex:1;
        display: flex;
        justify-content: center;

        a{
          color: #0061FF;
          &:visited{
            color: #0061FF;
          }
        }
      }
    }
  }

  .more{
    margin-top: 18px;
    background: transparent;
    outline: none;
    border: none;
    font-weight: normal;
    font-size: 1rem;
    justify-content: center;
    color: #888888;
  }
}

@media screen and ( max-width: 768px ) {
.history{  
  ul{
    li{
      font-size: 0.75rem;
      span{
        overflow-x: auto;
      }
    }
  }

  .more{
    font-size: 0.875rem;
  }
}
}

</style>