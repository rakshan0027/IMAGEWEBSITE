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

    // PDF Converter Elements
    const pdfUpload = document.getElementById('pdfUpload');
    const convertToPdfBtn = document.getElementById('convertToPdfBtn');
    const pdfDownloadLink = document.getElementById('pdfDownloadLink');

    // Remove Background Elements
    const bgRemovalUpload = document.getElementById('bgRemovalUpload');
    const removeBgBtn = document.getElementById('removeBgBtn');
    const premiumBtn = document.getElementById('premiumBtn');
    const bgRemovalDownloadLink = document.getElementById('bgRemovalDownloadLink');
    const trialsRemainingSpan = document.getElementById('trialsRemaining');
    let trialsRemaining = 5; // Initial number of trials

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

            // Simulate conversion progress
            simulateProgress(progressBar, () => {
                // Simulate a converted image (replace with actual conversion logic)
                const imageUrl = URL.createObjectURL(file); // This will let you show the image to the user, but it is still not converted.

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

                // Clean up the URL object
                URL.revokeObjectURL(imageUrl);

            });
        } else {
            alert('Please upload an image.');
        }
    });

    // PDF Converter Functionality (Simulated)
    convertToPdfBtn.addEventListener('click', () => {
        // As client side PDF generation and conversion will be very complicated, so i am not including it
        alert('As client side PDF generation and conversion will be very complicated, so i am not including it');
    });

    // Remove Background Functionality (Simulated - Color Replacement)
    removeBgBtn.addEventListener('click', () => {
        const file = bgRemovalUpload.files[0];
        if (file) {
            if (trialsRemaining > 0) {
                trialsRemaining--;
                trialsRemainingSpan.textContent = trialsRemaining;

                // Create an image object
                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = function() {
                    // Create a canvas and draw the image
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // Get image data
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;

                    // "Remove" background (replace a specific color with transparent) - VERY basic simulation
                    const targetColor = { r: 255, g: 255, b: 255 }; // Replace white
                    const tolerance = 30;

                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];

                        if (
                            Math.abs(r - targetColor.r) < tolerance &&
                            Math.abs(g - targetColor.g) < tolerance &&
                            Math.abs(b - targetColor.b) < tolerance
                        ) {
                            data[i + 3] = 0; // Set alpha to 0 (transparent)
                        }
                    }

                    // Put the modified image data back on the canvas
                    ctx.putImageData(imageData, 0, 0);

                    // Create a download link
                    bgRemovalDownloadLink.href = canvas.toDataURL('image/png'); // PNG to preserve transparency
                    bgRemovalDownloadLink.download = 'background_removed.png';
                    bgRemovalDownloadLink.style.display = 'block';
                };
                // Clean up the URL object
                URL.revokeObjectURL(img.src);
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
