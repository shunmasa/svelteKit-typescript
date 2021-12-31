///_api file can access to the [uid] file and index.json file 


import type {Request} from "@sveltejs/kit"

let todos:Todo[] = [];
//Todo have to be complete the type request ,key value pair 
/// wants to Record of string and some Date or boolean but set as unknown
export const api = (request:Request,data?:Record<string,unknown>) =>{
    let body ={};
    let status = 500;
    // request.query.get("_methode")
    //request.method => post, get 
    switch (request.method.toUpperCase()){
    case "GET":
    body = todos;
    status = 200;
       break;


    case "POST":
        //data as Todo's type request 
       todos.push(data as Todo);
       body = data;
       status = 201;
  
    break;

    case "DELETE":
    todos = todos.filter(todo => todo.uid !== request.params.uid)
    status = 200;

    break;
    case "PATCH"://update
        todos = todos.map(todo =>{
           if(todo.uid === request.params.uid){
           if(data.text) todo.text = data.text as string;
           else todo.done = data.done as boolean;
           }
           return todo
       })
        status = 200;
       default:
        break;
    }


    if(request.method.toUpperCase() !=="GET"){
        return{
            status:303,
             headers:{
                 location:"/"
             }       
        }
    }
    return {
        status,
        body
    }
}
