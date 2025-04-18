export const get = ({ id, className }) => {
    if(id){
        if (Array.isArray(id)){
            let obj = id.reduce((acc, key) => {
                const doc = document.getElementById(key)
                acc[key] = doc;
                return acc;
            }, {});
            return obj
        }else{
            return document.getElementById(id)
        } 
    }
    if(className){
        if (Array.isArray(className)){
            let obj = className.reduce((acc, key) => {
                const doc = document.getElementsByClassName(key)
                acc[key] = doc;
                return acc;
            }, {});
            return obj
        }else{
            return document.getElementsByClassName(className)
        } 
    }
    return null;
  };
  export async function request({url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+ import.meta.env.VITE_GEMINI_KEY,route = "", method='GET',data = {}}) {
    try {
      const response = await fetch(`${url}${route}`, {
        method, 
        headers: {
          'Content-Type': 'application/json'
        },
        ...(method === 'POST' || method === 'PUT' || method === 'PATCH' ? {body: JSON.stringify(data)} : {})
      });
  
      if (!response.ok) {
        return null
      }
  
      const result = await response.json();
      return result;
  
    } catch (error) {
      console.error('Error:', error);
    return null;
    }
  }
export const getCurrentTime=()=> {
    const now = new Date();
  
    const hours = now.getHours();
    const minutes = now.getMinutes();
    // const seconds = now.getSeconds();
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    // const formattedSeconds = seconds.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
export const message = ({isLeft,message,time=getCurrentTime(),title="system"}) =>{
    if(isLeft){
        return  `
       <div class="w-full flex justify-end my-2">
        <div class="flex flex-col w-full md:max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700">
        <div class="flex items-center space-x-2 rtl:space-x-reverse  ">
           <span class="text-sm font-semibold text-gray-900 dark:text-white">${title}</span>
           <span class="text-sm font-normal text-gray-500 dark:text-gray-400 hidden md:block">${time}</span>
        </div>
        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
        
            ${message}
            </p>
        <span class="text-sm font-normal hidden md:block text-gray-500 dark:text-gray-400">Delivered</span>
     </div>
     </div>`
    }else{
        return `
           <div class="w-full flex justify-start my-2">
          <div class="flex items-start ">
            <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700 inline-flex  justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br dark:from-gray-400 from-gray-200 dark:to-gray-600 to-gray-300 group-hover:from-gray-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
               <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span class="text-sm font-semibold text-gray-900  dark:text-white">${title}</span>
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400 hidden md:block">${time}</span>
               </div>
               <p class="text-sm font-normal py-2.5 text-gray-900  dark:text-white">       
            ${message}
        </p>
               <span class="text-sm font-normal text-gray-500 dark:text-gray-400 hidden md:block">Delivered</span>
            </div>
         </div>
        </div>
        `
    }
}
export const loader = () =>{
    return `
     <div class="w-full flex justify-start my-2 loader">
    <div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
</div>
`
}
export const points = (result) =>{
  try {
    const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
    const parsed = JSON.parse(jsonMatch[1]);
    const points = parsed.map(p => p.point);
    return points;
  } catch (err) {
    return null;
  }
}