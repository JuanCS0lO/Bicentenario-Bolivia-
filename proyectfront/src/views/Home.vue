<script setup>
import { onMounted } from 'vue';
import * as bootstrap from 'bootstrap';
onMounted(() => {
  const el = document.querySelector('#carouselExample');
  if (el) new bootstrap.Carousel(el, { interval: 5000 });
});
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Bicentenario Bolivia</h1>
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
      </div>
      <div class="carousel-inner rounded">
        <div class="carousel-item active">
          <img src="https://i.pinimg.com/736x/ec/45/7f/ec457f7648d5aa0c33e18f86f47da3fa.jpg" class="d-block w-100" alt="Imágen 1"/>
        </div>
        <div class="carousel-item">
          <img src="https://i.pinimg.com/736x/2e/12/db/2e12dba4c994f7f067b9e9f255d752f1.jpg" class="d-block w-100" alt="Imágen 2"/>
        </div>
        <div class="carousel-item">
          <img src="https://i.pinimg.com/736x/aa/e9/8f/aae98fd8eea3965650436e9578429927.jpg" class="d-block w-100" alt="Imágen 3"/>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  </div>
</template>
<style scoped>
.carousel img { max-height:400px; object-fit:cover; }
</style>