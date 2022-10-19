using Microsoft.EntityFrameworkCore;
using WebApplication1.Dto;

namespace WebApplication1.service
{
    public class Service:ToDoList_Service
    {
        private readonly App _app;
        public Service(App app)
        {
            _app = app;
        }

        public async Task<string> CreateAsync(ToDoItem toDoItem)
        {
            var id = Guid.NewGuid().ToString();
            var todoGetItem = new ToDoItem
            {
                Id = id,
                Description = toDoItem.Description,
                Amount = toDoItem.Amount,
                Type = toDoItem.Type,
                Date = DateTime.Now

            };
            _app.ToDoItems.Add(todoGetItem);
            await _app.SaveChangesAsync();
            return id;
        }

        public async Task DeleteAsync(string id)
        {
            var todoItem = await GetById(id);
            _app.ToDoItems.Remove(todoItem);
            await _app.SaveChangesAsync();
        }

        public async Task<ToDoItem> GetById(string id)
        {
            var todoItem = await _app.ToDoItems.FindAsync(id);
            
            return todoItem;
        }


        public async Task UpdateAsync(string id, ToDoItem toDoItemUpdate)
        {
            var toDoItemGetDto = new ToDoItem
            {
                Id = toDoItemUpdate.Id,
                Description = toDoItemUpdate.Description,
                Type = toDoItemUpdate.Type,
                Amount = toDoItemUpdate.Amount,
                Date = toDoItemUpdate.Date
            };

            _app.ToDoItems.Update(toDoItemGetDto);
            await _app.SaveChangesAsync();
            
        }
    }
}
