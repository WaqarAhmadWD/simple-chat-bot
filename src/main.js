import './style.css'
import {get,request,message,loader} from "./utils"
const {search_input,display,search_form,file_data} = get({id:["search_input","display","search_form","file_data"]})
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

file_data.addEventListener("change", async (e) => {
  const file = file_data.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64 = reader.result.split(",")[1]; 

    try {
      const result = await request({
        method: "POST",
        data: {
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: "image/png",
                    data: base64,
                  },
                },
                {
                  text: `Point to the DSA folder execl point 100% right with no more than 10 items. The answer should follow the json format: [{\"point\": <point>, \"label\": <label1>}]. The points are in [y, x] format normalized to 0-1000.`
                }
              ],
              role: "user",
            }
          ],
          generationConfig: {
            temperature: 0.5,
          }
        },
      });

      const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        console.error("No text found in response.");
        return;
      }

      // Extract JSON from markdown code block
      const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
      if (!jsonMatch || !jsonMatch[1]) {
        console.error("Failed to extract JSON block.");
        return;
      }

      const parsed = JSON.parse(jsonMatch[1]);
      const points = parsed.map(p => p.point);
      console.log("Extracted points:", points);

    } catch (err) {
      console.error("Request or parsing error:", err);
    }
  };

  reader.readAsDataURL(file);
});
