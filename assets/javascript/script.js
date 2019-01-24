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
      .replace(/&lt;/g,"<").replace(/&gt;/g,">")
      .replace(/(\*\/)[^\}]/g, "$1\n")
      .replace(/(\/\*)/g, "\n\n$1")
      .replace(/(\{)\s(\w+)/g, "$1\n   $2")
      .replace(/(;)\s(\w+)/g, "$1\n   $2")
      .replace(/(;)\s(\})/g, "$1\n$2")
      .replace(/(\})\s?(\S)/g, "$1\n\n$2")
      .trim();

      this.textAreaPracticeHtml =
      this.$el.children[1].innerHTML
      .split("</span>")[1]
      .replace(/(\s){2,}/gm, " ")
      .replace(/(<\/?\w+>)/g, "\n$1")
      .replace(/>\s?</g,">\n<")
      .replace(/(>)\s?(\w+)/g,"$1\n   $2")
      .replace(/(<\w+>)\s?(\w+)/g, "$1\n   $2")
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
      .replace(/\s[^\S]/g, "")
      .replace(/&lt;/g,"<").replace(/&gt;/g,">")
      .replace(/(\*\/)[^\}]/g, "$1\n")
      .replace(/(\/\*)/g, "\n\n$1")
      .replace(/(\{)\s(\w+)/g, "$1\n   $2")
      .replace(/(;)\s(\w+)/g, "$1\n   $2")
      .replace(/(;)\s(\})/g, "$1\n$2")
      .replace(/(\})\s?(\S)/g, "$1\n\n$2")
      .trim();

      this.textAreaPracticeHtml =
      this.$el.children[1].innerHTML
      .split("</span>")[1]
      .replace(/(\s){2,}/gm, " ")
      .replace(/(<\/?\w+>)/g, "\n$1")
      .replace(/>\s?</g,">\n<")
      .replace(/(>)\s?(\w+)/g,"$1\n   $2")
      .replace(/(<\w+>)\s?(\w+)/g, "$1\n   $2")
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
      .split("</span>")[0]
      .replace("<span>", "")
      .replace(/\s[^\S]/g, "")
      .replace(/&lt;/g,"<").replace(/&gt;/g,">")
      .replace(/(\*\/)[^\}]/g, "$1\n")
      .replace(/(\/\*)/g, "\n\n$1")
      .replace(/(\{)\s(\w+)/g, "$1\n   $2")
      .replace(/(;)\s(\w+)/g, "$1\n   $2")
      .replace(/(;)\s(\})/g, "$1\n$2")
      .replace(/(\})\s?(\S)/g, "$1\n\n$2")
      .trim();

      this.textAreaPracticeHtml =
      this.iFrameUserContent
      .split("</span>")[1]
      .replace(/(\s){2,}/gm, " ")
      .replace(/(<\/?\w+>)/g, "\n$1")
      .replace(/>\s?</g,">\n<")
      .replace(/(>)\s?(\w+)/g,"$1\n   $2")
      .replace(/(<\w+>)\s?(\w+)/g, "$1\n   $2")
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
    indexPage: "",
    activeSection: "",
  }, //End of data
  methods: {

    //UPDATES THE DISPLAY OF THE <SECTION> ELEMENTS - DISPLAYS THE ONE THAT IS
    //CURRENTLY CLICKED FROM THE <ASIDE> LINKS
    //CHANGES THE FORMAT / DISPLAY OF THE HEADINGS IN THE <ASIDE> TAG
    activeTag(event){

      //Updates the display of all sections. Makes the active section visible and the others not
      let sectionActive = "section" + this.modifyActivePage;
      let sections = document.querySelectorAll("section");
      for (let i = 0; i < sections.length; i++) {
        sectionActive === sections[i].id ?
        sections[i].style.display = "block" :
        sections[i].style.display = "none";
      }


      //Updates the styling of the aside tags h1 headings to bold
      let asideAnchors = document.querySelectorAll("aside a");
      let starter = -Infinity;

      for (let i = 0; i < asideAnchors.length; i++) {

        //Remove the bolding from the anchor that has a parent that is h1
        asideAnchors[i].className = asideAnchors[i].className.replace(/\s?anchorActiveTag/, "");

        //Remove all the classes from the list elements
        asideAnchors[i].parentNode.parentNode.className = asideAnchors[i].parentNode.parentNode.className.replace(/\s?anchor(Active|Inactive)(Tag|Heading)/g, "");

        //Hide all the <li> elements that do not nest an h1
        if (asideAnchors[i].parentNode.localName !== "h1") asideAnchors[i].parentNode.parentNode.className += " anchorInactiveHeading";

        //For starting the while loop at the position right after the h1 that represents the displayed section
        if (asideAnchors[i].className.includes("anchor" + this.modifyActivePage)) starter = i + 1;
      }

      //That is for h2 - h3 aside headings to be visible
      while(asideAnchors[starter].parentNode.localName !== "h1"){
        asideAnchors[starter].parentNode.parentNode.className = "anchorActiveHeading";
        starter ++;
      }

      //Give to the (h1 --> anchor) a class that makes it bold
      document.querySelector("a.anchor" + this.modifyActivePage).className += " anchorActiveTag";
    }, //End of activeTag method


    //CREATES ALL THE "HEADINGS" OBJECT ELEMENTS FOR THE "CHAPTERS" DATA PROPERTY.
    //THEN THE DATA IN THE "CHAPTERS" PROPERTY ARE USED FOR THE FORMATION OF THE
    //HEADINGS IN THE ASIDE TAG
    headingsFormation(){
      let hList = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
      let sectionName = "Introduction"

      hList.forEach((el, idx)=>{
        let newHeading = {};

        //If statement so that the headings in the <aside> tag are disregarded OR
        //If they are inside a <span> in the example area
        if (!el.innerText.includes("chapter.text")) {
          if (!el.parentElement.className.includes("exampleArea")) {
            newHeading.heading = el.localName;
            newHeading.text = el.innerText;

            if (el.localName === "h1") sectionName = el.innerText.replace(/\s/g, "");
            newHeading.sectionName = sectionName;

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

        if (hList[i].parentNode.localName !== "li"){
          if (hList[i].parentNode.className === "divExampleContainer" || hList[i].parentNode.className === "divPracticeContainer") {
            hList[i].id =
            hList[i].localName + "_" +
            hList[i].innerText.replace(/\s/g, "-") +
            "(" + hList[i].parentNode.parentNode.id + ")";
          }
          else {
            hList[i].id = hList[i].localName + "_" + hList[i].innerText.replace(/\s/g, "-");
          }
        }
      }
    } //End of makeId method
  }, //End of methods

  computed: {
    modifyActivePage() {
      return this.activePage.replace(/[^A-z]/g, "");
    }
  },

  beforeMount(){
    this.headingsFormation();
  },
  mounted(){
    this.makeId();
    this.activeTag();
  }
});
