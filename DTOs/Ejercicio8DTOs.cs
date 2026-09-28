using System;
namespace Ejercicios_Arreglos.DTOs
{
    public class Ejercicio8Request { public double[][] Matriz { get; set; } = Array.Empty<double[]>(); }
    public class Ejercicio8Response {
        public double[] DiagonalPrincipal { get; set; } = Array.Empty<double>();
        public double[] DiagonalSecundaria { get; set; } = Array.Empty<double>();
        public double Traza { get; set; }
        public bool EsSimetrica { get; set; }
    }
}
