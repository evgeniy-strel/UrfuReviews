#pragma warning disable CS8618 

using static System.MathF;

namespace UrfuReview.CoreTypes
{
    public class CourseTrack : IEquatable<CourseTrack>
    {
        public CourseTrack(int iD, string title, float rating) 
        {
            ID = iD;
            Title = title;
            _rating = rating;
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public string Rating => Round(_rating, 2).ToString();

        private float _rating;

        public bool Equals(CourseTrack? other)
        {
            if (other == null) return false; 

            if (ReferenceEquals(this, other)) return true;

            return ID == other.ID 
                && Title == other.Title
                && _rating == other._rating;
        }
    }
}
