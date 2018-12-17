var exampleArea = Vue.component("example-area",{
  template: `
  <div>
    <div class="divExample">
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
    <span class="spanExampleArea"><slot></slot></span>
    <div class="buttonExampleArea">
    <button type="button" @click="resetContent">Reset Example</button>
    </div>
  </div>
  `,
  data: function() {
    return {
      textAreaPracticeHtml: "",
      textAreaPracticeCss: "",
    }
  },
  computed: {
    iframeContentUpdate() {
      return "<style>" + this.textAreaPracticeCss + "</style>" + this.textAreaPracticeHtml;
    }
  },
  methods: {
    htmlCssCombine(event){
      event.path[1].children[2].contentDocument.body.innerHTML = this.iframeContentUpdate;
    },
    preSetContent(){ //Content extracted from the <span> <slot>
      this.textAreaPracticeCss =
      this.$el.children[1].innerHTML
      .split("</span>")[0]
      .replace("<span>", "")
      .replace(/\s[^\S]/g, "")
      .replace(/\{/g, "{\n\t")
      .replace(/;[^\}]/g, ";\n\t")
      .replace(/\}/g, "}\n\n")
      .trim();

      this.textAreaPracticeHtml =
      this.$el.children[1].innerHTML
      .split("</span>")[1]
      .replace(/(<\/\w+>)/g, "\n$1")
      .replace(/(<\w+>)/g, "\n$1\n\t")
      .trim();
    },
    preSetiFrameContent(){ //Content that is being pre-loaded from the computed property
      this.$el.children[0].children[2].contentDocument.body.innerHTML =
      "<style>" + this.textAreaPracticeCss + "</style>" + this.textAreaPracticeHtml;
    },
    resetContent(){
      this.preSetContent();
      this.preSetiFrameContent();
    }
  },
  beforeMount(){
  },
  mounted() {
    this.preSetContent();
    this.preSetiFrameContent();
  }
});




var practiceArea = Vue.component("practice-area",{
  template: `
  <div>
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
      <iframe src="" width="" height="" class="iFramePractice"></iframe>
    </div>
    <span class="spanSolutionArea"><slot></slot></span>
    <div class="buttonExampleArea">
      <button @click="solutionContentExecute">Solution</button>
      <button @click="yourEdits">Your edits</button>
    </div>
  </div>
  `,
  data: function() {
    return {
      textAreaPracticeHtml: "",
      textAreaPracticeCss: "",
      iFrameUserContent: "",
    }
  },
  computed: {
    iframeContentUpdate() {
      return "<style>" + this.textAreaPracticeCss + "</style>" + this.textAreaPracticeHtml;
    }
  },
  methods: {
    htmlCssCombine(event){ //Updates the iFrame content on the keyUp events.
      event.path[1].children[2].contentDocument.body.innerHTML = this.iframeContentUpdate;
    },
    solutionContent(){ //content loaded from the <span> <slot> tag when click on "solution" button
      this.iFrameUserContent = "<style>" + this.textAreaPracticeCss + "</style>" + this.textAreaPracticeHtml;

      this.textAreaPracticeCss =
      this.$el.children[1].innerHTML
      .split("</span>")[0]
      .replace("<span>", "")
      .replace(/\s[^\S]/g, "")
      .replace(/\{/g, "{\n\t")
      .replace(/;[^\}]/g, ";\n\t")
      .replace(/\}/g, "}\n\n")
      .trim();

      this.textAreaPracticeHtml =
      this.$el.children[1].innerHTML
      .split("</span>")[1]
      .replace(/(<\/\w+>)/g, "\n$1")
      .replace(/(<\w+>)/g, "\n$1\n\t")
      .trim();
    },
    solutioniFrameContent(){
      this.$el.children[0].children[2].contentDocument.body.innerHTML =
      "<style>" + this.textAreaPracticeCss + "</style>" + this.textAreaPracticeHtml;
    },
    yourEdits(){
      this.$el.children[0].children[2].contentDocument.body.innerHTML = this.iFrameUserContent;

      this.textAreaPracticeCss =
      this.iFrameUserContent
      .split("</style>")[0]
      .replace("<style>", "")
      .replace(/\s[^\S]/g, "")
      .replace(/\{/g, "{\n\t")
      .replace(/;[^\}]/g, ";\n\t")
      .replace(/\}/g, "}\n\n")
      .trim();

      this.textAreaPracticeHtml =
      this.iFrameUserContent
      .split("</style>")[1]
      .replace(/(<\/\w+>)/g, "\n$1")
      .replace(/(<\w+>)/g, "\n$1\n\t")
      .trim();
    },
    solutionContentExecute(){
      this.solutionContent();
      this.solutioniFrameContent();
    }
  }, //End of methods
  mounted() {
    // this.solutionContent();
    // this.solutioniFrameContent();
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
      // window.location.assign(document.location.origin+document.location.pathname+event.target.hash);
      // console.log("-------------------");
      // console.log("location hash:", location.hash);
      // console.log("event target hash (what I want it to change it to):", event.target.hash);
      // console.log("window.location.hash:", window.location.hash);
      // top.location.assign(top.location.origin + top.location.pathname+event.target.hash);
      // console.log(window.location.href);

      //Give the bolding effect to the clicked element of the <aside> tag.
      console.log(event.target);
      console.log(event.target.parentElement);
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
        // console.log("innerText", el.innerText);
        let newHeading = {};

        //If statement so that the headings in the <aside> tag are disregarded OR
        //If they are inside a <span> in the example area
        if (!el.innerText.includes("chapter.text")) {
          if (!el.parentElement.className.includes("exampleArea")) {
            newHeading.heading = el.localName;
            newHeading.text = el.innerText;
            this.chapters.push(newHeading);
          }
        }
      });
    },
    makeId(){
      let hList = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

      for(let i = 0; i < hList.length; i++){
        if (hList[i].parentNode.className === "spanSolutionArea") continue;

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
