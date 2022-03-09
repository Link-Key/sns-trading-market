<template>
  <div class="drag-and-drop" @dragover="dragover" @dragleave="dragleave" @drop="drop">
  </div>
</template>

<script>
export default {
  created(){
    
  },
  mounted(){
  },
  props:{
    callback:Function
  },
  methods:{
    dragover(event) {
      event.preventDefault();
      if( this.callback != null && typeof(this.callback) == 'function' ){
        this.callback( 'dragover' )
      }
    },
    dragleave(event) {
      if( this.callback != null && typeof(this.callback) == 'function' ){
        this.callback( 'dragleave' )
      }
    },
    drop(event) {
      event.preventDefault();
      if( this.callback != null && typeof(this.callback) == 'function' ){
        this.callback( 'drop', event.dataTransfer.files )
      }
    }
  },
  components:{
  }
}
</script>

<style lang="scss" scoped>
.drag-and-drop{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
