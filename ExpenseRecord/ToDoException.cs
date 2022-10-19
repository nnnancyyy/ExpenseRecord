namespace WebApplication1
{
    public class ToDoException : Exception
    {
        public ToDoException() : base() { }
        public ToDoException(string message) : base(message) { }
    }
}
