<template>
  <div class="app-container">
    <header class="header">
      <h1>Gestión de Alumnos</h1>
      <button class="add-button" @click="showNuevoAlumno">Agregar Alumno</button>
    </header>

    <main>
      <!-- Vista Lista de Alumnos -->
      <ListaAlumnos
        v-if="currentView === 'lista'"
        @nuevo-alumno="showNuevoAlumno"
        @editar-alumno="showEditarAlumno"
        @eliminar-alumno="deleteAlumno"
      />

      <!-- Vista para Agregar Alumno -->
      <NuevoAlumno
        v-if="currentView === 'nuevo'"
        @volver="showListaAlumnos"
      />

      <!-- Vista para Editar Alumno -->
      <EditarAlumno
        v-if="currentView === 'editar'"
        :matricula="selectedMatricula"
        @volver="showListaAlumnos"
      />
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import ListaAlumnos from '@/components/ListaAlumnos.vue';
import NuevoAlumno from '@/components/NuevoAlumno.vue';
import EditarAlumno from '@/components/EditarAlumno.vue';
import { useStudentApi } from '@/composables/useStudentApi';

export default {
  components: {
    ListaAlumnos,
    NuevoAlumno,
    EditarAlumno,
  },
  setup() {
    const currentView = ref('lista'); // Control de vistas
    const selectedMatricula = ref(null); // Matrícula del alumno seleccionado
    const { deleteStudent } = useStudentApi();

    // Cambiar a vista de lista de alumnos
    const showListaAlumnos = () => {
      currentView.value = 'lista';
    };

    // Cambiar a vista de agregar nuevo alumno
    const showNuevoAlumno = () => {
      currentView.value = 'nuevo';
    };

    // Cambiar a vista de editar alumno
    const showEditarAlumno = (matricula) => {
      selectedMatricula.value = matricula; // Asignar matrícula
      currentView.value = 'editar'; // Cambiar vista a edición
    };


    // Eliminar un alumno
    const deleteAlumno = async (matricula) => {
      if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
        try {
          await deleteStudent(matricula);
          alert('Alumno eliminado exitosamente.');
        } catch (error) {
          console.error('Error al eliminar el alumno:', error);
          alert('Error al eliminar el alumno.');
        }
      }
    };

    return {
      currentView,
      selectedMatricula,
      showListaAlumnos,
      showNuevoAlumno,
      showEditarAlumno,
      deleteAlumno,
    };
  },
};
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  color: white;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.add-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #218838;
}

main {
  padding: 20px;
}
</style>
