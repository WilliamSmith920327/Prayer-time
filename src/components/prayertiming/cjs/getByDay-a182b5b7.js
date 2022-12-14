"use strict";

function t(t) {
	return t * Math.PI / 180
}

function a(t) {
	return 180 * t / Math.PI
}

function n(a) {
	return Math.sin(t(a))
}

function e(a) {
	return Math.cos(t(a))
}

function i(t, a) {
	let n = t;
	return n -= a * Math.floor(t / a), n < 0 ? n + a : n
}

function r(t) {
	return i(t, 360)
}

function s(t) {
	return i(t, 24)
}

function o(t) {
	const a = new Date(t[0], t[1] - 1, t[2], 12, 0, 0, 0),
		n = a.toGMTString();
	return (a - new Date(n.substring(0, n.lastIndexOf(" ") - 1))) / 36e5
}

function u(t) {
	const a = t[0],
		n = o([a, 0, 1]),
		e = o([a, 6, 1]);
	return Math.min(n, e)
}

function h(t) {
	return Number(String(t).split(/[^0-9.+-]/)[0])
}

function m(t) {
	const i = t - 2451545 + 8e-4,
		o = r(357.529 + .98560028 * i),
		u = r(280.459 + .98564736 * i),
		h = r(u + 1.915 * n(o) + .02 * n(2 * o)),
		m = 23.439 - 36e-8 * i;
	var c, f;
	const g = u / 15 - s((c = e(m) * n(h), f = e(h), a(Math.atan2(c, f)) / 15));
	var l;
	return {
		declination: (l = n(m) * n(h), a(Math.asin(l))),
		equation: g
	}
}

function c(t, a) {
	return s(12 - m(a + t).equation)
}

function f({
	angle: t,
	time: i,
	direction: r,
	jDate: s,
	lat: o
}) {
	const u = m(s + i).declination,
		h = c(i, s),
		f = 1 / 15 * (g = (-n(t) - n(u) * n(o)) / (e(u) * e(o)), a(Math.acos(g)));
	var g;
	return h + ("ccw" === r ? -f : f)
}

function g(t) {
	return .833 + .0347 * Math.sqrt(t)
}

function l({
	factor: n,
	time: e,
	jDate: i,
	lat: r,
	direction: s
}) {
	const o = m(i + e).declination;
	var u, h;
	return f({
		angle: (u = n + (h = Math.abs(r - o), Math.tan(t(h))), -a(Math.atan(1 / u))),
		time: e,
		direction: s,
		jDate: i,
		lat: r
	})
}

function d(t) {
	return {
		Standard: 1,
		Hanafi: 2
	} [t] || h(t)
}

function j(t) {
	return -1 !== String(t).indexOf("min")
}

function b(t, a) {
	return s(a - t)
}

function M({
	time: t,
	base: a,
	angle: n,
	night: e,
	direction: i,
	settings: r
}) {
	let s = t;
	const o = function({
			angle: t,
			night: a,
			settings: n
		}) {
			const e = n.highLats;
			let i = .5;
			return "AngleBased" === e && (i = 1 / 60 * t), "OneSeventh" === e && (i = 1 / 7), i * a
		}({
			angle: n,
			night: e,
			settings: r
		}),
		u = "ccw" === i ? b(t, a) : b(a, t);
	return (Number.isNaN(t) || u > o) && (s = a + ("ccw" === i ? -o : o)), s
}

function D({
	times: t,
	settings: a,
	timeZone: n,
	long: e
}) {
	const i = {
		...a
	};
	let r = {
		...t
	};
	return Object.keys(r).forEach((t => {
		r[t] += n - e / 15
	})), "None" !== i.highLats && (r = function({
		times: t,
		settings: a
	}) {
		const n = {
				...a
			},
			e = {
				...t
			},
			i = b(t.sunset, t.sunrise);
		return e.imsak = M({
			settings: a,
			time: t.imsak,
			base: t.sunrise,
			angle: h(n.imsak),
			night: i,
			direction: "ccw"
		}), e.fajr = M({
			settings: a,
			time: t.fajr,
			base: t.sunrise,
			angle: h(n.fajr),
			night: i,
			direction: "ccw"
		}), e.isha = M({
			settings: a,
			time: t.isha,
			base: t.sunset,
			angle: h(n.isha),
			night: i
		}), e.maghrib = M({
			settings: a,
			time: t.maghrib,
			base: t.sunset,
			angle: h(n.maghrib),
			night: i
		}), e
	}({
		times: r,
		settings: a
	})), j(i.imsak) && (r.imsak = r.fajr - h(i.imsak) / 60), j(i.maghrib) && (r.maghrib = r.sunset + h(i.maghrib) / 60), j(i.isha) && (r.isha = r.maghrib + h(i.isha) / 60), r.dhuhr += h(i.dhuhr) / 60, r
}

function k(t) {
	return t < 10 ? `0${t}` : t
}

function p({
	date: t,
	method: a,
	times: n,
	timeFormat: e
}) {
	const i = {},
		r = {
			...n
		};
	return Object.keys(r).forEach((t => {
		const a = function(t, a, n) {
			const e = n || ["am", "pm"];
			let i = t;
			if (Number.isNaN(t)) return "--:--";
			if ("Float" === a) return t;
			i = s(i + .5 / 60);
			const r = Math.floor(i),
				o = Math.floor(60 * (i - r)),
				u = "12h" === a ? e[r < 12 ? 0 : 1] : "";
			return `${"24h"===a?k(r):(r+12-1)%12+1}:${k(o)}${u?` ${u}`:""}`
		}(r[t], e);
		i[t] = a
	})), i
}

function y({
	times: t,
	jDate: a,
	lat: n,
	elv: e,
	settings: i
}) {
	const r = function(t) {
		const a = {
			...t
		};
		return Object.keys(a).forEach((t => {
			a[t] /= 24
		})), a
	}(t);
	return {
		imsak: f({
			jDate: a,
			lat: n,
			angle: h(i.imsak),
			time: r.imsak,
			direction: "ccw"
		}),
		fajr: f({
			jDate: a,
			lat: n,
			angle: h(i.fajr),
			time: r.fajr,
			direction: "ccw"
		}),
		sunrise: f({
			jDate: a,
			lat: n,
			angle: g(e),
			time: r.sunrise,
			direction: "ccw"
		}),
		dhuhr: c(r.dhuhr, a),
		asr: l({
			jDate: a,
			lat: n,
			factor: d("Standard"),
			time: r.asr
		}),
		asrHanafi: l({
			jDate: a,
			lat: n,
			factor: d("Hanafi"),
			time: r.asr
		}),
		sunset: f({
			jDate: a,
			lat: n,
			angle: g(e),
			time: r.sunset
		}),
		maghrib: f({
			jDate: a,
			lat: n,
			angle: h(i.maghrib),
			time: r.maghrib
		}),
		isha: f({
			jDate: a,
			lat: n,
			angle: h(i.isha),
			time: r.isha
		})
	}
}
const N = {
		MWL: {
			name: "Muslim World League",
			params: {
				fajr: 18,
				isha: 17
			}
		},
		ISNA: {
			name: "Islamic Society of North America (ISNA)",
			params: {
				fajr: 15,
				isha: 15
			}
		},
		MF: {
			name: "Muslims of France (MF)",
			params: {
				fajr: 12,
				isha: 12
			}
		},
		Egypt: {
			name: "Egyptian General Authority of Survey",
			params: {
				fajr: 19.5,
				isha: 17.5
			}
		},
		Makkah: {
			name: "Umm Al-Qura University, Makkah",
			params: {
				fajr: 18.5,
				isha: "90 min"
			}
		},
		Karachi: {
			name: "University of Islamic Sciences, Karachi",
			params: {
				fajr: 18,
				isha: 18
			}
		},
		Tehran: {
			name: "Institute of Geophysics, University of Tehran",
			params: {
				fajr: 17.7,
				isha: 14,
				maghrib: 4.5,
				midnight: "Jafari"
			}
		},
		Jafari: {
			name: "Shia Ithna-Ashari, Leva Institute, Qum",
			params: {
				fajr: 16,
				isha: 14,
				maghrib: 4,
				midnight: "Jafari"
			}
		},
		JAKIM: {
			name: "Jabatan Kemajuan Islam Malaysia",
			params: {
				fajr: 20,
				isha: 18
			}
		}
	},
	v = {
		imsak: 5,
		fajr: 5,
		sunrise: 6,
		dhuhr: 12,
		asr: 13,
		asrHanafi: 14,
		sunset: 18,
		maghrib: 18,
		isha: 18
	},
	w = {
		imsak: "10 min",
		dhuhr: "0 min",
		maghrib: "0 min",
		midnight: "Standard",
		highLats: "NightMiddle"
	},
	I = {
		imsak: 10,
		fajr: 0,
		sunrise: 0,
		dhuhr: 0,
		asr: 0,
		asrHanafi: 0,
		sunset: 0,
		maghrib: 0,
		isha: 0,
		midnight: 0
	};
exports.getByDay = function({
	long: t,
	lat: a,
	timezone: n,
	dst: e,
	elv: i = 0,
	date: r = new Date,
	timeFormat: s = "24h",
	method: h = "MWL",
	config: m = {}
}) {
	if (! function(t) {
			return t && "[object Date]" === Object.prototype.toString.call(t) && !isNaN(t)
		}(r)) throw new Error("Invalid date");
	const c = [r.getFullYear(), r.getMonth() + 1, r.getDate()],
		f = e || function(t) {
			return Number(o(t) !== u(t))
		}(c),
		g = {
			...w,
			...N[h].params,
			...m
		},
		l = function(t, a, n) {
			let e = t,
				i = a;
			a <= 2 && (e -= 1, i += 12);
			const r = Math.floor(e / 100),
				s = 2 - r + Math.floor(r / 4);
			return Math.floor(365.25 * (e + 4716)) + Math.floor(30.6001 * (i + 1)) + n + s - 1524.5
		}(c[0], c[1], c[2]) - t / 360;
	let d = n || u(c),
		j = {
			...v
		};
	return d = Number(d) + (Number(f) ? 1 : 0), j = y({
		times: j,
		jDate: l,
		lat: a,
		elv: i,
		settings: g
	}), j = D({
		times: j,
		timeZone: d,
		long: t,
		settings: g
	}), j.midnight = "Jafari" === g.midnight ? j.sunset + b(j.sunset, j.fajr) / 2 : j.sunset + b(j.sunset, j.sunrise) / 2, j = function(t, a) {
		const n = {
			...t
		};
		return Object.keys(n).forEach((t => {
			n[t] += a[t] / 60
		})), n
	}(j, I), j = p({
		times: j,
		timeFormat: s
	}), {
		date: r,
		method: h,
		...j
	}
}, exports.getDaysInMonthUTC = function(t, a) {
	for (var n = new Date(Date.UTC(a, t, 1)), e = []; n.getUTCMonth() === t;) e.push(new Date(n)), n.setUTCDate(n.getUTCDate() + 1);
	return e
};