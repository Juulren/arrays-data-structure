# Laboratorio Interactivo de Arreglos y Matrices

Este proyecto es un laboratorio interactivo basado en la web para explorar y resolver ejercicios sobre arreglos y matrices. Está diseñado siguiendo los principios de **MVC** (Modelo-Vista-Controlador), **SOLID** y **POO** (Programación Orientada a Objetos) en C# para el backend, con una interfaz web dinámica.

## Ejercicios Incluidos

El proyecto consta de 9 ejercicios divididos en distintas categorías y niveles de dificultad:

### Básico
1. **Ceros por renglón**: Cuenta los ceros de cada fila y encuentra el total en toda la matriz.
4. **Matriz identidad**: Construye una matriz cuadrada de tamaño $n \times n$ donde la diagonal principal está llena de unos y el resto de ceros.

### Intermedio
2. **Cuadrado mágico**: Verifica si una matriz es un "cuadrado mágico", es decir, si todas sus filas, columnas y diagonales principales suman exactamente la misma cantidad.
3. **Operaciones entre matrices (2x2)**: Permite comparar y calcular operaciones básicas elemento por elemento entre dos matrices: suma, resta, multiplicación y división.
5. **Matriz aleatoria 5×10**: Genera una matriz con valores aleatorios y calcula los totales (suma) y promedios por cada fila y por cada columna.
6. **Resumen de ventas**: Analiza un registro de ventas mensuales para calcular el total anual, identificar la semana con mayor y menor venta, y analizar el comportamiento por semana y mes.
7. **Calificaciones**: Procesa un registro de notas de estudiantes para calcular sus promedios, identificar la calificación más alta y más baja del grupo, y generar un reporte estadístico por rangos.

### Avanzado (Retos)
8. **Diagnóstico de diagonales**: Explora propiedades avanzadas de una matriz cuadrada. Calcula la traza (suma de la diagonal principal), el determinante, verifica si es simétrica y obtiene la suma de las regiones triangulares (superior e inferior).
9. **Rotación y recorrido espiral**: Transforma y recorre una matriz rectangular. Permite rotar la matriz 90 grados (en sentido horario o antihorario) y devuelve los elementos extraídos siguiendo un recorrido en forma de espiral.

## Tecnologías Utilizadas
- **Backend / Lógica**: C# (Implementando patrones MVC, POO y SOLID).
- **Frontend / Interfaz**: HTML5, CSS3, JavaScript (Vanilla JS), Bootstrap 5.
- **Arquitectura**: Separación clara entre Modelos (datos y reglas de negocio), Vistas (interfaz de usuario) y Controladores (orquestación).

## Cómo Ejecutar el Proyecto

Para poder interactuar con los ejercicios y que la interfaz se comunique con la lógica de negocio, es necesario iniciar primero el servidor backend (API):

1. **Inicia la API en C#**: Abre una terminal en la carpeta principal del proyecto (`Ejercicios_Arreglos`) y ejecuta el siguiente comando:
   ```bash
   dotnet run
   ```
2. **Abre la Interfaz**: Una vez que la API esté corriendo (debería indicar que está escuchando en el puerto 5000 u otro similar), abre el archivo `index.html` en tu navegador web de preferencia.
   - *Nota: Mantén la terminal abierta mientras pruebas los ejercicios en el navegador para evitar errores de conexión.*
