document.addEventListener('DOMContentLoaded', () => {
     // Navigation Buttons
    const pixoEditorBtn = document.getElementById('pixoEditorBtn');
    const imageConverterBtn = document.getElementById('imageConverterBtn');
    const removeBackgroundBtn = document.getElementById('removeBackgroundBtn');
    const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');
    const addShadowBtn = document.getElementById('addShadowBtn');

    // Sections
    const pixoEditorSection = document.getElementById('pixoEditorSection');
    const imageConverterSection = document.getElementById('imageConverterSection');
    const removeBackgroundSection = document.getElementById('removeBackgroundSection');
    const changeBackgroundSection = document.getElementById('changeBackgroundSection');
    const addShadowSection = document.getElementById('addShadowSection');

    // Helper Function to Hide All Sections
    function hideAllSections() {
        pixoEditorSection.style.display = 'none';
        imageConverterSection.style.display = 'none';
        removeBackgroundSection.style.display = 'none';
        changeBackgroundSection.style.display = 'none';
        addShadowSection.style.display = 'none';
    }

    // Helper Function to Show Section
    function showSection(section) {
        hideAllSections();
        section.style.display = 'block';
    }

    // Navigation Button Event Listeners
    pixoEditorBtn.addEventListener('click', () => showSection(pixoEditorSection));
    imageConverterBtn.addEventListener('click', () => showSection(imageConverterSection));
    removeBackgroundBtn.addEventListener('click', () => showSection(removeBackgroundSection));
    changeBackgroundBtn.addEventListener('click', () => showSection(changeBackgroundSection));
    addShadowBtn.addEventListener('click', () => showSection(addShadowSection));


    // Pixo Integration
    const pixoImageUpload = document.getElementById('pixoImageUpload');
    const pixoImage = document.getElementById('pixoImage');
    const pixoApiKey = '44l99e8hkfu0'; // Your Pixo API Key

    pixoImageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            pixoImage.src = imageUrl;
            pixoImage.style.display = 'block';

            pixoImage.onload = function() {
                const editor = new Pixo.Bridge({ apikey: pixoApiKey });
                editor.edit(pixoImage);
            };

             // Revoke the object URL after the download starts
            URL.revokeObjectURL(imageUrl);
        }
    });

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
        const file = imageUpload.files[0];
        if (file) {
            // Reset progress bar and download link
            progressBar.style.width = '0%';
            downloadLink.style.display = 'none';
            imagePreview.style.display = 'none'; // Hide the preview initially

            // Simulate conversion progress
            simulateProgress(progressBar, () => {
                // Simulate a converted image (replace with actual conversion logic)
                const imageUrl = URL.createObjectURL(file);

                // Set image preview
                imagePreview.src = imageUrl;
                imagePreview.style.display = 'block'; // Show the image

                // Create a temporary canvas to convert the image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = function() {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // Convert to the selected format
                    let dataURL;
                    const format = outputFormat.value;
                    switch (format) {
                        case 'png':
                            dataURL = canvas.toDataURL('image/png');
                            break;
                        case 'jpg':
                            dataURL = canvas.toDataURL('image/jpeg');
                            break;
                        case 'webp':
                            dataURL = canvas.toDataURL('image/webp');
                            break;
                        default:
                            dataURL = canvas.toDataURL('image/png'); // Default to PNG
                    }

                    // Set download link
                    downloadLink.href = dataURL;
                    downloadLink.download = `converted.${format}`;
                    downloadLink.style.display = 'block';

                     // Revoke the object URL after the download starts
                    URL.revokeObjectURL(imageUrl);

                };
                img.src = imageUrl;

            });
        } else {
            alert('Please upload an image.');
        }
    });

        // ---- Remove Background ----
    const blurUpload = document.getElementById('blurUpload');
    const blurBtn = document.getElementById('blurBtn');
    const blurPreview = document.getElementById('blurPreview');
    const blurDownloadLink = document.getElementById('blurDownloadLink');

    blurBtn.addEventListener('click', async () => {
      const file = blurUpload.files[0];
      if (file) {

        try {
          const imageUrl = URL.createObjectURL(file);
          blurPreview.src = imageUrl;
          blurPreview.style.display = 'block';

          const result = await removeBg(imageUrl, removeBgApiKey);
          blurPreview.src = result;
          blurDownloadLink.href = result;
          blurDownloadLink.style.display = "block";

          // Revoke the object URL after the download starts
          URL.revokeObjectURL(imageUrl);

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

           // Revoke the object URL after the download starts
           URL.revokeObjectURL(imageUrl);
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

            // Revoke the object URL after the download starts
            URL.revokeObjectURL(imageUrl);
        } catch (e) {
          alert(e);
        }
      } else {
        alert("Choose a file");
      }
    });


    // ---- Remove Background functions ----
    async function removeBg(imageUrl, apiKey) {
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
            size: "auto"
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

    function simulateProgress(progressBar, callback) {
        let width = 0;
        const interval = setInterval(() => {
            width += 10;
            progressBar.style.width = width + '%';
            if (width >= 100) {
                clearInterval(interval);
                callback();
            }
        }, 50);
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
