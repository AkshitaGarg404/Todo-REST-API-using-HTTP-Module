//entire todo rest api with http
const http=require('http');
const url = require('url');
require('dotenv').config();

// In-memory array to store todo items
const todos=[
  {
    id:1,
    text:"Get milk",
    completed:false
  },
  {
    id:2,
    text:"Clean House",
    completed:false
  },
  {
    id:3,
    text:"Watch dishes",
    completed:true
  },
  {
    id:4,
    text:"Make rest api",
    completed:false
  },
]

const server=http.createServer((req,res)=>{
  res.setHeader('Content-Type', 'application/json');

  // GET /todos - Return all todos
  if(req.method==='GET'&&req.url==='/todos'){
    try {
      res.end(JSON.stringify(todos))
    } catch (error) {
      res.end(JSON.stringify({
        success:false,
        error:"something went wrong"
      }))
    }
  } 
  // GET /todos/:id - Return a specific todo by id
  else if(req.method==='GET'){
    const parsedUrl=url.parse(req.url)
    //parsedUrl is an object with several things like pathname,query,.. protocol etc
    //its useful in cases like "/user/123?name=Akshita"
    //now split its pathname at /
    const parts=parsedUrl.pathname.split('/') //first=''//second=todos //third=id
    if(parts[1]!='todos'||parts.length!=3){
      // Invalid URL for GET /todos/:id
      res.statusCode=400;
      res.end(JSON.stringify({
        success:false,
        error:"Invalid url"
      }))
      return;
    } 
    const todo=todos.filter(todo=>todo.id===+parts[2])
    if(!todo.length){
      // Todo not found
      res.statusCode=404;
      res.end(JSON.stringify({
        success:false,
        error:"Todo not found"
      }))
      return;
    }
    res.end(JSON.stringify({
      success:true,
      data:todo
    }))
  } 
  // POST /todos - Add a new todo
  else if(req.method==="POST" && req.url==='/todos'){
    //getting data from req
    let body=[]
    req.on('data',chunk=>body.push(chunk));
    let todo={};

    req.on('end',()=>{
      body=Buffer.concat(body).toString();
      if(!body){
        // No body provided
        res.statusCode=400;
        res.end(JSON.stringify({
          success:false,
          error:"Bad request: task missing"
        }))
        return;
      }
      todo=JSON.parse(body)
      if(!todo.text){
        // No text property in todo
        res.statusCode=400;
        res.end(JSON.stringify({
          success:false,
          error:"Bad request: task missing"
        }))
        return;
      }
      if(!todo.completed) todo.completed=false;
      // Assign a new id to the todo
      // todo.id=todos.length+1; //a little error here because when delete happens length decreases so we can have duplicate ids
      todo.id=todos[todos.length-1].id +1;
      todos.push(todo)
      res.end(JSON.stringify({
        success:true,
        data:todo
      }))
    })
  }
  // PUT /todos/:id - Update an existing todo
  else if(req.method==='PUT'){
    const parsedUrl=url.parse(req.url);
    const parts=parsedUrl.pathname.split('/');
    if(parts[1]!=='todos'||parts.length!=3){
      // Invalid URL for PUT /todos/:id
      res.statusCode=400;
      res.end(JSON.stringify({
        success:false,
        error:"Invalid url"
      }))
      return;
    }
    const [oldtodo]=todos.filter(todo=>todo.id===+parts[2])
    if(!oldtodo){
      // Todo to update not found
      res.statusCode=400;
      res.end(JSON.stringify({
        success:false,
        error:"Task doesn't exist: Try creating a new task first"
      }))
      return;
    }
    //getting data from req
    let body=[]
    req.on('data',chunk=>body.push(chunk));

    req.on('end',()=>{
      body=Buffer.concat(body).toString();
      if(!body){
        // No body provided
        res.statusCode=400;
        res.end(JSON.stringify({
          success:false,
          error:"Bad request: task missing"
        }))
        return;
      }
      const todo=JSON.parse(body)
      if(todo.text){
        oldtodo.text=todo.text
      }
      if(todo.completed) oldtodo.completed=todo.completed
      res.end(JSON.stringify({
        success:true,
        data:oldtodo
      }))
    })
  }
  // DELETE /todos/:id - Delete a todo by id
  else if(req.method==="DELETE"){
    const parsedUrl=url.parse(req.url);
    const parts=parsedUrl.pathname.split('/');
    if(parts[1]!=='todos'||parts.length!=3){
      // Invalid URL for DELETE /todos/:id
      res.statusCode=400;
      res.end(JSON.stringify({
        success:false,
        error:"Invalid url"
      }))
      return;
    }
    const [todo]=todos.filter(todo=>todo.id===+parts[2])
    if(!todo){
      // Todo to delete not found
      res.statusCode=400;
      res.end(JSON.stringify({
        success:false,
        error:"Task doesn't exist: Try creating a new task first"
      }))
      return;
    }
    todos.splice(todos.indexOf(todo),1);
    res.end(JSON.stringify({
      success:true,
      data:{}
    }))
  } 
  // Catch-all for invalid routes or methods
  else {
    res.statusCode=400;
    res.end(JSON.stringify({
      success:false,
      error:"Invalid url"
    }))
  }
})

// Start the server and listen on the specified port
server.listen(process.env.PORT,()=>{
  console.log(`Server is listening to port ${process.env.PORT}`)
})