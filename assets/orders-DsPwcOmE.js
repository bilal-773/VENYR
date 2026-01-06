import{I as d}from"./index-BRNuU9-M.js";async function _(o){const{data:{user:r}}=await d.auth.getUser(),t=o.reduce((a,c)=>a+c.price*c.quantity,0),{data:e,error:i}=await d.from("orders").insert({user_id:(r==null?void 0:r.id)??null,total:t,status:"pending"}).select().single();if(i)throw console.error("Error creating order:",i),i;const n=o.map(a=>({order_id:e.id,product_id:a.product_id,quantity:a.quantity,price_at_order:a.price})),{error:s}=await d.from("order_items").insert(n);if(s)throw console.error("Error creating order items:",s),await d.from("orders").delete().eq("id",e.id),s;return e}async function p(o){const{data:r,error:t}=await d.from("orders").select("*").eq("user_id",o).order("created_at",{ascending:!1});if(t)throw console.error("Error fetching orders:",t),t;return r||[]}async function l(o){const{data:r,error:t}=await d.from("orders").select(`
      id,
      user_id,
      total,
      status,
      created_at,
      order_items (
        id,
        order_id,
        product_id,
        quantity,
        price_at_order,
        products (
          id,
          name,
          image,
          image_url,
          images
        )
      )
    `).eq("id",o).single();if(t)throw console.error("Error fetching order:",t),t;return{order:{id:r.id,user_id:r.user_id,total:r.total,status:r.status,created_at:r.created_at},items:(r.order_items||[]).map(e=>({id:e.id,order_id:e.order_id,product_id:e.product_id,quantity:e.quantity,price_at_order:e.price_at_order,products:e.products}))}}export{l as a,_ as c,p as g};
