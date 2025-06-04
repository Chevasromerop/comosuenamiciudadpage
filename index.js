/**
 * Obtiene una imagen aleatoria de Unsplash usando el nombre del marcador como término de búsqueda
 * @param {string} search - El término de búsqueda para la imagen
 * @returns {Promise<string>} URL de la imagen en miniatura
 */
async function getRandomImageURL(search) {
  try {
    const accessKey = "7ppQIhEORK15JCNYQNzyO_DVVobsHUgjUgeIsGO1GZw";
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        search
      )}+&orientation=squarish&client_id=${accessKey}`
    );
    const data = await response.json();
    return data.urls.thumb;
  } catch (error) {
    // Retornar una imagen por defecto en caso de error
    return "";
  }
}

/**
 * Genera el HTML para un marcador personalizado con información y controles de audio
 * @param {string} label - Nombre o etiqueta del marcador
 * @param {string} author - Autor del audio
 * @param {number} duration - Duración del audio en milisegundos
 * @param {string} audioURL - URL del archivo de audio
 * @param {string} imageURL - URL de la imagen para el marcador
 * @returns {string} HTML para el contenido del popup del marcador
 */
function getMarkerHTML(label, author, duration, audioURL, imageURL) {
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000)
    .toString()
    .padStart(2, "0");

  return `
    <div class="custom-marker-box" style="--duracion:${duration}ms;">
      <div class="marker-thumb" style="background-image: url('${imageURL}'); background-size: cover;"></div>
      <div class="marker-info">
        <h4>${label}</h4>
        <small>👤 ${author}</small>
        <div class="marker-audio">
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; margin-top: 0.25rem;">
            <span class="current-time">00:00</span>
            <div class="progress-bar" style="flex: 1; height: 4px; background: #ccc; border-radius: 2px; overflow: hidden;">
              <div class="progress-fill" style="height: 100%; width: 0%; background: var(--color-primario); transition: width 0.1s;"></div>
            </div>
            <span class="total-time">${minutes}:${seconds}</span>
          </div>
          <button class="play-btn" style="margin-top: 4px; background: none; border: none; font-size: 1.2rem; cursor: pointer;" data-audio="${audioURL}">▶️</button>
          <audio id="${audioURL}" src="${audioURL}"></audio>
        </div>
      </div>
    </div>
  `;
}

// Inicializar el mapa de Leaflet

// Inicializar el mapa centrado en Bogotá (coordenadas)
const map = L.map("map").setView([4.5981, -74.076], 15);

// Capa base de OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Lista de marcadores con coordenadas, etiquetas, duración y audioURL
const markers = [
  {
    lat: 4.5981,
    lng: -74.076,
    label: "Plaza de Bolívar",
    city: "Bogotá",
    country: "Colombia",
    duration: 95314,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    author: "Andres Roa",
  },
  {
    lat: 4.601,
    lng: -74.0721,
    label: "Museo del Oro",
    city: "Bogotá",
    country: "Colombia",
    duration: 81234,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    author: "Maria Gomez",
  },
  {
    lat: 4.6051,
    lng: -74.0681,
    label: "Catedral Primada",
    city: "Bogotá",
    country: "Colombia",
    duration: 65432,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    author: "Juan Perez",
  },
  {
    lat: 4.6016,
    lng: -74.0662,
    label: "Museo Botero",
    city: "Bogotá",
    country: "Colombia",
    duration: 72345,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    author: "Laura Ruiz",
  },
  {
    lat: 4.6057,
    lng: -74.0761,
    label: "Teatro Colón",
    city: "Bogotá",
    country: "Colombia",
    duration: 58900,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    author: "Carlos Diaz",
  },
  {
    lat: 4.6097,
    lng: -74.0817,
    label: "Monserrate",
    city: "Bogotá",
    country: "Colombia",
    duration: 91234,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    author: "Ana Torres",
  },
  {
    lat: 4.5983,
    lng: -74.0758,
    label: "Casa de Nariño",
    city: "Bogotá",
    country: "Colombia",
    duration: 80321,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    author: "Pedro Alvarez",
  },
  {
    lat: 4.5989,
    lng: -74.0809,
    label: "Chorro de Quevedo",
    city: "Bogotá",
    country: "Colombia",
    duration: 67890,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    author: "Sofia Martinez",
  },
  {
    lat: 4.6572,
    lng: -74.0596,
    label: "Parque Simón Bolívar",
    city: "Bogotá",
    country: "Colombia",
    duration: 84567,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    author: "Miguel Herrera",
  },
  {
    lat: 4.6532,
    lng: -74.0836,
    label: "Jardín Botánico",
    city: "Bogotá",
    country: "Colombia",
    duration: 73456,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    author: "Camila Rojas",
  },
  {
    lat: 4.6686,
    lng: -74.0576,
    label: "Salitre Mágico",
    city: "Bogotá",
    country: "Colombia",
    duration: 62345,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    author: "Andres Castro",
  },
  {
    lat: 4.6091,
    lng: -74.0703,
    label: "Museo Nacional",
    city: "Bogotá",
    country: "Colombia",
    duration: 81234,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    author: "Diana Lopez",
  },
  {
    lat: 4.6015,
    lng: -74.0712,
    label: "Plazoleta del Rosario",
    city: "Bogotá",
    country: "Colombia",
    duration: 65432,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    author: "Jorge Ramirez",
  },
  {
    lat: 4.5987,
    lng: -74.0762,
    label: "Capitolio Nacional",
    city: "Bogotá",
    country: "Colombia",
    duration: 72345,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    author: "Paula Suarez",
  },
  {
    lat: 4.6012,
    lng: -74.0731,
    label: "Museo de Arte del Banco de la República",
    city: "Bogotá",
    country: "Colombia",
    duration: 58900,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    author: "Felipe Vargas",
  },
  {
    lat: 4.6025,
    lng: -74.0707,
    label: "Centro Cultural Gabriel García Márquez",
    city: "Bogotá",
    country: "Colombia",
    duration: 91234,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    author: "Natalia Cardenas",
  },
  {
    lat: 4.6092,
    lng: -74.0821,
    label: "Santuario de Monserrate",
    city: "Bogotá",
    country: "Colombia",
    duration: 80321,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
    author: "Oscar Beltran",
  },
  {
    lat: 4.5984,
    lng: -74.0765,
    label: "Palacio de Justicia",
    city: "Bogotá",
    country: "Colombia",
    duration: 67890,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3",
    author: "Valentina Pardo",
  },
  {
    lat: 4.6018,
    lng: -74.0725,
    label: "Museo de la Independencia",
    city: "Bogotá",
    country: "Colombia",
    duration: 84567,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3",
    author: "Sebastian Niño",
  },
  {
    lat: 4.6019,
    lng: -74.0739,
    label: "Museo Militar",
    city: "Bogotá",
    country: "Colombia",
    duration: 73456,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3",
    author: "Daniela Salazar",
  },
  {
    lat: 4.6013,
    lng: -74.0728,
    label: "Museo de Trajes Regionales",
    city: "Bogotá",
    country: "Colombia",
    duration: 62345,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3",
    author: "Julian Torres",
  },
  {
    lat: 4.6017,
    lng: -74.0723,
    label: "Museo de Arte Colonial",
    city: "Bogotá",
    country: "Colombia",
    duration: 81234,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3",
    author: "Andrea Moreno",
  },
  {
    lat: 4.6014,
    lng: -74.0726,
    label: "Museo de la Esmeralda",
    city: "Bogotá",
    country: "Colombia",
    duration: 65432,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-23.mp3",
    author: "Ricardo Peña",
  },
  {
    lat: 4.6011,
    lng: -74.0722,
    label: "Museo de la Iglesia de San Francisco",
    city: "Bogotá",
    country: "Colombia",
    duration: 72345,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-24.mp3",
    author: "Luisa Mendoza",
  },
  {
    lat: 4.6016,
    lng: -74.0729,
    label: "Museo de Arte Moderno de Bogotá",
    city: "Bogotá",
    country: "Colombia",
    duration: 58900,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-25.mp3",
    author: "Mauricio Castaño",
  },
  {
    lat: 4.6018,
    lng: -74.0732,
    label: "Museo de la Policía",
    city: "Bogotá",
    country: "Colombia",
    duration: 91234,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-26.mp3",
    author: "Tatiana Gil",
  },
  {
    lat: 4.6012,
    lng: -74.0724,
    label: "Museo de Ciencias",
    city: "Bogotá",
    country: "Colombia",
    duration: 80321,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-27.mp3",
    author: "Esteban Rueda",
  },
  {
    lat: 4.6015,
    lng: -74.0727,
    label: "Museo de la Ciudad",
    city: "Bogotá",
    country: "Colombia",
    duration: 67890,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-28.mp3",
    author: "Catalina Silva",
  },
  {
    lat: 4.6013,
    lng: -74.0725,
    label: "Museo de Historia Natural",
    city: "Bogotá",
    country: "Colombia",
    duration: 84567,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-29.mp3",
    author: "Ivan Parra",
  },
  {
    lat: 4.6019,
    lng: -74.0728,
    label: "Museo de los Niños",
    city: "Bogotá",
    country: "Colombia",
    duration: 73456,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-30.mp3",
    author: "Lorena Acosta",
  },
  {
    lat: 4.6017,
    lng: -74.0726,
    label: "Museo de la Universidad Nacional",
    city: "Bogotá",
    country: "Colombia",
    duration: 62345,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-31.mp3",
    author: "Santiago Rios",
  },
  {
    lat: 4.6014,
    lng: -74.0723,
    label: "Museo de la Universidad Javeriana",
    city: "Bogotá",
    country: "Colombia",
    duration: 81234,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-32.mp3",
    author: "Gabriela Fonseca",
  },
  {
    lat: 4.6012,
    lng: -74.0721,
    label: "Museo de la Universidad de los Andes",
    city: "Bogotá",
    country: "Colombia",
    duration: 65432,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-33.mp3",
    author: "Alejandro Cifuentes",
  },
  {
    lat: 4.6016,
    lng: -74.0724,
    label: "Museo de la Universidad del Rosario",
    city: "Bogotá",
    country: "Colombia",
    duration: 72345,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-34.mp3",
    author: "Manuela Ortiz",
  },
  {
    lat: 4.6018,
    lng: -74.0727,
    label: "Museo de la Universidad Externado",
    city: "Bogotá",
    country: "Colombia",
    duration: 58900,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-35.mp3",
    author: "David Jimenez",
  },
  {
    lat: 4.6013,
    lng: -74.0722,
    label: "Museo de la Universidad Central",
    city: "Bogotá",
    country: "Colombia",
    duration: 91234,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-36.mp3",
    author: "Sara Beltran",
  },
  {
    lat: 4.6015,
    lng: -74.0725,
    label: "Museo de la Universidad Santo Tomás",
    city: "Bogotá",
    country: "Colombia",
    duration: 80321,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-37.mp3",
    author: "Camilo Vargas",
  },
  {
    lat: 4.6017,
    lng: -74.0728,
    label: "Museo de la Universidad La Salle",
    city: "Bogotá",
    country: "Colombia",
    duration: 67890,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-38.mp3",
    author: "Valeria Guzman",
  },
  {
    lat: 4.6019,
    lng: -74.0726,
    label: "Museo de la Universidad Militar",
    city: "Bogotá",
    country: "Colombia",
    duration: 84567,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-39.mp3",
    author: "Javier Peña",
  },
  {
    lat: 4.6012,
    lng: -74.0723,
    label: "Museo de la Universidad Libre",
    city: "Bogotá",
    country: "Colombia",
    duration: 73456,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-40.mp3",
    author: "Mariana Salinas",
  },
  {
    lat: 4.6014,
    lng: -74.0727,
    label: "Museo de la Universidad Cooperativa",
    city: "Bogotá",
    country: "Colombia",
    duration: 62345,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-41.mp3",
    author: "Nicolas Duarte",
  },
  {
    lat: 4.6016,
    lng: -74.0725,
    label: "Museo de la Universidad EAN",
    city: "Bogotá",
    country: "Colombia",
    duration: 81234,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-42.mp3",
    author: "Isabella Romero",
  },
  {
    lat: 4.6018,
    lng: -74.0723,
    label: "Museo de la Universidad Sergio Arboleda",
    city: "Bogotá",
    country: "Colombia",
    duration: 65432,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-43.mp3",
    author: "Emilio Sanchez",
  },
  {
    lat: 4.6013,
    lng: -74.0726,
    label: "Museo de la Universidad Piloto",
    city: "Bogotá",
    country: "Colombia",
    duration: 72345,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-44.mp3",
    author: "Lucia Herrera",
  },
  {
    lat: 4.6015,
    lng: -74.0728,
    label: "Museo de la Universidad Manuela Beltrán",
    city: "Bogotá",
    country: "Colombia",
    duration: 58900,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-45.mp3",
    author: "Samuel Pineda",
  },
  {
    lat: 4.6017,
    lng: -74.0724,
    label: "Museo de la Universidad de San Buenaventura",
    city: "Bogotá",
    country: "Colombia",
    duration: 91234,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-46.mp3",
    author: "Renata Vargas",
  },
  {
    lat: 4.6019,
    lng: -74.0722,
    label: "Museo de la Universidad de América",
    city: "Bogotá",
    country: "Colombia",
    duration: 80321,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-47.mp3",
    author: "Martin Cardenas",
  },
  {
    lat: 4.6012,
    lng: -74.0728,
    label: "Museo de la Universidad de la Salle",
    city: "Bogotá",
    country: "Colombia",
    duration: 67890,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-48.mp3",
    author: "Adriana Rojas",
  },
  {
    lat: 4.6014,
    lng: -74.0726,
    label: "Museo de la Universidad de la Sabana",
    city: "Bogotá",
    country: "Colombia",
    duration: 84567,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-49.mp3",
    author: "Cristian Morales",
  },
  {
    lat: 4.6016,
    lng: -74.0722,
    label: "Museo de la Universidad de Cundinamarca",
    city: "Bogotá",
    country: "Colombia",
    duration: 73456,
    audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-50.mp3",
    author: "Daniela Vargas",
  },
];

// Agregar cada marcador al mapa
markers.forEach(
  async ({ lat, lng, label, duration, audioURL, city, country, author }) => {
    const imageURL = await getRandomImageURL(`${label} ${city} ${country}`);
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(
      getMarkerHTML(label, author, duration, audioURL, imageURL)
    );

    marker.on("popupopen", () => {
      const container = marker.getPopup().getElement();
      if (!container) return;
      const audio = container.querySelector("audio");
      const playBtn = container.querySelector(".play-btn");
      const progress = container.querySelector(".progress-fill");
      const currentTimeEl = container.querySelector(".current-time");

      playBtn.addEventListener("click", () => {
        // Si hay otro audio reproduciéndose, lo pausamos
        document.querySelectorAll("audio").forEach((a) => {
          if (a !== audio) a.pause();
        });
        // Cambiamos el texto del botón de reproducción
        if (audio.paused) {
          audio.play();
          playBtn.textContent = "⏸️";
        } else {
          audio.pause();
          playBtn.textContent = "▶️";
        }
      });

      audio.addEventListener("timeupdate", () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percent}%`;
        const mins = Math.floor(audio.currentTime / 60)
          .toString()
          .padStart(2, "0");
        const secs = Math.floor(audio.currentTime % 60)
          .toString()
          .padStart(2, "0");
        currentTimeEl.textContent = `${mins}:${secs}`;
      });

      audio.addEventListener("ended", () => {
        playBtn.textContent = "▶️";
      });
    });
  }
);
