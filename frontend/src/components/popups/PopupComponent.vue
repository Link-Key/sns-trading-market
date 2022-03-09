<template>
  <transition name="modal">
    <div class="mask">
      <div class="container">

          <div class="header">
            <h1>{{ title }}</h1>
            <button class="close" @click="onClick(false)"></button>
          </div>

          <div class="body">
            <div class="contents" v-if="contents">{{ contents }}</div>
            <slot></slot>
          </div>

          <div class="footer">
            <button class="btn-cancel" @click="onClick(false)" v-if="!singleButton">{{cancel}}</button>
            <button :class="'btn-confirm ' + ( singleButton ? 'single':'' )" @click="onClick(true)" :disabled="loading">{{confirm}}</button>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  created(){
    
  },
  props:{
    loading:{
      type:Boolean,
      default:false,
    },
    singleButton:{
      type:Boolean,
      default:false
    },
    id:{
      type:String,
      default:"default"
    },
    callback:Function,
    title:{
      type:String,
      default:"Title"
    },
    contents:String,
    confirm:{
      type:String,
      default:"Confirm"
    },
    cancel:{
      type:String,
      default:"cancel"
    }
  },
  data () {
    return {
     
    }
  },
  watch:{
   
  },
  methods:{
    onClick( confirm ){
      if( this.callback != null && typeof(this.callback) == 'function' ) {
        this.callback( this.id, confirm, {} )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(34, 34, 34, 0.4);
  transition: opacity .3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  width: 400px;
  padding: 24px 18px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
}

.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1{
    color: #222222;
    font-size: 1.125rem;
    font-weight: bold;
  }

  .close{
    width: 24px;
    height: 24px;
    background-color: transparent;
    background-image: url("~@/assets/images/icon_close_transparent.svg");
    background-size: 100;
    background-position: center;
    background-repeat: no-repeat;
  }
}

.body{

  .contents{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 33px 0;
  }
}

.footer{
  display: flex;
  flex-direction: row;

  button{
    display: flex;
    flex: 1;
    border-radius: 16px;
    font-size: 1rem;
    justify-content: center;
    align-items: center;
  }

  .btn-cancel{
    border: solid 1px #dadada;
    background-color: #ffffff;
    color: #666666;
    height: 44px;
    margin-right: 5px;
  }

  .btn-confirm{
    margin-left: 5px;
    background-color: #092148;
    color: white;
    height: 44px;

    &.single{
      margin-left: 0;
      margin: 0 70px;
    }

    &:disabled{
      border: solid 1px #eaeaea;
      background-color: #eaeaea;
      color: #adaaaa;
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

@media screen and ( max-width: 768px ) {

  .container {
    width: calc( 90vw - 36px );
    padding: 24px 18px;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
  }

}

</style>