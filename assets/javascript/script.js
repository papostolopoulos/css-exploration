var app = new Vue({
  el: "#container",
  data: {
    hello: "Hello there. This is the vue related script",
    chapters: [],
    activePage: "Index",
    indexPage: "",
    activeSection: "",
    makeAMess: [

    ]
  }, //End of data
  methods: {
    activeTag(event){
      let list = event.path[3].children;
      for (var i = 0; i < list.length; i++) {
        var anchorClass = list[i].children[0].children[0].className;
        list[i].children[0].children[0].className = anchorClass.replace(/\s?anchorActiveTag/, "");
      }

      if (!event.target.className.includes("anchorActiveTag")) event.target.className += "anchorActiveTag";
    },
    headingsFormation(){
      let hList = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

      hList.forEach((el, idx)=>{
        // console.log(el.innerText);
        let newHeading = {};

        //If statement so that the headings in the <aside> tag are disregarded
        if (!el.innerText.includes("chapter.text")) {
          newHeading.heading = el.localName;
          newHeading.text = el.innerText;
          this.chapters.push(newHeading);
        }
      });
    },
    makeId(){
      let hList = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

      for(let i = 0; i < hList.length; i++){
        hList[i].id = hList[i].localName + "_" + hList[i].innerText.replace(/\s/g, "-");
      }
    }
  }, //End of methods
  computed: {
  },
  beforeMount(){
    this.headingsFormation();
  },
  mounted(){
    this.makeId();
  }
});
