using Microsoft.AspNetCore.Mvc;

using Project1.Data;
using Project1.Models;

namespace Project1.Controllers
{
    [ApiController]
    [Route("apiV2")]
    public class ApiV2DBController : ControllerBase
    {
        protected ApiDbContext Context => HttpContext.RequestServices.GetService(typeof(ApiDbContext)) as ApiDbContext;

        [HttpGet("Subjects/{i?}")]
        public CommonAddModel GetAllSubjects(Guid? i)
        {
            if (i is null)
                return new CommonAddModel() { Subjects = Context.Subjects.ToList() };
            else
                return new CommonAddModel() { Subjects = Context.Subjects.Where(t => t.Id == i).ToList() };
        }

        [HttpGet("Tracks/{i?}")]
        public CommonAddModel GetAllTracks(Guid? i)
        {
            if (i is null)
                return new CommonAddModel() { Tracks = Context.Tracks.ToList() };
            else
                return new CommonAddModel() { Tracks = Context.Tracks.Where(t => t.Id == i).ToList() };
        }

        [HttpGet("Prepods/{i?}")]
        public CommonAddModel GetAllPrepods(Guid? i)
        {
            if (i is null)
                return new CommonAddModel() { Prepods = Context.Prepods.ToList() };
            else
                return new CommonAddModel() { Prepods = Context.Prepods.Where(t => t.Id == i).ToList() };
        }

        [HttpGet("Reviews/{i?}")]
        public CommonAddModel GetAllReviews(Guid? i)
        {
            if (i is null)
                return new CommonAddModel() { Reviews = Context.Reviews.ToList() };
            else
                return new CommonAddModel() { Reviews = Context.Reviews.Where(t => t.Id == i).ToList() };
        }
    }
}
