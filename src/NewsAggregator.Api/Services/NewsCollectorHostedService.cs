using NewsAggregator.Api.Data;
using NewsAggregator.Api.Models;

namespace NewsAggregator.Api.Services;

public class NewsCollectorHostedService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<NewsCollectorHostedService> _logger;
    private readonly ScraperService _scraperService;

    public NewsCollectorHostedService(
        IServiceScopeFactory scopeFactory,
        ILogger<NewsCollectorHostedService> logger,
        ScraperService scraperService)
    {
        _scopeFactory = scopeFactory;
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

            await RunScrapeAsync(stoppingToken);
        }
    }

    public async Task RunScrapeAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Starting scheduled scrape");
        var count = await _scraperService.ScrapeAllPlatformsAsync(stoppingToken);
        _logger.LogInformation("Scrape completed. Total items: {Count}", count);
    }
}