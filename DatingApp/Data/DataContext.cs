using DatingApp.Model;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> dbContext) : base(dbContext)
        {      
        }

        public DbSet<Values> Values { get; set; }

        public DbSet<Users> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Like>().HasKey(k => new { k.LikeeId, k.LikerId });

            modelBuilder.Entity<Like>().HasOne(u => u.Likee).WithMany(u => u.Likers).HasForeignKey(f => f.LikeeId).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Like>().HasOne(u => u.Liker).WithMany(u => u.Likees).HasForeignKey(f => f.LikerId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
