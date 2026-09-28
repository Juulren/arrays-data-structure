using System.Linq;
using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Models
{
    public class Ejercicio2Model
    {
        public Ejercicio2Response AnalizarMagico(int[][] matriz)
        {
            if (matriz == null || matriz.Length == 0 || matriz[0].Length != matriz.Length)
                return new Ejercicio2Response { EsMagico = false };

            int n = matriz.Length;
            var response = new Ejercicio2Response
            {
                SumasFilas = new int[n],
                SumasColumnas = new int[n]
            };

            for (int i = 0; i < n; i++)
            {
                response.SumasFilas[i] = matriz[i].Sum();
                response.SumaDiagonalPrincipal += matriz[i][i];
                response.SumaDiagonalSecundaria += matriz[i][n - 1 - i];
                for (int j = 0; j < n; j++)
                {
                    response.SumasColumnas[i] += matriz[j][i];
                }
            }

            int target = response.SumaDiagonalPrincipal;
            response.SumaObjetivo = target;

            bool esMagico = response.SumaDiagonalSecundaria == target &&
                            response.SumasFilas.All(s => s == target) &&
                            response.SumasColumnas.All(s => s == target);

            response.EsMagico = esMagico;
            return response;
        }
    }
}
