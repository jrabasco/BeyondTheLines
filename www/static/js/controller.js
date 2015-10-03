"use strict"

if (document.readyState !== 'loading') {
	run()
} else {
	document.addEventListener('DOMContentLoaded', run)
}

// Add a pin on the big triangle
function addPin(x, y, data) {
	var triangle = document.querySelector('#triangle')

	var pin = document.createElement('div')
	pin.classList.add('pin')
	var coords = pattern2html(x, y)
	pin.style.left = coords.x + 'px'
	pin.style.top = coords.y + 'px'
	
	var info = document.createElement('div')
	info.classList.add('info')
	var infoContent = document.createTextNode(data)

	info.appendChild(infoContent)
	pin.appendChild(info)
	triangle.appendChild(pin)
}

// Convert form API coords to coords in the big triangle
function pattern2html(x, y) {
	var triangle = document.querySelector('#triangle')
	var w = triangle.offsetWidth
	var h = triangle.offsetHeight

	return {
		x: (x + 1) / 2 * w,
		y: (1 - y) * h
	}
}

function boxPlot(avg, deviation, min, max, parent) {
	var div = document.querySelector(parent)
	var width = div.offsetWidth

	// var avgPos = (avg / max) * width;
	var avgPos = ((avg - min) / (max - min)) * width;
	var boxLeftPos = ((avg - deviation - min) / (max - min)) * width;
	var boxWidth = ((avg + deviation - min) / (max - min)) * width - boxLeftPos;


	console.log(width)
	
	var box = document.createElement('div')
	box.classList.add('box')
	box.style.left =  boxLeftPos + 'px'
	box.style.width = boxWidth + 'px'

	var avgDiv = document.createElement('div')
	avgDiv.classList.add('avg')
	avgDiv.style.left =  avgPos + 'px'

	div.appendChild(box)
	div.appendChild(avgDiv)
}

function modality(avg, deviation) {
	boxPlot(avg, deviation, -1, 1, '#modality')
}

function wordPerSentence(avg, deviation) {
	boxPlot(avg, deviation, 0, 100, '#word-per-sentence')
}

function handleData(data) {
	addPin(data.polarity[0], data.subjectivity[0])
	wordPerSentence(data.wordPerSentence[0], data.wordPerSentence[1])
	modality(data.modality[0], data.modality[1])
}

function run() {
	setTimeout(function () {
		handleData({
			"polarity": [
				0.07293211129148629,
				0.2174031579455767
			],
			"positivity": [
				0.20833333333333334,
				0.4061164310337067
			],
			"wordPerSentence": [
				28.604166666666668,
				11.501339746839157
			],
			"subjectivity": [
				0.07293211129148629,
				0.2174031579455767
			],
			"modality": [
				0.6422299488705738,
				0.3142989273647446
			],
			"moods": {
				"conditional": 10,
				"indicative": 37,
				"subjunctive": 1
			}
		})
	}, 100)
}