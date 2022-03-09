<template>
  <div id="collection">
    <div class="wrap">
      <IndexAdComponent></IndexAdComponent>
      <h1>Collection</h1>
      <div class="content">
        <ListedCollectionComponent :data="collects"></ListedCollectionComponent>
      </div>
    </div>
  </div>
</template>

<script>
import IndexAdComponent from '@/components/collection/IndexAdComponent.vue'
import ListedCollectionComponent from '@/components/wallet/ListedCollectionComponent.vue'

export default {
  mounted(){
    window.document.title = "ZENX NFT Collection"
    this.setDatas()
  },
  data () {
    return {
      buttonsCollect:null,
      collects:[],
    }
  },
  methods:{
    setDatas(){
      this.$axios.post( '/v1/collection', {method:"GetCollectionListGuest", param:{owner:this.$store.state.userInfo.address}} ).then((res)=>{
        if( res.data != null ){
          console.log('res.data=====',res.data.data)
          this.collects = res.data.data
        }
      }).catch(()=>{})
    },
  },
  components:{
    IndexAdComponent,
    ListedCollectionComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#collection {
  //min-height: calc( 100vh - 65px );
  padding-bottom: 40px;
  .content .wrap{
    padding: 20px 0;
  }
}
</style>
