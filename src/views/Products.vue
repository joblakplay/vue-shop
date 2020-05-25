<template>
  <div class="products">
    <div class="conteiner h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h1>Products Page</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/product.svg" alt class="img-fluid" srcset />
          </div>
        </div>
      </div>
      <hr />

      <h3>Basic CRUD</h3>

      <div class="product-test">
        <div class="form-group">
          <input type="text" placeholder="Product Name" v-model="product.name" class="form-control" />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Price"
            @keyup.enter="saveData"
            v-model="product.price"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="saveData">Save Data</button>
        </div>
      </div>

      <h3>Product List</h3>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Descição</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.data.id">
              <td>{{product.data().name}}</td>
              <td>{{product.data().price}}</td>
              <td>
                <button class="btn btn-primary mr-2"><i class="fa fa-pencil"></i></button>
                <button @click="deleteProduct(product.id)" class="btn btn-danger"><i class="fa fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "Products",
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null
      }
    };
  },
  methods: {
    deleteProduct(doc){
      
     if(confirm(doc)){ 
       db.collection("products").doc(doc).delete().then(function() {
          console.log("Document successfully deleted!");
      })
      .then(this.getAll())
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });}
    },
    saveData() {
      db.collection("products")
        .add(this.product)
        .then(this.reset())
        .then(this.getAll())
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    getAll(){
      this.products =[]
      db.collection("products").get().then(res =>{
               res.forEach(product =>{
                    this.products.push(product)
                })
            })
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    }
   },
  mounted() {
        this.getAll()
    },
};
</script>

<style>
</style>