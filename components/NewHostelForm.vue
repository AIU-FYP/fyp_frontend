<script setup>
import { reactive, ref, watch } from 'vue';
import { z } from 'zod';

const form = reactive({
  levels: {},
});
const errors = reactive({});

const isPopupVisible = ref(false);

const previousQuestions = [
  {
    label: "Hostel name",
    type: "text",
    placeholder: "Hostel name",
  },
  {
    label: "Gender",
    type: "select",
    options: ["Male", "Female"],
    placeholder: "Select your gender",
  },
  {
    label: "Number of Rooms for Each Level",
    type: "multi-select",
    levels: [
      { label: "Level 1", key: "level1" },
      { label: "Level 2", key: "level2" },
      { label: "Level 3", key: "level3" },
      { label: "Level 4", key: "level4" },
    ],
    placeholder: "Select Rooms for Each Level",
    required: true,
  },
];

const formSchema = z.object({
  "Hostel name": z.string().min(3, "Name must be at least 3 characters long").nonempty("Hostel Name is required"),
  Gender: z.string().nonempty("Gender is required"),
});

previousQuestions.forEach((question) => {
  if (question.type === 'multi-select') {
    question.levels.forEach((level) => {
      form.levels[level.key] = "";
      errors[level.key] = "";
    });
  } else {
    form[question.label] = "";
    errors[question.label] = "";
  }
});

function validateField(field, value) {
  try {
    formSchema.shape[field]?.parse(value || form[field]);
    errors[field] = "";
  } catch (error) {
    errors[field] = error.errors ? error.errors[0].message : error.message;
  }
}

previousQuestions.forEach((question) => {
  if (question.type === 'multi-select') {
    question.levels.forEach((level) => {
      watch(() => form.levels[level.key], () => validateField(level.key, form.levels[level.key]));
    });
  } else {
    watch(() => form[question.label], () => validateField(question.label, form[question.label]));
  }
});

function handleSubmit() {
  const validationResults = formSchema.safeParse({
    "Hostel name": form["Hostel name"],
    Gender: form.Gender,
  });

  if (validationResults.success) {
    console.log("Form Data:", { ...form });
    isPopupVisible.value = true;
    alert('Form submitted successfully!');
  } else {
    alert("Please correct the errors in the form.");
  }
}

</script>

<template>
  <div class="new-student-sec">
    <div class="container">
      <div class="form-header">
        <h2>New Hostel Form</h2>
      </div>
      <div class="box-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-container">
            <div class="info" v-for="(question, index) in previousQuestions" :key="index">
              <label class="question-title" :for="question.label">{{ question.label }}</label>

              <input
                  v-if="question.type === 'text'"
                  :type="question.type"
                  v-model="form[question.label]"
                  :placeholder="question.placeholder"
                  :id="question.label"
                  @input="validateField(question.label)"
              />

              <select
                  v-if="question.type === 'select'"
                  v-model="form[question.label]"
                  :id="question.label"
                  @change="validateField(question.label)"
              >
                <option value="" disabled>{{ question.placeholder }}</option>
                <option v-for="option in question.options" :key="option" :value="option">{{ option }}</option>
              </select>

              <div v-else-if="question.type === 'multi-select'">
                <div v-for="level in question.levels" :key="level.key" class="level-input">
                  <label class="form-label">{{ level.label }}</label>
                  <select
                      v-model="form.levels[level.key]"
                      :required="question.required"
                      class="form-select"
                      @change="validateField(level.key)"
                  >
                    <option value="" disabled>{{ question.placeholder }}</option>
                    <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
                  </select>
                  <span v-if="errors[level.key]" class="error">{{ errors[level.key] }}</span>
                </div>
              </div>

              <span v-if="errors[question.label]" class="error">{{ errors[question.label] }}</span>
            </div>
          </div>

          <div>
            <button class="submit" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>

.container {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 1300px;

}

@media (max-width: 1200px) {
  .container {
    margin: 3rem 0;
    width: 100%;
  }
}

.form-header {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: .5rem 0;
  background-color: var(--text-hovor-color);
  border: none;
  outline: none;
  font-size: 1.5rem;
  color: var(--main-color);
}

.container .box-form {
  width: 90%;
  margin: 0 auto;
  padding: 1rem 0;
}

@media (max-width: 1200px) {
  .container div {
    display: block;
  }
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.5rem 1rem;
}

.info {
  flex-basis: calc(100% - 10px);
  box-sizing: border-box;
  display: block;
}

.form-container .question-title {
  font-size: 1rem;
  color: var(--main-hovor-color);
}

.form-container input,
.form-container select {
  width: 100%;
  padding: .5rem 1rem;
  border: 2px solid var(--text-color);
  border-radius: 5px;
  outline: none;
}

.error {
  color: red;
  font-size: 1rem;
}

.submit {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  padding: .5rem 2rem;
  font-size: 1.2rem;
  border-radius: 1rem 0;
  background-color: var(--main-hovor-color);
  color: var(--text-hovor-color);
}

.submit:hover {
  background-color: var(--main-color);
  transition: .3s ease-in-out;
}


</style>
