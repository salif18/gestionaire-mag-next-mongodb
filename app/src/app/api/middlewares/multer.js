import multer from "multer";

// Extensions MIME
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

// Configuration de stockage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    }
});

const upload = multer({ storage: storage });

export const uploadMiddleware = (req, res, next) => {
    const uploadSingle = upload.single('image'); // 'image' est le nom du champ attendu dans la requête
    uploadSingle(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};