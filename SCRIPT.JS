document.addEventListener('DOMContentLoaded', () => {
    // Navigation Buttons
    const imageConverterBtn = document.getElementById('imageConverterBtn');
    const blurBackgroundBtn = document.getElementById('blurBackgroundBtn');
    const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');
    const addShadowBtn = document.getElementById('addShadowBtn');

    // Sections
    const imageConverterSection = document.getElementById('imageConverterSection');
    const blurBackgroundSection = document.getElementById('blurBackgroundSection');
    const changeBackgroundSection = document.getElementById('changeBackgroundSection');
    const addShadowSection = document.getElementById('addShadowSection');

    // Helper Function to Hide All Sections
    function hideAllSections() {
      imageConverterSection.style.display = 'none';
      blurBackgroundSection.style.display = 'none';
      changeBackgroundSection.style.display = 'none';
      addShadowSection.style.display = 'none';
    }

    // Helper Function to Show Section
    function showSection(section) {
      hideAllSections();
      section.style.display = 'block';
    }

    // Navigation Button Event Listeners
    imageConverterBtn.addEventListener('click', () => showSection(imageConverterSection));
    blurBackgroundBtn.addEventListener('click', () => showSection(blurBackgroundSection));
    changeBackgroundBtn.addEventListener('click', () => showSection(changeBackgroundSection));
    addShadowBtn.addEventListener('click', () => showSection(addShadowSection));

    // Remove Background API Key
    const removeBgApiKey = 'AH2afjdh9BatTRDPxsNkjzRm'; // Replace with your actual API key

    // ---- Image Converter ----
    const imageUpload = document.getElementById('imageUpload');
    const outputFormat = document.getElementById('outputFormat');
    const convertImageBtn = document.getElementById('convertImageBtn');
    const progressBar = document.querySelector('.progress-bar');
    const downloadLink = document.getElementById('downloadLink');
    const imagePreview = document.getElementById('imagePreview');

    convertImageBtn.addEventListener('click', () => {
      // (Previous Image Conversion Logic - No Changes Needed)
      // ... (Existing code for image conversion) ...
    });

    // ---- Blur Background ----
    const blurUpload = document.getElementById('blurUpload');
    const blurLevelInput = document.getElementById('blurLevel');
    const blurBtn = document.getElementById('blurBtn');
    const blurPreview = document.getElementById('blurPreview');
    const blurDownloadLink = document.getElementById('blurDownloadLink');

    blurBtn.addEventListener('click', async () => {
      const file = blurUpload.files[0];
      if (file) {
        const blurLevel = blurLevelInput.value;

        try {
          const imageUrl = URL.createObjectURL(file);
          blurPreview.src = imageUrl;
          blurPreview.style.display = 'block';

          const result = await removeBgBlurBackground(imageUrl, blurLevel, removeBgApiKey);
          blurPreview.src = result;
          blurDownloadLink.href = result;
          blurDownloadLink.style.display = "block";

        } catch (e) {
          alert(e);
        }
      } else {
        alert("Choose a file");
      }
    });

    // ---- Change Background ----
    const bgChangeUpload = document.getElementById('bgChangeUpload');
    const bgColorInput = document.getElementById('bgColor');
    const bgChangeBtn = document.getElementById('bgChangeBtn');
    const bgChangePreview = document.getElementById('bgChangePreview');
    const bgChangeDownloadLink = document.getElementById('bgChangeDownloadLink');

    bgChangeBtn.addEventListener('click', async () => {
      const file = bgChangeUpload.files[0];
      if (file) {
        const bgColor = bgColorInput.value.replace("#", "");

        try {
          const imageUrl = URL.createObjectURL(file);
          bgChangePreview.src = imageUrl;
          bgChangePreview.style.display = 'block';

          const result = await removeBgChangeBackground(imageUrl, bgColor, removeBgApiKey);
          bgChangePreview.src = result;
          bgChangeDownloadLink.href = result;
          bgChangeDownloadLink.style.display = "block";
        } catch (e) {
          alert(e);
        }
      } else {
        alert("Choose a file");
      }
    });

    // ---- Add Shadow ----
    const shadowUpload = document.getElementById('shadowUpload');
    const shadowBtn = document.getElementById('shadowBtn');
    const shadowPreview = document.getElementById('shadowPreview');
    const shadowDownloadLink = document.getElementById('shadowDownloadLink');

    shadowBtn.addEventListener('click', async () => {
      const file = shadowUpload.files[0];
      if (file) {
        try {
          const imageUrl = URL.createObjectURL(file);
          shadowPreview.src = imageUrl;
          shadowPreview.style.display = 'block';

          const result = await removeBgAddShadow(imageUrl, removeBgApiKey);
          shadowPreview.src = result;
          shadowDownloadLink.href = result;
          shadowDownloadLink.style.display = "block";
        } catch (e) {
          alert(e);
        }
      } else {
        alert("Choose a file");
      }
    });

    // ---- Remove Background functions ----
    async function removeBgBlurBackground(imageUrl, level, apiKey) {
      const base64Image = await convertImageToBase64(imageUrl);
      try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image_file_b64: base64Image,
            bg_blur: level
          }),
        });

        if (!response.ok) {
          throw new Error(`remove.bg API error: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);

      } catch (error) {
        throw new Error("Remove bg failed");
      }
    }

    async function removeBgChangeBackground(imageUrl, color, apiKey) {
      const base64Image = await convertImageToBase64(imageUrl);

      try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image_file_b64: base64Image,
            bg_color: color
          }),
        });

        if (!response.ok) {
          throw new Error(`remove.bg API error: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);

      } catch (error) {
        throw new Error("Remove bg failed");
      }
    }

    async function removeBgAddShadow(imageUrl, apiKey) {
      const base64Image = await convertImageToBase64(imageUrl);
      try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image_file_b64: base64Image,
            shadow: true
          }),
        });

        if (!response.ok) {
          throw new Error(`remove.bg API error: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);

      } catch (error) {
        throw new Error("Remove bg failed");
      }
    }

    function convertImageToBase64(imageUrl) {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous'; // Important for security with images from other domains

          img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              const dataURL = canvas.toDataURL('image/png'); // Or 'image/jpeg', depending on your needs
              resolve(dataURL.substring(dataURL.indexOf(',') + 1)); // Remove the "data:image/png;base64," prefix
          };

          img.onerror = (error) => {
              reject(error);
          };

          img.src = imageUrl;
      });
    }
});
