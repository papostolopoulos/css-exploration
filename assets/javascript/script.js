var app = new Vue({
  el: "#container",
  data: {
    hello: "Hello there. This is the vue related script",
    chapters: {
      "000": "Reset",
      "001": "Specificity",
      "002": "Box Model",
      "003": "Positioning",
      "004": "Typography", //Do I need to change the positioning of this so that it is after the backgrounds?
      "005": "Backgrounds",
      "006": "Transforms",
      "007": "more a",
      "008": "More b",
      "009": "More c",
      "010": "This is ten"
    },
    activePage: "Transforms",
    indexPage: "",
    activeSection: ""
  }, //End of data
  methods: {
    chapterChange() {
      console.log(event.target.id);
    }
  }, //End of methods
  computed: {
    whatIsActive(){
      console.log();
    }
  } //End of computed
});
