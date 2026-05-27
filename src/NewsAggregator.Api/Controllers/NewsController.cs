using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsAggregator.Api.Data;
using NewsAggregator.Api.Models;
using NewsAggregator.Api.Services;

namespace NewsAggregator.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsController : ControllerBase
{
    private readonly AppDbContext _db;

    public NewsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search(
        string? keyword,
        string? platform,
        DateOnly? dateFrom,
        DateOnly? dateTo,
        int page = 1,
        int pageSize = 20)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);
        var query = _db.NewsItems.AsQueryable();

        if (!string.IsNullOrWhiteSpace(keyword))
            query = query.Where(n => n.Title.ToLower().Contains(keyword.ToLower()));

        if (!string.IsNullOrWhiteSpace(platform))
            query = query.Where(n => n.Platform == platform);

        if (dateFrom.HasValue)
            query = query.Where(n => n.PublishDate >= dateFrom.Value);

        if (dateTo.HasValue)
            query = query.Where(n => n.PublishDate <= dateTo.Value);

        var total = await query.CountAsync();
        var data = await query
            .OrderByDescending(n => n.PublishDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(n => new { n.Id, n.Title, n.Url, n.Platform, n.PublishDate })
            .ToListAsync();

        return Ok(new { data, total, page, pageSize });
    }

    [HttpGet]
    public async Task<IActionResult> GetLatest(int page = 1, int pageSize = 20)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);
        var total = await _db.NewsItems.CountAsync();
        var data = await _db.NewsItems
            .OrderByDescending(n => n.PublishDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(n => new { n.Id, n.Title, n.Url, n.Platform, n.PublishDate })
            .ToListAsync();

        return Ok(new { data, total, page, pageSize });
    }

    [HttpPost("trigger-scrape")]
    public async Task<IActionResult> TriggerScrape(
        [FromServices] NewsCollectorHostedService service,
        CancellationToken cancellationToken)
    {
        await service.RunScrapeAsync(cancellationToken);
        return Ok("Scrape triggered");
    }
}