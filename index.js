// const express = require('express');
// const cors = require('cors');
// const fetch = require('node-fetch');

// const PORT = 8080;
// const app = express();

// app.use(cors());
// const corsOptions = {
// 	origin: "http://localhost:3000"
// };

// let code = "AQTLTKeLtaja_Xq3B9UjRkZdE862AOKyWOF7ijzKfwxWi5HyQreF82WC4VoS0Qy-JPGJz09BVm-qMXcXN-WmxDxOMnQ0qM_NN9gOXMdk8k5tsjTIN7H828ADW8gz8PMcdSLXeeLy45Ke8xJxcVVlON-ejUpXNBrtWNbAz4mrbmyy2rlGUlSkdN_r5DimUyAaPk21sOd7g6f_nzGsEn8";

// app.get('/auth/:code', async (req, res) => {
// 	code = req.params.code;
// 	console.log("🔥 code :", code);
// 	const client_id = "863yjvgqsfyyvq";
// 	const client_secret = "dVfyZFbQ3zPMs4B5";
// 	const callback_url = "http://localhost:3000/form/callback";
// 	const url = `https://www.linkedin.com/oauth/v2/accessToken?code=${code}&grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${callback_url}`;
// 	const requestEndpoint = url;
// 	console.log("🚀 url :", url);
// 	// app.get('/', cors(corsOptions), async (req, res) => {
// 	// 	console.log("💪 err ")
// 	try {
// 		const fetchOptions = {
// 			method: 'POST',
// 			headers: {
// 				"Content-Type": "application/x-www-form-urlencoded"
// 			}
// 		}
// 		const response = await fetch(requestEndpoint, fetchOptions);
// 		const jsonResponse = await response.json();
// 		if (jsonResponse["access_token"] !== undefined) {
// 			res.send(jsonResponse["access_token"]);
// 			start()
// 		}
// 		else
// 			res.send("ERROR");
// 		console.log("💪 jsonResponse[\"access_token\"]", jsonResponse["access_token"]);
// 		ret = jsonResponse["access_token"]
// 	} catch (err) {
// 		console.log("🛠️ err ", err)
// 	}
// 	// });
// 	// return Promise.resolve("Sample");
// 	// res.send("Sample");
// });


// app.listen(PORT, () => {
// 	console.log(`✅ Example app listening at http://localhost:${PORT}`);
// });

// /**
//  * Puppeteer
//  */
// const puppeteer = require('puppeteer');
// const fs = require('node:fs')
// const linkedinURL = 'https://www.linkedin.com/in/curious-mohammed-abdullah/';
// const certURL = linkedinURL + "details/certifications/";
// const skillsURL = linkedinURL + "details/skills/";


// class SkillClass {
// 	constructor(skills) {
// 		this.skillsGlobal = skills;
// 	}
// }
// class CertClass {
// 	constructor(certificates) {
// 		this.certificatesGlobal = certificates;
// 	}
// }
// class LinkDataClass {
// 	constructor() {
// 		this.skillsObj;
// 		this.certObj;
// 	}
// 	async start() {
// 		try {
// 			// for (let i = 0; i < urls.length; i++) {
// 			// 	if (i == 0) {
// 			// 		await linkedinData();
// 			// 	} else if (i == 1) {
// 			// 		await certData();
// 			// 	} else if (i == 2) {
// 			// 		await skillsData();
// 			// 	}
// 			// }
// 			await Promise.all([
// 				await this.skillsData(),
// 				await this.certData(),
// 				await this.linkedinData()
// 			])

// 			console.log("close")
// 			// data.then((data) => console.log(data));
// 		} catch (err) {
// 			console.log("err", err)
// 		}
// 	}
// 	async linkedinData() {
// 		const browser = await puppeteer.launch(
// 			{
// 				executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
// 				userDataDir: "/Users/mohammedabdullah/Library/Application Support/Google/Chrome/Profile 4",
// 				headless: false,
// 				timeout: 0,
// 				defaultViewport: null
// 			}
// 		);
// 		const page = await browser.newPage();
// 		console.log("linkedinURL", linkedinURL)
// 		await Promise.all([
// 			await page.goto(linkedinURL),
// 			await page.waitForSelector(".text-heading-xlarge.inline.t-24.v-align-middle.break-words"),
// 			await page.waitForNetworkIdle()
// 		]
// 		);
// 		this.certObj = await fs.readFile("data/certificates.json", () => { console.log("read...") });
// 		this.skillsObj = await fs.readFile("data/skills.json", () => { console.log("read...") });
// 		const data = await page.evaluate(() => {
// 			return JSON.stringify({
// 				information: {
// 					name: document.querySelectorAll(".text-heading-xlarge.inline.t-24.v-align-middle.break-words")[0].getAttribute('textContent'),
// 					domain: document.querySelectorAll(".text-body-medium.break-words")[0].getAttribute('innerText'),
// 					image: document.querySelectorAll(".ember-view.profile-photo-edit__preview")[0].getAttribute('src'),
// 					// email: email,
// 					description: document.querySelectorAll(".inline-show-more-text.inline-show-more-text--is-collapsed.inline-show-more-text--is-collapsed-with-line-clamp.full-width")[0].getAttribute('innerText'),
// 					profiles: [
// 						{
// 							"media": "Linkedin",
// 							// "url": "",
// 							"icon": "./img/icons/media/linkedin.png"
// 						},
// 					]
// 				},
// 				education: {
// 					"Institution":
// 						document.querySelector(`#${document.getElementById("education").parentElement.id} .pvs-list__outer-container .pvs-list .artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column .pvs-entity.pvs-entity--padded.pvs-list__item--no-padding-in-columns .display-flex.flex-column.full-width.align-self-center .display-flex.flex-row.justify-space-between .optional-action-target-wrapper.display-flex.flex-column.full-width .display-flex.flex-wrap.align-items-center.full-height .mr1.hoverable-link-text.t-bold .visually-hidden`).textContent,
// 					"Type":
// 						document.querySelector(`#${document.getElementById("education").parentElement.id} .pvs-list__outer-container .pvs-list .artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column .pvs-entity.pvs-entity--padded.pvs-list__item--no-padding-in-columns .display-flex.flex-column.full-width.align-self-center .display-flex.flex-row.justify-space-between .optional-action-target-wrapper.display-flex.flex-column.full-width .t-14.t-normal .visually-hidden`).textContent,
// 					"Year of Passing":
// 						document.querySelector(`#${document.getElementById("education").parentElement.id} .pvs-list__outer-container .pvs-list .artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column .pvs-entity.pvs-entity--padded.pvs-list__item--no-padding-in-columns .display-flex.flex-column.full-width.align-self-center .display-flex.flex-row.justify-space-between .optional-action-target-wrapper.display-flex.flex-column.full-width .t-14.t-normal.t-black--light .visually-hidden`).textContent,
// 					"Grade":
// 						document.querySelector(`#${document.getElementById("education").parentElement.id} .pvs-list__outer-container .pvs-list .artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column .pvs-entity.pvs-entity--padded.pvs-list__item--no-padding-in-columns .display-flex.flex-column.full-width.align-self-center .pvs-list__outer-container .pvs-list .display-flex.mv1.link-without-hover-visited .display-flex .display-flex.full-width .pv-shared-text-with-see-more.full-width.t-14.t-normal.t-black.display-flex.align-items-center .inline-show-more-text.inline-show-more-text--is-collapsed.inline-show-more-text--is-collapsed-with-line-clamp.full-width .visually-hidden`).textContent,
// 					"website":
// 						"",
// 				},
// 				/** Number of exp : document.querySelectorAll(`#${document.getElementById('experience').parentNode.id} div ul .artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column`) */
// 				/**	Titles: Array.from(document.querySelectorAll(`#${document.getElementById('experience').parentNode.id} div ul li div div div div .mr1.t-bold > .visually-hidde
// 				 * 
// 				 */
// 				work: {
// 					"title": document.querySelector(`#${document.getElementById('experience').parentNode.id} div ul li div div div div div span .visually-hidden`).textContent,
// 					"dates": document.querySelector(`#${document.getElementById('experience').parentNode.id}  .t-14.t-normal.t-black--light .visually-hidden`).innerText,
// 					"location": document.querySelectorAll(`#${document.getElementById('experience').parentNode.id}  .t-14.t-normal.t-black--light .visually-hidden`)[1].textContent,
// 					"thumbnail": document.querySelectorAll(`#${document.getElementById('experience').parentNode.id}  .ivm-view-attr__img-wrapper.ivm-view-attr__img-wrapper--use-img-tag.display-flex > img`)[0].src,
// 					description: document.querySelectorAll(`#${document.getElementById('experience').parentNode.id}  .inline-show-more-text.inline-show-more-text--is-collapsed.inline-show-more-text--is-collapsed-with-line-clamp.full-width .visually-hidden`)[0].textContent

// 				},
// 				"skills": {
// 					"Knowledge in Main Concepts": `${this.skillsObj}`
// 				},
// 				"certifications": `${this.certObj}`
// 			});
// 		});
// 		console.log("data1: ", data);
// 		fs.writeFile('data/data.json', data, () => console.log("data write... "))
// 		await browser.close()
// 	}
// 	async skillsData() {
// 		const browserSkill = await puppeteer.launch(
// 			{
// 				executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
// 				userDataDir: "/Users/mohammedabdullah/Library/Application Support/Google/Chrome/Profile 4",
// 				// headless: false,
// 				timeout: 0,
// 				defaultViewport: null
// 			}
// 		);
// 		const pageSkill = await browserSkill.newPage();

// 		console.log("skillsURL", skillsURL)
// 		await Promise.all([
// 			await pageSkill.goto(skillsURL),
// 			await pageSkill.waitForSelector(".t-20.t-bold.ph3.pt3.pb2"),
// 			await pageSkill.waitForNetworkIdle()
// 		])
// 		const skills = await pageSkill.evaluate(() => {
// 			const data = new Set(Array.from(document.querySelectorAll("li > div > div > div > div > a > div > span > .visually-hidden")).map((skillsData) => skillsData.textContent))
// 			return [...data].join(", ");
// 		});
// 		this.skillsObj = new SkillClass(skills);
// 		console.log("skills: ", skills)
// 		fs.writeFile('data/skills.json', skills, () => console.log("skills write.. "))
// 		await browserSkill.close();
// 	}
// 	async certData() {
// 		const browserCert = await puppeteer.launch(
// 			{
// 				executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
// 				userDataDir: "/Users/mohammedabdullah/Library/Application Support/Google/Chrome/Profile 4",
// 				// headless: false,
// 				timeout: 0,
// 				defaultViewport: null
// 			}
// 		);
// 		const pageCert = await browserCert.newPage();
// 		console.log("certURL", certURL)
// 		await Promise.all([
// 			await pageCert.goto(certURL),
// 			await pageCert.waitForSelector(".t-20.t-bold.ph3.pt3.pb2"),
// 			await pageCert.waitForNetworkIdle()
// 		])
// 		const certificates = await pageCert.evaluate(() => {
// 			var titles = Array.from(document.querySelectorAll("div > div div > ul > li > div > div > div > div > a > div > span > .visually-hidden")).map((e) => e.textContent);
// 			const cred = Array.from(document.querySelectorAll("section div div div ul li .pv2 a")).map((e) => e.href)
// 			var subData = Array.from(document.querySelectorAll("div > div div > ul > li > div > div > div > div > a > span > .visually-hidden")).map((e) => e.textContent)
// 			let woCredname = Array.from(document.querySelectorAll("div > div div > ul > li > div > div > div > div > div > div > span > .visually-hidden")).map((e) => e.textContent);
// 			let woCred = Array.from(document.querySelectorAll("div > div div > ul > li > div > div > div > div > div > span > .visually-hidden")).map((e) => e.textContent);
// 			titles = titles.concat(woCredname)
// 			subData = subData.concat(woCred)
// 			return JSON.stringify(Array.from(titles).map((e, i) => {
// 				return {
// 					"title": e,
// 					"date": subData[3 * i + 1],
// 					"Institution": subData[3 * i],
// 					"thumbnail": cred[i],
// 					"description": ""
// 				}
// 			}));
// 		});
// 		this.certObj = new CertClass(certificates);
// 		console.log("certificates: ", certificates)
// 		fs.writeFile('data/certificates.json', certificates, () => console.log("certificate write.. "))
// 		await browserCert.close()
// 	}
// }
// new LinkDataClass().start()

(async () => {
	const fs = require("fs")
	const path = require("path")
	const certPath = path.join(__dirname, "./data/certificates.json");
	const contents = await fs.readFile(certPath, 'utf8', (err, data) => { console.log("read...", data) });
	Promise.resolve(contents)
	console.log("read: ", contents)
}
)();