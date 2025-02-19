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

  // ----I Love PDF API Code----
    const Public_Key = 'project_public_e1c36a52ff8a00f4a9fa1f729d25c0ff_i5N-F9ea6436dd89d1348d3440f04aa9a7af';
    //Function to implement the correct functions to call the correct API
    const useAPI = async(action,files,public_key,elementDownload) =>{
       var urlAPI = 'https://api.ilovepdf.com/v1/'+action+'?public_key='+public_key;
         const formData = new FormData();
           if (typeof files[0] != "undefined"){
                 for(var i = 0 ; i < files.length ; i++) {
                     if (typeof files[i] != 'undefined'){
                       formData.append('file['+i+']', files[i]);
                     }
                 }
             
                try{
                       const respApi = await fetch(urlAPI,{
                          method: 'POST',
                          body: formData,
                       });

                       if(!respApi.ok){
                         throw new Error(`I Love PDF API error: ${response.status} ${response.statusText}`);
                       }
                         const blob = await respApi.blob();
                        const newUrl = window.URL.createObjectURL(blob);
                         elementDownload.href = newUrl;
                        elementDownload.download = action+'.zip';
                        elementDownload.style.display = 'block';

                     } catch (error) {
                            console.error("Error in PDF conversion:", error);
                            alert(`PDF conversion failed: ${error.message}`);
                        }
                      } else{
                         alert("Error to upload pdf file")
                   }
    }
    //Def Variables from Html

   //Merge
    const firstFileMerge = document.getElementById('firstFileMerge');
    const secondFileMerge = document.getElementById('secondFileMerge');
    const mergePdfBtn = document.getElementById('mergePdfBtn');
    const downloadLinkMerge = document.getElementById('downloadLinkMerge');

    //Split

    const splitPdfBtn = document.getElementById('splitPdfBtn');
    const splitPdfFile = document.getElementById('splitPdfFile');
    const downloadLinkSplit = document.getElementById('downloadLinkSplit');

    //Compress

    const compressPdfBtn = document.getElementById('compressPdfBtn');
    const compressPdfFile = document.getElementById('compressPdfFile');
    const downloadLinkCompress = document.getElementById('downloadLinkCompress');

    //Convert JPG

    const JpgtoPdfBtn = document.getElementById('JpgtoPdfBtn');
    const JpgtoPdfUpload = document.getElementById('JpgtoPdfUpload');
    const downloadLinkJpg = document.getElementById('downloadLinkJpg');

    //Convert PDF

    const PdftoJpgBtn = document.getElementById('PdftoJpgBtn');
    const PdftoJpgUpload = document.getElementById('PdftoJpgUpload');
    const downloadLinkPdf = document.getElementById('downloadLinkPdf');
        // Word to PDF
      const wordToPdfUpload= document.getElementById('wordToPdfUpload');
       const wordToPdfBtn = document.getElementById('wordToPdfBtn');
    const downloadLinkWordPdf = document.getElementById('downloadLinkWordPdf');
        // Excel to PDF
       const excelToPdfUpload= document.getElementById('excelToPdfUpload');
       const excelToPdfBtn = document.getElementById('excelToPdfBtn');
    const downloadLinkExcelPdf = document.getElementById('downloadLinkExcelPdf');
                // Ppt to PDF
       const pptToPdfUpload= document.getElementById('pptToPdfUpload');
       const pptToPdfBtn = document.getElementById('pptToPdfBtn');
    const downloadLinkPptPdf = document.getElementById('downloadLinkPptPdf');

        const merge_Ext_valite = () => {
        const first_file =  firstFileMerge.files[0].name.split('.').pop();
        const second_file =  secondFileMerge.files[0].name.split('.').pop();

       if((first_file !='pdf') || (second_file != 'pdf'))
            alert("Please chose a PDF File")
        else{
             var files = [firstFileMerge.files[0],secondFileMerge.files[0]];
             useAPI("merge",files,Public_Key,downloadLinkMerge);
           return true;
        }
        return false;
    }

  mergePdfBtn.addEventListener('click', () => {
       if(firstFileMerge.files.length > 0 && secondFileMerge.files.length > 0){
               merge_Ext_valite();
        }
       else{
                alert("Error: Must upload two valid files before uploading to api")
       }
  });

 const splite_Ext_valite = () => {
    let file_s =  splitPdfFile.files[0].name;
    file_s = file_s.split('.').pop();

      if(file_s !='pdf')
            alert("Please chose a PDF File")
        else {
            var files = [splitPdfFile.files[0]]
             useAPI("split",files,Public_Key,downloadLinkSplit);
             return true;
        }
          return false;
    }

  splitPdfBtn.addEventListener('click', () => {
           if(typeof splitPdfFile.files[0] != "undefined") {
             splite_Ext_valite();
        }
        else{
                  alert("Error: Must upload valid pdf File")
        }
  });

 const comprees_Ext_valite = () => {
    let file_s =  compressPdfFile.files[0].name;
    file_s = file_s.split('.').pop();
      if(file_s !='pdf')
            alert("Please chose a PDF File")
        else {
            var files = [compressPdfFile.files[0]]
             useAPI("compress",files,Public_Key,downloadLinkCompress);
             return true;
        }
          return false;
    }

  compressPdfBtn.addEventListener('click', () => {
            if(typeof compressPdfFile.files[0] != "undefined"){
               comprees_Ext_valite();
            }
         else{
                   alert("Error: Must upload valid pdf File");
         }
  });

  const jpgtopdf_Ext_valite = () => {
        const file = JpgtoPdfUpload.files[0];
        if (file) {
                 var files = [JpgtoPdfUpload.files[0]]
                 useAPI("jpgtopdf",files,Public_Key,downloadLinkJpg);
                 return true;
        }
          return false;
    }

    JpgtoPdfBtn.addEventListener('click', () => {
             if(typeof JpgtoPdfUpload.files[0] != "undefined") {
              jpgtopdf_Ext_valite();
            }
        else{
             alert("Error: Must upload valid pdf File")
        }
    });

  const pdfotojpg_Ext_valite = () => {
    let file_s =  PdftoJpgUpload.files[0].name;
    file_s = file_s.split('.').pop();
    if(file_s !='pdf')
          alert("Please chose a PDF File")
        else {
          var files = [PdftoJpgUpload.files[0]]
             useAPI("pdftojpg",files,Public_Key,downloadLinkPdf);
              return true;
          }
          return false;
    }

    PdftoJpgBtn.addEventListener('click', () => {
                 if(typeof PdftoJpgUpload.files[0] != "undefined") {
                         pdfotojpg_Ext_valite();
                 }
            else{
                alert("Error: Must upload valid pdf File")
            }
  });

  const wordtopdf_Ext_valite = () => {
    var file_s;
    const file = wordToPdfUpload.files[0];
    file_s=file.name.split('.').pop();
       if (file_s!='doc' && file_s!='docx' ){
         alert("Please chose a valid file")
        return false
    }

        else {
            var files = [wordToPdfUpload.files[0]]
             useAPI("wordtopdf",files,Public_Key,downloadLinkWordPdf);
            return true
          }
           return false;
    }

    wordToPdfBtn.addEventListener('click', () => {
      if(typeof wordToPdfUpload.files[0] != "undefined") {
                 wordtopdf_Ext_valite();
          }
        else{
                alert("Error: Must upload valid pdf File")
        }
    });

 const exelToPdf_Ext_valite = () => {
    var file_s;
    const file = excelToPdfUpload.files[0];
    file_s=file.name.split('.').pop();

       if (file_s!='xlsx' ){
         alert("Please chose a valid Excel File")
          return false
    }
       else {
            var files = [excelToPdfUpload.files[0]]
             useAPI("exceltopdf",files,Public_Key,downloadLinkExcelPdf);
              return true
        }
         return false;
    }

   excelToPdfBtn.addEventListener('click', () => {
            if(typeof excelToPdfUpload.files[0] != "undefined") {
                        exelToPdf_Ext_valite();
                }
         else{
                alert("Error: Must upload valid pdf File")
         }
   });

    const ptttoPdf_Ext_valite = () => {
        const file = pptToPdfUpload.files[0];
      const file_s=file.name.split('.').pop();

        if(file_s!='ppt' && file_s!='pptx' ){
             alert("Please chose a valid exel File")
             return false;
         }
        else {
            var files = [pptToPdfUpload.files[0]]
             useAPI("powerpointtopdf",files,Public_Key,downloadLinkPptPdf);
              return true
        }
         return false;
    }

     pptToPdfBtn.addEventListener('click', () => {
           if(typeof pptToPdfUpload.files[0] != "undefined") {
                  ptttopdf_Ext_valite();
                }
         else{
             alert("Error: Must upload valid pdf File");
         }
    });
    
    const removeBgChangeBackground = async(imageUrl, color, apiKey) => {
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
      const removeBgAddShadow = async(imageUrl, apiKey) => {
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
        // Function calls from HTML
    const blurBtn = document.getElementById('blurBtn');
    const blurUpload = document.getElementById('blurUpload');
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

            // ---- Add Shadow ----
   const shadowUpload = document.getElementById('shadowUpload');
        const shadowBtn = document.getElementById('shadowBtn');

        shadowBtn.addEventListener('click', async () => {
            const file = shadowUpload.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                shadowPreview.src = imageUrl;
                shadowPreview.style.display = 'block';
            } else {
                alert('Please upload an image.');
            }
        });

   const imageUpload = document.getElementById('imageUpload');
    const outputFormat = document.getElementById('outputFormat');
    const convertImageBtn = document.getElementById('convertImageBtn');
    const imagePreview = document.getElementById('imagePreview');

    convertImageBtn.addEventListener('click', async () => {
        const file = imageUpload.files[0];
        if (file) {
                const imageUrl = URL.createObjectURL(file);
                imagePreview.src = imageUrl;
                imagePreview.style.display = 'block';
        } else {
            alert('Please upload an image.');
        }
    });
    const bgChangeUpload = document.getElementById('bgChangeUpload');
    const bgChangeBtn = document.getElementById('bgChangeBtn');
    const bgChangePreview = document.getElementById('bgChangePreview');

         // ---- Change Background ----
   bgChangeBtn.addEventListener('click', async () => {
            const file = bgChangeUpload.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                bgChangePreview.src = imageUrl;
                bgChangePreview.style.display = 'block';

        } else {
            alert('Please upload an image.');
        }
    });
});
