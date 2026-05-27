namespace NewsAggregator.Api.Models;

public class NewsItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Platform { get; set; } = string.Empty;
    public DateOnly PublishDate { get; set; }
    public DateTime CreatedAt { get; set; }
}