// const htmlFile = document.getElementById('htmlEditor');
// const cssFile = document.getElementById('cssEditor');
// const jsFile = document.getElementById('jsEditor');
const output = document.getElementById("preview").contentDocument;
const runBtn = document.getElementById("runBtn");

runBtn.addEventListener('click', () => {
  updateOutput();
})

const htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlEditor"), {
  mode: "htmlmixed",
  theme: "monokai",
  lineNumbers: true,
  matchBrackets: true,
  autoCloseTags: true,
  indentUnit: 2,
  smartIndent: false,
  // extraKeys: {
  //   "Enter": function(cm) {
  //     cm.execCommand("newlineAndIndent");
  //   }
  // }
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById("cssEditor"), {
  mode: "css",
  theme: "monokai",
  lineNumbers: true,
  matchBrackets: true
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById("jsEditor"), {
  mode: "javascript",
  theme: "monokai",
  lineNumbers: true,
  matchBrackets: true
});


// Function to update the output
function updateOutput() {

  const htmlContent = htmlEditor.getValue();
  const cssContent = cssEditor.getValue();
  const jsContent = jsEditor.getValue();

  const combinedContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
          *{
             font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
           }
          ${cssContent}
          </style>
      </head>
      <body>
          ${htmlContent}
          <script>${jsContent}<\/script>
      </body>
      </html>
  `;

  output.open();
  output.write(combinedContent);
  output.close();
}


function loadCode() {
  let savedCode = localStorage.getItem("savedCode");
  if (savedCode) {
    document.getElementById("combinedContent").value = savedCode;
  } else {
    alert("No saved code found.");
  }
}

// function saveCode() {
//   let code = document.getElementById("code").value;
//   localStorage.setItem("savedCode", code);
//   alert("Code saved!");
// }

const editorPane = document.querySelectorAll('.editor-pane')
const tabs = document.querySelectorAll('.tab')
const files = document.querySelectorAll('.file');

files.forEach((file) => {
  file.addEventListener("click", (f) => {
    // let presentState = f.target.innerText;
    // presentState = presentState.replace(/\./g, "");
    let presentState = f.currentTarget.dataset.file;
    switchTab(presentState)
  })
})

tabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    let presentState = e.target.innerText;
    presentState = presentState.replace(/\./g, "");
    switchTab(presentState);
  })
})

function switchTab(editorId) {
  document.querySelectorAll(".editor-pane").forEach((editor) => {
    editor.classList.remove("active");
  });
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".file").forEach((file) => {
    file.classList.remove("active");
  });

  let t = document.querySelector(`.tab[data-file="${editorId}"]`)
  let f = document.querySelector(`.file[data-file="${editorId}"]`)
  let edit = document.querySelector(`.${editorId}`);

  if (editorId === 'stylescss') {
    css();
  } else if (editorId === "scriptjs") {
    js()
  }


  t.classList.add('active');
  f.classList.add('active');
  edit.classList.add('active');
}
