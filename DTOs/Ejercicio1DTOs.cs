using System;

namespace Ejercicios_Arreglos.DTOs
{
    /// <summary>
    /// DTO para recibir la matriz de JavaScript
    /// </summary>
    public class Ejercicio1Request
    {
        public int[][] Matriz { get; set; } = Array.Empty<int[]>();
    }

    /// <summary>
    /// DTO para devolver los resultados calculados a JavaScript
    /// </summary>
    public class Ejercicio1Response
    {
        public int[] CerosPorFila { get; set; } = Array.Empty<int>();
        public int TotalCeros { get; set; }
    }
}
