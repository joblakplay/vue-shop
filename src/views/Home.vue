<template>
  <div class="contiener">
    <Navbar />
    <Login />
    <div class="conteiner">
        <div class="row p-5 h-100 justify-content-center align-items-center">
            <div class="col-md-6">
                <img src="/img/svg/products.svg" alt="" srcset="" width="400">
            </div>
            <div class="col-md-6">
                <h3>Learn More About use</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit...</p>
                <button class="btn custon-btn btn-outline-primary mr-4">Browse Products</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

    import Login from "@/components/Login.vue"

export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {
      Login
  }
};
</script>

<style>
</style>