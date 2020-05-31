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
            <tr v-for="product in products" :key="product.id" >
              <td>{{product.name}}</td>
              <td>{{product.price}}</td>
              <td>
                <button @click="editProduct(product)" class="btn btn-primary mr-2">
                  <i class="fa fa-pencil"></i>
                </button>
                <button @click="deleteProduct(product)" class="btn btn-danger">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
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
                    @keyup.188="addTag"
                    placeholder="Product Tag"
                    v-model="product.tag"
                    class="form-control"
                />
              </div>
              <div class="form-group d-flex">
                <label for="product_image">Product Images</label>
                <input type="file" @change="uploadImage" class="form-control">
                 
              </div>
            </div>          
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateProduct" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            <button @click="addProduct" type="button" class="btn btn-success" v-if="modal == 'new'">Save changes</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fb, db } from "../firebase";
import { VueEditor } from "vue2-editor";
const Swal = require('sweetalert2')
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
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
        tags: [],
        images: []
      },
      modal:null,
      activeItem: null,
      tag: null
    };
  },
  firestore(){
    return{
      products : db.collection('products')
    }
  },
  methods: {
    addtag(){

    },
    uploadImage(e){
      
      this.product.images.push("sdfasdfasf")
      console.log(this.product.images[0])
       if(e.target.files[0]){
        
          let file = e.target.files[0];
    
          var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
    
          let uploadTask  = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {
            
          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
            });
          });
      }
    },
    addNew(){
        this.modal = 'new'
         $('#product').modal('show')
    },
    editProduct(product) {
        this.modal = 'edit'
        this.product = product
        
         $('#product').modal('show');
        // this.product = product.data();
        // this.activeItem = product.id;
    },
    updateProduct(){
        console.log(this.product)
      //this.$firestore.products.doc(this.product.id).update(this.product)
        Toast.fire({
            icon: 'success',
            title: 'Update in successfully'
              })
        // db.collection('products').doc(this.activeItem).update(this.product)
        // .then(() => 
        // {
            $('#product').modal('hide');
        //    this.reset();
        //    this.watched()}
        // )
        // .catch()
    },
    deleteProduct(doc) {

        Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
             this.$firestore.products.doc(doc['.key']).delete()

            Toast.fire({
            icon: 'success',
            title: 'Deleted in successfully'
              })

            // Swal.fire(
            // 'Deleted!',
            // 'Your file has been deleted.',
            // 'success'
            //   )
          }
        })
      
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
      this.modal = 'new'
      this.$firestore.products.add(this.product)
      $('#product').modal('hide')
    }
  },
  mounted() {
    // this.getAll();
  }
};
</script>

<style>
</style>