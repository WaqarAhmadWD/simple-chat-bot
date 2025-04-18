import './style.css'
import {get,request,message,loader} from "./utils"
const {search_input,display,search_form,file_data,preview_img} = get({id:["search_input","display","search_form","file_data","preview_img"]})
let image = null;
search_form.addEventListener("submit",async(e)=>{
  e.preventDefault();
      display.innerHTML += message({message:search_input.value,isLeft:true,title:"me"})
      const prompt = search_input.value;
      search_input.value = ""
      display.innerHTML += loader();
      const Img = image;
      image = null; 
       preview_img.innerHTML =""
      console.log(Img)
      let parts = [
        { text: prompt }
      ];
      
      if (Img) {
        parts.push({
          inlineData: {
            mimeType: "image/png",
            data: Img,
          }
        });
      }
 
      const result = await request({
        method: "POST",
        data: {
          contents: [
            {
              parts: parts,
              role: "user"
            }
          ],
          generationConfig: {
            temperature: 0.5
          }
        }
      });
      if(result){
        display.innerHTML += message({message:result.candidates[0].content.parts[0].text,title:"bot"})
      }
      [...display.children].forEach(child => {
        if (child.classList.contains('loader')) {
          display.removeChild(child);
        }
      });
     
})

file_data.addEventListener("change", async (e) => {
  const file = file_data.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = async () => {
    preview_img.innerHTML = "" 
    image = reader.result.split(",")[1]; 
    const img = document.createElement("img");
    img.src = reader.result; // Includes the base64 prefix
    img.alt = "Uploaded Image";
    img.style.maxWidth = "200px"; // Optional styling
    img.style.margin = "10px 0";

    preview_img.appendChild(img)
  };
  reader.readAsDataURL(file);
});
