const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const sharp = require('sharp');
const app = express();
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only .png, .docx, and .pdf files are allowed'));
        }
        cb(null, true);
    }
});
app.post('/upload', (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        if (req.file.mimetype === 'image/png') {
            try {
                const metadata = await sharp(req.file.path).metadata();
                if (metadata.width > 400 || metadata.height > 300) {
                    fs.unlinkSync(req.file.path);
                    return res.status(400).json({ success: false, message: 'Image dimensions should be less than 400x300 pixels.' });
                }
            } catch (imageError) {
                return res.status(500).json({ success: false, message: 'Error processing image dimensions.' });
            }
        }
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.json({ success: true, fileUrl });
    });
});
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
