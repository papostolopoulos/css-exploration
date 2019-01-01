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
    <button type="button" @click="resetContent">Reset</button>
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
      .replace(/;[^\}\*]/g, ";\n\t")
      .replace(/(\*\/)[^\}]/g, "$1\n\t")
      .replace(/\}/g, "}\n\n")
      .trim();

      this.textAreaPracticeHtml =
      this.$el.children[1].innerHTML
      .split("</span>")[1]
      .replace(/(\s){2,}/gm, " ")
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
    //Updates the iFrame content on the keyUp events.
    htmlCssCombine(event){
      event.path[1].children[2].contentDocument.body.innerHTML = this.iframeContentUpdate;
    },

    //content loaded from the <span> <slot> tag when click on "solution" button
    solutionContent(){
      this.iFrameUserContent = "<style>" + this.textAreaPracticeCss + "</style>" + this.textAreaPracticeHtml;

      this.textAreaPracticeCss =
      this.$el.children[1].innerHTML
      .split("</span>")[0]
      .replace("<span>", "")
      .replace(/(\s){2,}/gm, " ")
      .replace(/\s[^\S]/g, "")
      .replace(/\{/g, "{\n\t")
      .replace(/;[^\}\*]/g, ";\n\t")
      .replace(/(\*\/)[^\}]/g, "$1\n\t")
      .replace(/\}/g, "}\n\n")
      .trim();

      this.textAreaPracticeHtml =
      this.$el.children[1].innerHTML
      .split("</span>")[1]
      .replace(/\s{2,}/gm, "")
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
      .replace(/;[^\}\*]/g, ";\n\t")
      .replace(/(\*\/)[^\}]/g, "$1\n\t")
      .replace(/\}/g, "}\n\n")
      .trim();

      this.textAreaPracticeHtml =
      this.iFrameUserContent
      .split("</style>")[1]
      .replace(/(\s){2,}/gm, " ")
      .replace(/(<\/\w+>)/g, "\n$1")
      .replace(/(<\w+>)/g, "\n$1\n\t")
      .trim();
    },
    solutionContentExecute(){
      this.solutionContent();
      this.solutioniFrameContent();
    },
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
    activePage: "Introduction",
    //anchorActive: "anchorIntroduction", Not needed probably - test page to confirm
    indexPage: "",
    activeSection: "",
  }, //End of data
  methods: {

    //UPDATES THE TAGS DISPLAY AND DISPLAYS THE ONE THAT IS CURRENTLY CLICKED FROM THE <ASIDE> LINKS
    activeTag(event){

      //Updates the display of all sections. Makes the active section visible and the others not
      let sectionActive = "section" + this.activePage.replace(/[^A-z]/g, "");
      let sections = document.querySelectorAll("section");
      for (let i = 0; i < sections.length; i++) {
        sectionActive === sections[i].id ? sections[i].style.display = "block" : sections[i].style.display = "none";
      }


      //Updates the styling of the aside tags h1 headings to bold
      //this.anchorActive = "anchor" + this.activePage.replace(/[^A-z]/g, "");
      let asideAnchors = document.querySelectorAll("aside a")
      console.log(document.querySelectorAll("aside a"));
      console.log(event);

      /*You have to see how you can iterate through the sibling list elements
      up until you find the element that is the new h1 tag. The ones before the h1
      are the h2, h3 that should be visible. Everything else should be invisible.*/
      for (var i = 0; i < asideAnchors.length; i++) {
        //If the parent is h1, then remove anchorInactiveTag
        //Else if otherwise, add anchorInactiveTag
        var anchorClass = asideAnchors[i].className;
        asideAnchors[i].className = anchorClass.replace(/\s?anchorActiveTag/, "");
      }
      console.log(this.activePage);
      console.log("activeclick:", document.querySelector("a.anchor" + this.activePage.replace(/[^A-z]/, "")).className);
      document.querySelector("a.anchor" + this.activePage.replace(/[^A-z]/, "")).className += " anchorActiveTag";
      // if (!event.target.className.includes("anchorActiveTag")) event.target.className += " anchorActiveTag";


      //YOU NEED TO ACTIVATE THIS
      // for (let i = asideAnchors.indexOf("a." + THE ACTIVE TAG NAME HERE + The name of the class tag?) + 1; i < asideAnchors.length; i++) {
      // 	if (asideAnchors[i].length == 1) {
      // 		console.log(i, headingsArr[i]);
      // 	}
      // 	else {
      // 		break;
      // 	}
      // }


    }, //End of activeTag method


    //CREATES ALL THE HEADINGS IN THE ASIDE TAG BASED ON THE HEADINGS IN THE MAIN AREA OF PAGE
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
    }, //End of headingsFormation method


    //CREATES IDS FOR ALL THE HEADING TAGS THAT DO NOT BELONG IN THE ASIDE TAG
    makeId(){
      let hList = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

      for(let i = 0; i < hList.length; i++){
        if (hList[i].parentNode.className === "spanSolutionArea") continue;

        if (hList[i].parentNode.localName !== "li")
          hList[i].id = hList[i].localName + "_" + hList[i].innerText.replace(/\s/g, "-");
      }
    } //End of makeId method
  }, //End of methods

  beforeMount(){
    this.headingsFormation();
  },
  mounted(){
    this.makeId();
  }
});
