<template>
  <div class="index-content" id="my">
    <div class="banner">
        <img class="img" v-for="(item,i) in bannersLeft" :key="i" :src="item.uri.replace('https://ipfs.infura.io/ipfs','https://zenxhub.zenithx.co/mirror/ipfs')" v-show="i===n"/>
        <div class="banner-circle">
            <ul>
                <li v-for="(v,i) in bannersLeft " :key="i" :class="i===n ?'selected':''"></li>
            </ul>
        </div>
    </div>
    <div class="main-right">
      <ul>
        <li v-for="item in bannersRight">
          <img :src="item.uri.replace('https://ipfs.infura.io/ipfs','https://zenxhub.zenithx.co/mirror/ipfs')"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    item:{
      type:Object,
    }
  },
  data () {
    return {
      bannersRight:[],
      bannersLeft:[],
      n:2
    }
  },
  mounted(){
    window.document.title = "ZENX NFT Collection"
    // this.setDatas()
    this.fun()
  },
  methods:{
    fun:function(){
      this.getBannerList()
    },
    getBannerList(){
      this.isUpdate3 = true
      this.$axios.post( '/v1/banner', {method:"ListBanner", param:{
        owner:this.$store.state.userInfo.address
      }} ).then((res)=>{
        this.isUpdate3 = false
        if( res.data != null ){
          if( res.data.status !== 200 ){
            alert(res.data.msg)
            history.back()
            return
          }

          let sum = 0;
          for(let i=0;i<res.data.data.length;i++){
            if(!res.data.data[i].type || res.data.data[i].type === "" || res.data.data[i].type === "left") this.bannersLeft.push(res.data.data[i])
            if(res.data.data[i].type === "right" && sum<3){
              this.bannersRight.push(res.data.data[i])
              sum++
            }
          }
          setInterval(this.play,2000)
        }
      }).catch(()=>{})
    },
    play:function() {
      this.n++;
      if (this.n === this.bannersLeft.length) {
        this.n = 0;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .index-content{
    padding: 20px 400px 20px 0;
    width: 770px;
    margin: 120px auto 0 auto;
    overflow: hidden;
    font-size: 0;
    position: relative;
    .banner{
      //width: 770px;
      //float: left;
      position: relative;
      .img{
        width: 100%;
        height: 100%;
        border-radius: 16px;
      }
      .banner-circle{
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 100%;
        ul{
          display: block;
          flex-wrap:unset;
          font-size: 0;
          text-align: right;
          li{
            background: #fff;
            opacity: .8;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin: 0 5px;
            display: inline-block;
            &.selected{
              background-color: #ec008c;
            }
          }
        }
      }
    }
    .main-right{
      width: 385px;
      position: absolute;
      right: 0;
      top: 20px;
      margin-left: 15px;
      ul{
        display: block;
        flex-wrap:unset;
        li{
          padding: 0;
          margin: 0 0 15px 0;
          max-width: 100%!important;
          width:100%;
          display: block!important;
          img{
            width: 100%;
          }
        }
      }
    }
  }

@media screen and ( max-width: 550px ) {
  .index-content{
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 60px;
    position: initial;
    .main-right{
      position: initial;
      margin-left: 0;
      margin-top: 20px;
      width: auto;
    }
  }
}

</style>
