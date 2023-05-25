#pragma warning disable CS8618

namespace UrfuReview.CoreTypes
{
    public class Course : IEquatable<Course>
    {
        public Course(string title, IEnumerable<CourseTrack> tracks)
        {
            Title = title;
            Tracks = tracks;
        }

        public Course()
        {
            Title = "Empty Track";
            Tracks = new List<CourseTrack>();
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public IEnumerable<CourseTrack> Tracks { get; set; }

        public bool Equals(Course? other)
        {
            if (other == null) return false;

            if (ReferenceEquals(this, other)) return true;

            return ID == other.ID
                && Title == other.Title;
        }
    }
}
