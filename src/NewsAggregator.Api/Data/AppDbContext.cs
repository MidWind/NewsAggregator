using Microsoft.EntityFrameworkCore;
using NewsAggregator.Api.Models;

namespace NewsAggregator.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<NewsItem> NewsItems { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<NewsItem>(entity =>
        {
            entity.ToTable("NewsItems");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).HasMaxLength(500).IsRequired();
            entity.Property(e => e.Url).HasMaxLength(1000).IsRequired();
            entity.Property(e => e.Platform).HasMaxLength(50).IsRequired();
            entity.Property(e => e.PublishDate).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired();

            entity.HasIndex(e => new { e.Title, e.Platform, e.PublishDate }).IsUnique();
        });
    }
}