using Microsoft.EntityFrameworkCore;

using Project1.Models;
using System;

namespace Project1.Data
{

    public class ApiDbContext : DbContext
    {
        public virtual DbSet<Prepod> Prepods { get; set; }
        public virtual DbSet<Track> Tracks { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<Review> Reviews { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Один предмет - много треков
            modelBuilder.Entity<Subject>(entity =>
            {
                entity.HasMany(s => s.Tracks)
                      .WithOne(s => s.Subject);
            });
            //Один трек - много преподов
            modelBuilder.Entity<Track>(entity =>
            {
                entity.HasMany(t => t.Prepods)
                      .WithOne(t => t.Track);
            });
            //Один препод - много отзывов
            modelBuilder.Entity<Prepod>(entity =>
            {
                entity.HasMany(p => p.Reviews)
                      .WithOne(p => p.Prepod);
            });
            modelBuilder.Entity<Prepod>();
        }
        
    }
}