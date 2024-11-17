export function useStudentApi() {
  const baseUrl = 'http://localhost:8080/api/alumnos'; // Cambia la URL si es diferente

  // Obtener todos los alumnos
  const getAllStudents = async () => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error('Error al obtener los alumnos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  };
  //Obtener los datos de un alumno por su matricula
  const getStudentById = async (matricula) => {
    try {
      const response = await fetch(`${baseUrl}/${matricula}`);
      if (!response.ok) {
        throw new Error('Error al obtener el alumno por matrícula');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener el alumno por matrícula:', error);
      throw error;
    }
  };  

  // Buscar alumnos por nombre
  const searchStudentsByName = async (name) => {
    try {
      const response = await fetch(`${baseUrl}/nombre/${name}`);
      if (!response.ok) {
        throw new Error('Error al buscar alumnos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching students:', error);
      return [];
    }
  };

  // Crear un nuevo alumno
  const createStudent = async (student) => {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      if (!response.ok) {
        throw new Error('Error al crear el alumno');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  };

  // Actualizar un alumno
  const updateStudent = async (matricula, student) => {
    try {
      const response = await fetch(`${baseUrl}/${matricula}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el alumno');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  };

  // Eliminar un alumno
  const deleteStudent = async (matricula) => {
    try {
      const response = await fetch(`${baseUrl}/${matricula}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Error al eliminar el alumno');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  };

  return {
    getAllStudents,
    searchStudentsByName,
    createStudent,
    updateStudent,
    deleteStudent,
  };
}
