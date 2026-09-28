using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Ejercicios_Arreglos
{
    /// <summary>
    /// Punto de entrada de la API Web.
    /// Reemplaza la antigua aplicacion de consola para actuar como el Backend real.
    /// </summary>
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Agregar soporte para Controladores API (C de MVC)
            builder.Services.AddControllers();
            
            // Registrar Modelos para Inyeccion de Dependencias (SOLID)
            builder.Services.AddScoped<Ejercicios_Arreglos.Models.Ejercicio1Model>();
            builder.Services.AddScoped<Ejercicios_Arreglos.Models.Ejercicio2Model>();
            builder.Services.AddScoped<Ejercicios_Arreglos.Models.Ejercicio3Model>();
            builder.Services.AddScoped<Ejercicios_Arreglos.Models.Ejercicio4Model>();
            builder.Services.AddScoped<Ejercicios_Arreglos.Models.Ejercicio5Model>();
            builder.Services.AddScoped<Ejercicios_Arreglos.Models.Ejercicio7Model>();
            builder.Services.AddScoped<Ejercicios_Arreglos.Models.Ejercicio8Model>();
            builder.Services.AddScoped<Ejercicios_Arreglos.Models.Ejercicio9Model>();
            
            // Configurar CORS para permitir que app.js pueda consultar los endpoints
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            // Agregar Swagger para documentacion automatica de la API
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configurar el pipeline HTTP
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseCors("AllowAll");

            app.UseAuthorization();
            app.MapControllers();

            // Ejecutar el servidor en el puerto 5000
            app.Run("http://localhost:5000");
        }
    }
}
