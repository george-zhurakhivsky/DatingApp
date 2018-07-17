using System;

namespace DatingApp.API.Dtos
{
    public class MessageForCreationDto
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public DateTime SentTime { get; set; }
        public string Content { get; set; }

        public MessageForCreationDto()
        {
            SentTime = DateTime.Now;
        }
    }
}