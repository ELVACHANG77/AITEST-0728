
let questions = [];
let current = 0;
let wrongs = [];

fetch('quiz_data.json')
  .then(res => res.json())
  .then(data => {
    questions = data.sort(() => Math.random() - 0.5);
    showQuestion();
  });

function showQuestion() {
  document.getElementById('result').textContent = '';
  document.getElementById('explanation').textContent = '';
  const q = questions[current];
  document.getElementById('question').textContent = q.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'option-btn';
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const q = questions[current];
  const result = document.getElementById('result');
  if (selected === q.answer) {
    result.textContent = '✅ 答對了！';
    result.style.color = 'green';
  } else {
    result.textContent = '❌ 答錯了，正確答案是：' + q.answer;
    result.style.color = 'red';
    wrongs.push(q);
  }
  document.getElementById('explanation').textContent = '解析：' + (q.explanation || '無');
}

document.getElementById('next-btn').onclick = () => {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    document.getElementById('question').textContent = '已完成所有題目';
    document.getElementById('options').innerHTML = '';
    document.getElementById('result').textContent = '';
    document.getElementById('explanation').textContent = '';
    document.getElementById('next-btn').style.display = 'none';
  }
};
