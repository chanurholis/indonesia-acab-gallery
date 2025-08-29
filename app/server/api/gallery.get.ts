// server/api/gallery.get.ts

import fs from 'node:fs/promises'
import path from 'node:path'

const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
const allowedVideoExtensions = ['.mp4', '.webm', '.mov']

export default defineEventHandler(async (event) => {
  const publicPath = path.join(process.cwd(), 'public')
  const imagesPath = path.join(publicPath, 'images')
  const videosPath = path.join(publicPath, 'videos')

  try {
    const imageFiles = await fs.readdir(imagesPath)
    const images = imageFiles
      .filter(file => allowedImageExtensions.includes(path.extname(file).toLowerCase()))
      .map((file, index) => {
        const filePath = `/images/${file}`
        return {
          id: `img-${index}`,
          type: 'image',
          src: filePath, // Properti untuk gambar
          alt: file.split('.').slice(0, -1).join(' ').replace(/[-_]/g, ' '), // Membuat alt text lebih rapi
          sortKey: filePath // Properti baru yang sama untuk sorting
        }
      })

    const videoFiles = await fs.readdir(videosPath)
    const videos = videoFiles
      .filter(file => allowedVideoExtensions.includes(path.extname(file).toLowerCase()))
      .map((file, index) => {
        const filePath = `/videos/${file}`
        return {
          id: `vid-${index}`,
          type: 'video',
          source: 'local',
          videoUrl: filePath, // Properti untuk video
          alt: file.split('.').slice(0, -1).join(' ').replace(/[-_]/g, ' '), // Membuat alt text lebih rapi
          sortKey: filePath // Properti baru yang sama untuk sorting
        }
      })

    // Gabungkan array
    const media = [...images, ...videos];

    // Lakukan sorting menggunakan properti 'sortKey' yang dimiliki semua objek
    media.sort((a, b) => a.sortKey.localeCompare(b.sortKey));

    return media
  } catch (error) {
    console.error('Error reading media directories:', error)
    return []
  }
})
