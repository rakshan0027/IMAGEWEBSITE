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
    const iLovePdfPublicKey = 'project_public_1ca7aa4770cd9ca2ecac6aa6b9df8103_dCg6Nb91bf72cf1e44e89e2f673231280990d'; // I Love PDF Public Project Key

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

    // PDF Converter Functionality (I Love PDF API)
    convertToPdfBtn.addEventListener('click', async () => {
        const file = pdfUpload.files[0];
        if (file) {
            try {
                // 1. Create a Task
                const createTaskResponse = await fetch('https://api.ilovepdf.com/v1/start', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${iLovePdfPublicKey}`
                    },
                });

                if (!createTaskResponse.ok) {
                    throw new Error(`I Love PDF Create Task Error: ${createTaskResponse.status} ${createTaskResponse.statusText}`);
                }

                const createTaskData = await createTaskResponse.json();
                const taskId = createTaskData.task_id;

                // 2. Upload the file
                const formData = new FormData();
                formData.append('task_id', taskId);
                formData.append('file', file); // Append the file

                const uploadResponse = await fetch('https://api.ilovepdf.com/v1/upload', {
                    method: 'POST',
                    body: formData,
                    headers: {
                         'Authorization': `Bearer ${iLovePdfPublicKey}`
                    }
                });

                if (!uploadResponse.ok) {
                    throw new Error(`I Love PDF Upload Error: ${uploadResponse.status} ${uploadResponse.statusText}`);
                }

                const uploadData = await uploadResponse.json();
                if (uploadData.errors && uploadData.errors.length > 0) {
                    throw new Error(`I Love PDF Upload Error: ${uploadData.errors[0].message}`);
                }

                // 3. Process the PDF
                const processResponse = await fetch('https://api.ilovepdf.com/v1/process', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                         'Authorization': `Bearer ${iLovePdfPublicKey}`
                    },
                    body: JSON.stringify({
                        task_id: taskId,
                        tool: 'imagepdf' // Or 'officepdf', depending on file type
                    })
                });

                if (!processResponse.ok) {
                    throw new Error(`I Love PDF Process Error: ${processResponse.status} ${processResponse.statusText}`);
                }

                const processData = await processResponse.json();
                if (processData.errors && processData.errors.length > 0) {
                    throw new Error(`I Love PDF Process Error: ${processData.errors[0].message}`);
                }

                // 4. Download the PDF
                const downloadResponse = await fetch(`https://api.ilovepdf.com/v1/download/${taskId}`, {
                    headers: {
                         'Authorization': `Bearer ${iLovePdfPublicKey}`
                    }
                });

                if (!downloadResponse.ok) {
                    throw new Error(`I Love PDF Download Error: ${downloadResponse.status} ${downloadResponse.statusText}`);
                }

                const blob = await downloadResponse.blob();
                const downloadUrl = URL.createObjectURL(blob);

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
