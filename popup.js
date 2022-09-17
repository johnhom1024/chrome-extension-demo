let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', ({ color }) => {
  changeColor.style.backgroundColor = color;
});

changeColor.addEventListener('click', async () => {
  console.log('handle click here');
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: setPageBackgroundColor,
  });
});

function setPageBackgroundColor() {
  console.log('execute setPageBackgroundColor');
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  })
}
