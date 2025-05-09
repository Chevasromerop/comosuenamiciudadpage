document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const leftPanel = document.querySelector('.left-panel');

    hamburger.addEventListener('click', function() {
        leftPanel.classList.toggle('open'); // Ejemplo de toggle de clase para menú móvil
    });

    // Funcionalidad para interactuar con el mapa (requerirá una API de mapas)
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function(event) {
            // Obtener coordenadas del clic
            const x = event.clientX - mapContainer.getBoundingClientRect().left;
            const y = event.clientY - mapContainer.getBoundingClientRect().top;
            console.log('Clic en el mapa en:', x, y);

            // Aquí podrías agregar lógica para:
            // 1. Crear un nuevo marcador en la ubicación del clic.
            // 2. Cargar información de audio asociada a esa ubicación.
            // 3. Actualizar el reproductor de audio.
        });
    }

    const markers = document.querySelectorAll('.marker');
    markers.forEach(marker => {
        marker.addEventListener('click', function() {
            const locationNameElement = document.querySelector('.audio-player .location-name');
            const audioElement = document.querySelector('.audio-player audio');
            const audioSource = audioElement.querySelector('source');

            locationNameElement.textContent = 'Nueva Ubicación (Ejemplo)';
            audioSource.src = 'nuevo_audio.mp3'; // Reemplaza con la ruta real del audio
            audioElement.load();
            audioElement.play();
        });
    });
});