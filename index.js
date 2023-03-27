const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const isHeadlessMode = false;
const PORT = 8080;
const app = express();
// app.use(bodyParser.urlencoded({ extended: true }))

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
		if (jsonResponse["access_token"] !== undefined) {
			res.send(jsonResponse["access_token"]);
		}
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

/**
 * Puppeteer
 */
const puppeteer = require('puppeteer');
const fs = require('node:fs')
// const linkedinURL = 'https://www.linkedin.com/in/curious-mohammed-abdullah/';
// const certURL = linkedinURL + "details/certifications/";
// const projectsURL = linkedinURL + "details/projects/";
// const skillsURL = linkedinURL + "details/skills/";


class SkillClass {
	constructor(skills) {
		this.skillsGlobal = skills;
	}
}
class CertClass {
	constructor(certificates) {
		this.certificatesGlobal = certificates;
	}
}
class LinkDataClass {
	constructor(url) {
		this.linkedinURL = url;
		this.certURL = this.linkedinURL + "details/certifications/";
		this.projectsURL = this.linkedinURL + "details/projects/";
		this.skillsURL = this.linkedinURL + "details/skills/";
		this.start = this.start.bind(this);
		this.linkedinData = this.linkedinData.bind(this);
	}
	async start() {
		await Promise.all([
			await this.skillsData(),
			await this.certData(),
			await this.projData(),
			await this.linkedinData()
		])
		console.log("close")
	}
	async linkedinData() {
		const browser = await launchBrowser(isHeadlessMode);
		const page = await browser.newPage();
		console.log("linkedinURL", this.linkedinURL)
		await Promise.all([
			await page.goto(this.linkedinURL),
			await page.waitForSelector(".text-heading-xlarge.inline.t-24.v-align-middle.break-words"),
			await page.waitForNetworkIdle()
		]
		);
		const work = await page.evaluate(() => {
			return JSON.stringify({
				"work": [{
					"company": document.querySelector(`#${document.getElementById('experience').parentNode.id}  div ul li div div div div .t-14.t-normal .visually-hidden`).innerText,
					"title": document.querySelector(`#${document.getElementById('experience').parentNode.id} div ul li div div div div div span .visually-hidden`).textContent,
					"dates": document.querySelector(`#${document.getElementById('experience').parentNode.id}  .t-14.t-normal.t-black--light .visually-hidden`).innerText,
					"location": document.querySelectorAll(`#${document.getElementById('experience').parentNode.id}  .t-14.t-normal.t-black--light .visually-hidden`)[1].textContent,
					"thumbnail": document.querySelectorAll(`#${document.getElementById('experience').parentNode.id}  .ivm-view-attr__img-wrapper.ivm-view-attr__img-wrapper--use-img-tag.display-flex > img`)[0].src,
					description: document.querySelectorAll(`#${document.getElementById('experience').parentNode.id}  .inline-show-more-text.inline-show-more-text--is-collapsed.inline-show-more-text--is-collapsed-with-line-clamp.full-width .visually-hidden`)[0].textContent

				},
				],
			})
		})
		const education = await page.evaluate(() => {
			return JSON.stringify({
				"education": [{
					"Institution":
						document.querySelector(`#${document.getElementById("education").parentElement.id} .pvs-list__outer-container .pvs-list .artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column .pvs-entity.pvs-entity--padded.pvs-list__item--no-padding-in-columns .display-flex.flex-column.full-width.align-self-center .display-flex.flex-row.justify-space-between .optional-action-target-wrapper.display-flex.flex-column.full-width .display-flex.flex-wrap.align-items-center.full-height .mr1.hoverable-link-text.t-bold .visually-hidden`).textContent,
					"Program":
						document.querySelector(`#${document.getElementById("education").parentElement.id} .pvs-list__outer-container .pvs-list .artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column .pvs-entity.pvs-entity--padded.pvs-list__item--no-padding-in-columns .display-flex.flex-column.full-width.align-self-center .display-flex.flex-row.justify-space-between .optional-action-target-wrapper.display-flex.flex-column.full-width .t-14.t-normal .visually-hidden`).textContent,
					"YearOfPassing":
						document.querySelector(`#${document.getElementById("education").parentElement.id} .pvs-list__outer-container .pvs-list .artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column .pvs-entity.pvs-entity--padded.pvs-list__item--no-padding-in-columns .display-flex.flex-column.full-width.align-self-center .display-flex.flex-row.justify-space-between .optional-action-target-wrapper.display-flex.flex-column.full-width .t-14.t-normal.t-black--light .visually-hidden`).textContent,
					"Grade":
						document.querySelector(`#${document.getElementById("education").parentElement.id} .pvs-list__outer-container .pvs-list .artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column .pvs-entity.pvs-entity--padded.pvs-list__item--no-padding-in-columns .display-flex.flex-column.full-width.align-self-center .pvs-list__outer-container .pvs-list .display-flex.mv1.link-without-hover-visited .display-flex .display-flex.full-width .pv-shared-text-with-see-more.full-width.t-14.t-normal.t-black.display-flex.align-items-center .inline-show-more-text.inline-show-more-text--is-collapsed.inline-show-more-text--is-collapsed-with-line-clamp.full-width .visually-hidden`).textContent,
					"website":
						"",
				},
				],
			})
		})
		const data = await page.evaluate(() => {
			const DATA = {
				"information": {
					"name": document.querySelectorAll(".text-heading-xlarge.inline.t-24.v-align-middle.break-words")[0].innerText,
					"domain": document.querySelectorAll(".text-body-medium.break-words")[0].innerText,
					"image": document.querySelectorAll(".ember-view.profile-photo-edit__preview")[0].getAttribute('src'),
					// email: email,
					"description": document.querySelectorAll(".inline-show-more-text.inline-show-more-text--is-collapsed.inline-show-more-text--is-collapsed-with-line-clamp.full-width")[0].innerText,
					"profiles": [
						{
							"media": "Linkedin",
							"url": "",
							"icon": "./img/icons/media/linkedin.png"
						},
					],
				}
			}
			return DATA;
		}).then((DATA) => {
			DATA.information.profiles[0].url = this.linkedinURL;
			return JSON.stringify(DATA)
		});
		var DATA = Promise.resolve(data)
		DATA.then(() => {
			console.log("data1: ", data);
			fs.writeFile('data/data.json', data, () => console.log("data write... "))
			fs.writeFile('data/education.json', education, () => console.log("data write... "))
			fs.writeFile('data/work.json', work, () => console.log("data write... "))
		})
		await browser.close()

	}
	async skillsData() {
		const browserSkill = await launchBrowser(isHeadlessMode);
		const pageSkill = await browserSkill.newPage();

		console.log("this.skillsURL", this.skillsURL)
		await Promise.all([
			await pageSkill.goto(this.skillsURL),
			await pageSkill.waitForSelector(".t-20.t-bold.ph3.pt3.pb2"),
			await pageSkill.waitForNetworkIdle()
		])
		const skills = await pageSkill.evaluate(() => {
			const data = new Set(Array.from(document.querySelectorAll("li > div > div > div > div > a > div > span > .visually-hidden")).map((skillsData) => skillsData.textContent))
			return [...data].join(", ");
		});
		this.skillsObj = new SkillClass(skills);
		console.log("skills: ", skills)
		fs.writeFile('data/skills.json', `{
			"skills": [
				{
					"type": "",
					"KnowledgeInAdvanceTopics": "",
					"KnowledgeInMainConcepts": ${JSON.stringify(skills)},
            "Beginner": ""
        }
    ]
}`, () => console.log("skills write.. "))
		await browserSkill.close();
	}
	async certData() {
		const browserCert = await launchBrowser(isHeadlessMode);
		const pageCert = await browserCert.newPage();
		console.log("certURL", this.certURL)
		await Promise.all([
			await pageCert.goto(this.certURL),
			await pageCert.waitForSelector(".t-20.t-bold.ph3.pt3.pb2"),
			await pageCert.waitForNetworkIdle()
		])
		const certificates = await pageCert.evaluate(() => {
			var titles = Array.from(document.querySelectorAll("div > div div > ul > li > div > div > div > div > a > div > span > .visually-hidden")).map((e) => e.textContent);
			const cred = Array.from(document.querySelectorAll("section div div div ul li .pv2 a")).map((e) => e.href)
			var subData = Array.from(document.querySelectorAll("div > div div > ul > li > div > div > div > div > a > span > .visually-hidden")).map((e) => e.textContent)
			let woCredname = Array.from(document.querySelectorAll("div > div div > ul > li > div > div > div > div > div > div > span > .visually-hidden")).map((e) => e.textContent);
			let woCred = Array.from(document.querySelectorAll("div > div div > ul > li > div > div > div > div > div > span > .visually-hidden")).map((e) => e.textContent);
			titles = titles.concat(woCredname)
			subData = subData.concat(woCred)
			return JSON.stringify(Array.from(titles).map((e, i) => {
				return {
					"title": e,
					"date": subData[3 * i + 1],
					"institution": subData[3 * i],
					"thumbnail": cred[i],
					"description": ""
				}
			}));
		});
		this.certObj = new CertClass(certificates);
		console.log("certificates: ", certificates)
		fs.writeFile('data/certificates.json', `{\"certificates"\: ${certificates}}`, () => console.log("certificate write.. "))
		await browserCert.close()
	}
	async projData() {
		const browserProj = await launchBrowser(isHeadlessMode);
		const pageProj = await browserProj.newPage();
		console.log("this.projectsURL", this.projectsURL)
		await Promise.all([
			await pageProj.goto(this.projectsURL),
			await pageProj.waitForSelector(".t-20.t-bold.ph3.pt3.pb2"),
			await pageProj.waitForNetworkIdle()
		])
		const projects = await pageProj.evaluate(() => {
			var titles = Array.from(document.querySelectorAll(`main section div div div ul li div div div div div div span .visually-hidden`)).map((e) => e.innerText);
			let gitlink = Array.from(document.querySelectorAll(`ul li div div div div ul li a`)).map((e) => e.href);
			let description = Array.from(document.querySelectorAll(`li div div div div ul li div ul li div div div .visually-hidden`)).map((e) => e.innerText);
			return JSON.stringify(Array.from(titles).map((e, i) => {
				return {
					"title": e,
					"type": "",
					"thumbnail": gitlink[i],
					"link": "",
					"gitlink": gitlink[i],
					"description": description[i]
				}
			}));
		});
		this.certObj = new CertClass(projects);
		console.log("projects: ", projects)
		fs.writeFile('data/projects.json', `{\"projects"\: ${projects}}`, () => console.log("certificate write.. "))
		await browserProj.close()
	}
}

async function launchBrowser(isHeadless) {
	return puppeteer.launch(
		{
			executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
			userDataDir: "/Users/mohammedabdullah/Library/Application Support/Google/Chrome/Profile 4",
			headless: isHeadless,
			timeout: 0,
			defaultViewport: { height: 600, width: 500 }
		}
	);
}
app.get("/skills", (req, res) => {
	fs.readFile("data/skills.json", 'utf-8', (err, data) => {
		console.log("read... Skills", data);
		res.send(data);
		console.log("sent skills", data)
	});
})
app.get("/certificates", (req, res) => {
	fs.readFile("data/certificates.json", 'utf-8', (err, data) => {
		console.log("read... Certificates");
		res.send(data);
		console.log("sent certificates", data)
	});
})
app.get("/data", (req, res) => {
	fs.readFile("data/data.json", 'utf-8', (err, data) => {
		res.send(data);
	});
})
app.get("/work", (req, res) => {
	fs.readFile("data/work.json", 'utf-8', (err, data) => {
		res.send(data);
	});
})
app.get("/education", (req, res) => {
	fs.readFile("data/education.json", 'utf-8', (err, data) => {
		res.send(data);
	});
})
app.get("/projects", (req, res) => {
	fs.readFile("data/projects.json", 'utf-8', (err, data) => {
		res.send(data);
	});
})
app.get("/getLinkedInData/:url", (req, res) => {
	let data = "https://www.linkedin.com/in/" + req.params.url + "/"
	console.log("getLinkedInData ", data)
	const l = new LinkDataClass(data);
	l.start();

});

