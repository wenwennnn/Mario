import GameMgr from "./GameMgr";
import Player from "./player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class mushroom extends cc.Component
{

    @property
    moveDir: number = 1;

    @property
    isDied: boolean = false;

    @property(cc.AudioClip)
    mushroom_die: cc.AudioClip = null;

    private anim: cc.Animation = null;

    start(){
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(30, 0);
    }

    onLoad() {
        this.schedule(this.changeSprite, 0.1);
        this.anim = this.getComponent(cc.Animation);
    }

    changeSprite(){
        this.node.scaleX = (this.node.scaleX == 1) ? -1 : 1;
    }

    update(dt){
        //console.log('here');
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveDir * 30, 0);
    }

    onBeginContact(contact, self, other){

        if(other.node.name == "Mario"){
            console.log('player');
            if(this.node.y+10 < other.node.y-10 && !this.isDied && !other.node.getComponent(Player).isDied){
                this.isDied = true;
                self.sensor = true;
                self.apply();
                console.log('here');
                this.anim.stop();
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
                this.anim.play("mushroom_die");
                cc.audioEngine.playEffect(this.mushroom_die,false);

                //console.log(this.node.getComponent(cc.RigidBody).linearVelocity.x);
                other.node.getComponent(Player).score = other.node.getComponent(Player).score + 100;


                setTimeout(()=>{
                    this.node.destroy();
                   //  this.rebornPos();
                }, 200);
            }
            else{

                setTimeout(()=>{
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
                }, 2000);

                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(30, 0);
            }
        }

        else if(other.node.name == "block" || other.node.name == "pipe"){
            //console.log('hii');
            this.moveDir = (this.moveDir==1) ? -1 : 1;
        }
    }
}