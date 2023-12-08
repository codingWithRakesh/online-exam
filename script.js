//creating an array and passing the number, question, options, and answear
let questions = [

	{
		numb: 1,
		question: "A high quality CAD system uses the following for printing drawing and graphs",
		answear: "Digital plotter",
		options: [
			"Dot matrix printer",
			"Digital plotter",
			"Line printer",
			"All of the above"
		]
	},
	{
		numb: 2,
		question: "A co-processor",
		answear: "Is relatively easy to support in software",
		options: [
			"Is relatively easy to support in software",
			"Causes all processor to function equally",
			"Works with any application",
			"Is quite common in modern computer"
		]
	},
	{
		numb: 3,
		question: "A Microsoft Windows is .....a(n)",
		answear: "Operating system",
		options: [
			"Operating system",
			"Graphic program",
			"Word Processing",
			"Database program"
		]
	},
	{
		numb: 4,
		question: "Which is not application software?",
		answear: "Windows NT",
		options: [
			"Windows NT",
			"Page Maker",
			"WinWord XP",
			"Photoshop"
		]
	},
	{
		numb: 5,
		question: "The ..... program compresses large files into a smaller file",
		answear: "WinZip",
		options: [
			"WinZip",
			"Win Shrink",
			"Win Style",
			"None of above"
		]
	},
	{
		numb: 6,
		question: "Which key is used to center the paragraph",
		answear: "Ctrl + E",
		options: [
			"Ctrl + V",
			"Ctrl + C",
			"Ctrl + X",
			"Ctrl + E"
		]
	},
	{
		numb: 7,
		question: "Which command is used to quickly reverse the most executed command.",
		answear: "Undo",
		options: [
			"Cut",
			"Copy",
			"Redo",
			"Undo"
		]
	},
	{
		numb: 8,
		question: "To print a page , the paper may be in two Orientation.",
		answear: "a & b",
		options: [
			"Portrait",
			"Landscape",
			"a & b",
			"None of these"
		]
	},
	{
		numb: 9,
		question: "Margin option are available in which tab",
		answear: "page layout",
		options: [
			"Insert",
			"page layout",
			"Format",
			"None of these"
		]
	},
	{
		numb: 10,
		question: "Microsoft Excel is an electronic.",
		answear: "Spreadsheet",
		options: [
			"Datasheet",
			"Spreadsheet",
			"Balancesheet",
			"None of these"
		]
	}
];

//getting all required elements.
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");
var elem = document.documentElement;
var name1 = "";

const option_list = document.querySelector(".option_list");

function fun1() {
	name1 = document.getElementById('nameId').value;
}
function fun2() {
	document.getElementById("showArea").innerHTML = name1;
}

//if Start Exam Button Clicked
start_btn.onclick = () => {
	info_box.classList.add("activeInfo"); //show the info box
}

//if exit Button Clicked
exit_btn.onclick = () => {
	info_box.classList.remove("activeInfo"); //hidden the info box
}

//if continue Button Clicked
continue_btn.onclick = () => {
	info_box.classList.remove("activeInfo"); //hidden the info box
	quiz_box.classList.add("activeQuiz"); //Show the exam box
	showQuestions(0);
	queCounter(1);
	startTimer(30); 
	startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counter1;
let counterLine;
let timeValue = 30; 
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
	var btn1 = document.getElementById('printId');
	var button2 = document.getElementById('quiteExam');
	btn1.style.visibility = "hidden";
	button2.style.visibility = "hidden";
	window.print();

	setTimeout(shoePrint, 1000);
	function shoePrint() {
		btn1.style.visibility = "visible";
		button2.style.visibility = "visible";
		elem.requestFullscreen();
	}
	//Shreeman Narayan Narayan Hari Hari

}

quit_quiz.onclick = () => {
	window.location.reload();
}

//if next button clicked
next_btn.onclick = () => {
	clearInterval(counter1);
	if (que_count < questions.length - 1) {
		que_count++;
		que_numb++;
		showQuestions(que_count);
		queCounter(que_numb);
		clearInterval(counter);
		startTimer(timeValue);
		clearInterval(counterLine);
		startTimerLine(widthValue);
		next_btn.style.display = "none";
		timeOff.textContent = "Time Left";
	} else {
		clearInterval(counter);
		clearInterval(counterLine);
		console.log('Question complete');
		next_btn.innerHTML = 'Result';
		showResultBox();
	}
}

function nextQuestion() {
	if (que_count < questions.length - 1) {
		que_count++;
		que_numb++;
		showQuestions(que_count);
		queCounter(que_numb);
		clearInterval(counter);
		startTimer(timeValue);
		clearInterval(counterLine);
		startTimerLine(widthValue);
		next_btn.style.display = "none";
		timeOff.textContent = "Time Left";
	} else {
		clearInterval(counter);
		clearInterval(counterLine);
		console.log('Question complete');
		showResultBox();
	}
}

//getting question and option for array
function showQuestions(index) {
	const que_text = document.querySelector(".que_text");
	let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
	let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
		+ '<div class="option">' + questions[index].options[1] + '<span></span></div>'
		+ '<div class="option">' + questions[index].options[2] + '<span></span></div>'
		+ '<div class="option">' + questions[index].options[3] + '<span></span></div>'
	que_text.innerHTML = que_tag;
	option_list.innerHTML = option_tag;
	const option = option_list.querySelectorAll(".option");
	for (var i = 0; i < option.length; i++) {
		option[i].setAttribute("onclick", "optionSelected(this)");
	}
}

let tickIcon = '<div class="icon tick"><svg width="24" height="24" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg></div>';
//<div class="icon tick"><i class="fa fa-check"></i></div>
let crossIcon = '<div class="icon cross"><svg width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></div>';
//<div class="icon cross"><i class="fa fa-times"></i></div>

function optionSelected(answer) {
	clearInterval(counter);
	clearInterval(counterLine);
	let userAns = answer.textContent;
	let correctAns = questions[que_count].answear;
	let alloptions = option_list.children.length;
	if (userAns == correctAns) {
		userScore += 1;
		console.log(userScore);
		answer.classList.add("correct");
		answer.insertAdjacentHTML("beforeend", tickIcon);
	} else {
		answer.classList.add("incorrect");
		answer.insertAdjacentHTML("beforeend", crossIcon);

		//if answers is incorrect then automtically selected the correct answer
		for (var i = 0; i < alloptions; i++) {
			if (option_list.children[i].textContent == correctAns) {
				option_list.children[i].setAttribute("class", "option correct");
				option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
			}
		}
	}

	//once user selected disabled all options
	for (var i = 0; i < alloptions; i++) {
		option_list.children[i].classList.add("disabled");
	}
	if (que_count == 9) {
		next_btn.innerHTML = 'Submit';
	}
	next_btn.style.display = "block";
	counter1 = setTimeout(nextQuestion, 5000);
}

function showResultBox() {
	info_box.classList.remove("activeInfo"); //hidden the info box
	quiz_box.classList.remove("activeQuiz"); //hide the exam box.
	result_box.classList.add("activeResult"); //Show the result box.
	const scoreText = result_box.querySelector(".score_text");
	if (userScore >= 9) {
		let scoreTag = '<span> Outstanding, <p id="showArea"></p><span class="grade">(AA)</span>. You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else if (userScore >= 8) {
		let scoreTag = '<span> Excellent, <p id="showArea"></p><span class="grade">(A+)</span>. You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else if (userScore >= 7) {
		let scoreTag = '<span> Very Good, <p id="showArea"></p><span class="grade">(A)</span>. You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else if (userScore >= 6) {
		let scoreTag = '<span> Good, <p id="showArea"></p><span class="grade">(B+)</span>. You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else if (userScore >= 5) {
		let scoreTag = '<span> Satisfactory, <p id="showArea"></p><span class="grade">(B)</span>. You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else if (userScore >= 4) {
		let scoreTag = '<span> Average , <p id="showArea"></p><span class="grade">(C+)</span>. You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else if (userScore >= 3) {
		let scoreTag = '<span> Marginal, <p id="showArea"></p><span class="grade">(C)</span>. You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else {
		let scoreTag = '<span> Fail, <p id="showArea"></p><span class="grade">(D)</span>. You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	fun2()
}

function startTimer(time) {
	counter = setInterval(timer, 1000);
	function timer() {
		timeCount.textContent = time;
		time--;
		if (time < 9) {
			let addZero = timeCount.textContent;
			timeCount.textContent = "0" + addZero;
		}
		if (time < 0) {
			clearInterval(counter);
			timeCount.textContent = '00';
			timeOff.textContent = "Time Off";

			let correctAns = questions[que_count].answear;
			let alloptions = option_list.children.length;

			for (var i = 0; i < alloptions; i++) {
				if (option_list.children[i].textContent == correctAns) {
					option_list.children[i].setAttribute("class", "option correct");
					option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
				}
			}
			for (var i = 0; i < alloptions; i++) {
				option_list.children[i].classList.add("disabled");
			}
			next_btn.style.display = "block";
		}
	}
}

function startTimerLine(time) {
	if (screen.width <= 500) {
		counterLine = setInterval(timer, 85);//(timer, 29)
		function timer() {
			time += 1;
			timeLine.style.width = time + "px";
			if (time > 359) {
				clearInterval(counterLine);
			}
		}
	}	
	else {
		counterLine = setInterval(timer, 56);//(timer, 29)
		function timer() {
			time += 1;
			timeLine.style.width = time + "px";
			if (time > 549) {
				clearInterval(counterLine);
			}
		}
	}
}

function queCounter(index) {
	const bottom_ques_counter = quiz_box.querySelector(".total_que");
	let totalQuesCounTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
	bottom_ques_counter.innerHTML = totalQuesCounTag;
}



  const disabledKeys=["u","I","c","o","s","p","a","b","d","e","f","g","h","i","j","k","l","m","n","q","r","t","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0","Shift","C",",",".","/","?","`","~","!","@","#","$","%","^","&","*","(",")","-","_","=","+","Q","W","E","R","T","Y","U","I","O","P","[","{","}","]","|","A","S","D","F","G","H","J","K","L",";","'",":","Z","X","V","B","N","M","<",">","Enter"];
  const showAlert=e=>{e.preventDefault();
  return cheting();}
document.addEventListener("contextmenu",e=>{showAlert(e);});
document.addEventListener("keydown",e=>{if(e.ctrlKey&&disabledKeys.includes(e.key)||e.key==="F12"){showAlert(e);}});



// var elem = document.documentElement;
setInterval(checkFullScreen, 2000);
var count = 0
function checkFullScreen() {
	if (window.innerWidth == screen.width && window.innerHeight == screen.height) {

	}
	else {
		document.getElementById('popup_boxId').style.display = 'block';
		count = count + 1
		if (count >= 7) {
			location.reload();
		}
	}
}

function clickWarning() {
	document.getElementById('popup_boxId').style.display = 'none';
	elem.requestFullscreen();
}

function cheting() {
	document.getElementById('popup_Id').style.display = 'block';
}
function hide() {
	document.getElementById('popup_Id').style.display = 'none';
}