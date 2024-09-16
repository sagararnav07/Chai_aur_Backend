import multer from 'multer';



//go to multer.md for knowing more about this package how it work's and it's usage

//creating a method as middleware named strorage that will config multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
  
 export const upload = multer({ 
    storage, 
})