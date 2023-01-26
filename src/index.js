import "./module";
import "./scss/style.scss"

console.log("working");

async function start() {
	return await Promise.resolve(console.log("async work"))
}

start()