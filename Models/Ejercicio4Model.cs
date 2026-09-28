using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Models
{
    public class Ejercicio4Model
    {
        public Ejercicio4Response AnalizarIdentidad(int[][] matriz)
        {
            if (matriz == null || matriz.Length == 0 || matriz.Length != matriz[0].Length)
                return new Ejercicio4Response();

            bool mainOk = true;
            bool restOk = true;
            int n = matriz.Length;

            for (int r = 0; r < n; r++)
            {
                for (int c = 0; c < n; c++)
                {
                    if (r == c && matriz[r][c] != 1) mainOk = false;
                    if (r != c && matriz[r][c] != 0) restOk = false;
                }
            }

            return new Ejercicio4Response
            {
                DiagonalPrincipalCorrecta = mainOk,
                RestoCorrecto = restOk
            };
        }
    }
}
