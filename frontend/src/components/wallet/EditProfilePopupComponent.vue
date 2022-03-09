<template>
<div>
  <Popup id="profile" title="My profile" confirm="Edit" cancel="Cancel" :callback="onPopupClick" v-if="show">
    <div class="profile">
      <div class="input__group">
        <h2>Name</h2>
        <input type="text" placeholder="Name" v-model="info.name">
      </div>
      <div class="input__group">
        <h2>Introduction</h2>
        <textarea placeholder="Introduction" v-model="info.introduction"></textarea>
      </div>
    </div>
  </Popup>
</div>
</template>

<script>
import Popup from '@/components/popups/PopupComponent.vue'

export default {
  created(){
    
  },
  props:{
    show:Boolean,
    callback:Function,
    info:{
      type:Object,
      default:{
        name:"",
        introduction:""
      }
    }
  },
  data () {
    return {
      
    }
  },
  watch:{

  },
  methods:{
    onPopupClick( id, confirm, params ){
      if( confirm ){
        this.callback( id, confirm, this.info )
      }else{
        this.callback( id, confirm )
      }
      
    }
  },
  components:{
    Popup
  }
}
</script>

<style lang="scss" scoped>

.profile{
  .input__group{
    margin: 32px 0 40px 0;
    display: flex;
    flex-direction: column;

    h2{
      font-size: 1rem;
      font-weight: bold;
      color: #222222;
      margin-bottom: 12px;
    }

    input[type=text], textarea, select{
      display: flex;
      flex: 1;
      height: 48px;
      border-radius: 16px;
      padding: 0 20px;
      line-height: 48px;
      border: solid 1px #dadada;
      background-color: #ffffff;
      outline: none;
      font-size: 0.875rem;
      color: #222222;
      
      &::placeholder{
        color:#a8a8a8;
      }

      &:focus{
        border-color: #0564ff;
      }
    }

    textarea{
      resize: none;
      min-height: 110px;
    }
  }
}
</style>