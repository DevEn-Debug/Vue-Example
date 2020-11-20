Vue.component('product', {
  template:`
  <div class="prod col-lg-12" >
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

    <br>
    <p>Colors :</p>
    <span v-for='(variant, index) in variants' :key='variant.variantId'>
      <span @mouseover ='updateProduct(index)' v-bind:style="variant.variantColor" class="colori" >{{variant.variantName}}</span>
    </span>
  </div>
  <div class="">
    <h2>Reviews</h2>
    <p v-if='!reviews.length'>Thre are no reviews yet</p>
    <ul>
      <li v-for='review in reviews'>
        <p>Name : {{review.name}}</p>
        <p>Review : {{review.review}}</p>
        <p>Rating : {{review.rating}}</p>
      </li>
    </ul>
  </div>
  <product-review @review-submitted = 'addReview'></product-review>
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
        variantQuantity: 10
      },
    ],
    reviews : []
  }
  },
  methods: {
    addToCart: function () {
      this.$emit('addcart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct: function(index) {
      this.selectedVariant = index
    },
    addReview(productReview) {
      this.reviews.push(productReview)
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





Vue.component('product-review', {
  template:`

  <form class="review-form" @submit.prevent='onSubmit'>

  <label for="name">Name:</label>
  <input id='name' v-model='name' required>

  <label for="review">Review:</label>
  <textarea id='review' v-model='review' required></textarea>

  <label for="rating">Rating:</label>
    <select id='rating' v-model.number='rating' required>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
    <p><input  class="btn btn-primary" type="submit" value="submit"></p>
  </form>

  `,
  data: function(){
    return {
        name : null,
        review: null,
        rating : null
      }
    },
    methods: {
      onSubmit(){
        let productReview = {
          name : this.name ,
            review : this.review ,
              rating : this.rating ,
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
      }
    }
})


var app = new Vue({
  el: '#app',
  data: {
    premium : false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    }
  }
})
