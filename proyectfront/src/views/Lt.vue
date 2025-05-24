<template>
  <section class="timeline">
    <div
      v-for="(hecho, index) in hechos"
      :key="hecho.id"
      :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
    >
      <div class="content">
        <h2>{{ new Date(hecho.fechaInicio).getFullYear() }}</h2>
        <h3>{{ hecho.nombre }}</h3>
        <img v-if="hecho.imagen" :src="hecho.imagen" alt="imagen del hecho" />
        <p>{{ hecho.descripcion }}</p>

        <div class="media-container" v-if="hecho.audio || hecho.video">
          <audio v-if="hecho.audio" controls :src="hecho.audio"></audio>
          <video v-if="hecho.video" controls :src="hecho.video"></video>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>


import { ref, onMounted } from 'vue'
import api from '../services/api'

const hechos = ref([])

onMounted(async () => {
  const { data } = await api.get('/hechos')
  hechos.value = data
})
</script>

<style scoped>
* {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }
        
        body {
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.6;
        }
        
        header {
            background: linear-gradient(to right, #8b0000, #b22222);
            color: #fff;
            text-align: center;
            padding: 2rem 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        
        header p {
            font-size: 1.2rem;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 20px;
        }
        
        .intro {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .intro h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #8b0000;
        }
        
        .intro p {
            max-width: 800px;
            margin: 0 auto 1rem;
            font-size: 1.1rem;
        }
        
        /* Estilo de la línea de tiempo */
        .timeline {
            position: relative;
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .timeline::after {
            content: '';
            position: absolute;
            width: 6px;
            background-color: #8b0000;
            top: 0;
            bottom: 0;
            left: 50%;
            margin-left: -3px;
        }
        
        .timeline-item {
            padding: 10px 40px;
            position: relative;
            background-color: inherit;
            width: 50%;
            margin-bottom: 30px;
        }
        
        .timeline-item::after {
            content: '';
            position: absolute;
            width: 25px;
            height: 25px;
            right: -12px;
            background-color: white;
            border: 4px solid #8b0000;
            top: 15px;
            border-radius: 50%;
            z-index: 1;
        }
        
        .left {
            left: 0;
        }
        
        .right {
            left: 50%;
        }
        
        .left::before {
            content: " ";
            height: 0;
            position: absolute;
            top: 22px;
            width: 0;
            z-index: 1;
            right: 30px;
            border: medium solid #fff;
            border-width: 10px 0 10px 10px;
            border-color: transparent transparent transparent #fff;
        }
        
        .right::before {
            content: " ";
            height: 0;
            position: absolute;
            top: 22px;
            width: 0;
            z-index: 1;
            left: 30px;
            border: medium solid #fff;
            border-width: 10px 10px 10px 0;
            border-color: transparent #fff transparent transparent;
        }
        
        .right::after {
            left: -13px;
        }
        
        .content {
            padding: 20px 30px;
            background-color: white;
            position: relative;
            border-radius: 6px;
            box-shadow: 0 2px 15px rgba(0,0,0,0.1);
        }
        
        .content h2 {
            color: #8b0000;
            margin-bottom: 10px;
        }
        
        .content h3 {
            color: #666;
            margin-bottom: 10px;
            font-style: italic;
        }
        
        .content p {
            margin-bottom: 15px;
        }
        
        .content img {
            max-width: 100%;
            height: auto;
            margin-bottom: 15px;
            border-radius: 4px;
        }
        
        .media-container {
            margin-top: 15px;
        }
        
        .media-container audio, 
        .media-container video {
            width: 100%;
            border-radius: 4px;
        }
        
        footer {
            text-align: center;
            padding: 2rem 0;
            background-color: #333;
            color: #fff;
            margin-top: 3rem;
        }
        
        footer p {
            margin-bottom: 1rem;
        }
        
        .referencias {
            margin: 3rem auto;
            max-width: 800px;
            padding: 20px;
            background-color: white;
            border-radius: 6px;
            box-shadow: 0 2px 15px rgba(0,0,0,0.1);
        }
        
        .referencias h2 {
            color: #8b0000;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .referencias ul {
            padding-left: 20px;
        }
        
        .referencias li {
            margin-bottom: 10px;
        }
        
        /* Responsive */
        @media screen and (max-width: 768px) {
            .timeline::after {
                left: 31px;
            }
            
            .timeline-item {
                width: 100%;
                padding-left: 70px;
                padding-right: 25px;
            }
            
            .timeline-item::before {
                left: 60px;
                border-width: 10px 10px 10px 0;
                border-color: transparent #fff transparent transparent;
            }
            
            .left::after, .right::after {
                left: 18px;
            }
            
            .right {
                left: 0%;
            }
            
            header h1 {
                font-size: 2rem;
            }
            
            header p {
                font-size: 1rem;
            }
        }
</style>
