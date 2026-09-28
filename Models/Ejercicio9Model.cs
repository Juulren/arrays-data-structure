using Ejercicios_Arreglos.DTOs;
using System;

namespace Ejercicios_Arreglos.Models
{
    public class Ejercicio9Model
    {
        public Ejercicio9Response Rotar90Grados(int[][] matriz)
        {
            if (matriz == null || matriz.Length == 0) return new Ejercicio9Response();
            int rows = matriz.Length;
            int cols = matriz[0].Length;
            int[][] rotada = new int[cols][];
            for (int c = 0; c < cols; c++)
            {
                rotada[c] = new int[rows];
                for (int r = 0; r < rows; r++)
                {
                    rotada[c][r] = matriz[rows - 1 - r][c];
                }
            }
            return new Ejercicio9Response { MatrizRotada = rotada };
        }
    }
}
