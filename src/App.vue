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

      <div class="select" tabindex="1">
        <input
          class="selectopt"
          value="-1"
          :name="category.areaName + '-evaluation-dd'"
          type="radio"
          :id="category.areaName + '-evaluation-option-None'"
          v-model="formValues.evaluation[categoryIndex].points"
        />
        <label :for="category.areaName + '-evaluation-option-None'" class="option">None</label>
        <input
          class="selectopt"
          value="0"
          :name="category.areaName + '-evaluation-dd'"
          type="radio"
          :id="category.areaName + '-evaluation-option-Beginner'"
          v-model="formValues.evaluation[categoryIndex].points"
        />
        <label :for="category.areaName + '-evaluation-option-Beginner'" class="option">Beginner</label>
        <input
          class="selectopt"
          value="1"
          :name="category.areaName + '-evaluation-dd'"
          type="radio"
          :id="category.areaName + '-evaluation-option-Intermediate'"
          v-model="formValues.evaluation[categoryIndex].points"
        />
        <label :for="category.areaName + '-evaluation-option-Intermediate'" class="option">Intermediate</label>
        <input
          class="selectopt"
          value="2"
          :name="category.areaName + '-evaluation-dd'"
          type="radio"
          :id="category.areaName + '-evaluation-option-Advanced'"
          v-model="formValues.evaluation[categoryIndex].points"
        />
        <label :for="category.areaName + '-evaluation-option-Advanced'" class="option">Advanced</label>
      </div>
    </div>

    <div v-for="(checkpoints, checkpointIndex) in category.checkpoints" :key="checkpoints.title" style="display: flex; justify-content: space-between;">
      <p> {{ checkpoints.title }} </p>
      
      <div id="full-stars-example">
        <div class="rating-group">
          <input
            class="rating__input rating__input--none"
            :name="'rating' + categoryIndex + '-' + checkpointIndex"
            :id="'rating-0-' + categoryIndex + '-' + checkpointIndex"
            value="-1"
            type="radio"
            v-model="formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points"
          />
          <label
            aria-label="Not evaluated"
            :class="{
              'rating__label': true,
              'active': formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points == -1
            }"
            :for="'rating-0-' + categoryIndex + '-' + checkpointIndex"
          >
            <i class="rating__icon rating__icon--none fa fa-ban"></i>
          </label>
          <input
            class="rating__input"
            :name="'rating' + categoryIndex + '-' + checkpointIndex"
            :id="'rating-1-' + categoryIndex + '-' + checkpointIndex"
            value="0"
            type="radio"
            v-model="formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points"
          />
          <label
            aria-label="None"
            :class="{
              'rating__label': true,
              'active': formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points == 0
            }"
            :for="'rating-1-' + categoryIndex + '-' + checkpointIndex"
          >
            <i class="rating__icon rating__icon--star fa fa-frown"></i>
          </label>
          <input
            class="rating__input"
            :name="'rating' + categoryIndex + '-' + checkpointIndex"
            :id="'rating-2-' + categoryIndex + '-' + checkpointIndex"
            value="1"
            type="radio"
            v-model="formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points"
          />
          <label
            aria-label="Beginner"
            :class="{
              'rating__label': true,
              'active': formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points == 1
            }"
            :for="'rating-2-' + categoryIndex + '-' + checkpointIndex"
          >
            <i class="rating__icon rating__icon--star fa fa-meh"></i>
          </label>
          <input
            class="rating__input"
            :name="'rating' + categoryIndex + '-' + checkpointIndex"
            :id="'rating-3-' + categoryIndex + '-' + checkpointIndex"
            value="2"
            type="radio"
            v-model="formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points"
          />
          <label
            aria-label="Intermediate"
            :class="{
              'rating__label': true,
              'active': formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points == 2
            }"
            :for="'rating-3-' + categoryIndex + '-' + checkpointIndex"
          >
            <i class="rating__icon rating__icon--star fa fa-grin-alt"></i>
          </label>
          <input
            class="rating__input"
            :name="'rating' + categoryIndex + '-' + checkpointIndex"
            :id="'rating-4-' + categoryIndex + '-' + checkpointIndex"
            value="3"
            type="radio"
            v-model="formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points"
          />
          <label
            aria-label="Advanced"
            :class="{
              'rating__label': true,
              'active': formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points == 3
            }"
            :for="'rating-4-' + categoryIndex + '-' + checkpointIndex"
          >
            <i class="rating__icon rating__icon--star fa far fa-grin-wink"></i>
          </label>
        </div>
      </div>

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
import evaluationForm from './interview-questions/evaluationFormat';
export default {
  name: 'App',
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







.select {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 160px;
  height: 40px;
}

.select .option {
  padding:0 30px 0 10px;
  min-height:40px;
  display:flex;
  align-items:center;
  background:#eee;
  border-top:#eee solid 1px;
  position:absolute;
  top:0;
  width: 100%;
  pointer-events:none;
  order:2;
  z-index:1;
  transition:background .4s ease-in-out;
  box-sizing:border-box;
  overflow:hidden;
  white-space:nowrap;
}

.select .option:hover {
  background:#eee;
}

.select:focus .option {
  position:relative;
  pointer-events:all;
}

.select input {
  opacity: 0;
  position: absolute;
  left: -99999px;
}

.select input:checked + label {
  order: 1;
  z-index:2;
  background: #eee;
  border-top:none;
  position:relative;
}

.select input:checked + label:after {
  content:'';
  width: 0; 
	height: 0; 
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 5px solid white;
  position:absolute;
  right:10px;
  top:calc(50% - 2.5px);
  pointer-events:none;
  z-index:3;
}

.select input:checked + label:before {
  position:absolute;
  right:0;
  height: 40px;
  width: 40px;
  content: '';
  background:#eee;
}






/* * Pure CSS star rating that works without reversing order * of inputs * ------------------------------------------------------- * NOTE: For the styling to work, there needs to be a radio * input selected by default. There also needs to be a * radio input before the first star, regardless of * whether you offer a 'no rating' or 0 stars option * * This codepen uses FontAwesome icons */ 
#full-stars-example .rating-group {
	display: inline-flex;
}
#full-stars-example .rating__icon {
	pointer-events: none;
}
#full-stars-example .rating__input {
	display: none;
}
#full-stars-example .rating__label {
	cursor: pointer;
	padding: 0 0.1em;
	font-size: 2rem;
}

/* by default, the first radio - the one that is not star - should be gray - not selected */
#full-stars-example .rating__icon--none {
	color: #eee;
}
/* if the first radio - the one that is not star - is checked, then should be red */
#full-stars-example .rating__input--none:checked + .rating__label .rating__icon--none {
	color: red;
}
/* the default for the stars */
#full-stars-example .rating__icon--star {
	color: #eee;
}
#full-stars-example .rating__label:hover {
  transition-duration: 0.2s;
  transform: scale(1.2);
}
#full-stars-example .rating__input--none:hover + .rating__label .rating__icon--none {
	color: red;
}
#full-stars-example .rating__label.active .rating__icon--none {
	color: red !important;
}
#full-stars-example .rating__label[aria-label="None"].active .rating__icon--star {
	color: #ff3838 !important;
}
#full-stars-example .rating__label[aria-label="Beginner"].active .rating__icon--star {
	color: #ebe800 !important;
}
#full-stars-example .rating__label[aria-label="Intermediate"].active .rating__icon--star {
	color: #6eff1d !important;
}
#full-stars-example .rating__label[aria-label="Advanced"].active .rating__icon--star {
	color: #2dccff !important;
} 
</style>
