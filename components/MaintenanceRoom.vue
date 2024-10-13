<script setup lang="ts">

import {reactive} from "vue";
import {nationalities, roomIssues} from "~/utils/nationalities";


const userNationalityInput = ref('');
const filteredNationalities = computed(() => {
  if (!userNationalityInput.value) {

    return nationalities;
  }
  return nationalities.filter(n =>
      n.toLowerCase().startsWith(userNationalityInput.value.toLowerCase())
  );
});

const userRoomIssuesInput = ref('');
const filteredRoomIssues = computed(() => {
  if (!userRoomIssuesInput.value) {
    return roomIssues;
  }
  return roomIssues.filter(n =>
      n.toLowerCase().startsWith(userRoomIssuesInput.value.toLowerCase())
  );
});

const previousQuestions = [
  {
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
  }, {
    label: "Student ID Number",
    type: "text",
    placeholder: "Enter your student ID(E.g, AIU21011234)",
    required: true,
  },
  {
    label: "Room Number",
    type: "text",
    placeholder: "Enter your room number (E.g, 25i-3-10)",
    required: true,
  },
  {
    label: "Phone Number (Local Number Only)",
    type: "text",
    placeholder: "Enter your phone number",
    required: true,
  },
  {
    label: "Email Address (Student Email Only)",
    type: "text",
    placeholder: "Enter your email address",
    required: true,
  },
  {
    label: "Gender",
    type: "select",
    id:"gender",
    options: ["Male", "Female"],
    required: true,
    placeholder: "Enter your gender",
  },
  {
    label: "Type of damage",
    type: "select",
    id:"type-of-damage",
    options: filteredRoomIssues.value,
    required: true,
    placeholder: "Enter type of damage",
  },
  {
    label: "Enter your Nationality",
    type: "select",
    id: "nationality",
    options: filteredNationalities.value,
    placeholder: "selectNationality",
  },
  {
    label: "How frequent the damages occur?",
    type: "select",
    options: ["1 time", "2 times", "3 times", "4 times", "5 times", "More than 5 times"],
    required: true,
    placeholder: "How frequent the damages occur?",
  },
  {
    label: "Please provide photo evidence?",
    type: "file",
    required: true,
    placeholder: "Please describe the maintenance issue?",
  },
];

const errors = ref<string[]>(Array(previousQuestions.length).fill(''));

type FormData = {
  name: string;
  studentId: string;
  roomNumber: string;
  phoneNumber: string;
  email: string;
  gender: string;
  damageType: string;
  damageFrequency: string;
  photoEvidence: File | null;
  detailedDescription: string;
};

const formData = reactive({
  name: '',
  studentId: '',
  roomNumber: '',
  phoneNumber: '',
  email: '',
  gender: '',
  damageType: '',
  damageFrequency: '',
  photoEvidence: null,
  detailedDescription: '',
});

const handleSubmit = () => {
  console.log("asasas");
  console.log("Form Data:", formData);
  console.log(formData);
};

const camelizeLabel = (label: string): keyof FormData => {
  return label.replace(/\s(.)/g, (match, group1) => group1.toUpperCase()).replace(/\s/g, '').replace(/^(.)/, (match) => match.toLowerCase()) as keyof FormData;
};

</script>

<template>
  <div class="maintenance-room-section">
    <div class="container">
      <div class="description">
        <img src="/images/AIU-Official-Logo.png" alt="AIU">
        <h2 class="title-maintenance-form">Form For Maintenance Room Issues</h2>
        <p class="description-maintenance-form">If you're experiencing any problems with your room, please fill out this
          form to let us know. This will help us quickly identify and address the issue, ensuring your living space
          remains comfortable and safe. Your detailed report will assist the maintenance team in resolving the problem
          as soon as possible.
        </p>
        <p>
          Note: Before registering to the system please make sure you have your student ID card scanned in your phone or
          pc.
        </p>
      </div>
      <div class="maintenance-room-form">
        <h2>Please fill this Form </h2>
        <div class="form-group">
          <form @submit.prevent="handleSubmit">
            <div class="maintenance-form">
              <div class="info" v-for="(question, index) in previousQuestions" :key="index">
                <h2 class="lable">{{ question.label }}</h2>
                <div class="input-container">
                  <UIcon class="input-icon" name="heroicons-search"/>
                  <template v-if="question.type === 'text'">
                    <input
                        :type="question.type"
                        :name="question.label"
                        :placeholder="question.placeholder"
                        v-model="formData[camelizeLabel(question.label)]"
                        :required="question.required"
                    >
                    <p v-if="errors[index]" class="error">{{ errors[index] }}</p>
                  </template>
                  <template v-else-if="question.type === 'select'">
                    <select
                        :name="question.label"
                        :required="question.required"
                        v-model="formData[camelizeLabel(question.label)]"
                    >
                      <option disabled selected>Select {{ question.placeholder }}</option>
                      <option v-for="option in question.options" :key="option" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </template>
                  <template v-else-if="question.type === 'file'">
                    <input
                        :type="question.type"
                        :name="question.label"
                        :placeholder="question.placeholder"
                        :required="question.required"
                    />
                  </template>
                </div>
              </div>
              <template>
                <h2 class="lable">Explain in detail the damage in mention above</h2>
                <textarea
                    name="Explain in detail the damage in mention above"
                    placeholder="Please describe the maintenance issue ?"
                />
              </template>

            </div>
            <button type="submit" class="submit-maintence-form"> Submit </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.maintenance-room-section {
  margin: 5rem;
  border: 2px solid #eeeeee;
  border-radius: 0 30px 30px 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
}

@media (max-width: 800px) {
  .maintenance-room-section {
    margin: 0.5rem;
  }
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.container .description {
  flex: 30%;
  background-color: #eeeeee;
  padding: 2.5rem;
  border-radius: 0;
}

.container .maintenance-room-form {
  flex: 60%;
  padding: 2.5rem;
}

@media (max-width: 1200px) {
  .container div {
    display: block;
  }

  .container .description {
    padding: 1rem;
  }
}

@media (max-width: 800px) {
  .container div {
    display: block;
  }

  .container .description {
    padding: 1rem;
  }
}

.container .description h2 {
  font-size: 1.2rem;
  padding: .5rem 0;
  font-weight: bold;
  color: var(--text-color);
  text-align: center;
}

.container .description p {
  font-size: 1rem;
  padding: 1rem 0;
  font-weight: normal;
  color: black;
  text-align: justify;
}

.maintenance-room-form > h2 {
  font-size: 1.5rem;
  color: var(--text-color);
  text-align: center;
  padding: 1rem 0;
}

.maintenance-form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 10px;
}

.info {
  flex-basis: calc(50% - 10px);
  box-sizing: border-box;
  display: block;
}

.maintenance-form .lable {
  font-size: 1rem;
  color: var(--text-color);
  padding: .5rem 0;
}

.maintenance-form input,
.maintenance-form select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.maintenance-form textarea {
  width: 200%;
  height: 5rem;
  max-height: 5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

@media (max-width: 1200px) {
  .maintenance-form textarea {
    width: calc(100% - .5rem);
  }
}

@media (max-width: 800px) {
  .maintenance-form textarea {
    width: calc(100% - .5rem);
  }
}

.submit-maintence-form{
  margin-top: 1rem;
  padding: .5rem;
  display: flex;
  font-size: 1rem;
  border-radius: 1rem;
  background-color: var(--text-hovor-color);
  color: var(--text-color);
}

.submit-maintence-form:hover{
  background-color: var(--main-color);
  transition: .2s;
}

</style>