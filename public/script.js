var PRICE = 9.99;
// var LOAD_NUM = 10;

//instance of vue
new Vue({
  el: '#app', //where you want vue will be located in your DOM
  data: {
    //any property in here can be accessible in the DOM
    total: 0,
    items: [],
    cart: [],
    newSearch: 'anime',
    lastSearch: '',
    loading: false, //hide the "page result" while it's loading
    price: PRICE
  },

  methods: {
    //any property in here can be accessible in the DOM
    onSubmit: function() {
      this.items = []; //before the ajax call, it will empty out the result
      this.loading = true;
      this.$http
      .get('/search/'.concat(this.newSearch))
      .then(function(res) {
        this.lastSearch = this.newSearch;
        this.items = res.data;
        this.loading = false;
      });
    },

    //addItem
    addItem: function(index) {
      this.total += PRICE;
      var item = this.items[index]; //find item to items list and assign to a var
      var found = false;
      
      //iterate through the cart and find item
      for (var i = 0; i<this.cart.length; i++) {
        // If item is found, increase the item quantity and exit
        if (this.cart[i].id === item.id) {
          found=true;
          this.cart[i].qty++;
          break;
        }
      } //for

      //if not, create a new cart item
      if(!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          qty: 1,
          price: PRICE
        });
      } //!found
    }, // addItem

    inc: function(item) {
      item.qty++;
      this.total += PRICE;
    }, //inc

    dec: function(item) {
      item.qty--;
      this.total -= PRICE;

      //remove items in the cart when hit 0
      if(item.qty <= 0) {
        for(var i = 0; this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1); //removing the item from the array
          } //if 
        } //for
      } //if item.qty

    } //dec
  }, //methods

  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    } //currency
  }, //filters

  //vue will call this function when the vue is mounted on the dom
  //as soon as the page loads, it gives you result right away
  mounted: function() {
    this.onSubmit();
  }, //mounted
});