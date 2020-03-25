export default {
    data () {
      return {
        cart: this.$store.getters['catalog/cart'],
       
      
      }
    },
    methods: {
      productInCart (product) {
        const cartItems = this.cart.items
        for (let i = 0; i < cartItems.length; i++) {
          if (cartItems[i].product.idKey === product.idKey) {
            return i
          }
        }
        return null
      },
      addToCart (product, quantity) {
        const index = this.productInCart(product)
        const productQuantity = (!quantity || quantity < 1) ? 1 : parseInt(quantity)
        if (index === null) {
          const item = {
            product: product,
            quantity: productQuantity
          }
          this.$store.commit('catalog/updateCart', item)
          
        } else {
          if (!quantity) {
            this.$store.commit('catalog/increaseQuantity', index)
           
          } else {
           
            this.$store.commit('catalog/updateQuantity', { index, productQuantity })
           
          }
        }
      },
      removeFromCart(i){
        confirm('Are you sure you want to delete this item?') &&
        this.$store.commit('catalog/removeFromCart', i)
      },

      increaseQuantity (i) {
        this.$store.commit('catalog/increaseQuantity', i)
        
      },
      decreaseQuantity (i) {
        this.$store.commit('catalog/decreaseQuantity', i)
        
      },
     
     
    },
    computed: {
      cartTotal () {
        let total = {
            amount:0,
            quantity:0
        }        
        this.cart.items.forEach(item => {
          total.amount += item.quantity * parseFloat(item.product.price)
          total.quantity +=item.quantity
        })
        return total
      }
    }
  }