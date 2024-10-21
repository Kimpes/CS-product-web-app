using Microsoft.EntityFrameworkCore;
using CS_Product_Web_App.Server.Models;

namespace CS_Product_Web_App.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
