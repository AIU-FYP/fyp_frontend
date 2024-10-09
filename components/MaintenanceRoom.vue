<script setup lang="ts">
const previousQuestions = [
  {
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
  },{
    label: "Student ID Number",
    type: "text",
    placeholder: "Enter your student ID(E.g, AIU21011234)",
    required: true,
  },
  {
    label: "Gender",
    type: "text",
    options: ["Male", "Female"],
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

  // ,
  // {
  //   label: "Please provide photo evidence?",
  //   type: "file",
  //   accept: "image/*",
  //   maxFileSize: 10 * 1024 * 1024, //
  //   required: true,
  // }
];


</script>

<template>
  <div class="maintenance-room-section">
    <div class="container">
      <div class="description">
        <img src="/images/AIU-Official-Logo.png" alt="AIU">
        <h2 class="title-maintenance-form">Form For Maintenance Room Issues</h2>
        <p class="description-maintenance-form">If you're experiencing any problems with your room, please fill out this form to let us know. This will help us quickly identify and address the issue, ensuring your living space remains comfortable and safe. Your detailed report will assist the maintenance team in resolving the problem as soon as possible.
        </p>
        <p>
          Note: Before registering to the system please make sure you have your student ID card scanned in your phone or pc.
        </p>
      </div>
      <div class="maintenance-room-form">
        <h2>Please fill this Form </h2>
        <div class="form-group">
          <form action="">
            <div class="maintenance-form">
              <div class="info" v-for="(question, index) in previousQuestions" :key="index">
                <label>{{ question.label }}</label>
                <input
                    :type="question.type"
                    :name="question.label"
                >
              </div>
            </div>
            <div class="maintenance-form">
              <div class="info" v-for="(question, index) in previousQuestions" :key="index">
                <label>{{ question.label }}</label>
                <input
                    :type="question.type"
                    :name="question.label"
                >
              </div>
            </div>
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

.container .description{
  flex: 30%;
  background-color: #eeeeee;
  padding: 2.5rem;
  border-radius: 0;
}

.container .maintenance-room-form{
  flex: 60%;
  padding: 2.5rem;
}

@media (max-width: 800px) {
  .container div{
    display: block;
  }
  .container .description{
    padding: 1rem;
  }
}

.container .description h2 {
  font-size: 1.2rem;
  padding: .5rem 0;
  font-weight:bold ;
  color: var(--text-color);
  text-align: center;
}

.container .description p {
  font-size: 1rem;
  padding: 1rem 0;
  font-weight:normal ;
  color: black;
  text-align: justify;
}

.maintenance-room-form > h2{
  font-size: 1.5rem;
  color: var(--text-color);
  text-align: center;
  padding: 1rem 0 ;
}

.maintenance-form {
  display: flex;
  flex-wrap: wrap;
  flex-direction:row ;
  gap: 10px;
}

.info {
  flex-basis: calc(50% - 10px);
  box-sizing: border-box;
  display: block;
}

.maintenance-form label {
  font-size: 1rem;
  color: var(--text-color);
  padding: .5rem 0;
}

.maintenance-form input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

</style>