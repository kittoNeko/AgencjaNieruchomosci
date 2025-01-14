using Microsoft.EntityFrameworkCore;

namespace AgencjaNieruchomosci.Models
{
    public class ContextKonto : DbContext
    {
        public ContextKonto(DbContextOptions<ContextKonto> options)
            : base(options)
        {
        }

        public DbSet<Konto> Konta { get; set; } = null!;
        public DbSet<Rola> Role { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Konto>()
                .HasOne(k => k.Rola)
                .WithMany()
                .HasForeignKey("RolaID")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Rola>()
                .Property(r => r.Pozwolenia)
                .HasConversion(
                    v => string.Join(",", v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
