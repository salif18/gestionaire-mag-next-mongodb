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

// 'image' est le nom du champ attendu dans la requête
const upload = multer({ storage: storage }).single('image');

// uploadMiddleware 
export const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};