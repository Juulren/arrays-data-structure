using System;
using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Models
{
    public class Ejercicio5Model
    {
        public Ejercicio5Response GenerarAleatoria()
        {
            var rand = new Random();
            int rows = 5;
            int cols = 10;
            int[][] matriz = new int[rows][];
            int[] sumasFilas = new int[rows];
            double[] promsFilas = new double[rows];
            int[] sumasCols = new int[cols];
            double[] promsCols = new double[cols];

            for (int r = 0; r < rows; r++)
            {
                matriz[r] = new int[cols];
                for (int c = 0; c < cols; c++)
                {
                    matriz[r][c] = rand.Next(1, 101);
                    sumasFilas[r] += matriz[r][c];
                    sumasCols[c] += matriz[r][c];
                }
                promsFilas[r] = (double)sumasFilas[r] / cols;
            }

            for (int c = 0; c < cols; c++)
            {
                promsCols[c] = (double)sumasCols[c] / rows;
            }

            return new Ejercicio5Response
            {
                Matriz = matriz,
                SumasFilasA = sumasFilas,
                PromediosFilasB = promsFilas,
                SumasColumnasC = sumasCols,
                PromediosColumnasD = promsCols
            };
        }
    }
}
