using Microsoft.AspNetCore.Mvc;
using Ejercicios_Arreglos.Models;
using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Ejercicio5Controller : ControllerBase
    {
        private readonly Ejercicio5Model _model;
        public Ejercicio5Controller(Ejercicio5Model model) => _model = model;

        [HttpGet("generar")]
        public ActionResult<Ejercicio5Response> Generar()
        {
            return Ok(_model.GenerarAleatoria());
        }
    }
}
