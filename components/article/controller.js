const store = require('../../db/store');
const error = require('../../utils/err');
const fetch = require('node-fetch');
const key= 'AIzaSyDEwFMiMIbcfTxQGw5hJD0vGpconwRL7Ck'
async function create(body, file){  
    if(!body.title || !body.text){
        throw error('Falta completar los datos', 400)
    }
  let fileUrl = '';
    if(file){
        fileUrl = 'http://localhost:3000/app/uploads/' + file.filename;
    }
    let date = new Date()
    const article = {
        title : body.title,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` ,
        text: body.text,
        file: fileUrl,
        label: body.label,
        author: body.author
    }
   
   return store.add(article)
};

async function getAll(label){
 let list = await store.list(label);
   
 return list  
};

async function getLast(n, filter, value){
    let query, list;
    if(filter == "label"){
        query = {"label": value}
    }else if(filter == 'id'){
        query = {"_id":  value}
    }
    list = await store.getLittle(query, n);
      
    return list
       
   };

async function fetchBooks(){
       const response = await fetch(' https://www.googleapis.com/books/v1/users/112896409407549087220/bookshelves/1001/volumes')
       return await response.json()
      }
async function books(){
        let results = await fetchBooks()
        let books = results["items"];
        let image
        let images = []
        books.forEach(element => {
                image = element.volumeInfo.imageLinks.thumbnail
                images.push(image)
        });
  
        return images
       
     }
async function home(){
    const results = {}

    results['reviews'] = await getLast(2, 'review')
    results['books'] = await books()
    
    return  results
};

module.exports = {
    getAll,
    create,
    getLast,
    home
}