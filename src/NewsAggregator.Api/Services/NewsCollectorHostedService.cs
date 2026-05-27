using NewsAggregator.Api.Data;
using NewsAggregator.Api.Models;

namespace NewsAggregator.Api.Services;

public class NewsCollectorHostedService : BackgroundService
{
    private readonly ILogger<NewsCollectorHostedService> _logger;
    private readonly ScraperService _scraperService;

    public NewsCollectorHostedService(
        ILogger<NewsCollectorHostedService> logger,
        ScraperService scraperService)
    {
        _logger = logger;
        _scraperService = scraperService;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("NewsCollectorHostedService starting");

        while (!stoppingToken.IsCancellationRequested)
        {
            var now = DateTime.UtcNow;
            var nextRun = new DateTime(now.Year, now.Month, now.Day, now.Hour, 0, 0, DateTimeKind.Utc)
                .AddHours(1);
            var delay = nextRun - now;

            _logger.LogInformation("Next scrape at {NextRun}", nextRun);
            await Task.Delay(delay, stoppingToken);

            try
        {
            await RunScrapeAsync(stoppingToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during scheduled scrape");
        }
        }
    }

    public async Task RunScrapeAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Starting scheduled scrape");
        var count = await _scraperService.ScrapeAllPlatformsAsync(stoppingToken);
        _logger.LogInformation("Scrape completed. Total items: {Count}", count);
    }
}