import interviewers from './question-categories/interviewers'
import general from './question-categories/general';
import http from './question-categories/http';
import html from './question-categories/html';
import css from './question-categories/css';
import js from './question-categories/js';
import designPatterns from './question-categories/designPatterns';
import designPrinciples from './question-categories/designPrinciples';
import moduleLoaders from './question-categories/moduleLoaders';
import frameworks from './question-categories/frameworks';
import build from './question-categories/build';
import testing from './question-categories/testing';
import versionControl from './question-categories/versionControl';
import agile from './question-categories/agile';

export default {
    head: {
        interviewers
    },
    questions: [
        general,
        http,
        html,
        css,
        js,
        designPatterns,
        designPrinciples,
        moduleLoaders,
        frameworks,
        build,
        testing,
        versionControl,
        agile
    ]
}