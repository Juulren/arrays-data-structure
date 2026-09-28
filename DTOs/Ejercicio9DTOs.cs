using System;
namespace Ejercicios_Arreglos.DTOs
{
    public class Ejercicio9Request { public int[][] Matriz { get; set; } = Array.Empty<int[]>(); }
    public class Ejercicio9Response {
        public int[][] MatrizRotada { get; set; } = Array.Empty<int[]>();
    }
}
