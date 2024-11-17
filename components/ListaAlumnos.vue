<template>
  <div>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar alumno por nombre..."
        @input="searchAlumno"
        class="search-input"
      />
    </div>

    <!-- Lista de Alumnos -->
    <div v-if="alumnos.length > 0" class="alumnos-list">
      <div v-for="alumno in alumnos" :key="alumno.matricula" class="alumno-item">
        <div class="alumno-info">
          <p>
            <strong>{{ alumno.nombres }} {{ alumno.apellidopat }} {{ alumno.apellidoma }}</strong>
          </p>
          <p>{{ alumno.licenciatura }} - Semestre: {{ alumno.semestre }}</p>
        </div>
        <div class="actions">
          <button class="edit-button" @click="$emit('editar-alumno', alumno.matricula)">✏️ Editar</button>
          <button class="delete-button" @click="$emit('eliminar-alumno', alumno.matricula)">🗑️ Eliminar</button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>No se encontraron alumnos.</p>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useStudentApi } from '@/composables/useStudentApi';

export default {
  props: ['refresh'],
  emits: ['nuevo-alumno', 'editar-alumno', 'eliminar-alumno'],
  setup(props) {
    const alumnos = ref([]); // Lista de alumnos
    const searchQuery = ref(''); // Query del buscador
    const { getAllStudents, searchStudentsByName } = useStudentApi();

    // Función para cargar la lista de alumnos
    const fetchAlumnos = async () => {
      try {
        alumnos.value = await getAllStudents();
      } catch (error) {
        console.error('Error al cargar la lista de alumnos:', error);
      }
    };

    // Función para buscar alumnos por nombre
    const searchAlumno = async () => {
      if (searchQuery.value.trim() === '') {
        await fetchAlumnos();
      } else {
        try {
          alumnos.value = await searchStudentsByName(searchQuery.value.trim());
        } catch (error) {
          console.error('Error al buscar alumnos:', error);
        }
      }
    };

    // Recargar lista al cambiar el prop `refresh`
    watch(() => props.refresh, fetchAlumnos);

    // Cargar alumnos al montar el componente
    onMounted(fetchAlumnos);

    return {
      alumnos,
      searchQuery,
      searchAlumno,
    };
  },
};
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 70%;
  max-width: 800px;
  padding: 15px;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.alumnos-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.alumno-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-button {
  background-color: #ffc107;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #e0a800;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #bd2130;
}
</style>
