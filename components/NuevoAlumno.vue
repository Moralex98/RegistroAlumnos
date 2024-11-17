<template>
  <div class="edit-container">
    <h2>Agregar Nuevo Alumno</h2>
    <form @submit.prevent="saveAlumno">
      <div class="form-group">
        <label>Matrícula</label>
        <input v-model="alumno.matricula" placeholder="Matrícula" required />
      </div>
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
import { ref } from 'vue';
import { useStudentApi } from '@/composables/useStudentApi';

export default {
  emits: ['volver'],
  setup(_, { emit }) {
    const alumno = ref({
      matricula: '',
      nombres: '',
      apellidopat: '',
      apellidoma: '',
      licenciatura: '',
      semestre: '',
      turno: '',
      correo: '',
    });

    const { createStudent } = useStudentApi();

    const saveAlumno = async () => {
      try {
        await createStudent(alumno.value);
        alert('Alumno agregado correctamente');
        emit('volver'); // Regresar a la lista después de guardar
      } catch (error) {
        console.error('Error al agregar el alumno:', error);
        alert('Error al agregar el alumno.');
      }
    };

    return {
      alumno,
      saveAlumno,
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
