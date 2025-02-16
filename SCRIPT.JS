// Image Tools
const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resizeButton = document.getElementById('resizeButton');
const downloadButton = document.getElementById('downloadButton');
const convertToPdfButton = document.getElementById('convertToPdfButton');
let currentImage;

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
            currentImage = img;
            drawImage(img);
        };
    };

    reader.readAsDataURL(file);
});

function drawImage(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

resizeButton.addEventListener('click', () => {
    if (currentImage) {
        const newWidth = currentImage.width * 0.5;
        const newHeight = currentImage.height * 0.5;

        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(currentImage, 0, 0, newWidth, newHeight);
    }
});

downloadButton.addEventListener('click', () => {
    if (currentImage) {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'resized_image.png';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

convertToPdfButton.addEventListener('click', () => {
    if (currentImage) {
        alert("Converting to PDF (Server-side recommended)"); // Placeholder
    }
});

// PDF Tools (Client-Side - Very Basic)
const pdfInput = document.getElementById('pdfInput');
const pdfToImageButton = document.getElementById('pdfToImageButton');

pdfToImageButton.addEventListener('click', () => {
    if (pdfInput.files.length > 0) {
        alert("Converting PDF to Image (Client-side is very limited. Server-side recommended.)");
    } else {
        alert("Please select a PDF file.");
    }
});
// script.js
//... (Your existing code)

// Add this function to show the progress bar
function showProgressBar() {
    document.getElementById("progress-bar").style.display = "block";
}

// Add this function to update the progress bar
function updateProgressBar(percentage) {
    document.getElementById("progress-bar").style.width = percentage + "%";
}

// Add this function to hide the progress bar
function hideProgressBar() {
    document.getElementById("progress-bar").style.display = "none";
    updateProgressBar(0); // Reset progress
}

// Example of how to use the progress bar (in your image/PDF processing functions):
convertToPdfButton.addEventListener('click', () => {
    if (currentImage) {
        showProgressBar(); // Show when processing starts

        // Simulate some processing time (replace with your actual conversion logic)
        setTimeout(() => {
            updateProgressBar(75); // Update progress

            setTimeout(() => {
                updateProgressBar(100); // Complete

                setTimeout(() => {
                    alert("PDF Conversion Complete (Placeholder)");
                    hideProgressBar(); // Hide when done
                }, 500); // Small delay before alert
            }, 1500); // Simulate some processing time
        }, 1000); // Simulate some processing time
    }
});

// Feedback Form
const feedbackForm = document.getElementById('feedbackForm');
feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedbackText = document.getElementById('feedbackText').value;

    if (feedbackText.trim() !== "") {
        alert("Feedback submitted (Placeholder - would send to server):\n" + feedbackText);
        // Clear the textarea after submission (optional)
        document.getElementById('feedbackText').value = "";
    } else {
        alert("Please enter some feedback.");
    }

});
