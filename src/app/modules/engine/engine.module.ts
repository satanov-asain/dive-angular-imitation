import { Module } from "../../../libs/decorators";
import { BatteryItem} from "./items/battery.item";
import { RadiatorItem} from "./items/radiator.item";

@Module({
    nameSelector: 'engine-module',
    descriptionTemplate: 'Пространство двигателя',
    declarations: [RadiatorItem, BatteryItem]
})
export class EngineModule{};