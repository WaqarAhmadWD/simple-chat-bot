(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const c=({id:a,className:t})=>a?Array.isArray(a)?a.reduce((r,e)=>{const s=document.getElementById(e);return r[e]=s,r},{}):document.getElementById(a):t?Array.isArray(t)?t.reduce((r,e)=>{const s=document.getElementsByClassName(e);return r[e]=s,r},{}):document.getElementsByClassName(t):null;async function u({url:a="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDNUAMlLM_DnhZJRm0MziESagYuksG4bGo",route:t="",method:n="GET",data:r={}}){try{const e=await fetch(`${a}${t}`,{method:n,headers:{"Content-Type":"application/json"},...n==="POST"||n==="PUT"||n==="PATCH"?{body:JSON.stringify(r)}:{}});return e.ok?await e.json():null}catch(e){return console.error("Error:",e),null}}const f=()=>{const a=new Date,t=a.getHours(),n=a.getMinutes(),r=t>=12?"PM":"AM",e=(t%12||12).toString().padStart(2,"0"),s=n.toString().padStart(2,"0");return`${e}:${s} ${r}`},d=({isLeft:a,message:t,time:n=f(),title:r="system"})=>a?`
       <div class="w-full flex justify-end my-2">
        <div class="flex flex-col w-full md:max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700">
        <div class="flex items-center space-x-2 rtl:space-x-reverse  ">
           <span class="text-sm font-semibold text-gray-900 dark:text-white">${r}</span>
           <span class="text-sm font-normal text-gray-500 dark:text-gray-400 hidden md:block">${n}</span>
        </div>
        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
        
            ${t}
            </p>
        <span class="text-sm font-normal hidden md:block text-gray-500 dark:text-gray-400">Delivered</span>
     </div>
     </div>`:`
           <div class="w-full flex justify-start my-2">
          <div class="flex items-start ">
            <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700 inline-flex  justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br dark:from-gray-400 from-gray-200 dark:to-gray-600 to-gray-300 group-hover:from-gray-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
               <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span class="text-sm font-semibold text-gray-900  dark:text-white">${r}</span>
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400 hidden md:block">${n}</span>
               </div>
               <p class="text-sm font-normal py-2.5 text-gray-900  dark:text-white">       
            ${t}
        </p>
               <span class="text-sm font-normal text-gray-500 dark:text-gray-400 hidden md:block">Delivered</span>
            </div>
         </div>
        </div>
        `,g=()=>`
     <div class="w-full flex justify-start my-2 loader">
    <div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
</div>
`,{search_input:i,display:o,search_form:m}=c({id:["search_input","display","search_form"]});m.addEventListener("submit",async a=>{a.preventDefault(),o.innerHTML+=d({message:i.value,isLeft:!0,title:"me"});const t=i.value;i.value="",o.innerHTML+=g();const n=await u({method:"POST",data:{contents:[{parts:[{text:t}]}]}});n&&(o.innerHTML+=d({message:n.candidates[0].content.parts[0].text,title:"bot"})),[...o.children].forEach(r=>{r.classList.contains("loader")&&o.removeChild(r)})});
