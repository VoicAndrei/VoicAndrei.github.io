/*
	Lightweight client-side i18n for voic.ro.

	English is the source of truth and lives directly in index.html. On load we
	capture the English text from the DOM, then swap in translations (from
	i18n-translations.js) for the selected language. The visitor's choice is
	stored in localStorage and restored on the next visit.

	Markup contract:
		data-i18n="key"             -> element.innerHTML
		data-i18n-placeholder="key" -> element placeholder attribute
		data-i18n-value="key"       -> element value (e.g. submit button)
	Plus meta.title / meta.description handled directly below.
*/
(function () {
	'use strict';

	var SUPPORTED = ['en', 'ro', 'de', 'es', 'fr', 'zh'];
	var DEFAULT_LANG = 'en';
	var STORAGE_KEY = 'voic-lang';
	var translations = window.I18N_TRANSLATIONS || {};

	// English baseline, captured once from the DOM at startup.
	var en = {};

	function metaDescEl() {
		return document.querySelector('meta[name="description"]');
	}

	function each(selector, fn) {
		var nodes = document.querySelectorAll(selector);
		for (var i = 0; i < nodes.length; i++) { fn(nodes[i]); }
	}

	function captureEnglish() {
		each('[data-i18n]', function (el) {
			en[el.getAttribute('data-i18n')] = el.innerHTML;
		});
		each('[data-i18n-placeholder]', function (el) {
			en[el.getAttribute('data-i18n-placeholder')] = el.getAttribute('placeholder') || '';
		});
		each('[data-i18n-value]', function (el) {
			en[el.getAttribute('data-i18n-value')] = el.value;
		});
		en['meta.title'] = document.title;
		var md = metaDescEl();
		en['meta.description'] = md ? md.getAttribute('content') : '';
	}

	// Translation for (lang, key), falling back to the captured English.
	function valueFor(lang, key) {
		if (lang !== 'en' && translations[lang] && typeof translations[lang][key] === 'string') {
			return translations[lang][key];
		}
		return en[key];
	}

	function apply(lang) {
		if (SUPPORTED.indexOf(lang) === -1) { lang = DEFAULT_LANG; }

		each('[data-i18n]', function (el) {
			var v = valueFor(lang, el.getAttribute('data-i18n'));
			if (v != null) { el.innerHTML = v; }
		});
		each('[data-i18n-placeholder]', function (el) {
			var v = valueFor(lang, el.getAttribute('data-i18n-placeholder'));
			if (v != null) { el.setAttribute('placeholder', v); }
		});
		each('[data-i18n-value]', function (el) {
			var v = valueFor(lang, el.getAttribute('data-i18n-value'));
			if (v != null) { el.value = v; }
		});

		var title = valueFor(lang, 'meta.title');
		if (title != null) { document.title = title; }
		var md = metaDescEl();
		var desc = valueFor(lang, 'meta.description');
		if (md && desc != null) { md.setAttribute('content', desc); }

		document.documentElement.setAttribute('lang', lang);

		var select = document.getElementById('lang-select');
		if (select && select.value !== lang) { select.value = lang; }
	}

	function store(lang) {
		try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
	}

	function readStored() {
		try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
	}

	// English is always the default. We only switch away from it when the visitor
	// has explicitly picked a language before (remembered in localStorage).
	function detectLang() {
		var stored = readStored();
		if (stored && SUPPORTED.indexOf(stored) !== -1) { return stored; }
		return DEFAULT_LANG;
	}

	function init() {
		captureEnglish();

		var select = document.getElementById('lang-select');
		var initial = detectLang();

		if (select) {
			select.value = initial;
			select.addEventListener('change', function () {
				store(select.value);
				apply(select.value);
			});
		}

		if (initial !== DEFAULT_LANG) {
			apply(initial);
		} else {
			document.documentElement.setAttribute('lang', 'en');
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
