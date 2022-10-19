using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Dto
{
    public class ToDoItem
    {
        [Column("task_id")]
        public string? Id { get; set; }
        [Column("task_desc")]
        public string Description { get; set; }
        [Column("type")]
        public string Type { get; set; }
        [Column("amount")]
        public int Amount { get; set; }
        [Column("create_date")]
        public DateTime Date { get; set; }

    }
}
