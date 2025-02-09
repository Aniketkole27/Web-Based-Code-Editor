const htmlFile = document.getElementById('htmlEditor');
const cssFile = document.getElementById('cssEditor');
const jsFile = document.getElementById('jsEditor');
const output = document.getElementById("preview").contentDocument;
const runBtn = document.getElementById("runBtn");

runBtn.addEventListener('click', () => {
  updateOutput();
})

// Function to update the output
function updateOutput() {
  const htmlContent = htmlFile.value;
  const cssContent = cssFile.value;
  const jsContent = jsFile.value;

  const combinedContent = `
          <!DOCTYPE html>
          <html>
              <head>
                  <style>${cssContent}</style>
              </head>
              <body>
                  ${htmlContent}
                  <script>${jsContent}</script>
              </body>
          </html>
      `;

  output.open();
  output.write(combinedContent);
  output.close();
}

const editorPane = document.querySelectorAll('.editor-pane')
const tabs = document.querySelectorAll('.tab')
const files = document.querySelectorAll('.file');

files.forEach((file) => {
  file.addEventListener("click", (f) => {
    let presentState = f.target.innerText;
    presentState = presentState.replace(/\./g, "");
    switchTab(presentState)
  })
})

tabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    let presentState = e.target.innerText;
    presentState = presentState.replace(/\./g, "");
    switchTab(presentState)
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

  // const editor = document.getElementById(editorId);
  let t = document.querySelector(`.tab[data-file="${editorId}"]`)
  let f = document.querySelector(`.file[data-file="${editorId}"]`)
  let edit = document.querySelector(`.${editorId}`);
  console.log(edit)
  t.classList.add('active');
  f.classList.add('active');
  edit.classList.add('active');
}