const {ccclass, property} = cc._decorator;

@ccclass
export default class flower extends cc.Component
{
    private anim: cc.Animation = null;

    start() {

        this.node.zIndex = 0;

        this.anim = this.getComponent(cc.Animation);

        let action: cc.Action;
        let easeRate: number = 2;
        var sequence = cc.sequence(
            cc.moveBy(1, 0, 40).easing(cc.easeInOut(easeRate)),  // 向上移動
            cc.moveBy(1, 0, -40).easing(cc.easeInOut(easeRate))  // 向下移動
        );
        action = cc.repeatForever(sequence);
        this.scheduleOnce(function () {
            this.node.runAction(action);
        }, 1);
    }

    update(dt) {
        if(!this.anim.getAnimationState("flower_move").isPlaying){
            this.anim.play("flower_move");
        }
    }
}