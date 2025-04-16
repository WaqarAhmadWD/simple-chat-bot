import './style.css'
import {get,request,message,loader} from "./utils"
const {search_input,display,search_form} = get({id:["search_input","display","search_form"]})
search_form.addEventListener("submit",async(e)=>{
  e.preventDefault();
      display.innerHTML += message({message:search_input.value,isLeft:true,title:"me"})
      const prompt = search_input.value;
      search_input.value = ""
      display.innerHTML += loader();

      const result = await request({method:"POST",data:{
        contents: [{
          parts:[{text: prompt}]
          }]
         }})
      if(result){
        display.innerHTML += message({message:result.candidates[0].content.parts[0].text,title:"bot"})
      }
      [...display.children].forEach(child => {
        if (child.classList.contains('loader')) {
          display.removeChild(child);
        }
      });
})