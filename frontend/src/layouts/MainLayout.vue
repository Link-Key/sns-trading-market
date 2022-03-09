<template>
  <div id="main">
    <TopComponent></TopComponent>
    <HowComponent></HowComponent>
<!--    <DescriptionComponent></DescriptionComponent>-->
    <RecentlyComponent :items="recentlyItems"></RecentlyComponent>
  </div>
</template>

<script>
import TopComponent from '@/components/main/TopComponent.vue'
import DescriptionComponent from '@/components/main/DescriptionComponent.vue'
import RecentlyComponent from '@/components/main/RecentlyComponent.vue'
import HowComponent from '@/components/main/HowComponent.vue'

export default {
  mounted(){
    this.$axios.post( '/v1/auction', {method:"GetLatestOrders", param:{}} ).then((res)=>{
      if( res.data != null ){
        this.recentlyItems = res.data
      }
    }).catch((e)=>{})
  },
  data () {
    return {
      recentlyItems:[]
    }
  },
  components:{
    TopComponent,
    DescriptionComponent,
    RecentlyComponent,
    HowComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
