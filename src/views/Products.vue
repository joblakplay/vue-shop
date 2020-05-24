<template>
  <div class="products">
      <div class="conteiner h-100">
          <div class="intro h-100">
              <div class="row h-100 justify-content-center align-items-center">
                  <div class="col-md-6 ">
                     <h1>Products Page</h1>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                  </div>
                  <div class="col-md-6">
                      <img src="/img/svg/product.svg" alt="" class="img-fluid" srcset="">
                  </div>
              </div>
          </div>
          <hr>

            <h3>Basic CRUD</h3>

          <div class="product-test">
              <div class="form-group">
                  <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
              </div>
              <div class="form-group">
                  <input type="text" placeholder="Price" v-model="product.price" class="form-control">
              </div>
              <div class="form-group">
                  <button class="btn btn-primary" @click="saveData"> Save Data</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {db} from "../firebase"

export default {
    name: "Products",
    props: {
        msg:String
    },
    data(){
        return{
            product:{
              name:null,
              price:null  
            }
        }
    },
    methods:{
        saveData(){
            db.collection('products').add(this.product)
            .then(this.reset())
            .catch(function(error){
                console.error("Error adding document: ", error)
            })

        },
        reset(){
            Object.assign(this.$data, this.$options.data.apply(this))
        }
    }
}
</script>

<style>

</style>