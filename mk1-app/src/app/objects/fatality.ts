export class Fatality {
    name:string = '';
    move:string[] = [];
    distance:string ='';
    id?:number;

    getName(name:string):string {
        return this.name;
    }

    getMove(name:string):string[] {
        return this.move;
    }

    getDistance(name:string):string {
        return this.distance;
    }

    getId(num:number) {
        return this.id;
    }
}