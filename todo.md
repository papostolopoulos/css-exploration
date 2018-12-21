[] the class .exampleArea. Do I need to reconsider about removing it from the html
and put it in the Vue component instead? The problem has to do with the this.headingsFormation()
method that runs "beforeMount" (used for setting up the headings).
If I put a heading in the span within the exampleArea, then it will be run in the
aside tag.

[X] create function for buttonExampleArea to reset the data inside the textAreaPracticeCss and
textAreaPracticeHtml, and consequently change the display in the iFramePractice

[] Create effect where the aside headings that are h2 or less disappear when clicking on an h1
that represents a different <section>. Instead, the headings of the specific section
should appear instead.

[] Create effect where the bolding of the headings in the aside tag changes when the
user scrolls through the page.

[] Figure out if you are going to use v-show or something else. When clicking on the
headings, why do you need to click twice to be directed to the expected area when "v-show"
is active?

[] Preset the "Index" heading in the aside area has a preset color of rgb(0, 79, 128)

[] Change "Index" to "Introduction" among html and Vue
