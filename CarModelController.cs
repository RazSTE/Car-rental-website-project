using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using RazCarProjectServer.Models;

namespace RazCarProjectServer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CarModelController : ApiController
    {
        DbCarRentalEntities rentalEntities = new DbCarRentalEntities();
        // GET: api/CarModel
        public IEnumerable<CarModel> Get()
        {
            return rentalEntities.CarModels;
        }

        // GET: api/CarModel/5
        public CarModel Get(int id)
        {
            return rentalEntities.CarModels.FirstOrDefault(t => t.ModelID == id);
        }

        // POST: api/CarModel
        public void Post([FromBody]CarModel NewModel)
        {
            rentalEntities.CarModels.Add(NewModel);
            rentalEntities.SaveChanges();

            string[] img = NewModel.Photo.Split(',');
            byte[] imgbyte = Convert.FromBase64String(img[1]);
            string path = HttpContext.Current.Server.MapPath("~/Images");
            string imageName = NewModel.ModelID.ToString() + ".jpg";
            string imgPath = Path.Combine(path, imageName);
            File.WriteAllBytes(imgPath, imgbyte);
        }

        // PUT: api/CarModel/5
        public void Put(int id, [FromBody]CarModel model)
        {
            rentalEntities.CarModels.FirstOrDefault(t => t.ModelID == id).ModelID    = model.ModelID;
            rentalEntities.CarModels.FirstOrDefault(t => t.ModelID == id).Manufactor = model.Manufactor;
            rentalEntities.CarModels.FirstOrDefault(t => t.ModelID == id).ModelName  = model.ModelName;
            rentalEntities.CarModels.FirstOrDefault(t => t.ModelID == id).Year       = model.Year;
            rentalEntities.CarModels.FirstOrDefault(t => t.ModelID == id).Gear       = model.Gear;
            rentalEntities.SaveChanges();
        }

        // DELETE: api/CarModel/5
        public void Delete(int id)
        {
            rentalEntities.CarModels.Remove(rentalEntities.CarModels.First(y => y.ModelID == id));
            rentalEntities.SaveChanges();
        }
    }
}
