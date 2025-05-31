import express from "express"
import { addProduct, listProduct ,removeProduct} from "../controllers/productController.js"
import multer from "multer"

const productRouter = express.Router();

// Image Storage Engine

const Storage = multer.diskStorage({
    destination:"uploads",
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: Storage });

productRouter.post("/add",upload.single("image"),addProduct)
productRouter.get("/list",listProduct)
productRouter.post("/remove",removeProduct)













export default productRouter;