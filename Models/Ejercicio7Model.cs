using Ejercicios_Arreglos.DTOs;
using System;

namespace Ejercicios_Arreglos.Models
{
    public class Ejercicio7Model
    {
        public Ejercicio7Response Analizar(double[][] matriz)
        {
            if (matriz == null || matriz.Length == 0) return new Ejercicio7Response();
            int rows = matriz.Length;
            int cols = matriz[0].Length;
            var res = new Ejercicio7Response
            {
                PromediosAlumno = new double[rows],
                PromediosMateria = new double[cols],
                CalificacionMasAlta = -1
            };
            for (int r = 0; r < rows; r++)
            {
                double s = 0;
                for (int c = 0; c < cols; c++)
                {
                    s += matriz[r][c];
                    if (matriz[r][c] > res.CalificacionMasAlta) res.CalificacionMasAlta = matriz[r][c];
                }
                res.PromediosAlumno[r] = s / cols;
                if (res.PromediosAlumno[r] >= 6.0) res.Aprobados++;
                else res.Reprobados++;
            }
            for (int c = 0; c < cols; c++)
            {
                double s = 0;
                for (int r = 0; r < rows; r++) s += matriz[r][c];
                res.PromediosMateria[c] = s / rows;
            }
            return res;
        }
    }
}
