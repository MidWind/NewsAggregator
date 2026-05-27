using Aneiang.Pa;
using Aneiang.Pa.Extensions;
using Aneiang.Pa.News.Models;
using Aneiang.Pa.News.News;
using Microsoft.Extensions.DependencyInjection;
using NewsAggregator.Api.Data;
using NewsAggregator.Api.Models;

namespace NewsAggregator.Api.Services;

public class ScraperService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public ScraperService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public async Task<int> ScrapeAllPlatformsAsync(CancellationToken cancellationToken = default)
    {
        var services = new ServiceCollection();
        services.AddPaScraper();
        var provider = services.BuildServiceProvider();
        var factory = provider.GetRequiredService<INewsScraperFactory>();
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var count = 0;

        foreach (var platform in ScraperPlatform.All)
        {
            if (cancellationToken.IsCancellationRequested) break;
            try
            {
                var scraper = factory.GetScraper(Enum.Parse<ScraperSource>(platform));
                var result = await scraper.GetNewsAsync();

                using var scope = _scopeFactory.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                foreach (var item in result.Data)
                {
                    var newsItem = new NewsItem
                    {
                        Title = item.Title,
                        Url = item.Url,
                        Platform = platform,
                        PublishDate = today,
                        CreatedAt = DateTime.UtcNow
                    };
                    try
                    {
                        db.NewsItems.Add(newsItem);
                        await db.SaveChangesAsync(cancellationToken);
                        count++;
                    }
                    catch (Exception)
                    {
                        // Duplicate - unique index catches it, ignore
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to scrape {platform}: {ex.Message}");
            }
        }
        return count;
    }
}