<template>
  <div class="w-full h-full bg-black">
    <img 
      v-if="thumbnailUrl" 
      :src="thumbnailUrl" 
      alt="Video thumbnail" 
      class="w-full h-full object-cover opacity-70"
    >
    <div v-else class="w-full h-full flex items-center justify-center bg-gray-800">
      <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <video 
      ref="videoPlayer" 
      :src="src" 
      @loadeddata="generateThumbnail" 
      crossorigin="anonymous"
      muted 
      playsinline
      preload="metadata"
      class="hidden"
    ></video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const videoPlayer = ref(null);
const thumbnailUrl = ref(null);

const generateThumbnail = () => {
  // Pastikan video sudah siap
  if (!videoPlayer.value || videoPlayer.value.readyState < 1) return;

  const video = videoPlayer.value;
  const canvas = document.createElement('canvas');
  
  // Atur ukuran canvas sesuai dengan ukuran video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  const ctx = canvas.getContext('2d');
  
  // Lompat ke detik ke-1 video untuk menghindari frame hitam di awal
  video.currentTime = 1; 
  
  video.onseeked = () => {
    // Gambar frame video saat ini ke canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Konversi gambar di canvas menjadi format data URL (gambar base64)
    thumbnailUrl.value = canvas.toDataURL('image/jpeg');
    
    // Hentikan event listener agar tidak berjalan berulang
    video.onseeked = null; 
  };
};

// Kita bisa memanggil load() secara manual untuk memulai proses
onMounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.load();
  }
});
</script>
