using Microsoft.AspNetCore.Mvc;
using Ejercicios_Arreglos.Models;
using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Ejercicio8Controller : ControllerBase
    {
        private readonly Ejercicio8Model _model;
        public Ejercicio8Controller(Ejercicio8Model model) => _model = model;

        [HttpPost("analizar")]
        public ActionResult<Ejercicio8Response> Analizar([FromBody] Ejercicio8Request request) => Ok(_model.Analizar(request.Matriz));
    }
}
