document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const downloadLink = document.getElementById('download-link');
    const linkArea = document.getElementById('link-area');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const file = fileInput.files[0];
        if (!file) {
            alert('Please select a file.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (response.ok && result.success) {
                downloadLink.href = result.fileUrl;
                linkArea.classList.remove('hidden');
            } else {
                alert('Error uploading file.');
            }
        } catch (error) {
            alert('Error uploading file. Please try again.');
        }
    });
});
