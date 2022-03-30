using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using RazCarProjectServer.Models;
using System.Web;
using System.IO;

namespace RazCarProjectServer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class UsersController : ApiController
    {
        DbCarRentalEntities rentalEntities = new DbCarRentalEntities();

        // GET: api/User
        public IEnumerable<User> Get()
        {
            return rentalEntities.Users;
        }

        // GET: api/User/5
        public User Get(int id)
        {
            return rentalEntities.Users.FirstOrDefault(t => t.UserID == id);
        }

        // POST: api/User
        public void Post([FromBody]User NewUser)
        {
            
            rentalEntities.Users.Add(NewUser);
            rentalEntities.SaveChanges();

            string[] img = NewUser.Photo.Split(',');
            byte[] imgbyte = Convert.FromBase64String(img[1]);
            string path = HttpContext.Current.Server.MapPath("~/Images");
            string imageName = NewUser.UserID.ToString() + ".jpg";
            string imgPath = Path.Combine(path,imageName );
            File.WriteAllBytes(imgPath, imgbyte);  

               
        }

        // PUT: api/User/5
        public HttpResponseMessage Put(int id, [FromBody]User user)
        {

            rentalEntities.Users.FirstOrDefault(t => t.UserID == id).UserID    = user.UserID    ;
            rentalEntities.Users.FirstOrDefault(t => t.UserID == id).FirstName = user.FirstName ;
            rentalEntities.Users.FirstOrDefault(t => t.UserID == id).LastName  = user.LastName  ;
            rentalEntities.Users.FirstOrDefault(t => t.UserID == id).UserName  = user.UserName  ;
            rentalEntities.Users.FirstOrDefault(t => t.UserID == id).Password  = user.Password  ;
            rentalEntities.Users.FirstOrDefault(t => t.UserID == id).Email     = user.Email     ;
            rentalEntities.Users.FirstOrDefault(t => t.UserID == id).BirthDate = user.BirthDate ;
            rentalEntities.Users.FirstOrDefault(t => t.UserID == id).Gender    = user.Gender    ;
            rentalEntities.Users.FirstOrDefault(t => t.UserID == id).Position = user.Position   ;

            string[] img = user.Photo.Split(',');
            byte[] imgbyte = Convert.FromBase64String(img[1]);
            string path = HttpContext.Current.Server.MapPath("~/Images");
            string imageName = user.UserID.ToString() + ".jpg";
            string imgPath = Path.Combine(path, imageName);
            File.WriteAllBytes(imgPath, imgbyte);

            rentalEntities.SaveChanges();

            


            return Request.CreateResponse<User>(HttpStatusCode.Ambiguous, user);
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
            rentalEntities.Users.Remove(rentalEntities.Users.First(y => y.UserID == id));
            rentalEntities.SaveChanges();
        }
    }
}
