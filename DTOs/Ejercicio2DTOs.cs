using System;

namespace Ejercicios_Arreglos.DTOs
{
    public class Ejercicio2Request
    {
        public int[][] Matriz { get; set; } = Array.Empty<int[]>();
    }

    public class Ejercicio2Response
    {
        public bool EsMagico { get; set; }
        public int SumaObjetivo { get; set; }
        public int[] SumasFilas { get; set; } = Array.Empty<int>();
        public int[] SumasColumnas { get; set; } = Array.Empty<int>();
        public int SumaDiagonalPrincipal { get; set; }
        public int SumaDiagonalSecundaria { get; set; }
    }
}
