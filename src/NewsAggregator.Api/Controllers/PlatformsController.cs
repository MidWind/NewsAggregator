using Microsoft.AspNetCore.Mvc;
using NewsAggregator.Api.Models;

namespace NewsAggregator.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlatformsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetPlatforms()
    {
        return Ok(ScraperPlatform.All.Select(p => new { id = p, name = p }));
    }
}