using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    [Owned]
    public class Values
    {
        public Int32 countReviews { get; set; }
        public Int32 count1 { get; set; }
        public Int32 count2 { get; set; }
        public Int32 count3 { get; set; }
        public Int32 count4 { get; set; }
        public Int32 count5 { get; set; }
        public double avgRating { get; set; }

        public double avgInterest { get; set; }
        public double avgBenefit { get; set; }
        public double avgAvailability { get; set; }
    }
    public class Prepod : BaseEntity
    {
        public Prepod()
        {
            Reviews = new HashSet<Review>();
        }
        public Guid TrackId { get; set; }

        public string PrepodName { get; set; } = "";

        public Values Values { get; set; }
        [NotMapped]
        public virtual Track? Track { get; set; }
        [NotMapped]
        public virtual ICollection<Review>? Reviews { get; set; }
    }
}
