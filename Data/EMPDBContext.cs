using EmployeeCRUDAPI.Model;
using Microsoft.EntityFrameworkCore;
using System;

namespace EmployeeCRUDAPI.Data
{
    public class EMPDBContext : DbContext
    {
        public EMPDBContext(DbContextOptions<EMPDBContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
