Vue.component('product', {
  template:`
  <div class="prod col-lg-6" >
  <div class="img-product">
    <a v-bind:href="link"><img v-bind:src="img" alt=""></a>
  </div>

  <div class="info-product">
    <h1>{{title}}</h1>
    <span v-if='stock'></span>
    <span style="color:red " v-else > Out of Stock</span>
    <br><br>
    <ul>
      <li v-for='caratteristica in details'>{{caratteristica}}</li>
    </ul>

    <button class="btn btn-primary" v-on:click='addToCart'
    :disabled="!stock"
    :class='{disabledButton: !stock}'>
    Add to Cart
    </button>
    <a class="btn btn-warning" href="#">Cart({{cart}})</a>
    <br>
    <p>Colors :</p>
    <span v-for='(variant, index) in variants' :key='variant.variantId'>
      <span @mouseover ='updateProduct(index)' v-bind:style="variant.variantColor" class="colori" >{{variant.variantName}}</span>
    </span>

  </div>
  </div>
  `,
  data: function(){
    return {
    product: '8T',
    brand: 'Oneplus',
    description: 'Never Settle',
    selectedVariant : 0,
    link: 'https://www.oneplus.com/it',
    details: ['Dual Sim 5G','8 Core 2.2 GHZ','Memoria 128 GB','Android 10','Display 6.55 2400x1080'],
    cart: 0,
    variants: [
      {
        variantId: 1,
        variantName : 'Grey',
        variantColor : 'background-color:rgb(104, 112, 113)',
        variantImage: 'oneplusgrey.jpg',
        variantQuantity: 10
      },
      {
        variantId: 2,
        variantName : 'Green',
        variantColor : 'background-color:rgb(65, 156, 120)',
        variantImage: 'oneplusgreen.jpg',
        variantQuantity: 0
      },
    ]
  }
  },
  methods: {
    addToCart: function () {
      this.cart += 1
    },
    updateProduct: function(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    title() {
      return this.brand + '' + this.product
    },
    img() {
      return this.variants[this.selectedVariant].variantImage
    },
    stock() {
      return this.variants[this.selectedVariant].variantQuantity
    }
  }
})


var app = new Vue({
  el: '#app'
})
