using Microsoft.AspNetCore.Mvc;
using Ejercicios_Arreglos.Models;
using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Ejercicio2Controller : ControllerBase
    {
        private readonly Ejercicio2Model _model;
        public Ejercicio2Controller(Ejercicio2Model model) => _model = model;

        [HttpPost("analizar")]
        public ActionResult<Ejercicio2Response> Analizar([FromBody] Ejercicio2Request request)
        {
            return Ok(_model.AnalizarMagico(request.Matriz));
        }
    }
}
