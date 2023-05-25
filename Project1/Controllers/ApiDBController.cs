using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

using Project1.Data;
using Project1.Models;

namespace Project1.Controllers
{
    [ApiController]
    [Route("api")]
    public class ApiDBController : ControllerBase
    {
        protected ApiDbContext Context => HttpContext.RequestServices.GetService(typeof(ApiDbContext)) as ApiDbContext;

        [HttpGet("Subjects/{i?}")]
        public IEnumerable<Subject> GetAllSubjects(Guid? i)
        {
            if (i is null)
                return Context.Subjects;
            else
                return Context.Subjects.Where(t => t.Id == i);
        }

        [HttpGet("Tracks/{i?}")]
        public IEnumerable<Track> GetAllTracks(Guid? i, bool? isAdvanced)
        {
            if (Convert.ToBoolean(isAdvanced))
            {
                if (i is null)
                    return Context.Tracks.Include(t => t.Prepods);
                else
                    return Context.Tracks.Where(t => t.Id == i)
                                         .Include(t => t.Prepods);
            }

            if (i is null)
                return Context.Tracks;
            else
                return Context.Tracks.Where(t => t.Id == i);
        }

        [HttpGet("Prepods/{i?}")]
        public IEnumerable<Prepod> GetAllPrepods(Guid? i)
        {
            if (i is null)
                return Context.Prepods;
            else
                return Context.Prepods.Where(t => t.Id == i);
        }

        [HttpGet("Reviews/{i?}")]
        public IEnumerable<Review> GetAllReviews(Guid? i, Int32? limit, Guid? trackId, Guid? teacherId, string? sortedBy = "time")
        {
            IQueryable<Review> reviews = Context.Reviews;

            var reviewsList = reviews.ToList();


            if (!(sortedBy is null))
            {
                switch (sortedBy)
                {
                    case "rating":
                        reviews = reviews.OrderBy(review => review.Rating);
                        break;
                    case "time":
                        reviews = reviews.OrderByDescending(review => review.AddedDate);
                        break;
                    case "useful":
                        // TO DO SORT BY USERS LIKE;
                        break;
                }
            }

            reviews = reviews.OrderByDescending(review => review.AddedDate);

            if (!(trackId is null))
            {
                var prepodsId = Context.Prepods.Where(teacher => teacher.TrackId == trackId).Select(teacher => teacher.Id);
                reviews = reviews.Where(review => prepodsId.Contains(review.PrepodId));
            }
            if (!(teacherId is null))
            {
                reviews = reviews.Where(review => review.PrepodId == teacherId);
            }
            if (!(limit is null))
            {
                reviews = reviews.Take(limit.GetValueOrDefault(1));
            }
            if (!(i is null))
            {
                reviews = Context.Reviews.Where(t => t.Id == i);
            }

            return reviews;
        }

        [HttpGet("All/count")]
        public Int32 GetAll(Int32? semester)
        {
            var Subjects = Context.Subjects.Where(subject => Convert.ToBoolean(semester) ? subject.Semester.Contains(Convert.ToInt32(semester)) : true);

            return Subjects.Count();

        }

        [HttpGet("All/")]
        public IEnumerable<Subject> GetAll(Int32? limit, Int32? semester)
        {
            var Subjects = Context.Subjects.Where(subject => Convert.ToBoolean(semester) ? subject.Semester.Contains(Convert.ToInt32(semester)) : true)
                                           .Include(s => s.Tracks)
                                           .ThenInclude(t => t.Prepods)
                                           .OrderBy(subject => subject.AddedDate);                               

            if (limit is null)
                return Subjects;

            return Subjects.Take(limit.GetValueOrDefault(1));

        }

        [HttpGet("Search")]
        public IEnumerable<Track> Search(string text, string filteredBy)
        {
            IQueryable<Track> tracks = Context.Tracks;

            tracks = tracks.Where(track => filteredBy == "track" ? track.TrackName.ToLower().Contains(text) : true)
                           .Include(t => t.Prepods)
                           .OrderBy(track => track.AddedDate);

            tracks = tracks.Where(track => filteredBy == "teacher" ? 
                                  track.Prepods.Where(teacher => teacher.PrepodName.ToLower().Contains(text)).Count() != 0 
                                  : true);

            return tracks;

        }

        /*[HttpGet("All2")]
        public CommonAddModel GetAll()
        {
            return new CommonAddModel()
            {
                Subjects = Context.Subjects.ToList(),
                Prepods = Context.Prepods.ToList(),
                Reviews = Context.Reviews.ToList(),
                Tracks = Context.Tracks.ToList(),
            };
        }*/


        [Authorize(Roles = "User")]
        [HttpPost("AddSubject")]
        public JsonResult AddSubject(Subject value)
        {
            try
            {
                Context.Subjects.Add(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = ex.InnerException?.Message ?? "DB Error" });
            }
        }

        [Authorize(Roles = "User")]
        [HttpPost("AddTrack")]
        public JsonResult AddTrack(Track value)
        {
            try
            {
                Context.Tracks.Add(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = ex.InnerException?.Message ?? "DB Error" });
            }
        }
        [Authorize(Roles = "User")]
        [HttpPost("AddPrepod")]
        public JsonResult AddPrepod(Prepod value)
        {
            try
            {
                Context.Prepods.Add(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = ex.InnerException?.Message ?? "DB Error" });
            }
        }
        [Authorize(Roles = "User")]
        [HttpPost("AddReview")]
        public JsonResult AddReview(Review value)
        {
            try
            {
                Context.Reviews.Add(value);
                calculateNewValueTeacher(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = ex.InnerException?.Message ?? "DB ERROR" });
            }
        }

        public void calculateNewValueTeacher(Review newReview)
        {
            var reviews = Context.Reviews.Where(review => review.PrepodId == newReview.PrepodId).ToList();
            reviews.Add(newReview);
            var teacher = Context.Prepods.Where(prepod => prepod.Id == newReview.PrepodId).FirstOrDefault();
            var countReviews = reviews.Count();
            var values = new Values();

            // group by

            for (var i = 0; i < countReviews; i++)
            {
                var review = reviews[i];
                switch (review.Rating)
                {
                    case 1:
                        values.count1++;
                        break;
                    case 2:
                        values.count2++;
                        break;
                    case 3:
                        values.count3++;
                        break;
                    case 4:
                        values.count4++;
                        break;
                    case 5:
                        values.count5++;
                        break;
                }
                values.avgRating += review.Rating;
                values.avgInterest += review.Interest;
                values.avgBenefit += review.Benefit;
                values.avgAvailability += review.Availability;
            }

            values.avgRating = Math.Round(values.avgRating / (double)countReviews, 1);
            values.avgInterest = Math.Round(values.avgInterest / (double)countReviews, 1);
            values.avgBenefit = Math.Round(values.avgBenefit / (double)countReviews, 1);
            values.avgAvailability = Math.Round(values.avgAvailability / (double)countReviews, 1);
            values.countReviews = countReviews;

            teacher.Values = values;
        }
        [Authorize(Roles = "User")]
        [HttpPost("AddAll")]
        public JsonResult AddAll(CommonAddModel value)
        {
            try
            {
                if (value.Subjects != null)
                {
                    value.Subjects.ForEach(s => Context.Subjects.Add(s));
                    Context.SaveChanges();
                }

                if (value.Tracks != null)
                {
                    value.Tracks.ForEach(s => Context.Tracks.Add(s));
                    Context.SaveChanges();
                }

                if (value.Prepods != null)
                {
                    value.Prepods.ForEach(s => Context.Prepods.Add(s));
                    Context.SaveChanges();
                }

                if (value.Reviews != null)
                {
                    value.Reviews.ForEach(s => Context.Reviews.Add(s));
                    Context.SaveChanges();
                }
                return new JsonResult("");
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = ex.InnerException?.Message ?? "DB Error" });
            }
        }

    }
}
