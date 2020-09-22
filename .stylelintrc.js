module.exports = {
	rules: {
		indentation: 4,
		"order/order": [
			"custom-properties",
			"declarations"
		],
		"order/properties-order": [
			"width",
			"height"
		]
	},
	extends: 'stylelint-config-standard',
	"plugins": [
		"stylelint-order"
	],
};
