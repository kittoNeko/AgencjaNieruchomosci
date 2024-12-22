using AgencjaNieruchomosci.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<ContextOgloszenia>(options =>
    options.UseSqlite("Data Source=ogloszenia.db"));

builder.Services.AddControllers();

// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.

// Enable middleware to serve generated Swagger as a JSON endpoint.
app.UseSwagger();

// Enable middleware to serve Swagger UI (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
    c.RoutePrefix = "swagger"; // This makes Swagger UI available at the root URL (e.g., http://localhost:5000/)
});

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
