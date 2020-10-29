const modelPost = require('../components/article/model');
const modelSubs = require('../components/subscription/model');

function add(article){
   const newArticle = new modelPost(article);
   newArticle.save();
   console.log(newArticle)
   return newArticle

}

function addSubs(data){ 
    const newSub = new modelSubs(data);
    newSub.save()
    return newSub
}

async function list(campo){
    filter = {"label": campo};
  let result = await modelPost.find(filter)
  return result
}

async function getLittle(query, n){
  
  let result = await modelPost.find(query).limit(n);
  return result
}


module.exports ={
    add,
    list,
    addSubs,
    getLittle,
   
}