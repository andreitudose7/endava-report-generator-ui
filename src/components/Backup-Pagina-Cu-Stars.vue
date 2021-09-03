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
    <h3> {{ category.areaName }} </h3>
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
          <label
            aria-label="None"
            class="rating__label"
            :for="'rating-1-' + categoryIndex + '-' + checkpointIndex"
          >
            <i class="rating__icon rating__icon--star fa fa-star"></i>
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
            aria-label="Beginner"
            class="rating__label"
            :for="'rating-2-' + categoryIndex + '-' + checkpointIndex"
          >
            <i class="rating__icon rating__icon--star fa fa-star"></i>
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
            aria-label="Intermediate"
            class="rating__label"
            :for="'rating-3-' + categoryIndex + '-' + checkpointIndex"
          >
            <i class="rating__icon rating__icon--star fa fa-star"></i>
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
            aria-label="Advanced"
            class="rating__label"
            :for="'rating-4-' + categoryIndex + '-' + checkpointIndex"
          >
            <i class="rating__icon rating__icon--star fa fa-star"></i>
          </label>
          <input
            class="rating__input"
            :name="'rating' + categoryIndex + '-' + checkpointIndex"
            :id="'rating-4-' + categoryIndex + '-' + checkpointIndex"
            value="3"
            type="radio"
            v-model="formValues.evaluation[categoryIndex].checkpoints[checkpointIndex].points"
          />
        </div>
        <p class="checkpoint-evaluation-result"> dsadsa </p>
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
    margin: 15px 0px;
  }
  section input {
    color: black;
    border-color: black;
    font-weight: normal;
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
	color: orange;
}
/* all the stars that are preceded by the checked star, should be gray - not selected */
#full-stars-example .rating__input:checked ~ .rating__label .rating__icon--star {
	color: #ddd;
}
/* whe mouse over the group, apply for all of them the following */
#full-stars-example .rating-group:hover .rating__label .rating__icon--star {
  transition-duration: 0.2s;
  transform: scale(1.2);
}
/* all the stars that are positioned after the star that has mouse over */
#full-stars-example .rating__input:hover ~ .rating__label .rating__icon--star {
  transform: scale(1);
}
#full-stars-example .rating-group:hover .rating__input--none:not(:hover) + .rating__label .rating__icon--none {
	color: #eee;
}
#full-stars-example .rating__input--none:hover + .rating__label .rating__icon--none {
	color: red;
}

#full-stars-example .rating__input--none + .rating__label.active .rating__icon--none {
	color: red !important;
}

#full-stars-example .checkpoint-evaluation-result {
  margin: 0 0 14px 0;
  text-align: center;
}
 
</style>
