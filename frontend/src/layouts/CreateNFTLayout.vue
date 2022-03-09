<template>
    <div id="create">
      <div class="wrap">
        <h1>Create <br class="pc-none">your NFT here</h1>
        <div class="input__group">
          <h2>Upload file</h2>

          <div class="file dropdown" v-show="!preview">
            <DragAndDropComponent :callback="onDragEvent"></DragAndDropComponent>
            <p>PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</p>
            <label for="file">Add item Image</label><input id="file" type="file" @change="onChange" accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,video/mp4,video/webm,audio/mp3,audio/webm,audio/mpeg">
          </div>

          <div :class="'preview ' + ( isVoice ? 'voice':'' )"  v-show="preview">
            <button class="close" @click="clearFile"></button>
            <img :src="preview">
          </div>

        </div>
        <div class="input__group">
          <h2>Title</h2>
          <input type="text" placeholder="Title" v-model="title">
        </div>
        <div class="input__group">
          <h2>Description</h2>
          <textarea placeholder="Description" v-model="description"></textarea>
        </div>
        <div class="input__group">
          <h2>Category</h2>
          <select v-model="category">
            <option value="1" selected>Art</option>
            <option value="2">Digital Goods</option>
            <option value="3">Collectibles</option>
            <option value="4">Game Item</option>
            <option value="5">Antiques</option>
            <option value="6">Luxury</option>
            <option value="7">Soundtrack</option>
            <option value="8">Video</option>
          </select>
        </div>
        <div class="input__group" v-if="collectsList.length>0">
          <h2>Collects (options)</h2>
          <select v-model="collection">
            <option value="" selected>select a Collects for NFT</option>
            <option :value="item.id" v-for="(item,index) in collectsList">{{item.title}}</option>
          </select>
        </div>
        <div class="input__group">
          <button class="submit" @click="createNft" :disabled="!isEnable()">Create Item</button>
        </div>
      </div>
      <Popup :title="popup.title" :singleButton="true" :loading="popup.loading" :callback="popup.callback" :contents="popup.contents" v-if="popup.show"></Popup>
  </div>
</template>

<script>
import Popup from '@/components/popups/PopupComponent.vue'
import DragAndDropComponent from '@/components/item/DragAndDropComponent.vue'

export default {
  created(){

  },
  mounted(){
    this.$wallet.addListener( ( success, params )=>{
      if( success ){
        this.getData()
      }else{
        location.href = '/connect'
      }
    })
  },
  data () {
    return {
      preview:null,
      isVoice:false,
      file:null,
      title:null,
      description:null,
      collection:"",
      collectsList:[],
      category:"1",
      popup:{
        show:false,
        title:"Create NFT",
        contents:"",
        callback:null,
        loading:false
      }
    }
  },
  methods:{
    onUploadFile( files ){
      if( files !== undefined && files.length > 0 ){
        const file = files[0]

        if( ["image/png","image/jpeg","image/jpg","image/gif","image/webp"].indexOf( file.type ) > -1 ){

          this.file = file
          this.isVoice = false

          const reader = new FileReader();
          reader.onload = (e)=>{ this.preview = e.target.result }
          reader.readAsDataURL(file);

        }else if( ["video/mp4","video/webm"].indexOf( file.type ) > -1 ){

          this.fileMsg = "Video"
          this.isVoice = false
          this.file = file

        }else if( ["audio/webm","audio/mpeg"].indexOf( file.type ) > -1 ){

          this.preview = require('@/assets/images/layouts/marketplace/image_voice.png')
          this.isVoice = true
          this.file = file

        }else{

          this.popup.title = "Error"
          this.popup.contents = "Not supported file type"
          this.popup.loading = false
          this.popup.show = true
          this.popup.callback = ()=>{
            this.popup.show = false
          }

        }
      }
    },
    onChange( e ){
      this.onUploadFile( e.target.files )
    },
    onDragEvent( event, files ){
      switch( event ){
        case 'dragover':
          break
        case 'dragleave':
          break
        case 'drop':
          if( files !== undefined && files.length ){
            this.onUploadFile( files )
          }
          break
      }
    },
    clearFile(){
      this.preview = null
      this.file = null
    },
    isEnable(){
      return (
        this.file != null &&
        this.description != null &&
        this.category != null &&
        this.title != null &&
        this.description.length > 0 &&
        this.category.length > 0 &&
        this.title.length > 0
      )
    },
    getData(){

      this.$axios.post( '/v1/collection', {method:"GetCollectionList", param:{owner:this.$store.state.userInfo.address}} ).then((res)=>{
        if( res.data != null ){
          console.log('res.data=====',res.data.data)
          this.collectsList = res.data.data
          // this.collection = this.collectsList[0]['id']
        }
      }).catch(()=>{})
    },
    createNft(){
      if( this.isEnable() ){

        this.popup.title = "Create NFT"
        this.popup.contents = "Please wait a minute..."
        this.popup.loading = true
        this.popup.show = true
        this.popup.callback = ()=>{}

        // const ipfs = window.IpfsHttpClient({host:'27.124.14.252', port: 5001, protocol:'http'});
        const ipfs = window.IpfsHttpClient.create({host:'zenxhub.zenithx.co', port: 443, protocol:'https'});
        // const ipfs = window.IpfsHttpClient.create({host:'ipfs.infura.io', port: 5001, protocol:'https'});
        const reader = new FileReader();
        reader.onload = (e)=>{
            ipfs.add(Buffer(reader.result))
            .then((res)=>{
              return Buffer.from(JSON.stringify(
                  {
                    description: this.description,
                    external_url: "",
                    image: process.env.IPFS_URL+res.path,
                    name: this.title,
                    category:this.category,
                    collection:this.collection,
                    version: "1.0.0",
                    attributes: []
                  }
                ));
            })
            .then( (bufferData)=>{
              return ipfs.add(bufferData)
            })
            .then((result)=>{
                const uri = process.env.IPFS_URL+result.path;
                this.$wallet.createNft( window.ethereum, this.$store.state.userInfo.address, uri)
                .then((createNftRes)=>{
                  const  tokenId = createNftRes.events.Transfer.returnValues.tokenId;
                  const address = createNftRes.events.Transfer.address;
                  console.log('createNftRes=',createNftRes);
                  console.log('tokenId=',tokenId);
                  console.log('address=',address);

                  this.$axios.post( '/v1/item', {method:"RegisterNFT", param:
                                                                              {
                                                                                owner: this.$store.state.userInfo.address,
                                                                                name: this.$store.state.userInfo.name,
                                                                                address: address,
                                                                                id: parseInt(tokenId),
                                                                                title: this.title,
                                                                                category: this.category,
                                                                                collection: this.collection,
                                                                                uri: uri,
                                                                                description: this.description
                                                                              }
                  } )
                    .then( (res)=>{
                      if( res.data ){
                        if( res.data.status === 500 ){
                          this.fail_call();
                          return;
                        }
                        this.success_call();
                      }
                    }).catch((err)=>{
                      console.log(err)
                      this.fail_call();
                  })

                })
                .catch((err)=>{
                  console.log(err)
                  this.fail_call()
                })
            })
            .catch((err)=>{
              console.log(err)
              this.fail_call()
            });
        }
        reader.readAsArrayBuffer(this.file);
      }
    },
    success_call () {
        this.popup.title = "Create NFT"
        this.popup.contents = "Success Create NFT"
        this.popup.show = true
        this.popup.loading = false
        this.popup.callback = ()=>{
          this.popup.show = false
          location.href = '/wallet'
        }
    },
    fail_call () {
        this.popup.title = "Failed"
        this.popup.contents = "Failed Create NFT Blockchain Error"
        this.popup.show = true
        this.popup.loading = false
        this.popup.callback = ()=>{
          this.popup.show = false
        }
    }
  },
  components:{
    DragAndDropComponent,
    Popup
  }
}
</script>

<style lang="scss" scoped>
#create{
  min-height: calc( 100vh - 65px );
  padding-bottom: 100px;

  h1{
    width: 100%;
    margin-top: 160px;
    padding-bottom: 52px;
    margin-bottom: 28px;
    border-bottom: 1px solid #d7d7d7;
    font-size: 2rem;
    font-weight: bold;
    color: #222222;
  }

  .input__group{
    margin-top: 32px;

    h2{
      font-size: 1rem;
      font-weight: bold;
      color: #222222;
      margin-bottom: 12px;
    }

    input[type=text], textarea, select{
      height: 48px;
      min-width:300px;
      width: 40%;
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
      resize: vertical;
      min-width:500px;
      width: 55%;
      min-height: 110px;
    }

    select {
      background: transparent;
      appearance: none;
      /* for Firefox */
      -moz-appearance: none;
      /* for Chrome */
      -webkit-appearance: none;
      /* For IE10 */
      &::-ms-expand {
        display: none;
      }
    }

    .file{
      position: relative;
      width: 60%;
      min-width: 500px;
      min-height: 278px;
      border-radius: 20px;
      border: dashed 2px #e1e1e1;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      p{
        font-weight: 600;
        text-align: center;
        color: #888888;
        margin-bottom: 13px;
      }

      input[type=file]{
        display: none;
      }

      label{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 44px;
        padding: 0 44px;
        margin-top: 13px;
        border-radius: 16px;
        background-color: #0564ff;
        color: white;
        z-index: 2;
      }

    }

  }
  .preview{
    position: relative;
    max-width: 550px;
    min-width: 250px;
    min-height: 200px;
    width: 60%;

    &.voice{
      width: 250px;
      height: 250px;
    }

    img{
      width: 100%;
      border-radius: 36px;

    }

    .close{
      position: absolute;
      right: 18px;
      top: 18px;
      width: 28px;
      height: 28px;
      background-color: transparent;
      background-image: url('~@/assets/images/icon_close.png');
      background-size: 100%;
      background-repeat: no-repeat;
      outline: none;
      border: none;
      z-index: 7;
    }
  }

  .submit{
    justify-content: center;
    align-items: center;
    height: 54px;
    padding: 0 124px;
    margin-top: 13px;
    border-radius: 16px;
    background-color: #092148;
    color: white;
    z-index: 2;
    font-size: 1.125rem;

    &:disabled{
      background-color: #eaeaea;
      color: #adaaaa;
    }
  }
}

@media screen and ( max-width: 768px ) {
#create{
  min-height: calc( 100vh - 65px );
  padding-bottom: 100px;

  h1{
    margin-top: 108px;
  }

  .input__group{
    margin-top: 32px;

    h2{
      font-size: 1rem;
      font-weight: bold;
      color: #222222;
      margin-bottom: 12px;
    }

    input[type=text], textarea, select{
      display: flex;
      height: 48px;
      min-width:0;
      width: calc( 100% - 40px );
    }

    textarea{
      resize: vertical;
      min-width:0;
      width: calc( 100% - 40px );
      min-height: 110px;
    }

    select {
      width: 100%;
    }

    .file{
      min-width:0;
      width: 100%;

      p{
        font-size: 0.875rem;
      }

    }

  }
  .preview{
    max-width: 100%;
    min-width: 0;
    min-height: 200px;
    width: 100%;

    &.voice{
      width: 250px;
      height: 250px;
    }

    img{
      width: 100%;
      border-radius: 36px;
    }
  }

  .submit{
      width: 100%;
      padding: 0;
    }
  }
}
</style>
