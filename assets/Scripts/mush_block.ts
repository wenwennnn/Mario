

const {ccclass, property} = cc._decorator;

@ccclass
export default class money_block extends cc.Component
{
    @property
    isCrash: boolean = false;

    @property(cc.Prefab)
    MushPrefabs: cc.Prefab = null;

    @property(cc.AudioClip)
    mush_sound: cc.AudioClip = null;

    private anim: cc.Animation = null;

    private originalSpriteFrame: cc.SpriteFrame = null;
    

    start() {
        this.originalSpriteFrame = this.getComponent(cc.Sprite).spriteFrame
        this.anim = this.getComponent(cc.Animation);

        //
    }

    update(dt) {

        if(!this.isCrash){
            if(!this.anim.getAnimationState("block_rotate").isPlaying){
                this.anim.play("block_rotate");
            }
        }
    }

    onBeginContact(contact, self, other) {

        if(other.node.name == "Mario"){
            console.log('here')
            if(other.node.y < self.node.y && !this.isCrash){
                console.log('here in');
                this.anim.stop();
                this.isCrash = true;

                cc.audioEngine.playEffect(this.mush_sound,false);

                this.getComponent(cc.Sprite).spriteFrame = this.originalSpriteFrame;

                var mush = cc.instantiate(this.MushPrefabs);
                mush.setPosition(-480 + this.node.x, -304 + this.node.y);
                //money.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,100)
                //console.log(this.node.x, this.node.y);
                //console.log(money.x, money.y);
                cc.find("Canvas").addChild(mush);

            }
        }
    }
}