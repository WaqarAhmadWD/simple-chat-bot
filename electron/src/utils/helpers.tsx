// src/utils/helpers.ts
  export const getCurrentTime = (): string => {
    const now = new Date();
  
    const hours = now.getHours();
    const minutes = now.getMinutes();
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  
  export async function request({
    url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
    route = "",
    method = 'GET',
    data = {}
  }: RequestOptions) {
    try {
      const response = await fetch(`${url}${route}`, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        ...(method === 'POST' || method === 'PUT' || method === 'PATCH' ? { body: JSON.stringify(data) } : {})
      });
  
      if (!response.ok) {
        return null;
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
  export const points = (result: any) => {
    try {
      const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
      const parsed = JSON.parse(jsonMatch?.[1] || "[]");
      const points = parsed.map((p: any) => p.point);
      return points;
    } catch (err) {
      return null;
    }
  };
  