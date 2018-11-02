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
      "006": "Responsive Design",
      "007": "more a",
      "008": "More b",
      "009": "More c",
      "010": "This is ten"
    },
    activePage: "Reset",
    indexPage: ""
  }, //End of data
  methods: {
    chapterChange() {
      console.log(event);
    }
  }, //End of methods
  computed: {
  } //End of computed
});
