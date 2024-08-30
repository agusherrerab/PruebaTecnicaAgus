using CustomersApi.CasosDeUso;
using CustomersApi.Controllers;
using CustomersApi.Repositories;
using Microsoft.EntityFrameworkCore;
using IUpdateCustomerUseCase = CustomersApi.CasosDeUso.IUpdateCustomerUseCase;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRouting(routing => routing.LowercaseUrls = true);

builder.Services.AddDbContext<CustomerDatabaseContext>(mysqlBuilder =>
{
    mysqlBuilder.UseMySQL(builder.Configuration.GetConnectionString("Connection1"));
});

builder.Services.AddScoped<IUpdateCustomerUseCase, UpdateCustomerUseCase>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();