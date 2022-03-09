<template>
  <div id="app">

    <Header :route="$route.name" v-show="!isLoading"></Header>
    <router-view  v-show="!isLoading"/>
    <Footer :route="$route.name" v-show="!isLoading"></Footer>
    <FullPageIndicator :isLoading="isLoading"></FullPageIndicator>
  </div>
</template>

<script>
import Header from '@/components/header/HeaderComponent'
import Footer from '@/components/footer/FooterComponent'
import FullPageIndicator from '@/components/FullPageIndicator'
export default {
  created(){
    this.setVisibleIndicator( true )
    this.$wallet.addListener( (success, params )=>{
      this.setVisibleIndicator( false, 500 )
      if( !success ){
      }
    })
    this.$wallet.checkConnectedWithGetUserInfo(window)

    this.$utils.getCurrency( this.$store )
    setInterval( ()=>{
      this.$utils.getCurrency( this.$store )
    }, 3000 )
  },
  data(){
    return {
      isLoading:false
    }
  },
  methods:{
    setVisibleIndicator( visible, delay = 0 ){
      setTimeout( ()=>{
          this.isLoading = visible
        }, delay) 
    }
  },
  name: 'App',
  components:{
    Header,
    Footer,
    FullPageIndicator
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800;900&display=swap');

* {
  padding: 0;
  margin: 0;
  list-style: none;
}
map area:focus, map area:active	{outline: none; border:0; }
a{
  text-decoration: none;
}
button{
  border: none;
  outline: none;
}

body{
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
}

.m-none{
  @media screen and ( max-width: 768px ) {
    display: none !important;
  }
}

.pc-none{
  @media screen and ( min-width: 768px ) {
    display: none !important;
  }
}

body{
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

.wrap{
  display: flex;
  flex-direction: column;
  width: 1170px;
  margin: 0 auto;

  @media screen and ( max-width: 1200px ) {
    width: 970px;
    font-size:17px;
  }

  @media screen and ( max-width: 992px ) {
    width: 750px;
    font-size:16px;
  }

  @media screen and ( max-width: 768px ) {
    width: auto;
    padding: 0 20px;
    overflow-x: hidden;
  }

}

.VueCarousel-navigation-next{
    width: 40px;
    height: 40px;
    position: absolute;
    right: 10px !important;
    top: calc( 50% - 20px ) !important;
    background-color: transparent !important;
    background-image: url("~@/assets/images/icon_pagination_right.svg");
    background-size: 100%;
    background-repeat: no-repeat;
    outline: none !important;
    border: none !important;
}

.VueCarousel-navigation-prev{
    width: 40px;
    height: 40px;
    position: absolute;
    left: -20px !important;
    top: calc( 50% - 20px ) !important;
    background-color: transparent !important;
    background-image: url("~@/assets/images/icon_pagination_left.svg");
    background-size: 100%;
    background-repeat: no-repeat;
    outline: none !important;
    border: none !important;
}

@media screen and ( max-width: 768px ) {

  .VueCarousel-navigation-next{
      width: 32px;
      height: 32px;
      right: 16px !important;
      top: calc( 50% - 50px ) !important;
      background-color: transparent !important;
      outline: none !important;
      border: none !important;
  }

  .VueCarousel-navigation-prev{
      width: 32px;
      height: 32px;
      position: absolute;
      left: 16px !important;
      top: calc( 50% - 50px ) !important;
      background-color: transparent !important;
      outline: none !important;
      border: none !important;
  }
}

</style>
