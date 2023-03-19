const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const PORT = 8080;
const app = express();

app.use(cors());
const corsOptions = {
	origin: "http://localhost:3000"
};

let code = "AQTLTKeLtaja_Xq3B9UjRkZdE862AOKyWOF7ijzKfwxWi5HyQreF82WC4VoS0Qy-JPGJz09BVm-qMXcXN-WmxDxOMnQ0qM_NN9gOXMdk8k5tsjTIN7H828ADW8gz8PMcdSLXeeLy45Ke8xJxcVVlON-ejUpXNBrtWNbAz4mrbmyy2rlGUlSkdN_r5DimUyAaPk21sOd7g6f_nzGsEn8";

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


app.listen(PORT, () => {
	console.log(`✅ Example app listening at http://localhost:${PORT}`);
});

const puppeteer = require('puppeteer');
const fs = require('node:fs')
async function start() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.linkedin.com/in/curious-mohammed-abdullah');
	const data = page.$eval('#readme', el => el.innerHTML);
	await browser.close();
	console.log("data: ", data);

	data.then((data) => console.log(data));

};
start()
