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

           
      <div class="product-test">
      <h3 class="d-inline float-left">Product List</h3>
      <button @click="addNew" class="btn btn-primary float-right mb-2">Add Product</button>

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
            <!-- <tr v-for="product in products" :key="product.data().id">
              <td>{{product.data().name}}</td>
              <td>{{product.data().price}}</td>
              <td>
                <button @click="editProduct(product)" class="btn btn-primary mr-2">
                  <i class="fa fa-pencil"></i>
                </button>
                <button @click="deleteProduct(product.id)" class="btn btn-danger">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr> -->
          </tbody>
        </table>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          <div class="modal-body">
            <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor v-model="product.description"></vue-editor>
                    </div>
                  </div>
            </div>
            <div class="col-md-4">
                <h4 class="display-6">Product Details </h4>
                
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Price"
                  v-model="product.price"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <input
                    type="text"
                    placeholder="Product Tag"
                    v-model="product.tag"
                    class="form-control"
                />
              </div>
              <div class="form-group d-flex">
                <input
                    type="text"
                    placeholder="Product Image"
                    v-model="product.image"
                    class="form-control"
                  />
                 
              </div>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="addProduct" type="button" class="btn btn-primary">Save changes</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { VueEditor } from "vue2-editor";
import jQuery from 'jquery';
var $ = jQuery;

export default {
  name: "Products",
  components:{
    VueEditor
  },
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null,
        description: null,
        tag: null,
        image: null
      },
      activeItem: null
    };
  },
  firestore(){
    return{
      products : db.collection('products')
    }
  },
  methods: {
    uploadImage(){

    },
    addNew(){
         $('#product').modal('show')
    },
    // watched(){
    //    db.collection('products').onSnapshot(res =>{
    //      this.products=[];
    //      res.forEach(doc =>{
    //        this.products.push(doc);
    //      })
    //    })
    // },
    editProduct() {
        // $('#product').modal('show');
        // this.product = product.data();
        // this.activeItem = product.id;
    },
    updateProduct(){
        // db.collection('products').doc(this.activeItem).update(this.product)
        // .then(() => 
        // {
        //    $('#product').modal('hide');
        //    this.reset();
        //    this.watched()}
        // )
        // .catch()
    },
    deleteProduct() {
      // if (confirm(doc)) {
      //   db.collection("products")
      //     .doc(doc)
      //     .delete()
      //     .then(function() {
      //       console.log("Document successfully deleted!");
      //     })
      //     .then(()=> this.getAll())
      //     .catch(function(error) {
      //       console.error("Error removing document: ", error);
      //     });
      // }
    },
    saveData() {
      // db.collection("products")
      //   .add(this.product)
      //   .then(this.reset())
      //   .then(() => this.getAll())
      //   .catch(function(error) {
      //     console.error("Error adding document: ", error);
      //   });
    },
    getAll() {
      // this.products = [];
      // db.collection("products")
      //   .get()
      //   .then(res => {
      //     res.forEach(product => {
      //       this.products.push(product);
      //     });
      //   });
    },
    reset() {
      // Object.assign(this.$data, this.$options.data.apply(this));
    },
    addProduct(){
      this.$firestore.products.add(this.product)
    }
  },
  mounted() {
    // this.getAll();
  }
};
</script>

<style>
</style>