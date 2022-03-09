<template>
  <section class="description">
    <div class="background"></div>
    <div class="wrap">
      <ul>
        <li v-for="(item, index) in items" :key="index" >
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      items:[
        {
          title:"Diverse items",
          description:"Partnerships with various brands from many industries such as games, sports, entertainment, and fashion provides an ever growning list of attractive items."
        },
        {
          title:"Easy UX/UI",
          description:"User-friendly UX/UI for anyone to buy and sell items easily in an secure and decentralized marketplace."
        },
        {
          title:"Liquidity",
          description:"Easy NFT onboarding, low trade fees and highly desirable items create a robust and active market"
        },
        {
          title:"Ecosystem",
          description:"Benefits for active users with a rewards system and a diverse range of token use cases all in a single platform."
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.description{
  background: #f7f9fb;
  padding: 10px 0 100px 0;
  position: relative;
  overflow-y: visible;

  .background{
    position: absolute;
    display: block;
    height: 228px;
    width: 228px;
    background-image: url('~@/assets/images/layouts/main/bakground_description_left.png');
    background-size: auto 100%;
    background-repeat: no-repeat;
    bottom: -16%;
    left: 55px;
  }

  ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    li{
      color: #030f21;
      width: 50%;

      h2{
        margin-top: 90px;
        font-weight: bold;
        font-size: 1.25rem;
      }
      p{
        font-size: 1rem;
      }

      &:nth-of-type(odd){
        p{
          padding-right: 30px;
        }
      }


      &:nth-of-type(even){
        h2{
          padding-left: 30px;
        }
        p{
          padding-left: 30px;
        }
      }

      @media screen and ( max-width: 768px ) {
        width: 100%;
        h2{
          margin-bottom: 24px;
          margin-top: 48px;
        }
        
          &:nth-of-type(odd){
          p{
            padding-right: 0;
          }
        }


        &:nth-of-type(even){
          h2{
            padding-left: 0;
          }
          p{
            padding-left: 0;
          }
        }

      }
      
    }
  }
}

@media screen and ( max-width: 768px ) {
  .description{
    padding: 20px 0 54px 0;
    
    .background{
      height: 95px;
      width: 95px;
      bottom: -65px;
      left: -30px;
    }

    ul{
    
      li{
        width: 100%;

        h2{
          font-size: 1rem;
          margin-bottom: 8px;
          margin-top: 32px;
        }

        p{
          font-size: 0.875rem;
        }

        &:nth-of-type(odd){
          p{
            padding-right: 0;
          }
        }

        &:nth-of-type(even){
          h2{
            padding-left: 0;
          }
          p{
            padding-left: 0;
          }
        }
      }
    }
  }
}


</style>
