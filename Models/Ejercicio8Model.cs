using Ejercicios_Arreglos.DTOs;
using System;

namespace Ejercicios_Arreglos.Models
{
    public class Ejercicio8Model
    {
        public Ejercicio8Response Analizar(double[][] matriz)
        {
            if (matriz == null || matriz.Length == 0) return new Ejercicio8Response();
            int n = matriz.Length;
            var res = new Ejercicio8Response
            {
                DiagonalPrincipal = new double[n],
                DiagonalSecundaria = new double[n]
            };
            
            bool simetrica = true;
            for (int r = 0; r < n; r++)
            {
                res.DiagonalPrincipal[r] = matriz[r][r];
                res.DiagonalSecundaria[r] = matriz[r][n - 1 - r];
                res.Traza += matriz[r][r];
                for (int c = 0; c < n; c++)
                {
                    if (matriz[r][c] != matriz[c][r]) simetrica = false;
                }
            }
            res.EsSimetrica = simetrica;
            return res;
        }
    }
}
