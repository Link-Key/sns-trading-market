<template>
    <div :class="'full ' + ( isLoading ? 'loading' :'' )">
        <img width="40" height="40" src="@/assets/images/loading_indicator.svg">
    </div>
</template>

<script>
export default {
  created(){
    
  },
  props:{
    isLoading:{
      type:Boolean,
      default:false
    },
  },
  data () {
    return {
     
    }
  },
  watch:{
   
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
.full{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  width: 100vw;
  height: 100vh;
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  opacity: 0;
  -webkit-transition: all 1000ms ease-out;
  -ms-transition: all 1000ms  ease-out;
  transition: all 1000ms  ease-out;

  &.loading{
    opacity: 1;
    pointer-events: all;
  }
}
</style>