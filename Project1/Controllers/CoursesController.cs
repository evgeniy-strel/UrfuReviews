using Microsoft.AspNetCore.Mvc;
using UrfuReview.CoreTypes;
using UrfuReview.Infrastucture.Globals;
using static System.MathF;

namespace UrfuReview.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CoursesController : ControllerBase
    {
        [HttpGet("all")]
        public IEnumerable<Course> GetAllCourses()
        {
            return HardcodeCoursesContainer.Courses;
        }

        [HttpGet("random/{count}")]
        public IEnumerable<Course> FetchRandomCourses(int count)
        {
            if (count > HardcodeCoursesContainer.Courses.Count)
                count = HardcodeCoursesContainer.Courses.Count;
            return HardcodeCoursesContainer.Courses.FetchRandom(count);
        }

        private class HardcodeCoursesContainer
        {
            static HardcodeCoursesContainer()
            {
                Courses = new[]
                {
                    new Course("Математические методы для разработчиков", new [] {new CourseTrack(0, "Методы оптимизации", 1f)}),
                    new Course("Профессиональный спецкурс 1", new [] {new CourseTrack(0, "Проектирование на языке C# СКБ-Контур", 5f)}),
                    new Course("Профессиональный спецкурс 2", new [] {new CourseTrack(0, "Многопоточное программирование на C/C++", 2.3f)}),
                    new Course("Гуманитарные и экономические аспекты ИТ", new [] {new CourseTrack(0, "Электронная коммерция", 1f)}),
                    new Course("Операционные системы", new [] {new CourseTrack(0, "Операционные Системы, УрФУ", 4f)}),
                    new Course("Базовая архитектура ПО", new [] {new CourseTrack(0, "Базовая архитектура ПО", 3f)}),
                    new Course("Правовые основы ИТ", new [] {new CourseTrack(0, "Правовые основы ИТ", 1f)}),
                };
            }

            public static readonly IList<Course> Courses = new List<Course>();
        }
    }
}
