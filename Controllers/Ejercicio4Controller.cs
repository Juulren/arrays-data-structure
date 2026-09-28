using Microsoft.AspNetCore.Mvc;
using Ejercicios_Arreglos.Models;
using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Ejercicio4Controller : ControllerBase
    {
        private readonly Ejercicio4Model _model;
        public Ejercicio4Controller(Ejercicio4Model model) => _model = model;

        [HttpPost("analizar")]
        public ActionResult<Ejercicio4Response> Analizar([FromBody] Ejercicio4Request request)
        {
            if (request.Matriz == null) return BadRequest();
            return Ok(_model.AnalizarIdentidad(request.Matriz));
        }
    }
}
