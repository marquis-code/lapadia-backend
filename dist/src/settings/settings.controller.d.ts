import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettings(): Promise<import("./schemas/setting.schema").SettingDocument>;
    updateSettings(body: any, req: any): Promise<import("./schemas/setting.schema").SettingDocument>;
}
