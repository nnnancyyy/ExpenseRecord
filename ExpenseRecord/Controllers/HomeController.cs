using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Dto;
using WebApplication1.service;

namespace WebApplication1.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ToDoList_Service _toDoItemService;

        public HomeController(ToDoList_Service toDoItemService)
        {
            _toDoItemService = toDoItemService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateItemAsync(ToDoItem toDoItem)
        {

            try
            {
                var id = await _toDoItemService.CreateAsync(toDoItem);
                return Ok();


            }
            catch (ToDoException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("{Id}")]
        public async Task<IActionResult> GetItemByIdAsync([FromRoute] string id)
        {
            try
            {
                var todoItem = await _toDoItemService.GetById(id);
                return new ObjectResult(todoItem);
            }

            catch (ToDoException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut]
        [Route("{Id}")]
        public async Task<IActionResult> UpdateItemByIdAsync([FromRoute] string id, [FromBody]ToDoItem toDoItem)
        {
            try
            {
                await _toDoItemService.UpdateAsync(id, toDoItem);
                return Ok();
            }

            catch (ToDoException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete]
        [Route("{Id}")]
        public async Task<IActionResult> DeleteItemAsync([FromRoute] string id)
        {
            try
            {
                await _toDoItemService.DeleteAsync(id);
                return NoContent();
            }

            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
