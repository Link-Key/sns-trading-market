<template>
  <div id="homepage">
    <div class="wrap">
      <div class="collectionNoTip" v-if="noData">{{collectionNoTip}}</div>
      <div v-else>
        <h1 class="big-title"><span>{{collectionInfo.title}}</span>'s Home Page</h1>
        <div class="info" v-if="!loading">
  <!--        <div class="title">{{collectionInfo.title}}</div>-->
          <div class="description">{{collectionInfo.description}}</div>
          <div class="owner">
            <span class="alt">Items:</span>
            {{itemsSum}}
          </div>
          <div class="owner">
            <span class="alt">Owner:</span>
            {{collectionInfo.owner}}
          </div>
          <div class="shorturi">
            <span class="alt">Home Page:</span>
            https://zenxhub.zenithx.co/u/{{collectionInfo.shorturi}}
            <span class="copy-btn" @click="copyText('https://zenxhub.zenithx.co/u/'+collectionInfo.shorturi)">Copy</span>
          </div>
          <div class="image_wrap" v-if="collectionInfo.uri">
            <div :class="'image ' + ( collectionInfo.uri ? '' : 'nodata' )" :style="{backgroundImage:`url(${collectionInfo.uri.replace('https://ipfs.infura.io/ipfs','https://zenxhub.zenithx.co/mirror/ipfs')})`}"></div>
          </div>
        </div>
        <ListedItemsComponent :buttons="buttons" :items="items" :callback="selectItems"></ListedItemsComponent>
      </div>
    </div>
  </div>
</template>

<script>
// import CollectionComponent from '@/components/collection/CollectionComponent.vue'
import ListedItemsComponent from '@/components/wallet/ListedItemsComponent.vue'

export default {
  props: {
    id:String,
  },
  mounted(){
    window.document.title = "ZENX NFT Collection"
    this.setDatas()
  },
  data () {
    return {
      collectionNoTip:'The collection does not exist or is not approved',
      loading:true,
      collectionInfo:{
        description: "",
        id: null,
        owner: "",
        shorturi: "",
        status: null,
        title: "",
        uri: ""
      },
      noData:false,
      buttons:['All items','On sale now', 'Bidding'],
      items:[],
      userOrders:[],
      itemsSum:0,
      position:0,
    }
  },
  methods:{
    selectItems( position ){
      this.position = position
      if( position === 0 ){
        this.items = this.userOrders
      }else if( position === 1 ){
        this.items = this.userOrders.filter( (element)=>{ return element.type === 0 } )
      }else if( position === 2 ){
        this.items = this.userOrders.filter( (element)=>{ return element.type === 1 } )
      }
    },
    setDatas(){

      console.log("this.$store====", this.$store)

      this.loading = true
      this.$axios.post( '/v1/collection', {method:"GetCollectionByShortUri", param:{
        shortUri:this.id
      }} ).then((res)=>{
        this.loading = false
        if(!res || !res.data || res.data.status === 500){
          this.noData = true
          return
        }
        if( res.data.data != null ){
          this.collectionInfo = res.data.data

          if(this.collectionInfo.owner)
          this.$axios.post( '/v1/auction', {method:"GetUserOrders",
            param:{
              address:this.collectionInfo.owner,
              collection_id:this.collectionInfo.id
            }
          } ).then((res)=>{
            if( res.data != null ){
              this.userOrders = res.data
              this.itemsSum = this.userOrders.length
              this.selectItems(this.position)
            }

          }).catch(()=>{})
        }
      }).catch(()=>{})
    },
    copyText(node) {
        if (!node) {
            return;
        }
        var result;
        var tempTextarea = document.createElement('textarea');
        document.body.appendChild(tempTextarea);
        if (typeof(node) == 'object') {
            if (node.value) {
                tempTextarea.value = node.value;
            } else {
                tempTextarea.value = node.innerHTML;
            }
        } else {
            tempTextarea.value = node;
        }
        var u = navigator.userAgent;
        if (u.match(/(iPhone|iPod|iPad);?/i)) {
            // iOS
            // 移除已选择的元素
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(tempTextarea);
            window.getSelection().addRange(range);
            result = document.execCommand('copy');
            window.getSelection().removeAllRanges();

        } else {
            tempTextarea.select();
            result = document.execCommand('Copy');
        }
        document.body.removeChild(tempTextarea);
        if (result) {
            alert('Copy Ok!', {
                removeTime: 1000
            })
        } else {
            alert('Copy Fail!', {
                removeTime: 1000
            })
        }

        return result;
    },
  },
  components:{
    ListedItemsComponent
    // CollectionComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#homepage {
  //min-height: calc( 100vh - 65px );
  padding-bottom: 40px;
  padding-top: 120px;

  .collectionNoTip{
    font-size: 28px;
    padding: 120px 0;
    text-align: center;
    color: #f00;
  }

  .big-title{
    font-size: 24px;
    color: #333;
    span{
      font-size: 34px;
      margin-right: 4px;
      display: inline-block;
      color: #ec0a8d;
    }
  }

  .info{
    padding: 20px 0;
    min-height: 160px;
    position: relative;
    .title{
      font-size: 24px;
      color: #333;
    }
    .owner{
      margin-bottom: 10px;
    }
    .shorturi{
      margin-bottom: 10px;
    }
    .alt{
      font-size: 14px;
      margin-right: 10px;
    }
    .description{
      font-size: 14px;
      color: #777;
      line-height: 1.5em;
      text-indent: 2em;
      margin: 10px 320px 20px 0;
      text-align: justify;
    }
    .copy-btn{
      font-size: 10px;
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      background: #1757b8;
      color: #fff;
      cursor: pointer;
      &:hover{
        opacity: .9;
      }
    }
  }

  .info .image_wrap{
    overflow: hidden;
    position: absolute; /* If you want text inside of it */
    border-radius: 24px;
    right: 0;
    top: 0;
    width: 300px;
    height: 150px;
    border: solid 1px #d8d8d8;

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
}
</style>
