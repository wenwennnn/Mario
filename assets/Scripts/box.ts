import Player from "./player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Box extends cc.Component {

    @property
    high: number = null;
    
    protected isTouched: boolean = false;

    start(){
        //
    }

    onBeginContact(contact, self, other) {

        //console.log('ininn');
        
        if(other.node.x >= this.node.x && !this.isTouched){
            const player = other.getComponent(Player);

            this.high = other.node.x;

            this.isTouched = true;
        }

    }

    onPreSolve(contact, self, other){
        if(this.isTouched){
            const player = other.getComponent(cc.RigidBody);

            player.node.x = this.high;
        }
    }

    onEndContact(contact, self, other){

        this.isTouched = false;

        this.high = null;
    }

}