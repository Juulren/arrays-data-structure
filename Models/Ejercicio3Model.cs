using Ejercicios_Arreglos.DTOs;

namespace Ejercicios_Arreglos.Models
{
    public class Ejercicio3Model
    {
        public Ejercicio3Response Operar(double[][] A, double[][] B)
        {
            int n = 2; // Matriz 2x2
            var res = new Ejercicio3Response
            {
                Suma = new double[n][],
                Resta = new double[n][],
                ProductoElemento = new double[n][],
                Division = new double[n][]
            };

            for (int i = 0; i < n; i++)
            {
                res.Suma[i] = new double[n];
                res.Resta[i] = new double[n];
                res.ProductoElemento[i] = new double[n];
                res.Division[i] = new double[n];

                for (int j = 0; j < n; j++)
                {
                    res.Suma[i][j] = A[i][j] + B[i][j];
                    res.Resta[i][j] = A[i][j] - B[i][j];
                    res.ProductoElemento[i][j] = A[i][j] * B[i][j];
                    res.Division[i][j] = B[i][j] == 0 ? double.NaN : A[i][j] / B[i][j];
                }
            }
            return res;
        }
    }
}
