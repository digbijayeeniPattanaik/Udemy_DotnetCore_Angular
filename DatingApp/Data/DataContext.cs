using DatingApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> dbContext) : base(dbContext)
        {      
        }

        public DbSet<Values> Values { get; set; }

        public DbSet<Users> Users { get; set; }
    }
}
