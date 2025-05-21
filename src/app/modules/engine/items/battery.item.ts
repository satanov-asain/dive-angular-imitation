import { Item } from "../../../../libs/decorators";

@Item({
    nameSelector: 'battery',
    descriptionTemplate: 'Аккумулятор, просьба не слушать музыку'
}) 
export class BatteryItem{

    volume: number = 2000;

    charge(): void {
        console.log('battery charging');
    }
};