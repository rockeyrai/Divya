const express = require('express')
const app = express()
const port = 8000
const cors = require('cors');
const dbConnect = require('./database/connector');
require('dotenv').config()
const UserRoute = require('./routes/user')
const NewsRouter = require('./routes/news')

dbConnect()

app.use(express.json())
app.use(cors())
app.use(UserRoute)
app.use(NewsRouter)

// const storage = multer.diskStorage({
//   destination: './upload/images',
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//   }
// });
// const upload = multer({storage:storage})

// //creating upload endpoin for images
// app.use('/images',express.static('upload/images'))
// app.post("/upload",upload.single('product'),(req,res)=>{
//   res.json({
//     success:1,
//     image_url:`http://localhost:${port}/images/${req.file.filename}`
//   })
// })

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})