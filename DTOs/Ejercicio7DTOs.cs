using System;
namespace Ejercicios_Arreglos.DTOs
{
    public class Ejercicio7Request { public double[][] Matriz { get; set; } = Array.Empty<double[]>(); }
    public class Ejercicio7Response {
        public double[] PromediosAlumno { get; set; } = Array.Empty<double>();
        public double[] PromediosMateria { get; set; } = Array.Empty<double>();
        public int Aprobados { get; set; }
        public int Reprobados { get; set; }
        public double CalificacionMasAlta { get; set; }
    }
}
