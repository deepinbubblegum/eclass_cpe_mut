var flagtimer = false;
var Today = 0,
	Hours = 0,
	Minutes = 0,
	Seconds = 0;
var Sum_time = 0;
var start_time = 0;
var cal_persenttime = 0;
var hr, min, sec;
var displayTime, displayToday, displaycount, progressBar;

let song5;
let songfinish;
var stateSound5 = 0;
var stateSoundFi = 0;

function preload() {
	song5 = loadSound('../sound/5minutes.mp3');
	songfinish = loadSound('../sound/finish.mp3');
}


function setup() {
	displaycount = document.getElementById('display_count');
	displayTime = document.getElementById('displayclocktime');
	progressBar = document.getElementById('progress_bar');
	Today = new Date();
	Hours = Today.getHours();
	Minutes = Today.getMinutes();
	Seconds = Today.getSeconds();
	var thday = new Array('อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์');
	var thmonth = new Array(
		'มกราคม', 'กุมภาพันธ์', 'มีนาคม',
		'เมษายน', 'พฤษภาคม', 'มิถุนายน',
		'กรกฎาคม', 'สิงหาคม', 'กันยายน',
		'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
	);
	displayToday = document.getElementById('displaytoday');
	displayToday.innerText = "วัน" + thday[Today.getDay()] + "ที่ " + Today.getDate() + " " + thmonth[Today.getMonth()] + " พ.ศ. " + (0 + Today.getFullYear() + 543);

	cal_persenttime = (Sum_time / start_time) * 100;
	if (flagtimer) {
		displaycount.innerText = nf(hr, 2) + ":" + nf(min, 2) + ":" + nf(sec, 2);
		if (Sum_time != 0) {
			if (hr > 0 && min < 1 && sec < 1) {
				min = 59;
				sec = 59;
				hr--;
			} else if (min > 0 && sec < 1) {
				sec = 59;
				min--;
			} else {
				sec--;
			}
			Sum_time--;

			if (stateSound5 == 0) {
				if (min == 4) {
					// song.setVolume(0.1);
					playSound5();
				}
			}
			if (stateSoundFi == 0) {
				if (hr == 0 && min == 0 && sec <= 0) {
					// playSoundFI();
					TimeFinish = setInterval(playSoundFI, 1000);
				}
			}

		} else {
			flagtimer = false;
			document.getElementById('Start').hidden = true;
			document.getElementById('Stop').hidden = true;
			//Timeout

		}
	}
}
setInterval(setup, 1000);


function playSound5() {
	stateSound5 = 1;
	song5.play();
}

function playSoundFI() {
	clearTimeout(TimeFinish);
	stateSoundFi = 1;
	songfinish.play();
}

function timerstart() {
	stateSound5 = 0;
	stateSoundFi = 0;
	flagtimer = true;
	document.getElementById('Start').hidden = true;
	document.getElementById('Stop').hidden = false;
}

function timerstop() {
	flagtimer = false;
	document.getElementById('Start').hidden = false;
	document.getElementById('Stop').hidden = true;
}

function timerset() {
	stateSound5 = 0;
	stateSoundFi = 0;
	hr = parseInt(document.getElementById('Hoursset').value);
	if (!hr) hr = 0;
	min = parseInt(document.getElementById('Minutesset').value);
	if (!min) min = 0;
	sec = parseInt(document.getElementById('Secondsset').value);
	if (!sec) sec = 0;
	var displaytimer = document.getElementById('display_count');

	if ((hr > 0) || (min > 0 && min <= 60) || (sec > 0 && sec <= 60)) {
		if (document.getElementById('Stop').hidden == true) {
			document.getElementById('Start').hidden = false;
		}
	} else {
		Snackbar.show({
			actionText: 'กำหนดเวลา',
			pos: 'top-center',
			actionTextColor: '#4CAF50',
			backgroundColor: '#323232',
			width: 'auto',
			text: 'ไม่สามารถกำหนดเวลาได้ : กรุณากำหนดเวลาให้ถูกต้อง',
			onClose: function () {
				$('#Hoursset').value = 0;
				document.getElementById('Hoursset').value = null;
				document.getElementById('Minutesset').value = null;
				document.getElementById('Secondsset').value = null;
				$("#settime").modal();
			}
		});
		hr = min = sec = 0;
	}

	start_time = Sum_time = (hr * 3600) + (min * 60) + sec;
	displaytimer.innerText = nf(hr, 2) + ":" + nf(min, 2) + ":" + nf(sec, 2);
}

function draw() {
	progressBar.style.width = nf(cal_persenttime, 3, 2) + "%";
	displayTime.innerText = "เวลา " + nf(Hours, 2) + ":" + nf(Minutes, 2) + ":" + nf(Seconds, 2) + " น.";
}