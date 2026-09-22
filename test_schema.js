require('ts-node').register();
const { SettingSchema } = require('./src/settings/schemas/setting.schema.ts');
console.log(Object.keys(SettingSchema.paths));
