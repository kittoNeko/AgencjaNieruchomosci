using Microsoft.EntityFrameworkCore;

namespace AgencjaNieruchomosci.Models
{
    public class ContextOgloszenia : DbContext
    {
        public ContextOgloszenia(DbContextOptions<ContextOgloszenia> options)
        : base(options)
        {
        }

        public DbSet<Ogloszenie> Ogloszenia { get; set; } = null!;
    }
}
