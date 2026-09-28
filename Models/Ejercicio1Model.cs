namespace Ejercicios_Arreglos.Models
{
    /// <summary>
    /// Logica matematica para el Ejercicio 1 (Puro POO, SRP).
    /// </summary>
    public class Ejercicio1Model
    {
        public int ContarCerosEnFila(int[] fila)
        {
            int contador = 0;
            foreach (var val in fila)
            {
                if (val == 0) contador++;
            }
            return contador;
        }

        public int ContarTotalCeros(int[][] matriz)
        {
            int total = 0;
            foreach (var fila in matriz)
            {
                total += ContarCerosEnFila(fila);
            }
            return total;
        }
    }
}
