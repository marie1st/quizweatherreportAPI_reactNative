fetch("https://community-open-weather-map.p.rapidapi.com/onecall/timemachine?lat=37.774929&lon=-122.419418&dt=1590094153%20", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "3ad588fb2amshc7e49add7f55290p199e83jsn1e79cb8e82d1",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});