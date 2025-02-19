document.addEventListener('DOMContentLoaded', () => {
    // Navigation Buttons
    const imageConverterBtn = document.getElementById('imageConverterBtn');
    const removeBackgroundBtn = document.getElementById('removeBackgroundBtn');
    const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');
    const addShadowBtn = document.getElementById('addShadowBtn');
    const pdfToolsBtn = document.getElementById('pdfToolsBtn');

    // Sections
    const imageConverterSection = document.getElementById('imageConverterSection');
    const removeBackgroundSection = document.getElementById('removeBackgroundSection');
    const changeBackgroundSection = document.getElementById('changeBackgroundSection');
    const addShadowSection = document.getElementById('addShadowSection');
    const pdfToolsSection = document.getElementById('pdfToolsSection');

    // Helper Function to Hide All Sections
    function hideAllSections() {
        imageConverterSection.style.display = 'none';
        removeBackgroundSection.style.display = 'none';
        changeBackgroundSection.style.display = 'none';
        addShadowSection.style.display = 'none';
        pdfToolsSection.style.display = 'none';
    }

    // Helper Function to Show Section
    function showSection(section) {
        hideAllSections();
        section.style.display = 'block';
    }

    // Navigation Button Event Listeners
    imageConverterBtn.addEventListener('click', () => showSection(imageConverterSection));
    removeBackgroundBtn.addEventListener('click', () => showSection(removeBackgroundSection));
    changeBackgroundBtn.addEventListener('click', () => showSection(changeBackgroundSection));
    addShadowBtn.addEventListener('click', () => showSection(addShadowSection));
    pdfToolsBtn.addEventListener('click', () => showSection(pdfToolsSection));

     const simulateProgress = (progressBar, callback) => {
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
    const convertImageToBase64 = (imageUrl) =>  {
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

    // ---- Pdf Functions ----
    const Public_Key = 'project_public_e1c36a52ff8a00f4a9fa1f729d25c0ff_i5N-F9ea6436dd89d1348d3440f04aa9a7af';

          // ---- New functions to implement to function calls ---
    const call_API = async (operationName, file, publicKey, downloadLink) => {
      const url = `https://api.ilovepdf.com/v1/start/{tool}?public_key=${publicKey}`

        if (file) {
            try {
                 const response = await fetch(url,{
                        method: 'GET',
                        });

                      if (!response.ok) {
                            throw new Error(`I Love PDF API error: ${response.status} ${response.statusText}`);
                        }
                  const result = await response.json();

                 const taskID = result["task_id"];

                 const formData = new FormData();
                 formData.append('file', file);
                 //I Love PDF API is needed with task_id and file so the API call can be sent.
                 formData.append('task_id',taskID)

                 const upload = await fetch(url, {
                    method: 'POST',
                    body: formData
                 });

                 if (!upload.ok) {
                    throw new Error(`I Love PDF upload error: ${upload.status} ${upload.statusText}`);
                 }
                 const blob = await upload.blob();
                 const imageUrl = window.URL.createObjectURL(blob);
                 downloadLink.href = imageUrl;
                 downloadLink.style.display = "block";
             } catch (error) {
                console.error(`Error in PDF ${operationName}:`, error);
                alert(`PDF ${operationName} failed: ${error.message}`);
             }
         }else{
             alert("Please choose an option to upload and proceed.");
         }
    }

    const pdfToWord_call_API = async (file, publicKey, downloadLink) => {
      const url = "https://api.ilovepdf.com/v1/pdfToWord/{tool}"

        if (file) {
            try {
                 const response = await fetch(url,
                    {
                    method: 'GET',
                    });
                    if (!response.ok) {
                            throw new Error(`I Love PDF API error: ${response.status} ${response.statusText}`);
                        }

                  const result = await response.json();
                 const taskID = result["task_id"];

                 const formData = new FormData();
                 formData.append('file', file);
                 formData.append('task_id',taskID)

                 const upload = await fetch(url, {
                    method: 'POST',
                    body: formData
                 });
                       if (!upload.ok) {
                    throw new Error(`I Love PDF upload error: ${upload.status} ${upload.statusText}`);
                 }
                 const blob = await upload.blob();
                 const imageUrl = window.URL.createObjectURL(blob);
                 downloadLink.href = imageUrl;
                 downloadLink.style.display = "block";
             } catch (error) {
                console.error(`Error in PDF:`, error);
                alert(`PDF  failed: ${error.message}`);
             }
         }else{
             alert("Please choose an option to upload and proceed.");
         }
    }

    //Functions to call the Powerpoint, Excell, HTML  to Pdf
     const file_ext_API = async (operationName, file, publicKey, downloadLink) => {
            const url = "https://api.ilovepdf.com/v1/"+operationName+"/{tool}"

        if (file) {
            try {
                 const response = await fetch(url,
                    {
                        method: 'GET',
                    });

                    if (!response.ok) {
                            throw new Error(`I Love PDF API error: ${response.status} ${response.statusText}`);
                        }

                  const result = await response.json();
                 const taskID = result["task_id"];

                 const formData = new FormData();
                 formData.append('file', file);
                 formData.append('task_id',taskID)

                 const upload = await fetch(url, {
                    method: 'POST',
                    body: formData
                 });

                       if (!upload.ok) {
                    throw new Error(`I Love PDF upload error: ${upload.status} ${upload.statusText}`);
                 }
                 const blob = await upload.blob();
                 const imageUrl = window.URL.createObjectURL(blob);
                 downloadLink.href = imageUrl;
                 downloadLink.style.display = "block";
             } catch (error) {
                console.error(`Error in File Extention PDF:`, error);
                alert(`File Extention PDF failed: ${error.message}`);
             }
         }else{
             alert("Please choose an option to upload and proceed.");
         }
    }

          //PdftoExt API
     const pdfto_API = async (operationName, file, publicKey, downloadLink) => {
            const url = "https://api.ilovepdf.com/v1/"+operationName
        if (file) {
            try {

                 const formData = new FormData();
                 formData.append('file', file);

                 const response = await fetch(url, {
                    method: 'GET',
                 });

                        if (!response.ok) {
                            throw new Error(`I Love PDF API error: ${response.status} ${response.statusText}`);
                        }

                  const result = await response.json();
                    const taskID = result["task_id"];

                 formData.append('task_id',taskID);

                 const upload = await fetch(url, {
                    method: 'POST',
                    body: formData
                 });
                           if (!upload.ok) {
                    throw new Error(`I Love PDF upload error: ${upload.status} ${upload.statusText}`);
                 }
                    const blob = await upload.blob();
                    const imageUrl = window.URL.createObjectURL(blob);
                 downloadLink.href = imageUrl;
                 downloadLink.style.display = "block";
             } catch (error) {
                console.error(`Error in PDF Extentions:`, error);
                alert(`PDF Extention failed: ${error.message}`);
             }
         }else{
             alert("Please choose an option to upload and proceed.");
         }
    }

    // Implementation of each button function
    const mergePdfBtn = document.getElementById('mergePdfBtn');
    const firstFileMerge = document.getElementById('firstFileMerge');
    const secondFileMerge = document.getElementById('secondFileMerge');
    const downloadLinkMerge = document.getElementById('downloadLinkMerge');

    const splitPdfBtn = document.getElementById('splitPdfBtn');
    const splitPdfFile = document.getElementById('splitPdf');
    const downloadLinkSplit = document.getElementById('downloadLinkSplit');

    const compressPdfBtn = document.getElementById('compressPdfBtn');
    const compressPdfFile = document.getElementById('compressPdf');
    const downloadLinkCompress = document.getElementById('downloadLinkCompress');

    const JpgtoPdfBtn = document.getElementById('JpgtoPdfBtn');
    const JpgtoPdfUpload = document.getElementById('JpgtoPdfUpload');
    const downloadLinkJpg = document.getElementById('downloadLinkJpg');

    const PdftoJpgBtn = document.getElementById('PdftoJpgBtn');
    const PdftoJpgUpload = document.getElementById('PdftoJpgUpload');
    const downloadLinkPdf = document.getElementById('downloadLinkPdf');

    const pdfToWordBtn = document.getElementById('pdfToWordBtn');
    const pdfToWordUpload = document.getElementById('pdfToWordUpload');
    const downloadLinkPdfWord = document.getElementById('downloadLinkPdfWord');

    const pdfToPptBtn = document.getElementById('pdfToPptBtn');
    const pdfToPptUpload = document.getElementById('pdfToPptUpload');
    const downloadLinkPdfPpt = document.getElementById('downloadLinkPdfPpt');

    const pdfToExcelBtn = document.getElementById('pdfToExcelBtn');
    const pdfToExcelUpload = document.getElementById('pdfToExcelUpload');
    const downloadLinkPdfExcel = document.getElementById('downloadLinkPdfExcel');

    const wordToPdfBtn = document.getElementById('wordToPdfBtn');
    const wordToPdfUpload = document.getElementById('wordToPdfUpload');
    const downloadLinkWordPdf = document.getElementById('downloadLinkWordPdf');

    const pptToPdfBtn = document.getElementById('pptToPdfBtn');
    const pptToPdfUpload = document.getElementById('pptToPdfUpload');
    const downloadLinkPptPdf = document.getElementById('downloadLinkPptPdf');

    const htmlToPdfBtn = document.getElementById('htmlToPdfBtn');
    const htmlToPdfUpload = document.getElementById('htmlToPdfUpload');
    const downloadLinkHtmlPdf = document.getElementById('downloadLinkHtmlPdf');

    //IlovePDF API Functions to the following event
    mergePdfBtn.addEventListener('click', () => {
        call_API('merge',firstFileMerge.files[0], apiKey, downloadLinkMerge);
    });

    splitPdfBtn.addEventListener('click', () => {
        call_API('split',splitPdfFile.files[0], apiKey, downloadLinkSplit);
    });

    compressPdfBtn.addEventListener('click', () => {
        call_API('compress', compressPdfFile.files[0], apiKey, downloadLinkCompress);
    });

    JpgtoPdfBtn.addEventListener('click', () => {
         call_API('jpgtopdf',JpgtoPdfUpload.files[0], apiKey, downloadLinkJpg);
    });

    PdftoJpgBtn.addEventListener('click', () => {
         call_API('pdftojpg',PdftoJpgUpload.files[0], apiKey, downloadLinkPdf);
    });

    pdfToWordBtn.addEventListener('click', () => {
         pdfToWord_call_API('pdftoword',pdfToWordUpload.files[0], apiKey, downloadLinkPdfWord);
    });

    pdfToPptBtn.addEventListener('click', () => {
         pdfToWord_call_API('pdftopowerpoint',pdfToPptUpload.files[0], apiKey, downloadLinkPdfPpt);
    });

    pdfToExcelBtn.addEventListener('click', () => {
         pdfToWord_call_API('pdftoexcel',pdfToExcelUpload.files[0], apiKey, downloadLinkPdfExcel);
    });

    wordToPdfBtn.addEventListener('click', () => {
         file_ext_API('wordtopdf', wordToPdfUpload.files[0], apiKey, downloadLinkWordPdf);
    });

    pptToPdfBtn.addEventListener('click', () => {
         file_ext_API('powerpointtopdf', pptToPdfUpload.files[0], apiKey, downloadLinkPptPdf);
    });

   htmlToPdfBtn.addEventListener('click', () => {
        file_ext_API('htmltopdf', htmlToPdfUpload.files[0], apiKey, downloadLinkHtmlPdf);
    });
  //Remember! Remove function from here

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
});
