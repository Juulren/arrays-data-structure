using Microsoft.AspNetCore.Mvc;
using Ejercicios_Arreglos.Models;
using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Ejercicio9Controller : ControllerBase
    {
        private readonly Ejercicio9Model _model;
        public Ejercicio9Controller(Ejercicio9Model model) => _model = model;

        [HttpPost("rotar")]
        public ActionResult<Ejercicio9Response> Rotar([FromBody] Ejercicio9Request request) => Ok(_model.Rotar90Grados(request.Matriz));
    }
}
