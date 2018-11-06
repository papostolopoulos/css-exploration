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
    activePage: "Index",
    indexPage: "",
    activeSection: ""
  }, //End of data
  methods: {
    activeTag(event){
      var list = event.path[3].children;
      for (var i = 0; i < list.length; i++) {
        var anchorClass = list[i].children[0].children[0].className;
        list[i].children[0].children[0].className = anchorClass.replace(/\s?anchorActiveTag/, "");
      }

      event.target.className += "anchorActiveTag";
    }
  }, //End of methods
  computed: {
    whatIsActive(){
      console.log();
    }
  } //End of computed
});
