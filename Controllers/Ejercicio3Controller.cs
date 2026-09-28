using Microsoft.AspNetCore.Mvc;
using Ejercicios_Arreglos.Models;
using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Ejercicio3Controller : ControllerBase
    {
        private readonly Ejercicio3Model _model;
        public Ejercicio3Controller(Ejercicio3Model model) => _model = model;

        [HttpPost("operar")]
        public ActionResult<Ejercicio3Response> Operar([FromBody] Ejercicio3Request request)
        {
            if (request.MatrizA == null || request.MatrizB == null) return BadRequest();
            return Ok(_model.Operar(request.MatrizA, request.MatrizB));
        }
    }
}
