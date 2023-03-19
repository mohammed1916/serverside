const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const PORT = 8080;
const app = express();

app.use(cors());
const corsOptions = {
	origin: "http://localhost:3000"
};

// const code = window.localStorage.getItem('linkedinAuthCode');
let code = "AQTLTKeLtaja_Xq3B9UjRkZdE862AOKyWOF7ijzKfwxWi5HyQreF82WC4VoS0Qy-JPGJz09BVm-qMXcXN-WmxDxOMnQ0qM_NN9gOXMdk8k5tsjTIN7H828ADW8gz8PMcdSLXeeLy45Ke8xJxcVVlON-ejUpXNBrtWNbAz4mrbmyy2rlGUlSkdN_r5DimUyAaPk21sOd7g6f_nzGsEn8";
// const client_id = "863yjvgqsfyyvq";
// const client_secret = "dVfyZFbQ3zPMs4B5";
// const callback_url = "http://localhost:3000/form/callback";
// const url = `https://www.linkedin.com/oauth/v2/accessToken?code=${code}&grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${callback_url}`;

// const requestEndpoint = url;

let ret;

// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
app.get('/auth/:code', async (req, res) => {
	code = req.params.code;
	console.log("🔥 code :", code);
	const client_id = "863yjvgqsfyyvq";
	const client_secret = "dVfyZFbQ3zPMs4B5";
	const callback_url = "http://localhost:3000/form/callback";
	const url = `https://www.linkedin.com/oauth/v2/accessToken?code=${code}&grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${callback_url}`;
	const requestEndpoint = url;
	console.log("🚀 url :", url);
	// app.get('/', cors(corsOptions), async (req, res) => {
	// 	console.log("💪 err ")
	try {
		const fetchOptions = {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}
		const response = await fetch(requestEndpoint, fetchOptions);
		const jsonResponse = await response.json();
		if (jsonResponse["access_token"] !== undefined)
			res.send(jsonResponse["access_token"]);
		else
			res.send("ERROR");
		console.log("💪 jsonResponse[\"access_token\"]", jsonResponse["access_token"]);
		ret = jsonResponse["access_token"]
	} catch (err) {
		console.log("🛠️ err ", err)
	}
	// });
	// return Promise.resolve("Sample");
	// res.send("Sample");
});


// app.listen(PORT, () => {
// 	console.log(`✅ Example app listening at http://localhost:${PORT}`);
// });

// (async () => {
// 	console.log("🔥 ")
// 	const LinkedInProfileScraper = require('linkedin-profile-scraper');
// 	try {
// 		console.log("🔥 1")
// 		const scraper = new LinkedInProfileScraper({
// 			sessionCookieValue: 'AQEDATAaQ2wDpztcAAABhvPWu-UAAAGHF-M_5VYAKesdGgcSy5M22jnoghU9VjeavsOezoPsG7EAiTScfAPeHVPMjTkRyk0Aiu4YpWunWRurN0DIOgfMMhGQmhxufG09P4WiClLwQfcb4tOjQ6I4ZhL6'
// 		});
// 		console.log("🔥 2")
// 		await scraper.setup()
// 		console.log("🔥 3")
// 		const result = await scraper.run('https://www.linkedin.com/in/curious-mohammed-abdullah/')
// 		console.log("🔥 4")
// 		console.log("result", result)
// 	} catch (err) {
// 		if (err.name === 'SessionExpired') {
// 			// Do something when the scraper notifies you it's not logged-in anymore
// 			console.log("err", err);
// 		}
// 	}
// })()

const puppeteer = require('puppeteer');
const fs = require('node:fs')
async function start() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://github.com/mohammed1916/portfolio');
	// const data = await page.evaluate(() => {
	// 	const read = document.getElementById('readme');
	// 	// const htmlText = read.map(el => el.innerHTML);
	// 	console.log("read :", read);
	// 	return read;
	// });
	const data = page.$eval('#readme', el => el.innerHTML);
	await browser.close();
	console.log("data: ", data);

	data.then((data) => fs.writeFile('data.html', data, (err) => console.log(err)));

};
start()





// const express = require("express");
// const app = express();
// const cors = require("cors");
// const http = require("http").Server(app);
// const puppeteer = require("puppeteer");
// const { LinkedInProfileScraper } = require('linkedin-profile-scraper')
// const PORT = 4000;
// // const socketIO = require("socket.io")(http, {
// // 	cors: {
// // 		origin: "http://localhost:4000",
// // 		// mode: 'no-cors',
// // 		// methods: ["GET", "POST"],
// // 		// allowedHeaders: ["my-custom-header"],
// // 		// credentials: true
// // 	},
// // });
// const socketIO = require("socket.io")(http, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: ["GET", "POST"]
// 	}
// });

// // app.use(cors({ origin: "http://localhost:4000" }));
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// let channelList = [];

// socketIO.on("connection", (socket) => {
// 	console.log(`⚡: ${socket.id} user just connected!`);
// 	// initializeScrapper = async () => {

// 	// };
// 	socket.on('browse', async ({ url }) => {
// 		console.log("url", url);
// 		const scraper = new LinkedInProfileScraper({
// 			sessionCookieValue: 'LI_AT_COOKIE_VALUE',
// 			keepAlive: false
// 		});

// 		// 	// Prepare the scraper
// 		// 	// Loading it in memory
// 		// await scraper.setup();
// 		var result;
// 		// 	var l = "https://www.linkedin.com/in/curious-mohammed-abdullah/";
// 		// 	result = await scraper.run(l);
// 		// 	console.log("result", result)
// 		// 	// 	const browser = await puppeteer.launch({
// 		// 	// 		headless: true
// 		// 	// 	});
// 		// 	// 	const context = await browser.createIncognitoBrowserContext();
// 		// 	// 	const page = await context.newPage();
// 		// 	// 	await page.setViewport({
// 		// 	// 		width: 1255,
// 		// 	// 		height: 800,
// 		// 	// 	});
// 		// 	// 	await page.goto(url);
// 		// 	// 	socket.on('linkedin', async ({ x, y }) => {
// 		// 	// 		try {
// 		// 	// 			await page.mouse.move(x, y);
// 		// 	// 			const cur = await page.evaluate((p) => {
// 		// 	// 				const elementFromPoint = document.elementFromPoint(p.x, p.y);
// 		// 	// 				return window
// 		// 	// 					.getComputedStyle(elementFromPoint, null)
// 		// 	// 					.getPropertyValue('cursor');
// 		// 	// 			}, { x, y });

// 		// 	// 			socket.emit('cursor', cur);
// 		// 	// 		} catch (err) { }
// 		// 	// 	});
// 	});

// 	socket.on("disconnect", () => {
// 		socket.disconnect();
// 		console.log("🔥: A user disconnected");
// 	});
// });

// http.listen(PORT, () => {
// 	console.log(`Server listening on ${PORT}`);
// });

// require('dotenv').config();

// const express = require("express");
// const { LinkedInProfileScraper } = require('linkedin-profile-scraper')

// const app = express();

// (async () => {
// 	// Setup environment variables to fill the sessionCookieValue
// 	const scraper = new LinkedInProfileScraper({
// 		sessionCookieValue: `${process.env.LINKEDIN_SESSION_COOKIE_VALUE}`,
// 		keepAlive: true,
// 	})

// 	// Prepare the scraper
// 	// Loading it in memory
// 	await scraper.setup()

// 	// Usage: http://localhost:3000/?url=https://www.linkedin.com/in/jvandenaardweg/
// 	app.get('/', async (req, res) => {
// 		const urlToScrape = req.query.url;

// 		const result = await scraper.run(urlToScrape)

// 		return res.json(result)
// 	})

// 	app.listen(process.env.PORT || 4000)
// })()
// const puppeteer = require('puppeteer');
// const LinkedinClient = require('linkedin-client');
/**-------- */
// const scrapedin = require('scrapedin');
// (async () => {
// 	const profileScraper = await scrapedin({ email: 'arrahmaan9901@gmail.com', password: 'myLink#12' });
// 	const data = await profileScraper('https://www.linkedin.com/in/curious-mohammed-abdullah/');
// 	console.log(data);


	// const browser = await puppeteer.launch({
	// 	executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
	// });
	// const page = await browser.newPage();

	// await page.goto('https://www.linkedin.com/in/curious-mohammed-abdullah/');

	// // Set screen size
	// await page.setViewport({ width: 1080, height: 1024 });

	// // Type into search box
	// await page.type('.search-box__input', 'automate beyond recorder');

	// // Wait and click on first result
	// const searchResultSelector = '.text-heading-xlarge';
	// await page.waitForSelector(searchResultSelector);
	// await page.click(searchResultSelector);

	// // Locate the full title with a unique string
	// const textSelector = await page.waitForSelector(
	// 	'text/Customize and automate'
	// );
	// const name = await textSelector.evaluate(el => el.textContent);

	// Print the full title
	// console.log('Name "%s".', name);

	// await browser.close();


// 	console.log("running")
// })()