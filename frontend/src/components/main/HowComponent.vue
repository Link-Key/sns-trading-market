<template>
  <section class="how">
    <div class="background">
      <div class="circle"></div>
    </div>
    <div class="wrap">
      <h1>How to use</h1>
      <ul>
        <li>
          <h2>As a Creator </h2>
          <p>Anyone can mint their content, idea, and product into NFT tokens without the need of any coding skills. </p>
        </li>
        <li>
          <h2>As a Seller</h2>
          <p>Anyone with existing NFTs can bring those tokens to the NFT Marketplace by connecting their crypto-wallet and making a sell order for their desired price or placing a bidding for the auction. </p>
        </li>
        <li>
          <h2>As a Buyer</h2>
          <p>Buyers are able to search iems and buy them with crypto-tokens, initially NFT but other tokens later such as DOT, WETH, WBTC, etc. </p>
        </li>
      </ul>

      <a href="https://www.notion.so/User-Guide-9104008952ae4afd9fca16f0a39d38eb" target="_blank" class="btn">Learn More</a>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.how{
  position: relative;
  padding-bottom: 120px;

  .background{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;

    &::before{
      content: '';
      position: absolute;
      display: block;
      height: 360px;
      width: 100%;
      bottom: 0;
      background-color: #eff7ff;
      z-index: -1;
    }

    .circle{
      content: '';
      position: absolute;
      display: block;
      height: 200px;
      width: 200px;
      top: 80px;
      left: 100px;
      background-image: linear-gradient(to bottom, #ffd6d6, #ff8a8a 100%);
      border-radius: 50%;
      z-index: -1;
    }

    &::after{
      content: '';
      position: absolute;
      display: block;
      height: 40px;
      width: 40px;
      opacity: 0.34;
      background-color: #0564ff;
      border-radius: 50%;
      bottom: 160px;
      right: 80px;
      z-index: -1;
    }

  }

  .wrap{
    border-top: solid 1px #e9e9e9;

    h1{
      margin-top: 80px;
      margin-bottom: 48px;
      text-align: center;
      color: #030f21;
      font-size: 2rem;
      font-weight: bold;
    }

    ul{
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      li{
        width: calc( 33% - 20px );
        border-radius: 16px;
        box-shadow: 0 7px 20px 0 rgba(212, 212, 212, 0.5);
        background-color: #ffffff;

        h2{
          margin: 30px 30px 0 30px;
          font-size: 1.25rem;
          font-weight: bold;
          color: #222222;
        }

        p{
          margin: 6px 30px 30px 30px;
          font-size: 1rem;
          color: #222222;
        }
      }

    }

    .btn{
      align-self: center;
      margin-top: 78px;
      text-align: center;
      width: 94px;
      height: 52px;
      line-height: 52px;
      font-size: 1.125rem;
      padding: 0 74px;
      border-radius: 16px;
      text-decoration: none;
      background-color: #030f21;
      color: #dadada;

      &:visited{
        color: #dadada;
      }
    }
  }
}

@media screen and ( max-width: 768px ) {
  .how{
    padding-bottom: 120px;

    .background{

      .circle{
        height: 168px;
        width: 168px;
        top: 96px;
        left: -75px;
      }

      &::after{
        display: none;
      }

    }

    .wrap{
      border-top: solid 1px #e9e9e9;

      h1{
        margin-top: 80px;
        margin-bottom: 48px;
        font-size: 1.5rem;
      }

      ul{
        flex-direction: column;

        li{
          width: 100%;
          margin-bottom: 24px;

          h2{
            font-size: 1.25rem;
          }
        }
      }

      .btn{
        margin-top: 60px;
      }
    }
  }
}
</style>
