export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if(url.pathname === '/api/men') {
      if(!env.MEN_KV) return new Response('{"error":"KV not bound"}', {status:500,headers:{'Content-Type':'application/json'}});
      if(request.method === 'GET') {
        const data = await env.MEN_KV.get('menages');
        return new Response(data || '{}', {headers:{'Content-Type':'application/json'}});
      }
      if(request.method === 'POST') {
        const body = await request.text();
        await env.MEN_KV.put('menages', body);
        return new Response('{"ok":true}', {headers:{'Content-Type':'application/json'}});
      }
    }
    return env.ASSETS.fetch(request);
  }
};
