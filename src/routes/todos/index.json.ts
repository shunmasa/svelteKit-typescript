import type { RequestHandler } from "@sveltejs/kit"

//API response, control + space , typescript auto complete 
export const get: RequestHandler = () =>{
    //return objects
    return {
     status:200,
     body:"Hello form the API"  
    }
}

//requesthandler will tell what is coming as request 
//empty objects, FormData , tells what is formdata like body has ,auto complete 
//form ... type name as text 

export const post: RequestHandler<{},FormData> = (request) =>{
     console.log(request.body.get("text"));

}