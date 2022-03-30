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
    public class ModelUnitsController : ApiController
    {
        DbCarRentalEntities rentalEntities = new DbCarRentalEntities();
        // GET: api/ModelUnits
        public IEnumerable<ModelUnit> Get()
        {
            return rentalEntities.ModelUnits;
        }

        // GET: api/ModelUnits/5
        public ModelUnit Get(int id)
        {
            return rentalEntities.ModelUnits.FirstOrDefault(t => t.ModelID == id && t.IsAvileable=="true");
        }

        // POST: api/ModelUnits
        public HttpResponseMessage Post([FromBody]ModelUnit NewModelUnit)
        {
            rentalEntities.ModelUnits.Add(NewModelUnit);
            rentalEntities.SaveChanges();
            return Request.CreateResponse<ModelUnit>(HttpStatusCode.Ambiguous, NewModelUnit);
        }

        // PUT: api/ModelUnits/5
        public HttpResponseMessage Put(int id, [FromBody]ModelUnit modelUnit)
        {
            rentalEntities.ModelUnits.FirstOrDefault(t => t.ModelID == id).IsAvileable = modelUnit.IsAvileable;
            return Request.CreateResponse<ModelUnit>(HttpStatusCode.Ambiguous, modelUnit);

        }

        // DELETE: api/ModelUnits/5
        public void Delete(int id)
        {
        }
    }
}
