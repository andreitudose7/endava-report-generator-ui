<template>
  <header>
    <h2> Javascript Interview Report </h2>
    <h3>
      <div>
        <label :style="{marginRight: '17px'}"> Evaluator’s name: </label> 
        <span
          :style="{marginRight: '11px'}"
          v-for="possbileInterviewer in interviewersDS" 
          :key="possbileInterviewer"
        >
          <input type="checkbox" :id="possbileInterviewer" :value="possbileInterviewer" v-model="formValues.interviewers" />  
          <label :for="possbileInterviewer" class="interviewerName">{{ possbileInterviewer }}</label>
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
      <label for="candidateAccepted" class="evaluationStatusLabel"> Accepted </label>
      <input type="radio" id="candidateRejected" name="candidateAcceptance" value="Rejected" v-model="formValues.evaluationStatus" />
      <label for="candidateRejected" class="evaluationStatusLabel"> Rejected </label>
    </h3>
  </section>
  <section>
    <h3> Comments & Observations </h3>
    <textarea v-model="formValues.commentsAndObservations" rows="10" style="width: 100%"></textarea>
  </section>
  <button class="export-report-btn" @click="downloadPdf"> <i class="fa fa-file-download"> </i> </button>
</template>

<script>
import RatingFaces from './components/RatingFaces.vue';
import RatingDropdown from './components/RatingDropdown.vue';
import evaluationFormat from './interview-questions/evaluationFormat';

setTimeout(() => {
  if(localStorage.getItem('evaluation-form')) {
    let resetEvaluation = confirm('Doresti sa incepi o evaluare noua?');
    if(resetEvaluation) {
      localStorage.removeItem('evaluation-form');
      window.location.reload();
    }
  }
}, 700)

export default {
  name: 'App',
  components: {
    RatingFaces,
    RatingDropdown
  },
  data() {
    return {
      interviewersDS: evaluationFormat.head.interviewers['frontEnd'],
      formValues: localStorage.getItem('evaluation-form') ? 
          JSON.parse(localStorage.getItem('evaluation-form'))
        : {
            interviewers: [],
            interviewDate: this.getTodayDate(),
            candidateName: '',
            overallExperience: '',
            jsExperience: '',
            cssHtmlHttpExperience: '',
            evaluation: evaluationFormat.questions,
            evaluationGrade: '',
            evaluationStatus: 'Not-Setted',
            commentsAndObservations: ''
          }
    }
  },
  watch: {
    'formValues': {
      handler: function () {
        localStorage.setItem('evaluation-form', JSON.stringify(this.formValues))
      },
      deep: true
    }
  },
  methods: {
    downloadPdf() {
      window.html2canvas(
        document.getElementById('app'), {
          ignoreElements: (element) => {
            const { type = '', tagName = '', className = '' } = element;
            if(type === 'checkbox' || type === 'radio') {
              return true;
            }
            if(tagName.toLowerCase() === 'button') {
              return true;
            }
            if(tagName.toLowerCase() === 'label' && className.indexOf('interviewerName') !== -1) {
              const interviewerName = element.getAttribute('for');
              return this.formValues.interviewers.indexOf(interviewerName) === -1;
            }
            if(tagName.toLowerCase() === 'label' && className.indexOf('evaluationStatusLabel') !== -1) {
              const candidateAcceptance = element.innerText;
              return this.formValues.evaluationStatus.trim() !== candidateAcceptance.trim();
            }
            if(tagName.toLowerCase() === 'label' && className.indexOf('option') !== -1) {
              const forAttrValue = element.getAttribute('for');
              if(forAttrValue.indexOf('evaluation-dd') !== -1 && className.indexOf('active') === -1) {
                return true;
              }
            }
            return false;
          }
        })
        .then(function(canvas) {
          const img = canvas.toDataURL("image/png");
          let link = document.createElement('a');
          link.download = 'filename.png';
          link.href = img;
          link.click();
        });
    },
    getTodayDate() {
      const today = new Date();
      let day = today.getDate();
      if(day < 10) day = '0' + day;
      let month = today.getMonth();
      month ++;
      if(month < 10) month = '0' + month;
      let year = today.getFullYear();
      return `${year}-${month}-${day}` 
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
  .export-report-btn {
    position: fixed;
    bottom: 45px;
    right: 45px;
    z-index: 9999;
    background: #DE411B;
    color: white;
    font-size: 21px;
    padding: 0;
    border: 0;
    outline: 0;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;

    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
    transform: scale(1);
    animation: pulse 1.5s infinite;
  }
  .export-report-btn:hover {
    background: rgb(255, 123, 0);
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
    }

    50% {
      transform: scale(1.15);
      box-shadow: 0 0 0 15px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
</style>
