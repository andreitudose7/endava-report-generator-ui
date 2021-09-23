<template>
  <header style="display: flex; justify-content: space-between;">
    <section>
      <h2> Front-End Interview Report </h2>
      <h3>
        <div>
          <label :style="{marginRight: '17px'}"> Evaluator’s name: </label>
          <label
            class="interviewerName"
            :style="{marginRight: '5px'}"
            v-for="possbileInterviewer in interviewersDS" 
            :key="possbileInterviewer"
          >
            {{ possbileInterviewer }}
            <input type="checkbox" :id="possbileInterviewer" :value="possbileInterviewer" v-model="formValues.interviewers" />  
            <span class="checkmark"></span>
          </label>
        </div>
        <div :style="{marginTop: '7px'}">
          Interview Date: <span :style="{marginLeft: '17px'}"> <input type="date" v-model="formValues.interviewDate" /> </span>
        </div>
      </h3>
    </section>
    <section>
      <h2> Candidate Details </h2>
      <h3>
        <label> Candidate’s name: </label> 
        <input type="text" style="margin-left: 8px; margin-right: 10px; width: 280px;" v-model="formValues.candidateName" />
      </h3>
      <h3>
        <label> Experience - Overall Programming (years): </label> 
        <input type="number" v-model="formValues.overallExperience" placeholder="Years" />
        <label> - JS (years): </label> 
        <input type="number" v-model="formValues.jsExperience" placeholder="Years" />
        <label> - UI/UX (years): </label> 
        <input type="number" v-model="formValues.cssHtmlHttpExperience" placeholder="Years" />
      </h3>
    </section>
  </header>
  <section v-for="(category, categoryIndex) in formValues.evaluation" :key="category.areaName">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3>
        {{ category.areaName }}
        <Tooltip
          :available="category.description"
          faIconName="fa-question-circle"
          :message="category.description || 'No description yet'"
        />
      </h3>
      <Dropdown
        :widget-id="category.areaName + '-evaluation-dd'"
        v-model="formValues.evaluation[categoryIndex].points"
        :dataSource="[{
            label: 'None',
            value: -1
          }, {
            label: 'Beginner',
            value: 0
          }, {
            label: 'Intermediate',
            value: 1,
          }, {
            label: 'Advanced',
            value: 2
          }]"
      />
    </div>

    <div v-for="(checkpoint, checkpointIndex) in category.checkpoints" :key="checkpoint.title" style="display: flex; justify-content: space-between;">
      <p>
        {{ checkpoint.title }}
        <Tooltip
          :available="checkpoint.description"
          faIconName="fa-question-circle"
          :message="checkpoint.description || 'No description yet'"
        />  
      </p>
      <RatingFaces
        :widget-id="'rating-' + categoryIndex + '-' + checkpointIndex"
        :category-index="categoryIndex"
        :checkpoint-index="checkpointIndex"
        v-model="formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points"
      />
    </div>
  </section>
  <section>
    <div style="display: inline-flex; align-items: center;">
      <h3 style="margin-right: 25px;"> Grade </h3>
      <Dropdown
        widget-id="grade-evaluation-dd"
        v-model="formValues.evaluationGrade"
        extraClassName="grade-selection-dd"
        :dataSource="[{
            label: 'Rejected',
            value: -1
          }, {
            label: 'Junior Developer (JT)',
            value: 0
          }, {
            label: 'Developer (TL)',
            value: 1,
          }, {
            label: 'Developer (ST)',
            value: 2
          }, {
            label: 'Senior Developer (EN)',
            value: 3
          }, {
            label: 'Senior Developer (SE)',
            value: 4
          }, {
            label: 'Discipline Lead (CL)',
            value: 5
          }, {
            label: 'Development Lead (CL)',
            value: 6
          }, {
            label: 'Development Consultant (CL)',
            value: 7
          }, {
            label: 'Design Lead (CL)',
            value: 8
          }, {
            label: 'Senior Development Lead (SC)',
            value: 9
          }, {
            label: 'Senior Development Consultant (SC)',
            value: 10
          }, {
            label: 'Head of Development (SC)',
            value: 11
          }, {
            label: 'Design Lead (SC)',
            value: 12
          }, {
            label: 'Principal Development Consultant (ML)',
            value: 13
          }, {
            label: 'Head of Development (ML)',
            value: 14
          }, {
            label: 'Discipline Lead (ML)',
            value: 15
          }, {
            label: 'Design Authority (ML)',
            value: 16
          }, {
            label: 'Group Head of Development (SM)',
            value: 17
          }, {
            label: 'Group Head of Code Quality (SM)',
            value: 18
          }, {
            label: 'Design Authority (SM)',
            value: 19
          }]"
      />
    </div>
  </section>
  <section>
    <h3> Comments & Observations </h3>
    <textarea v-model="formValues.commentsAndObservations" rows="10" style="width: 100%"></textarea>
    <div id="commentsAndObservationsInvisibleContainerForPngScreenshot"> {{ formValues.commentsAndObservations }} </div>
  </section>
  <button class="export-report-btn" @click="downloadPdf"> <i class="fa fa-file-download"> </i> </button>
  <ApplicationFooter />
</template>

<script>
import RatingFaces from './components/RatingFaces.vue';
import Dropdown from './components/Dropdown.vue';
import ApplicationFooter from './components/ApplicationFooter.vue';
import Tooltip from './components/Tooltip.vue';
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
    Dropdown,
    Tooltip,
    ApplicationFooter,
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
            evaluationGrade: -1,
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
            if(type === 'checkbox' || type === 'radio' || className.indexOf('checkmark') !== -1) {
              return true;
            }
            if(tagName.toLowerCase() === 'textarea') {
              return true;
            }
            if(tagName.toLowerCase() === 'button') {
              return true;
            }
            if(className.indexOf('tooltip-container') !== -1) {
              return true;
            }
            if(className.indexOf('application-footer') !== -1) {
              return true;
            }
            if(tagName.toLowerCase() === 'label' && className.indexOf('interviewerName') !== -1) {
              const interviewerName = element.innerText.trim();
              return this.formValues.interviewers.indexOf(interviewerName) === -1;
            }
            if(tagName.toLowerCase() === 'label' && className.indexOf('option') !== -1) {
              const forAttrValue = element.getAttribute('for');
              if(forAttrValue.indexOf('evaluation-dd') !== -1 && className.indexOf('active') === -1) {
                return true;
              }
            }
            return false;
          },
          onclone: (clonedDoc) => {
            clonedDoc.getElementById('commentsAndObservationsInvisibleContainerForPngScreenshot').style.display = 'block';
          }
        })
        .then((canvas) => {
          const img = canvas.toDataURL("image/png");
          let link = document.createElement('a');
          link.download = `${this.formValues.candidateName} - FrontEnd Interview Report.png`;
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
  #app {
    margin: 0px 0px 600px;
  }
  header {
    color: #8A8A8A;
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
  input[type="number"] {
    width: 47px;
    margin: 0px 10px 0px 8px;
  }
  header input[type="text"],
  header input[type="number"] {
    font-weight: bold;
  }

  #commentsAndObservationsInvisibleContainerForPngScreenshot,
  textarea {
    font-family: 'Oswald', sans-serif;
    font-size: 17px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid;
  }
  #commentsAndObservationsInvisibleContainerForPngScreenshot {
    display: none;
    min-height: 100px;
  }
  section {
    box-shadow: 0px 0px 4px #888888bb;
    padding: 10px 25px;
    margin: 10px 10px;
    width: calc(33% - 65px);
    min-width: 300px;
    display: inline-grid;
  }
  section input {
    color: #B8B8B8;
    border-color: #8A8A8A;
    font-weight: normal;
  }
  header section {
    width: 100%;
    display: inline-block;
    margin: 10px 5px;
    background: #333333;
  }




  /* The container */
.interviewerName {
  position: relative;
  padding-left: 23px;
  cursor: pointer;
  font-size: 19px;
  color: #B8B8B8;
  font-weight: normal;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.interviewerName input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 8px;
  left: 0px;
  height: 15px;
  width: 15px;
  border-radius: 3px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.interviewerName:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.interviewerName input:checked ~ .checkmark {
  background-color: red;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.interviewerName input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.interviewerName .checkmark:after {
  left: 5px;
  top: 2px;
  width: 2px;
  height: 6px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}








  .grade-selection-dd {
    width: 250px;
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

  
  /* Scrollbar Styling */
  /* width */
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
  /**********************/
</style>
