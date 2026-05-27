var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();
app.MapGet("/", () => "NewsAggregator API");
app.Run();