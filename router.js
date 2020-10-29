const express = require('express');
const router = express.Router();
const articles = require('./components/article/controller');
const subs = require('./components/subscription/controller');
const multer = require('multer');
const path = require('path');
const error = require('./network/error');

//para que el archivo file tenga su nombre original
const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/uploads'),
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});

//midleware
const upload = multer({
  storage: storage,
  dest: path.join(__dirname,'public/uploads'),
  limits: {fileSize: 2000000},
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if(mimetype && extname){
      return cb(null, true)
    }
    cb('Error: Extension no soportada');
  }
}).single('image')

router.post('/new-article', upload, (req, res, next) => {
 
    articles.create(req.body, req.file)
      .then(result =>   res.redirect('http://localhost:3000/article/' + result._id))
      .catch(e => error(e, req, res, next))
     
} );

router.post('/subs' , async(req, res, next) => {
  let result 
  try {
      result = await subs.add(req.body);
    
  } catch (e) {
    error(e, req, res, next)
  }
  
  res.redirect('http://localhost:3000/?user='+ result.name);
 
});

router.get('/.booksNews', async(req, res)=> {
  let result = await articles.books();
});

router.get('/create', async(req, res, next) =>{
res.render('create.pug')
});

router.get('/', async(req, res, next) => {
  let result 
  try {
      result = await articles.home();
  } catch (e) {
    error(e, req, res, next)
  }
     if(req.query.user){
       result['user'] = req.query.user
     }
   res.render('home.pug', result)
});

router.get('/reviews', async(req, res) => {
  let result = {}
  try {
      result['list'] =await articles.getAll('review')
    
  } catch (e) {
    error(e, req, res, next)
  }

   res.render('reviews.pug', result)

});

router.get('/article/:id', async(req, res) => {
  let result 
  try {
      result = await articles.getLast(1, 'id', req.params.id);
    
  } catch (e) {
    error(e, req, res, next)
  }

  const article = result[0];  
  res.render('article.pug', {
    title: article.title,
    date: article.date,
    label: article.label,
    autor:article.author,
    file: article.file,
    text: article.text
  })

});

router.get('/news', async(req, res) => {

  let result = {}
  try {
      result['list'] =await articles.getAll('new')
    
  } catch (e) {
    error(e, req, res, next)
  }

   res.render('news.pug', result)
  
});




module.exports = router