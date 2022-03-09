<template>
  <div id="activity">
    <div class="wrap">
      <h1>Activity</h1>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <ActivityComponent :item="item"></ActivityComponent>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ActivityComponent from '@/components/activity/ActivityComponent.vue'

export default {
  mounted(){
    window.document.title = "NFT Activity"
    this.setDatas()
    setInterval( ()=>{
      this.setDatas()
    }, 10000 )
  },
  data () {
    return {
      items:[{},{},{},{}],
    }
  },
  methods:{
    setDatas(){
      this.$axios.post( '/v1/auction', {method:"GetActivity", param:{}} )
      .then((res)=>{
        if( res.data ){
          this.items = res.data
        }
      }).catch((e)=>{})
    }
  },
  components:{
    ActivityComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#activity{
  min-height: calc( 100vh - 65px );
  padding-bottom: 100px;

  h1{
    width: 100%;
    margin-top: 160px;
    padding-bottom: 52px;
    margin-bottom: 64px;
    border-bottom: 1px solid #d7d7d7;
    font-size: 2rem;
    font-weight: bold;
    color: #222222;
  }

}

@media screen and ( max-width: 768px ) {
#activity{
  min-height: calc( 100vh - 65px );
  padding-bottom: 100px;

  h1{
    margin-top: 108px;
    padding-bottom: 32px;
  }
  }
}
</style>
