<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-12">
      
      <div class="text-center mb-10">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800">Galeri Momen Kami</h1>
        <p class="text-lg text-gray-600 mt-2">Koleksi foto-foto terbaik yang tak terlupakan.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="image in images" :key="image.id" class="group cursor-pointer relative">
          <img 
            :src="image.src" 
            :alt="image.alt"
            class="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 ease-in-out transform group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
            <p class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-semibold">{{ image.alt }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Daftar gambar. Ganti dengan path gambar Anda di folder /public
const images = ref([
  { id: 1, src: 'https://picsum.photos/seed/1/600/800', alt: 'Pemandangan Gunung' },
  { id: 2, src: 'https://picsum.photos/seed/2/800/600', alt: 'Pantai Tropis' },
  { id: 3, src: 'https://picsum.photos/seed/3/600/600', alt: 'Perkotaan Malam Hari' },
  { id: 4, src: 'https://picsum.photos/seed/4/700/800', alt: 'Hutan Pinus' },
  { id: 5, src: 'https://picsum.photos/seed/5/800/700', alt: 'Danau Tenang' },
  { id: 6, src: 'https://picsum.photos/seed/6/600/900', alt: 'Jalanan Sepi' },
  { id: 7, src: 'https://picsum.photos/seed/7/900/600', alt: 'Arsitektur Modern' },
  { id: 8, src: 'https://picsum.photos/seed/8/600/800', alt: 'Kopi Pagi' },
]);
</script>

<style scoped>
/* Anda bisa menambahkan style custom di sini jika diperlukan, 
   namun sebagian besar sudah di-handle oleh Tailwind. */
</style>
