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
    const img2PdfApiKey = '400280235bmsh51cb5b1d57fdcdap124484jsna3d5ed77b3dc'; // RapidAPI Key

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

    // PDF Converter Functionality (img2pdf2.p.rapidapi.com)
    convertToPdfBtn.addEventListener('click', async () => {
        const file = pdfUpload.files[0];
        if (file) {
            try {
                // Get the URL of the image
                const imageUrl = URL.createObjectURL(file);

                // Encode the URL
                const encodedImageUrl = encodeURIComponent(imageUrl);

                // Construct the API URL
                const apiUrl = `https://img2pdf2.p.rapidapi.com/convert?url=${encodedImageUrl}`;

                // Make the API request
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': 'img2pdf2.p.rapidapi.com',
                        'x-rapidapi-key': img2PdfApiKey,
                    },
                });

                if (!response.ok) {
                    throw new Error(`img2pdf2 API error: ${response.status} ${response.statusText}`);
                }

                const blob = await response.blob();

                // Create a download link
                const downloadUrl = URL.createObjectURL(blob);
                pdfDownloadLink.href = downloadUrl;
                pdfDownloadLink.download = file.name.replace(/\.[^.]+$/, "") + '.pdf';
                pdfDownloadLink.style.display = 'block';

                 // Revoke the object URL after the download starts
                 URL.revokeObjectURL(imageUrl);

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
                    bgRemovalDownloadLink.download = 'background_removed.png
