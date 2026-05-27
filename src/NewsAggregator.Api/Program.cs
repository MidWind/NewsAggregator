using Microsoft.EntityFrameworkCore;
using NewsAggregator.Api.Data;
using NewsAggregator.Api.Services;

var builder = WebApplication.CreateBuilder(args);

var dbPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "NewsAggregator", "data", "news.db");
var dbDir = Path.GetDirectoryName(dbPath)!;
if (!Directory.Exists(dbDir)) Directory.CreateDirectory(dbDir);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

builder.Services.AddSingleton<ScraperService>();
builder.Services.AddHostedService<NewsCollectorHostedService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.MapGet("/", () => "NewsAggregator API");
app.MapControllers();
app.Run();