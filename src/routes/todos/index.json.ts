import type { RequestHandler } from "@sveltejs/kit"
import {api} from './_api'

//Todo : Persist to the database
let todos:Todo[] = [];

//API response, control + space , typescript auto complete 
export const get: RequestHandler = (request) =>{
    return api(request)
    //return objects
    // return {
    //  status:200,
    //  body:todos 
    // }
}

//requesthandler will tell what is coming as request 
//empty objects, FormData , tells what is formdata like body has ,auto complete 
//form ... type name as text 

export const post: RequestHandler<{},FormData> = (request) =>{
    //  console.log(request.body.get("text"));
    //persiste objects not array
    // todos.push(request.body.get("text"));
    //api 2 parameter, request and todo but todo? is optional 
   return api(request, {
     uid:`${Date.now()}`,//TODO Replace with the UID from database  not the way for production 
    create_at:new Date(),
    text: request.body.get("text"),
    done:false 
   });


//Proper todo type 
    // todos.push({
    //    create_at:new Date(),
    //    text: request.body.get("text"),
    //    done:false 
    // });
    //  return {
    //      status:303,
    //      headers:{
    //          location:"/"
    //      }

     
     

}