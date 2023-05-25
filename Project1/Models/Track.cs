using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    public class Track : BaseEntity
    {
        public Track()
        {
            Prepods = new HashSet<Prepod>();
        }

        public string? TrackName { get; set; }
        public Guid SubjectId { get; set; }
        [NotMapped]
        public virtual Subject? Subject { get; set; }
        [NotMapped]
        public virtual ICollection<Prepod>? Prepods { get; set; }
    }
}
