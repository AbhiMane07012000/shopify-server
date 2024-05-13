import Razorpay from 'razorpay';
'use strict';

/**
 * order router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::order.order', ({ strapi }) => ({
    async create(ctx) {
      const { products,subTotal,order_id} = ctx.request.body;
  
      
     
  
      try {
        if(order_id===0){
        
       
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_SECRET,
        });
  
  
        const options = {
          amount:subTotal*100,
          currency: "INR",
          receipt: "razor@mail.com",
        };
  
        const order = await razorpay.orders.create(options);
  
        if (!order) {
          ctx.response.status = 500;
        }
  
        ctx.send(order);
      }
      else{
        console.log(order_id);
        await strapi
          .service("api::order.order")
          .create({ data: { products, orderId:order_id } });
          ctx.response.status=200;
      }
     
      } catch (error) {
        ctx.response.status = 500;
        console.log(error);
        return { error };
      }
    },
  }));
  
