var allData: Book[] = [];
var firstGo: boolean = true;

type Book {
  title: string,
  author: string
}

addEventListener("keydown", (event) => { })
onkeydown = (event) => { }
      
function goSearch(){
  if (firstGo == true) {allData = getTheData();
    firstGo = false;}
  searchTerm: string = document.getElementById("searcher").value;
	console.log(searchTerm);
  searchIndex = searchTerm.length -1;
  resultsfield = document.getElementById("resultsfield");
  resultsfield.innerHTML = "";
  for (var i = 0; i < allData.length; i++) {
    report = allData[i];
    if (i > -1){
      resultsfield.innerHTML += "<p>Title: " + report.title + " (" + report.author + ")" + "</p>";
      }}
}

// searchTerm is in report.title
// if (where-object $_.title -ilike "[searchTerm]****") would return it
// test() returns true/false (if true go)
// make regex from searchTerm, regex.test(report.title)
// how to use variable in regex?


function getTheData(){
return [
   {
    "title": "Wooden Star",
    "author": "William Tenn"
  },
  {
    "title": "Tomorrow Plus X",
    "author": "Wilson Tucker"
  },
  {
    "title": "Sorcery & Cecelia",
    "author": "Wrede & Stevermer"
  },
  {
    "title": "Pilgrimage",
    "author": "Zenna Henderson"
  }
]
}