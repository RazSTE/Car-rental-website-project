using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using RazCarProjectServer.Models;

namespace RazCarProjectServer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OrdersController : ApiController
    {
        DbCarRentalEntities rentalEntities = new DbCarRentalEntities();
        // GET: api/Orders
        public IEnumerable<Order> Get()
        {
            return rentalEntities.Orders; 
        }

        // GET: api/Orders/5
        public IEnumerable<Order> Get(int id)
        {
            return rentalEntities.Orders.Where(t => t.UserID == id);
        }

        // POST: api/Orders
        public HttpResponseMessage Post([FromBody]Order NewOrder)
        {
            rentalEntities.Orders.Add(NewOrder);
            rentalEntities.SaveChanges();
            return Request.CreateResponse<Order>(HttpStatusCode.Ambiguous, NewOrder);
        }

        // PUT: api/Orders/5
        public HttpResponseMessage Put(int id, [FromBody]Order value)
        {
            
            return Request.CreateResponse<Order>(HttpStatusCode.Ambiguous, value);
        }

        // DELETE: api/Orders/5
        public void Delete(int id)
        {
        }
    }
}
