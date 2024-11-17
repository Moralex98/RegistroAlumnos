<template>
  <div class="edit-container">
    <h2>Editar Alumno</h2>
    <form @submit.prevent="updateAlumno">
      <div class="form-group">
        <label>Nombres</label>
        <input v-model="alumno.nombres" placeholder="Nombres" required />
      </div>
      <div class="form-group">
        <label>Apellido Paterno</label>
        <input v-model="alumno.apellidopat" placeholder="Apellido Paterno" required />
      </div>
      <div class="form-group">
        <label>Apellido Materno</label>
        <input v-model="alumno.apellidoma" placeholder="Apellido Materno" />
      </div>
      <div class="form-group">
        <label>Licenciatura</label>
        <input v-model="alumno.licenciatura" placeholder="Licenciatura" required />
      </div>
      <div class="form-group">
        <label>Semestre</label>
        <input v-model="alumno.semestre" type="number" placeholder="Semestre" required />
      </div>
      <div class="form-group">
        <label>Turno</label>
        <input v-model="alumno.turno" placeholder="Turno" required />
      </div>
      <div class="form-group">
        <label>Correo</label>
        <input v-model="alumno.correo" type="email" placeholder="Correo" required />
      </div>
      <div class="button-group">
        <button type="submit" class="save-button">Guardar</button>
        <button type="button" class="back-button" @click="$emit('volver')">Volver</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStudentApi } from '@/composables/useStudentApi';

export default {
  props: ['matricula'], // Prop para recibir matrícula
  setup(props, { emit }) {
    const alumno = ref({});
    const { getStudentById, updateStudent } = useStudentApi();

    // Cargar los datos del alumno al montar
    onMounted(async () => {
      try {
        console.log(`Cargando datos del alumno con matrícula: ${props.matricula}`);
        alumno.value = await getStudentById(props.matricula);
        console.log('Datos del alumno cargados:', alumno.value);
      } catch (error) {
        console.error('Error al cargar los datos del alumno:', error);
        alert('No se pudieron cargar los datos del alumno.');
      }
    });

    // Actualizar los datos del alumno
    const updateAlumno = async () => {
      try {
        console.log('Actualizando alumno:', alumno.value);
        await updateStudent(props.matricula, alumno.value);
        alert('Alumno actualizado correctamente');
        emit('volver');
      } catch (error) {
        console.error('Error al actualizar el alumno:', error);
        alert('Error al actualizar el alumno.');
      }
    };

    return {
      alumno,
      updateAlumno,
    };
  },
};
</script>

<style scoped>
.edit-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.save-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
}

.save-button:hover {
  background-color: #218838;
}

.back-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
}

.back-button:hover {
  background-color: #c82333;
}
</style>
