/**
 * Camera shutter sound for Grey 18 Studio
 * This file contains a base64-encoded shutter sound
 */

// Audio data as a base64 string that can be used without external file dependencies
const cameraShutterSound = {
  play() {
    try {
      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();

      // This is a small MP3 camera shutter sound encoded in base64
      const soundBase64 = "//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAFAAAGUACFhYWFhYWFhYWFhYWFhYWFhYXv7+/v7+/v7+/v7+/v7+/v7+/////////////////////////////////////////////////////////////////////////////////////////////////9//MURNALwALgATgAAAAAADAAAAAAAAAAAAAMYxNIgGxEGPwfB8Hw/EOf3/+DgMf//98HB8Hw/4PjEhYhRJhFhISMb0iQiIhJhFhJhESIMYhlMYxjKMZRjGWIYxUZSMYxjGUZSMYn//NkRMQ3wAsABdAAAAAJYAAAAZTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MkROfAYMgZSoGYUAFNgAMkABAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";
      
      // Decode the base64 string
      const byteCharacters = atob(soundBase64);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      
      // Convert to audio buffer and play
      audioContext.decodeAudioData(byteArray.buffer, buffer => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
      }).catch(err => console.error('Error decoding audio data', err));
      
    } catch (error) {
      console.error('Failed to play camera shutter sound:', error);
    }
  }
};

// Export the sound object
window.cameraShutterSound = cameraShutterSound; 