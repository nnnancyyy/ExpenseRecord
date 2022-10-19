using WebApplication1.Dto;

namespace WebApplication1.service
{
    public interface ToDoList_Service
    {
        Task<string> CreateAsync(ToDoItem toDoItem);
        Task UpdateAsync(string id, ToDoItem toDoItemUpdate);
        Task DeleteAsync(string id);
        Task<ToDoItem> GetById(string id);
    }

}
