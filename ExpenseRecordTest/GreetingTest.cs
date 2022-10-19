using Microsoft.AspNetCore.Mvc;
using Moq;
using WebApplication1.Controllers;
using WebApplication1.service;

namespace ToDoListTestProject1
{
    public class ToDoListTest
    {
        [Fact]
        public async Task Test_Exception_Handling_When_Delete()
        {
            //arrange
            var Service = new Mock();
            var controller = new HomeController(Service);

            //act
            var actionResult = await controller.DeleteItemAsync("abc");

            //assert
            Assert.Equal(typeof(NotFoundObjectResult), actionResult.GetType());
            var notFoundResult = actionResult as NotFoundObjectResult;
            Assert.Equal("ToDoItem not found", notFoundResult.Value.ToString());
        }

        [Fact]
        public async Task Test_Happy_Pass_When_Delete()
        {
            //arrange
            var toDoItemService = new Mock2();
            var controller = new HomeController(toDoItemService);

            //act
            var actionResult = await controller.DeleteItemAsync("abc");

            //assert
            Assert.Equal(typeof(NoContentResult), actionResult.GetType());
            var noContentResult = actionResult as NoContentResult;
            Assert.Equal(204, noContentResult.StatusCode);
        }
    }
}