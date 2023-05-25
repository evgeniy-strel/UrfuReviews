using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Project1;
using Project1.Auth;
using Project1.Data;

using static System.Net.Mime.MediaTypeNames;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEntityFrameworkNpgsql().AddDbContext<ApiDbContext>(opt =>
        opt.UseNpgsql(builder.Configuration.GetConnectionString("postgresConn")));

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; //TODO: поменять для прода
    //options.Authority = "Beaver";
    options.TokenValidationParameters = AuthValidation.GetValidationParameters();
});
builder.Services.AddControllersWithViews();

// Add services to the container.

var myAllowedSpecificOrigins = "_urfuReviewsSpecificOrigins";
//builder.Services.AddDbContext<ApiDbContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(myAllowedSpecificOrigins, policy =>
    {
        policy.WithOrigins("https://localhost:7044", "https://localhost:44414", "https://localhost:5044").AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseCors(myAllowedSpecificOrigins);
app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();



app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapDefaultControllerRoute();
app.MapFallbackToFile("index.html");


app.UseEndpoints(endpoints => { 
    endpoints.MapControllers();
});

app.Run();
