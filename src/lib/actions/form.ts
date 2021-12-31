export const enhance = (form:HTMLFormElement,{
    result
}) => {
    // we have to clean up when the html gets remove 
    console.log("FORM mounted to DOM")
     
    const handleSubmit = async (event:Event) =>{
     event.preventDefault();//do not do default behaivior 
     try {
      const body = new FormData(form);
      const res = await fetch(form.action,{
          method:form.method,
          headers:{
              accept:"application/json"
          },
          body
      })
      if(res.ok){
        // console.log("API response",await res.json())  
        result(res,form);

    }else{
        console.log("Fetch error", await res.text())
    }
     } catch (error) {
         console.error("Fetch error:",error)
     }
    };

    form.addEventListener("submit", handleSubmit)
    return {
        destroy(){
            console.log("Form remove to DOM")
            //undo
            form.removeEventListner("submit",handleSubmit)
        }
    }
}