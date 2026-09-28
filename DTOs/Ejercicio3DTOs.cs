using System;

namespace Ejercicios_Arreglos.DTOs
{
    public class Ejercicio3Request
    {
        public double[][] MatrizA { get; set; } = Array.Empty<double[]>();
        public double[][] MatrizB { get; set; } = Array.Empty<double[]>();
    }

    public class Ejercicio3Response
    {
        public double[][] Suma { get; set; } = Array.Empty<double[]>();
        public double[][] Resta { get; set; } = Array.Empty<double[]>();
        public double[][] ProductoElemento { get; set; } = Array.Empty<double[]>();
        public double[][] Division { get; set; } = Array.Empty<double[]>();
    }
}
