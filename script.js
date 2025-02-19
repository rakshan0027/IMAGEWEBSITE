 const pdfToolsSection = document.getElementById('pdfToolsSection');
    // const apiKey = document.getElementById('apiKey');

    // merge
    const mergePdfBtn = document.getElementById('mergePdfBtn');
    const firstFileMerge = document.getElementById('firstFileMerge');
    const secondFileMerge = document.getElementById('secondFileMerge');
    const downloadLinkMerge = document.getElementById('downloadLinkMerge');
    // split
    const splitPdfBtn = document.getElementById('splitPdfBtn');
    const splitPdfFile = document.getElementById('splitPdf');
    const downloadLinkSplit = document.getElementById('downloadLinkSplit');
    // compress
    const compressPdfBtn = document.getElementById('compressPdfBtn');
    const compressPdfFile = document.getElementById('compressPdf');
    const downloadLinkCompress = document.getElementById('downloadLinkCompress');
    // JpgtoPdf
    const JpgtoPdfBtn = document.getElementById('JpgtoPdfBtn');
    const JpgtoPdfUpload = document.getElementById('JpgtoPdfUpload');
    const downloadLinkJpg = document.getElementById('downloadLinkJpg');
    // PdftoJpg
    const PdftoJpgBtn = document.getElementById('PdftoJpgBtn');
    const PdftoJpgUpload = document.getElementById('PdftoJpgUpload');
    const downloadLinkPdf = document.getElementById('downloadLinkPdf');

    const Public_Key = 'project_public_e1c36a52ff8a00f4a9fa1f729d25c0ff_i5N-F9ea6436dd89d1348d3440f04aa9a7af';

    //merge
    mergePdfBtn.addEventListener('click', async () => {
        const file1 = firstFileMerge.files[0];
        const file2 = secondFileMerge.files[0];
        if (file1 && file2) {
            try {
                // Create a task
                const formData = new FormData();
                formData.append('file', file1);
                formData.append('file', file2);

                const response = await fetch('https://api.ilovepdf.com/v1/merge?public_key=' + Public_Key, {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`I Love PDF API error: ${response.status} ${response.statusText}`);
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'merged.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
            } catch (e) {
                console.error('Error in PDF conversion:', e);
            }
        } else {
            alert('Please select two files to merge.');
        }
    });

    //split
    splitPdfBtn.addEventListener('click', async () => {
        const file = splitPdfFile.files[0];
        if (file) {
            try {
                // Create a task
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('https://api.ilovepdf.com/v1/split?public_key=' + Public_Key, {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`I Love PDF API error: ${response.status} ${response.statusText}`);
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'split.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
            } catch (e) {
                console.error('Error in PDF conversion:', e);
            }
        } else {
            alert('Please select a file.');
        }
    });

    //compress
    compressPdfBtn.addEventListener('click', async () => {
        const file = compressPdfFile.files[0];
        if (file) {
            try {
                // Create a task
                const formData = new FormData();
                formData.append('file', file);
                const response = await fetch('https://api.ilovepdf.com/v1/compress?public_key=' + Public_Key, {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`I Love PDF API error: ${response.status} ${response.statusText}`);
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'compress.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
            } catch (e) {
                console.error('Error in PDF conversion:', e);
            }
        } else {
            alert('Please select a file.');
        }
    });

    //jpgtopdf
    JpgtoPdfBtn.addEventListener('click', async () => {
        const file = JpgtoPdfUpload.files[0];
        if (file) {
            try {
                // Create a task
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('https://api.ilovepdf.com/v1/jpgtopdf?public_key=' + Public_Key, {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`I Love PDF API error: ${response.status} ${response.statusText}`);
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'jpgtopdf.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
            } catch (e) {
                console.error('Error in PDF conversion:', e);
            }
        } else {
            alert('Please select a file.');
        }
    });

    //pdftojpg
    PdftoJpgBtn.addEventListener('click', async () => {
        const file = PdftoJpgUpload.files[0];
        if (file) {
            try {
                // Create a task
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('https://api.ilovepdf.com/v1/pdftojpg?public_key=' + Public_Key, {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`I Love PDF API error: ${response.status} ${response.statusText}`);
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'pdftojpg.zip';
                a.click();
                window.URL.revokeObjectURL(url);
            } catch (e) {
                console.error('Error in PDF conversion:', e);
            }
        } else {
            alert('Please select a file.');
        }
    });
