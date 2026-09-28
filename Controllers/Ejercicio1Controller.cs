using Microsoft.AspNetCore.Mvc;
using Ejercicios_Arreglos.Models;
using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Ejercicio1Controller : ControllerBase
    {
        private readonly Ejercicio1Model _model;

        // Inyeccion de Dependencias (D de SOLID)
        public Ejercicio1Controller(Ejercicio1Model model)
        {
            _model = model;
        }

        [HttpPost("analizar")]
        public ActionResult<Ejercicio1Response> AnalizarMatriz([FromBody] Ejercicio1Request request)
        {
            if (request.Matriz == null || request.Matriz.Length == 0)
                return BadRequest("La matriz no puede estar vacia.");

            var cerosPorFila = new int[request.Matriz.Length];
            for (int i = 0; i < request.Matriz.Length; i++)
            {
                cerosPorFila[i] = _model.ContarCerosEnFila(request.Matriz[i]);
            }

            var response = new Ejercicio1Response
            {
                CerosPorFila = cerosPorFila,
                TotalCeros = _model.ContarTotalCeros(request.Matriz)
            };

            return Ok(response);
        }
    }
}
