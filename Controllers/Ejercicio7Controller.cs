using Microsoft.AspNetCore.Mvc;
using Ejercicios_Arreglos.Models;
using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Ejercicio7Controller : ControllerBase
    {
        private readonly Ejercicio7Model _model;
        public Ejercicio7Controller(Ejercicio7Model model) => _model = model;

        [HttpPost("analizar")]
        public ActionResult<Ejercicio7Response> Analizar([FromBody] Ejercicio7Request request) => Ok(_model.Analizar(request.Matriz));
    }
}
