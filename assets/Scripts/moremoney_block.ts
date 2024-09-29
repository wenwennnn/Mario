import Player from "./player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class money_block extends cc.Component
{
    @property
    isCrash: boolean = false;

    @property(cc.Prefab)
    MoneyPrefabs: cc.Prefab = null;

    @property(cc.AudioClip)
    money_sound: cc.AudioClip = null;

    private dietime: number = 5;
    private anim: cc.Animation = null;
    private originalSpriteFrame: cc.SpriteFrame = null;
    private moneyenable: boolean = true;
    

    start() {

        this.originalSpriteFrame = this.getComponent(cc.Sprite).spriteFrame
        this.anim = this.getComponent(cc.Animation);

        //
    }

    update(dt) {

        //if(!this.isCrash){
            if(!this.anim.getAnimationState("bring").isPlaying && this.moneyenable){
                this.anim.play("bring");
            }
        //}
    }

    onBeginContact(contact, self, other) {

        if(other.node.name == "Mario"){

            if(other.node.y < self.node.y && this.moneyenable){
                //this.anim.stop();

                console.log('here on')
                if(!this.isCrash) this.schedule(this.doCountdownTime,1);

                cc.audioEngine.playEffect(this.money_sound,false);

                //this.getComponent(cc.Sprite).spriteFrame = this.originalSpriteFrame;

                var money = cc.instantiate(this.MoneyPrefabs);
                money.setPosition(-480 + this.node.x, -320 + this.node.y);
                money.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,150)
                //console.log(this.node.x, this.node.y);
                console.log(money.x, money.y);
                cc.find("Canvas").addChild(money);

                other.node.getComponent(Player).score = other.node.getComponent(Player).score + 100;

                this.scheduleOnce(()=>{
                    money.destroy();
                }, 0.5);
            }
        }
    }

    doCountdownTime(){
        console.log(this.dietime);
        if (this.dietime > 0 ) {
            this.dietime -= 1;
            //this.countDownShow(this.broadcostTimes);

            //this.timeCounter.getComponent(cc.Label).string = this.broadcostTimes.toString();

            if(this.dietime==0) {
                this.moneyenable = false;
                this.anim.stop();
                this.getComponent(cc.Sprite).spriteFrame = this.originalSpriteFrame;
            }
        }
    }
}