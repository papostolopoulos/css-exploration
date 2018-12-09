var practiceArea = Vue.component("practice-area",{
  data: function() {
    return {
      textAreaPracticeHtml: "",
      textAreaPracticeCss: "",
      iframeContent: ""
    }
  },
  template: `
  <div class="divPractice">
    <textarea
    class="textAreaPracticeHtml"
    placeholder="Add your html"
    v-model="textAreaPracticeHtml"
    @keyup="htmlCssCombine($event)"
    ></textarea>
    <textarea
    class="textAreaPracticeCss"
    placeholder="Add your css"
    v-model = "textAreaPracticeCss"
    @keyup="htmlCssCombine($event)"
    ></textarea>
    <iframe src="" width="" height="" class="iFramePractice" id="testFrame"></iframe>
  </div>
  `,
  computed: {
    iframeContentUpdate() {
      return "<style>" + this.textAreaPracticeCss + "</style>" + this.textAreaPracticeHtml;
    }
  },
  methods: {
    htmlCssCombine(event){
      event.path[1].children[2].contentDocument.body.innerHTML = this.iframeContentUpdate;
    }
  }
});

var app = new Vue({
  el: "#container",
  data: {
    chapters: [],
    activePage: "Index",
    indexPage: "",
    activeSection: "",
  }, //End of data
  methods: {
    activeTag(event){
      //KEEP THIS LINE IN CASE YOU DON'T WANT TO DO THE CHANGE THROUGH THE HTML
      //ON THE @CLICK EVENT
      // this.activePage = event.target.innerHTML.trim();

      // console.log("location hash:", location.hash);
      // console.log("event target hash (what I want it to change it to):", event.target.hash);
      // console.log("window.location.hash:", window.location.hash);
      // window.location.hash = "";
      // top.location.hash = "";
      // window.location.href = window.location.href.replace(/#.*/, "") + event.target.hash;
      // window.location.href = window.location.origin+window.location.pathname+event.target.hash;
      window.location.assign(document.location.origin+document.location.pathname+event.target.hash);
      // console.log("-------------------");
      // console.log("location hash:", location.hash);
      // console.log("event target hash (what I want it to change it to):", event.target.hash);
      // console.log("window.location.hash:", window.location.hash);
      // top.location.assign(top.location.origin + top.location.pathname+event.target.hash);
      // console.log(window.location.href);

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
        if (hList[i].parentNode.localName !== "li")
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
