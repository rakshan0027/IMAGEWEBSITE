document.addEventListener('DOMContentLoaded', () => {
    // Navigation Buttons
    const imageConverterBtn = document.getElementById('imageConverterBtn');
    const pdfConverterBtn = document.getElementById('pdfConverterBtn');
    const removeBackgroundBtn = document.getElementById('removeBackgroundBtn');

    // Sections
    const imageConverterSection = document.getElementById('imageConverterSection');
    const pdfConverterSection = document.getElementById('pdfConverterSection');
    const removeBackgroundSection = document.getElementById('removeBackgroundSection');

    // Image Converter Elements
    const imageUpload = document.getElementById('imageUpload');
    const outputFormat = document.getElementById('outputFormat');
    const convertImageBtn = document.getElementById('convertImageBtn');
    const progressBar = document.querySelector('.progress-bar');
    const downloadLink = document.getElementById('downloadLink');
    const imagePreview = document.getElementById('imagePreview'); // Get the existing image preview element

    // PDF Converter Elements
    const pdfUpload = document.getElementById('pdfUpload');
    const convertToPdfBtn = document.getElementById('convertToPdfBtn');
    const pdfDownloadLink = document.getElementById('pdfDownloadLink');
    const cloudConvertApiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTA3OTQ3ZDM4NDYyNDVmMGMxNTE1N2EyOWEzOTRkZjU4MjU4OGMzNDI2MTRkZTAxYzY2ZDNhZjI4MWM5ZjUwOThlNDBlNjkxMzBkNzE3NmQiLCJpYXQiOjE3Mzk3OTcwODMuMzgyNTgsIm5iZiI6MTczOTc5NzA4My4zODI1ODEsImV4cCI6NDg5NTQ3MDY4My4zNzkwNDIsInN1YiI6IjcxMDc4OTUzIiwic2NvcGVzIjpbXX0.a8Q7EE1NeyfukbweLb4oR7_CSgvhnw8BPhNXban5SAv7Z7DCZWN-vwrxXeNM1XaDLpy3_eJKx1xuqaEFYp2dt73uwncs6vcnAxtLNAKchgOF4MNwUSwymC46ULqLkMR6RXiW-w0Rs1syDremRWO3sr-NgKr7bsgmLlDZdAOpBjajzdZkEZAhL3jqt_ADUNuvPUldUbm1lZjGYTGo9zysXmNz5yH1bIqaST3KWftlXEyXqPxQOm5hsHrzriKcDbOAejuG1xi6u8fLEnhUunPexCHG0xpYFI5AOuTFP-P9c1TM6SljsDQ9Kz1i3UDJEh7JgMHjl1xYTBm34EM6sNJ8usb0L9g9isCYc5eAJEKT6vUAnXl1_4KSVDOLntG1n5E3nCp7VUllNpI7nY-fOFlPo3dx7QkZPWzEEbxHgBkCQxAKhzeNKMzvMqcCk8Nw38mc4IK3UwZAmxbq4xXFPfjQ786jc-xWh2NEFnSs-Y7ImsyEoEWth_2Ub52VJzuj8cE_bydwkSwJ8OGUSBKLew3NNns6hBZNELdVZNxN3KQms-tNBrqbFQJGkfzzNiE6yCZXQlnaFzgjh8YOas_mZDW9v1o6IlIrEnOIHS00OF6MQXAuTnruq0PbqmmEP7ExG241nru2vH8_5MbCPWA2vJicIizJhB32jPXDTdyCJdu_cns'; // Replace with your CloudConvert API key

    // Remove Background Elements
    const bgRemovalUpload = document.getElementById('bgRemovalUpload');
    const removeBgBtn = document.getElementById('removeBgBtn');
    const premiumBtn = document.getElementById('premiumBtn');
    const bgRemovalDownloadLink = document.getElementById('bgRemovalDownloadLink');
    const trialsRemainingSpan = document.getElementById('trialsRemaining');
    let trialsRemaining = 5; // Initial number of trials
    const removeBgApiKey = 'AH2afjdh9BatTRDPxsNkjzRm'; // Replace with your actual API key

    // Function to show a section and hide others
    function showSection(section) {
        imageConverterSection.style.display = 'none';
        pdfConverterSection.style.display = 'none';
        removeBackgroundSection.style.display = 'none';
        section.style.display = 'block';
    }

    // Navigation Button Event Listeners
    imageConverterBtn.addEventListener('click', () => showSection(imageConverterSection));
    pdfConverterBtn.addEventListener('click', () => showSection(pdfConverterSection));
    removeBackgroundBtn.addEventListener('click', () => showSection(removeBackgroundSection));

    // Image Converter Functionality
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

                };
                img.src = imageUrl;

            });
        } else {
            alert('Please upload an image.');
        }
    });

   // PDF Converter Functionality (CloudConvert API)
    convertToPdfBtn.addEventListener('click', async () => {
        const file = pdfUpload.files[0];
        if (file) {
            try {
                // 1. Upload the file to CloudConvert
                const uploadResponse = await fetch('https://api.cloudconvert.com/v2/uploads', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${cloudConvertApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        filename: file.name
                    })
                });

                if (!uploadResponse.ok) {
                    throw new Error(`CloudConvert upload error: ${uploadResponse.status} ${uploadResponse.statusText}`);
                }

                const uploadData = await uploadResponse.json();
                const uploadUrl = uploadData.data.url;

                // 2.  PUT the file content to the upload URL
                const putResponse = await fetch(uploadUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': file.type // Set the correct content type
                    },
                    body: file
                });

                if (!putResponse.ok) {
                    throw new Error(`CloudConvert PUT error: ${putResponse.status} ${putResponse.statusText}`);
                }

                // 3. Create the conversion job
                const conversionResponse = await fetch('https://api.cloudconvert.com/v2/jobs', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${cloudConvertApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tasks: {
                            "upload-file": {
                                operation: "import/upload",
                                upload: true,
                                filename: file.name
                            },
                            "convert-file": {
                                operation: "convert",
                                input: "upload-file",
                                output_format: "pdf",
                                engine: "graphicsmagick" // Optional: Specify engine
                            },
                            "export-file": {
                                operation: "export/url",
                                input: "convert-file"
                            }
                        },
                        tag: 'pdf-conversion'
                    })
                });

                if (!conversionResponse.ok) {
                    throw new Error(`CloudConvert conversion error: ${conversionResponse.status} ${conversionResponse.statusText}`);
                }

                const conversionData = await conversionResponse.json();
                const jobId = conversionData.data.id;

                // 4. Wait for the conversion to complete (Polling)
                let downloadUrl = null;
                while (!downloadUrl) {
                    const statusResponse = await fetch(`https://api.cloudconvert.com/v2/jobs/${jobId}`, {
                        headers: {
                            'Authorization': `Bearer ${cloudConvertApiKey}`
                        }
                    });

                    if (!statusResponse.ok) {
                        throw new Error(`CloudConvert status error: ${statusResponse.status} ${statusResponse.statusText}`);
                    }

                    const statusData = await statusResponse.json();
                    const jobStatus = statusData.data.status;
                    if (jobStatus === 'finished') {
                        downloadUrl = statusData.data.tasks.find(task => task.operation === 'export/url').result.files[0].url;
                    } else if (jobStatus === 'error') {
                        throw new Error('CloudConvert job failed: ' + statusData.data.message);
                    } else {
                        // Wait before checking again (adjust the delay as needed)
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                }

                // 5. Set the download link
                pdfDownloadLink.href = downloadUrl;
                pdfDownloadLink.download = file.name.replace(/\.[^.]+$/, "") + '.pdf';
                pdfDownloadLink.style.display = 'block';

            } catch (error) {
                console.error('Error converting to PDF:', error);
                alert(`Error converting to PDF: ${error.message}`);
            }
        } else {
            alert('Please upload a file to convert to PDF.');
        }
    });

        // Remove Background Functionality (remove.bg API)
    removeBgBtn.addEventListener('click', async () => {
        const file = bgRemovalUpload.files[0];
        if (file) {
            if (trialsRemaining > 0) {
                trialsRemaining--;
                trialsRemainingSpan.textContent = trialsRemaining;

                // Create FormData object
                const formData = new FormData();
                formData.append('image_file', file);
                formData.append('size', 'auto'); // Adjust as needed ('auto', 'preview', 'full')

                try {
                    // Make API request to remove.bg
                    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                        method: 'POST',
                        headers: {
                            'X-Api-Key': removeBgApiKey,
                        },
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error(`remove.bg API error: ${response.status} ${response.statusText}`);
                    }

                    const blob = await response.blob(); // Get the response as a blob

                    // Create a download link for the result
                    const downloadUrl = URL.createObjectURL(blob);
                    bgRemovalDownloadLink.href = downloadUrl;
                    bgRemovalDownloadLink.download = 'background_removed.png';
                    bgRemovalDownloadLink.style.display = 'block';

                } catch (error) {
                    console.error('Error removing background:', error);
                    alert(`Error removing background: ${error.message}`);
                }
            } else {
                alert('No free trials remaining. Please purchase premium access.');
            }
        } else {
            alert('Please upload an image for background removal.');
        }
    });

    premiumBtn.addEventListener('click', () => {
        // Redirect to purchase page (replace with your actual purchase page URL)
        window.location.href = 'https://example.com/premium';
    });

    // Helper function to simulate progress
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
});
