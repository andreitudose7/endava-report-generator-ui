<template>
  <header>
    <h2> Javascript Interview Report </h2>
    <h3>
      <div>
        <label :style="{marginRight: '17px'}"> Evaluator’s name: </label> 
        <span
          :style="{marginRight: '7px'}"
          v-for="possbileInterviewer in interviewersDS" 
          :key="possbileInterviewer"
        >
          <input type="checkbox" :id="possbileInterviewer" :value="possbileInterviewer" v-model="formValues.interviewers" />  
          <label :for="possbileInterviewer">{{ possbileInterviewer }}</label>
        </span> 
      </div>
      <div :style="{marginTop: '7px'}">
        Interview Date: <span :style="{marginLeft: '17px'}"> <input type="date" v-model="formValues.interviewDate" /> </span>
      </div>
    </h3>
  </header>
  <section>
    <h3>
      <label :style="{marginRight: '17px'}"> Candidate’s name: </label> 
      <input type="text" v-model="formValues.candidateName" />
    </h3>
    <h3>
      <label :style="{marginRight: '17px'}"> Overall Programming Experience: </label> 
      <input type="text" v-model="formValues.overallExperience" />
    </h3>
    <h3>
      <label :style="{marginRight: '17px'}"> Javascript Experience: </label> 
      <input type="text" v-model="formValues.jsExperience" />
    </h3>
    <h3>
      <label :style="{marginRight: '17px'}"> HTML/CSS/HTTP Experience: </label> 
      <input type="text" v-model="formValues.cssHtmlHttpExperience" />
    </h3>
  </section>
  <section v-for="(category, categoryIndex) in formValues.evaluation" :key="category.areaName">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3> {{ category.areaName }} </h3>
      <RatingDropdown
        :widget-id="category.areaName + '-evaluation-dd'"
        v-model="formValues.evaluation[categoryIndex].points"
      />
    </div>

    <div v-for="(checkpoints, checkpointIndex) in category.checkpoints" :key="checkpoints.title" style="display: flex; justify-content: space-between;">
      <p> {{ checkpoints.title }} </p>
      <RatingFaces
        :widget-id="'rating-' + categoryIndex + '-' + checkpointIndex"
        :category-index="categoryIndex"
        :checkpoint-index="checkpointIndex"
        v-model="formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points"
      />
    </div>
  </section>
  <section>
    <h3>
      Grade <input type="text" v-model="formValues.evaluationGrade" style="margin: 0px 30px 0px 13px; width: 50px;" />
      <input type="radio" id="candidateAccepted" name="candidateAcceptance" value="Accepted" v-model="formValues.evaluationStatus" />
      <label for="candidateAccepted"> Accepted </label>
      <input type="radio" id="candidateRejected" name="candidateAcceptance" value="Rejected" v-model="formValues.evaluationStatus" />
      <label for="candidateRejected"> Rejected </label>
    </h3>
  </section>
  <section>
    <h3> Comments & Observations </h3>
    <textarea v-model="formValues.commentsAndObservations" rows="10" style="width: 100%"></textarea>
  </section>
  <div>
    <pre>
      {{ JSON.stringify(formValues, null, 2) }}
    </pre>
  </div>
</template>

<script>
import RatingFaces from './components/RatingFaces.vue';
import RatingDropdown from './components/RatingDropdown.vue';
import evaluationForm from './interview-questions/evaluationFormat';
export default {
  name: 'App',
  components: {
    RatingFaces,
    RatingDropdown
  },
  data() {
    return {
      interviewersDS: ['Andrei Tudose', 'Stefan Ioan Adrian', 'Marian Costel Brinza', 'Ionut Cristian Stoica'],
      formValues: {
        interviewers: [],
        interviewDate: this.getTodayDate(),
        candidateName: '',
        overallExperience: '',
        jsExperience: '',
        cssHtmlHttpExperience: '',
        evaluation: evaluationForm,
        evaluationGrade: '',
        evaluationStatus: 'Not-Setted',
        commentsAndObservations: ''
      }
    }
  },
  methods: {
    getTodayDate() {
      const today = new Date();
      let day = today.getDate();
      if(day < 10) day = '0' + day;
      let month = today.getMonth();
      if(month < 10) month = '0' + month;
      let year = today.getFullYear();
      return `${year}-${month}-${day}` 
    },
    evaluateCheckpoint(points) {
      console.log(points)
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');
  body {
    font-family: 'Oswald', sans-serif;
  }
  header {
    border-bottom: 3px solid;
    color: hsl(0, 89%, 62%);
    padding: 0px 15px;
  }
  input { 
    font-family: 'Oswald', sans-serif;
    background: transparent;
    color: hsl(0, 89%, 62%);
    border-width: 2px;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-color: hsl(0, 89%, 62%);
    outline: none;
    font-size: 16px;
    font-weight: bold;
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(50%);
  }
  input[type="checkbox"], input[type="checkbox"] + label,
  input[type="radio"], input[type="radio"] + label {
    cursor: pointer;
  }
  textarea {
    font-family: 'Oswald', sans-serif;
  }
  section {
    box-shadow: 0px 0px 4px #888888bb;
    padding: 10px 25px;
    margin: 15px 10px;
    width: calc(33% - 70px);
    min-width: 300px;
    display: inline-grid;
  }
  section input {
    color: black;
    border-color: black;
    font-weight: normal;
  }
</style>
