///_api file can access to the [uid] file and index.json file 


import type {Request} from "@sveltejs/kit"
import PrismaClient from '$lib/prisma';



const prisma = new PrismaClient();
// let todos:Todo[] = [];

//Todo have to be complete the type request ,key value pair 
/// wants to Record of string and some Date or boolean but set as unknown
export const api = async (request:Request,data?:Record<string,unknown>) =>{
    let body ={};
    let status = 500;
    // request.query.get("_methode")
    //request.method => post, get 
    switch (request.method.toUpperCase()){
    case "GET":
    body = await prisma.todo.findMany();
    status = 200;
       break;


    case "POST":
        //data as Todo's type request 
    //    todos.push(data as Todo);
    body = await prisma.todo.create({
        data: {
          create_at: data.create_at as Date,
          done: data.done as boolean,
          text: data.text as string
        }
      })
    //    body = data;
       status = 201;
  
    break;

     case "DELETE":
         await prisma.todo.delete({
             where:{
                 uid:request.params.uid
             }
         })
    // todos = todos.filter(todo => todo.uid !== request.params.uid)
    status = 200;

    break;
    case "PATCH"://update

      body = await prisma.todo.update({
          where:{
          uid:request.params.uid
          },
          data:{
              done:data.done,
              text:data.text
          }
      })
    //     todos = todos.map(todo =>{
    //        if(todo.uid === request.params.uid){
    //        if(data.text) todo.text = data.text as string;
    //        else todo.done = data.done as boolean;
    //        }
    //        return todo
    //    })
        status = 200;
        // body = todos.find(todo => todo.uid === request.params.uid)
       default:
        break;
    }


    if(request.method.toUpperCase() !=="GET" && request.headers.accept !== "application/json"){
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
