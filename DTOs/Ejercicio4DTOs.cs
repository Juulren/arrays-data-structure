using System;

namespace Ejercicios_Arreglos.DTOs
{
    public class Ejercicio4Request
    {
        public int[][] Matriz { get; set; } = Array.Empty<int[]>();
    }

    public class Ejercicio4Response
    {
        public bool DiagonalPrincipalCorrecta { get; set; }
        public bool RestoCorrecto { get; set; }
    }
}
