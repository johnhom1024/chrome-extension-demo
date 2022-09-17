let page = document.getElementById('buttonDiv');

let selectedClassName = 'current';

const presetButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function handleButtonClick(event) {
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );

  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // 获取按钮中储存的颜色信息
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  // 设置到浏览器的缓存中
  chrome.storage.sync.set({ color });
}

function constructOptions(buttonColors) {
  chrome.storage.sync.get('color', (data) => {
    let currentColor = data.color;

    for (let buttonColor of buttonColors) {
      let button = document.createElement('button');
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      button.addEventListener('click', handleButtonClick);

      // 在buttonDiv内添加节点到最后一个位置
      page.appendChild(button);
    }
  });
}

constructOptions(presetButtonColors);
