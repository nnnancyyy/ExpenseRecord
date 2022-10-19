using Microsoft.EntityFrameworkCore;
using WebApplication1.Dto;

namespace WebApplication1.Dto
{
    public class App:DbContext
    {
        public App(DbContextOptions<App> options):
            base(options)
        {

        }
        public DbSet<ToDoItem> ToDoItems { get; set; }
    }
}
