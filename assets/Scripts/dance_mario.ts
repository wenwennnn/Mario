import { GameManager } from "./menuGameMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class mariodance extends cc.Component {
    
    private anim: cc.Animation = null;

    start() {
        this.anim = this.getComponent(cc.Animation);
    }

    update(dt) {
        if(!this.anim.getAnimationState("mario_dance").isPlaying){
            this.anim.play("mario_dance");
        }
    }

}