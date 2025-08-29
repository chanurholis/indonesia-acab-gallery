<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-12">
      
      <div class="text-center mb-10">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800">Galeri Momen Kami</h1>
        <p class="text-lg text-gray-600 mt-2">Koleksi foto & video terbaik yang tak terlupakan.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div 
          v-for="item in media" 
          :key="item.id" 
          class="group cursor-pointer relative rounded-lg overflow-hidden shadow-md 
                 transition-transform duration-300 ease-in-out transform hover:scale-105"
          @click="openMedia(item)"
        >
          
          <img 
            v-if="item.type === 'image'"
            :src="item.src" 
            :alt="item.alt"
            class="w-full h-full object-cover"
          >
          
          <div 
            v-else-if="item.type === 'video'" 
            class="relative w-full h-full bg-black flex items-center justify-center"
          >
            <VideoThumbnail 
              v-if="item.source === 'local'" 
              :src="item.videoUrl" 
            />
            <img 
              v-else-if="item.source === 'youtube'"
              :src="item.thumbnailSrc" 
              :alt="item.alt" 
              class="w-full h-full object-cover opacity-70"
            >

            <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300">
              <svg class="h-16 w-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
            <p class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-semibold">{{ item.alt }}</p>
          </div>
        </div>
      </div>
      
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75" @click.self="closeModal">
        <div class="relative w-full max-w-3xl bg-black rounded-lg shadow-xl overflow-hidden" @click.stop>
          <button @click="closeModal" class="absolute top-3 right-3 text-white hover:text-gray-300 rounded-full p-1 z-10">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <div v-if="selectedMedia?.type === 'video'">
            <div v-if="selectedMedia.source === 'youtube'" class="relative pb-[56.25%] h-0"> 
              <iframe :src="getEmbedUrl(selectedMedia.videoUrl)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute top-0 left-0 w-full h-full"></iframe>
            </div>
            <div v-else-if="selectedMedia.source === 'local'">
              <video :src="selectedMedia.videoUrl" controls autoplay class="w-full h-auto">Browser Anda tidak mendukung tag video.</video>
            </div>
          </div>
          <div v-else-if="selectedMedia?.type === 'image'">
            <img :src="selectedMedia.src" :alt="selectedMedia.alt" class="max-w-full max-h-[90vh] h-auto mx-auto">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// Import komponen baru kita
import VideoThumbnail from './VideoThumbnail.vue';

const showModal = ref(false);
const selectedMedia = ref(null);

const media = ref([
  // { 
  //   id: 1,
  //   type: 'image',
  //   src: '/images/1.jpeg',
  //   alt: 'Pemandangan Gunung' 
  // },
  { 
    id: 1, 
    type: 'video', 
    source: 'local',
    videoUrl: '/videos/1.mp4',
    alt: 'Video dari Proyek' 
  },
  { 
    id: 2, 
    type: 'video', 
    source: 'local',
    videoUrl: '/videos/2.mp4',
    alt: 'Video dari Proyek' 
  },
  { 
    id: 3, 
    type: 'video', 
    source: 'local',
    videoUrl: '/videos/3.mp4',
    alt: 'Video dari Proyek' 
  },
  { 
    id: 4, 
    type: 'video', 
    source: 'local',
    videoUrl: '/videos/4.mp4',
    alt: 'Video dari Proyek' 
  },
  { 
    id: 5, 
    type: 'video', 
    source: 'local',
    videoUrl: '/videos/5.mp4',
    alt: 'Video dari Proyek' 
  },
  { 
    id: 6, 
    type: 'video', 
    source: 'local',
    videoUrl: '/videos/6.mp4',
    alt: 'Video dari Proyek' 
  },
]);

const openMedia = (item) => {
  selectedMedia.value = item;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedMedia.value = null; 
};

const getEmbedUrl = (url) => {
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  return url;
};
</script>
