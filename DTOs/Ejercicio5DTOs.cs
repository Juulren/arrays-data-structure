using System;

namespace Ejercicios_Arreglos.DTOs
{
    public class Ejercicio5Response
    {
        public int[][] Matriz { get; set; } = Array.Empty<int[]>();
        public int[] SumasFilasA { get; set; } = Array.Empty<int>();
        public double[] PromediosFilasB { get; set; } = Array.Empty<double>();
        public int[] SumasColumnasC { get; set; } = Array.Empty<int>();
        public double[] PromediosColumnasD { get; set; } = Array.Empty<double>();
    }
}
